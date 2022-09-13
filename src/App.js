import React, { useState } from 'react';
import './App.css';
import QuizQuestions from './questions';

export default function App() {
  const [questions, setQuestions] = useState(QuizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [max, setMax] = useState(0)

  const handleAnswerClick = (isCorrect) => {
    if(score+1===questions.length){
      setMax(prev=>prev+1)
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore((prev) => !prev);
    }
  };

  const PlayAgain = () => {
    setCurrentQuestion(0)
    setShowScore(prev=>!prev)
    setScore(0)
    questions.sort(()=>0.5-Math.random())
  }

  return (
    <div className="App">
      <div className="quiz-container">
        <div className="container">
          {showScore ? (
            <div className='Show-Score'>
              <h1>
                you scored {score} out of {questions.length}
              </h1>
              <button className='play-again' onClick={()=>PlayAgain()}>Take Quiz Again</button>
              <div>times you managed to score max: {max}</div>
            </div>
          ) : (
            <>
              <div className="texts">
                <h1>
                  Question {currentQuestion + 1}{' '}
                  <span className="small-span">/{questions.length}</span>
                </h1>
                <h3>{questions[currentQuestion].questionText}</h3>
              </div>
              <div className="quest-answer-btns">
                {questions[currentQuestion].answerOptions.map((ans) => {
                    return (
                    <button key={ans.answerText} onClick={() => handleAnswerClick(ans.isCorrect)}>
                      {ans.answerText}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
