from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import mysql.connector

def get_credentials():
    return {
        'host': os.getenv("host"),
        'user': os.getenv("user"),
        'password': os.getenv("password")
    }

creds = get_credentials()
db_name = "database1"

def connect_db(database=None):
    return mysql.connector.connect(
        host=creds['host'],
        user=creds['user'],
        password=creds['password'],
        database=database
    )

def ensure_database_exists():
    mydb = connect_db()
    cursor = mydb.cursor()
    cursor.execute(f"SHOW DATABASES LIKE '{db_name}'")
    result = cursor.fetchone()
    if not result:
        cursor.execute(f"CREATE DATABASE {db_name}")
        print(f"Database '{db_name}' was just created")
    cursor.close()
    mydb.close()

ensure_database_exists()

table_name = "comments"

def ensure_table_exists():
    mydb = connect_db(db_name)
    cursor = mydb.cursor()
    cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
    result = cursor.fetchone()
    if not result:
        cursor.execute(f"CREATE TABLE {table_name} (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), comment VARCHAR(1000))")
        print(f"Table {table_name} was created")
    cursor.close()
    mydb.close()

ensure_table_exists()

app = Flask(__name__)
CORS(app)
@app.route('/data', methods=['POST'])
def handle_data():
    data = request.json
    sql = f"INSERT INTO {table_name} (username, comment) VALUES (%s, %s)"
    val = (data["username"], data["comment"])
    mydb = connect_db(db_name)
    cursor = mydb.cursor()
    cursor.execute(sql, val)
    mydb.commit()
    
    cursor.execute(f"SELECT * FROM {table_name}")
    result = cursor.fetchall()
    print("Current records:", result)
    
    cursor.close()
    mydb.close()
    return jsonify({'message': 'Message posted with success!'})

@app.route('/comments', methods=['GET'])
def get_comments():
    mydb = connect_db(db_name)
    cursor = mydb.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
  
    comments = cursor.fetchall()  
    
    comments_list = [{'id': comment[0], 'username': comment[1], 'comment': comment[2]} for comment in comments]
    
    cursor.close()
    mydb.close()
    return jsonify(comments_list)

if __name__ == '__main__':
    app.run(debug=True)
