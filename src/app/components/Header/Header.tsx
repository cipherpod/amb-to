import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import iconLogo from 'assets/images/amb-logo.png';
import './Header.scss';

interface HeaderProps {
  asset: any;
  assetId: string;
}

interface HeaderStates {
  revealMenu: boolean;
}

export default class Header extends Component<HeaderProps, HeaderStates> {
  public state = {
    revealMenu: false,
  };

  public getNavbarStyle = () => {
    const { asset } = this.props;
    try {
      const style = asset.branding.nav;
      if (style) {
        return {
          borderBottom: style['border-bottom'],
          color: style.color,
          background: style.background,
        };
      }
      return {};
    } catch (error) {
      return {};
    }
  }

  public getLogoStyle = () => {
    const { asset } = this.props;
    try {
      return asset.branding.logo || {};
    } catch (error) {
      return {};
    }
  }

  public getNavbarLogo = () => {
    const { asset } = this.props;
    try {
      return asset.branding.logo || {};
    } catch (error) {
      return {};
    }
  }

  public toggleMenu = () => {
    this.setState({ revealMenu: !this.state.revealMenu });
  }

  public render() {
    const { assetId } = this.props;
    const { revealMenu } = this.state;
    return (
      <nav className='navigation' style={this.getNavbarStyle()} >
        <div className='wrapper'>
          <div className='navigation__menu'>
            <Link to={`/${assetId}`} className='navigation__logo--link'>
              <img style={this.getLogoStyle()} src={this.getNavbarLogo().url || iconLogo} alt='Ambrosus Logo' className='navigation__logo' />
            </Link>
            <div className={`navigation--right-side ${revealMenu ? 'active' : ''}`}>
              <button onClick={this.toggleMenu} className='navigation__menu__icon' >
                <span className='navigation__menu--icon1'></span>
                <span className='navigation__menu--icon2'></span>
                <span className='navigation__menu--icon3'></span>
              </button>
            </div>
          </div >
          <div style={this.getNavbarStyle()} className={`navigation__container
           ${revealMenu ? 'navigation__container--active' : ''}`} >
            <a className='navigation__container__link'>Settings</a>
          </div >
        </div >
      </nav >
    );
  }
}
