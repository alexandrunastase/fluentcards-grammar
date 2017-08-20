import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.css';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className={ styles.container }>
        <footer>
          <div />Fluentcards, 2017
        </footer>
      </div>
    );
  }
}
