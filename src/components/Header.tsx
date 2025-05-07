
import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full px-4 py-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;
