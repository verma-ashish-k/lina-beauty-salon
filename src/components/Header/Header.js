import React from 'react';
import { connect } from 'react-redux';
import NavigationItem from '../NavigationItem/NavigationItem';
import { Routes } from '../../constants/routes';
import './Header.css';

export class Header extends React.Component {
  state = {
    link: Routes.SERVICES_FOR_MEN,
  };

  handlerClick = (e) => {
    e.persist();
    this.setState({ link: e.target.attributes[0].value });
  };

  render() {
    const { link } = this.state;
    return (
      <header className='container'>
        <nav className='nav'>
          <ul className='nav__items d-flex'>
            <NavigationItem link={Routes.MAIN} exact>
              Home
            </NavigationItem>
            <NavigationItem
              link={Routes.SERVICES_FOR_WOMEN}
              submenu
              clickHandler={(e) => this.handlerClick(e)}
            >
              Services
            </NavigationItem>

            {this.props.isAuthenticated ? (
              <NavigationItem link={Routes.ACCOUNT}>My account</NavigationItem>
            ) : null}
            {this.props.isAuthenticated ? (
              <NavigationItem link={Routes.SIGNOUT}>Sign out</NavigationItem>
            ) : (
              <NavigationItem link={Routes.SIGNIN}>Sign in</NavigationItem>
            )}
            {!this.props.isAuthenticated && (
              <NavigationItem link={Routes.SIGNUP}>Sign up</NavigationItem>
            )}
            <img src='images/logo.png' className='logo' alt='Logo' />
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Header);
