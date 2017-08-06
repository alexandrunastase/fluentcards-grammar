import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Header from '../Header/Header.jsx';
import styles from './FrontRoute.css';


/**
 * FrontRoute component
 */
export default ({ match }) => {
  return (
    <div className={ styles.front }>
      <section className={ styles.hero }>
        <Header title="Fluentcards" />

        <div className={ styles.container }>
          <p>An easy way to language fluency through smart flashcards</p>
        </div>
      </section>

      <section>
        <div className={ styles.container }>
          <p>
            <h1>Collect words</h1>

            <a target="_blank"
               rel="nofollow"
               href="https://chrome.google.com/webstore/detail/fluentcards-dictionary/fdppeilamokmgmobedkdmjiedkbblngd">
              <img src="/images/extension.png" className={ styles.imageRight } />
            </a>

            Install our Chrome extension for instant dictionary look-up. Start collecting your own flashcards and build up your vocabulary.
            When you save a word, we also save the context sentence.

            <a className={ styles.cta }
               target="_blank"
               rel="nofollow"
               href="https://chrome.google.com/webstore/detail/fluentcards-dictionary/fdppeilamokmgmobedkdmjiedkbblngd">
              Install Chrome Extension
            </a>
          </p>
        </div>
      </section>

      <section>
        <div className={ styles.container }>
          <p>
            <h1>Organize and edit</h1>

            <Link to="/vocab">
              <img src="/images/vocab.png" className={ styles.imageCenter } />
            </Link>

            Fluentcards makes it easy to view and edit your saved words. Add cloze tests, pronunciation audio and images.
          </p>
        </div>
      </section>

      <section>
        <div className={ styles.container }>
          <p>
            <h1>Export and Review</h1>

            <img src="/images/anki.jpg" className={ classnames(styles.imageLeft, styles.imageTall) } />

            You can export your entire flashcards collection
            into <a href="https://apps.ankiweb.net/" target="_blank" rel="nofollow">Anki</a> or <a href="https://www.memrise.com/" target="_blank" rel="nofollow">Memrise</a> for
            regular review. Create beautiful decks and review on your phone.

            <br />
            <br />

            Anki saves your time by repeatedly showing you flashcards right at the time when you about to forget them. Take advantage of the scientifically proven SRS method to boost your vocabulary.

            <a className={ styles.cta } href="https://apps.ankiweb.net/docs/manual.html#importing-text-files" target="_blank" rel="nofollow">
              Learn how to import into Anki
            </a>
          </p>
        </div>
      </section>

      <section>
        <div className={ styles.container }>
          <p>
            <h1>Grammar Drills</h1>

            <Link to="/grammar">
              <img src="/images/grammar.png" className={ styles.imageRight } />
            </Link>

            Cement your grammar knowledge with infinite grammar drills.

            <br />
            <br />

            We dynamically generate grammar exercises from classical, sci-fi and fantasy books and movie subtitles.

            <Link to="/grammar" className={ styles.cta }>
              Start doing exercises
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
