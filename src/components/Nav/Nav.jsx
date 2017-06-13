import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login.jsx';
import Info from '../Info/Info.jsx';
import styles from './Nav.css';

export default class Nav extends React.PureComponent {
  render() {
    return (
      <div className={ styles.container }>
        <nav>
          <div className={ styles.logo }>
            <Link to={ '/' }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 28" width="72" height="28">
                <g fill="#333">
                  <rect x="0"  y="0" width="20" height="28" rx="4" ry="4" />
                  <rect x="24" y="0" width="20" height="28" rx="4" ry="4" />
                  <rect x="48" y="0" width="20" height="28" rx="4" ry="4" />
                </g>
              </svg>
            </Link>
          </div>

          <div className={ styles.info }>
            <Info />
          </div>

          <div className={ styles.login }>
            <Login />
          </div>
        </nav>
      </div>
    );
  }
}
