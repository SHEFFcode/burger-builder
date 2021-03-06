import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../../UI/Hamburger/Hamburger';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Hamburger click={props.toggleDrawer}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;