import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/" className={styles.logo}>logicVanilla</Link>
        <button className={styles.menuButton} onClick={handleMenuToggle}>
          Menu
        </button>
        <ul  className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
          <li onClick={handleMenuItemClick}><Link  to="/">Home</Link></li>
          <li onClick={handleMenuItemClick}><Link to="/quiz">Quiz</Link></li>
          <li onClick={handleMenuItemClick}><Link to="/memory">Memory</Link></li>
        </ul>
      </nav>
    </header>
  );
};
