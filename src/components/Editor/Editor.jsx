import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Editor.css';
import Header from '../Header/Header.jsx';
import App from '../App/App.jsx';
import PosField from './PosField.jsx';


export default class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      language: 'English',
      title: '',
      description: '',
      pattern: [ {} ],
      testing: false
    };
  }

  renderPatternPart(index) {
    const pattern = this.state.pattern.slice();
    const patternPart = pattern[index] = (pattern[index] || {});

    const setValue = (key, value) => {
      patternPart[key] = value;
      this.setState({ pattern });
    };

    return (
      <div>
        <h2>Matching word #{ index + 1 }</h2>

        <div className={ styles.field }>
          <PosField
            onChange={ (value) => setValue('partOfSpeech', value) }
            language={ this.state.language }
            pos={ patternPart.partOfSpeech } />
        </div>

        <div className={ styles.field }>
          <label>Base form regex</label>
          <input
            placeholder="optional"
            defaultValue={ patternPart.baseForm }
            onChange={ (e) => setValue('baseForm', e.target.value) } />
        </div>

        <div className={ styles.field }>
          <label>Surface form regex</label>
          <input
            placeholder="optional"
            defaultValue={ patternPart.surfaceForm }
            onChange={ (e) => setValue('surfaceForm', e.target.value) } />
        </div>

        <div className={ styles.field }>
          <label>Occlusion regex</label>
          <input
            placeholder="optional"
            defaultValue={ patternPart.occlusion }
            onChange={ (e) => setValue('occlusion', e.target.value) } />
        </div>

        <div className={ styles.field }>
          <label>
            Choices
            <br />
            (comma-separated)
          </label>

          <textarea
            defaultValue={ (patternPart.choices || []).join(', ') }
            onChange={ (e) => setValue('choices', e.target.value) } />
        </div>
      </div>
    );
  }

  transformPattern() {
    const pattern = this.state.pattern.map(patternPart => {
      return Object.keys(patternPart).reduce((acc, key) => {
        if (patternPart[key] == null) return acc;

        if ('choices' === key) {
          acc[key] = patternPart[key].split(/,\s*/g).map(s => s.trim());
        } else {
          acc[key] = new RegExp(patternPart[key]);
        }

        return acc;
      }, {});
    });

    if (!pattern.some(patternPart => patternPart.occlusion)) {
      pattern[0].occlusion = /.+/;
    }

    return pattern;
  }

  getLink() {
    const base64 = btoa(JSON.stringify({
      title: this.state.title,
      description: this.state.description,
      pattern: this.state.pattern
    }));
    return `/quiz/${ this.state.language }/${ base64 }`;
  }

  render() {
    const testApp = e => {
      e.preventDefault();
      this.setState({ testing: true });
    };

    const addWord = e => {
      e.preventDefault();
      this.setState({ pattern: this.state.pattern.concat([ {} ]) });
    };

    const patternParts = this.state.pattern.map((item, i) => (
      <div key={ i }>{ this.renderPatternPart(i) }</div>
    ));

    const app = this.state.testing ? (
      <div className={ styles.appTest }>
        <div className={ styles.shareLink }>
          <Link to={ this.getLink() }>A shareable link to the quiz</Link>
        </div>

        <App
          language={ this.state.language }
          description={ this.state.description }
          pattern={ this.transformPattern() }
          />
      </div>
    ) : '';

    return (
      <div className={ styles.container }>
        <Header title={ 'Exercise editor' }></Header>

        <div className={ styles.editor }>
          <div className={ styles.field }>
            <label>Language</label>

            <select
              defaultValue={ this.state.language }
              onChange={ (e) => this.setState({ language: e.target.value }) }>
              <option>English</option>
              <option>German</option>
            </select>
          </div>

          <div className={ styles.field }>
            <label>Title</label>

            <input onChange={ (e) => this.setState({ title: e.target.value }) } />
          </div>

          <div className={ styles.field }>
            <label>Description</label>

            <textarea onChange={ (e) => this.setState({ description: e.target.value }) } />
          </div>

          { patternParts }

          <div className={ styles.submitField }>
            <button className={ styles.flatButton } onClick={ addWord }>Add word</button>

            <button className={ styles.bigButton } onClick={ testApp }>Save & test</button>
          </div>

          { app }
        </div>
      </div>
    );
  }
}
