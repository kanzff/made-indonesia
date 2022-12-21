
import React, { useEffect, useState } from 'react';

export default function App() {
	const questions = [
		{
      id: 1,
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York'},
				{ answerText: 'London'},
				{ answerText: 'Paris'},
			],
		},
		{
      id: 2,
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos'},
				{ answerText: 'Elon Musk'},
				{ answerText: 'Bill Gates'},
			],
		},
		{
      id: 3,
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple'},
				{ answerText: 'Intel'},
				{ answerText: 'Amazon'},
			],
		},
		{
      id: 4,
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '4'},
				{ answerText: '6'},
				{ answerText: '7'},
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [counter, setCounter] = useState(600)
	const [answer, setAnswer] = useState([])
	const [surveyDone, setSurveyDone] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState({})
	const savedCounter = JSON.parse(localStorage.getItem('counter'))
	const currentQuestionId = JSON.parse(localStorage.getItem('currentQuestion'))
	const savedAnswer = JSON.parse(localStorage.getItem('answers'))

	useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
		if (counter === 0) {
			setSurveyDone(true)
		}
		// const savedCounter = JSON.parse(localStorage.getItem('counter'))
		if (counter <= savedCounter) {
			localStorage.setItem('counter', JSON.stringify(counter))
		}
  }, [counter]);

	useEffect(() => {
		// const currentQuestionId = JSON.parse(localStorage.getItem('currentQuestion'))
		if (currentQuestionId) {
			setCurrentQuestion(currentQuestionId)
		}
		// const savedAnswer = JSON.parse(localStorage.getItem('answers'))
		if (savedAnswer) {
			setAnswer(savedAnswer)
		}
		// const savedCounter = JSON.parse(localStorage.getItem('counter'))
		if (savedCounter) {
			setCounter(savedCounter)
		}
		if (!savedCounter) {
			localStorage.setItem('counter', JSON.stringify(counter))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('answers', JSON.stringify(answer))
		localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion))

		if (currentQuestion + 1 === questions.length && surveyDone) {
			localStorage.clear()
		}
	}, [answer, currentQuestion])

	const handleAnswerOptionClick = () => {
    setAnswer(oldValue => [...oldValue, selectedAnswer])

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setSurveyDone(true);
		}
	};
	const onChangeValue = (ans) => {
		setSelectedAnswer(ans)
  }

	const restartSurvey = () => {
		window.location.reload();
	}
	return (
		<div className='app'>
				{surveyDone ? (
					<div className='score-section'>
						<div>
							Thank you for finishing the survey
							{JSON.stringify(answer)}
						</div>
						<div>
							<button onClick={() => restartSurvey()}>Restart</button>
						</div>
					</div>
				) : (
					<>
						<div className='question-section'>
							<div className='counter'>
								<p>{counter}</p>
							</div>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{questions.length}
							</div>
							<div className='question-text'>{questions[currentQuestion].questionText}</div>
						</div>
						{/* <div className='answer-section'>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<button onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption.answerText}</button>
							))}
						</div> */}
						<div className='radio-section'>
							{questions[currentQuestion].answerOptions.map((answerOption) => {
								return (
									<div>
										<input type='radio' name='answer' value={answerOption} onChange={() => onChangeValue(answerOption)} id={answerOption.answerText}/>
										<label for={answerOption.answerText}>{answerOption.answerText}</label>
									</div>
								)
							})}
							<button onClick={() => handleAnswerOptionClick()}>Next</button>
						</div>
					</>
				)}
		</div>
	);
}
