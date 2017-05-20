import React from 'react';
import Exercises from '../../services/Exercises';
import Question from '../Question/Question.jsx';
import styles from './App.css';

export default class App extends React.PureComponent {
  constructor() {
    super();

    this.generator = null;

    this._onAnswer = this.onAnswer.bind(this);

    this.state = {
      correctAnswers: 0,
      incorrectAnswers: 0,
      exercises: []
    };
  }

  componentWillMount() {
    this.generator = new Exercises(this.props.language);

    this.generator.generate(this.props.pattern)
      .then(data => {
        this.setState({ exercises: data })
      });
  }

  onAnswer(correct) {
    this.setState({
      correctAnswers: this.state.correctAnswers + (correct ? 1 : 0),
      incorrectAnswers: this.state.incorrectAnswers + (correct ? 0 : 1)
    });
  }

  render() {
    const allClozes = this.state.exercises
          .map(item => item.find(lexeme => lexeme.occluded != null))
          .filter(Boolean);

    const maxSize = allClozes.reduce((max, item) => {
      return Math.max(max, item.occluded.length);
    }, 1);

    const choices = allClozes.reduce((acc, item) => {
      if (!acc.includes(item.occluded)) acc.push(item.occluded);
      return acc;
    }, []);

    const exercises = this.state.exercises.map((item, i) => (
      <li key={ i } className={ styles.question }>
        <Question
          question={ item }
          size={ maxSize }
          choices={ choices }
          clozeSymbol={ this.generator.clozeSymbol }
          onAnswer={ this._onAnswer }
          />
      </li>
    ));

    return (
      <div className={ styles.container }>
        <h1><span>{ this.props.language }: { this.props.title }</span></h1>

        <ol>
          { exercises }
        </ol>

        <div className={ styles.score }>
          <div className={ styles.correctScore }>
            Correct: { this.state.correctAnswers }/{ this.state.exercises.length }
          </div>
          <div className={ styles.incorrectScore }>
            Errors: { this.state.incorrectAnswers }
          </div>
        </div>
      </div>
    );
  }
}
