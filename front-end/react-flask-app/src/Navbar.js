import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Navigation</h1>
      <div className="navigationField">
        <Link to="/posts">Posts</Link>
        <Link to="/comment">Comment</Link>
      </div>
    </nav>
  );
}

export default Navbar;