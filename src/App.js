
import React, { useEffect, useState } from 'react';
import { questions } from './questions';

export default function App() {

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
		if (counter <= savedCounter) {
			localStorage.setItem('counter', JSON.stringify(counter))
		}
  }, [counter]);

	useEffect(() => {
		if (currentQuestionId) {
			setCurrentQuestion(currentQuestionId)
		}
		if (savedAnswer) {
			setAnswer(savedAnswer)
		}
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
			<div className='container justify-content-center fw-bold'>
				{surveyDone ? (
					<div className='row p-4 message'>
						<div className='col score-section p-4 mb-4 bg-light rounded-3 fs-5'>
							<div>
								Thank you for filling the survey
								{/* {JSON.stringify(answer)} */}
							</div>
						</div>
						<div className='d-flex btn-container-2 flex-column-reverse p-0'>
							<button className='button rounded fs-1' onClick={() => restartSurvey()}>Restart</button>
						</div>
					</div>
				) : (
					<div className='row p-4'>
						<div className='col p-4 mb-4 bg-light rounded-3 question fs-5'>
							<div className='row question-head fs-1'>
								<div className='col question-count'>
									<p>Q{currentQuestion + 1}/{questions.length}</p>
								</div>
								<div className='col counter text-end'>
									<p>{counter}</p>
								</div>
							</div>
							<div className='question-text'>{questions[currentQuestion].questionText}</div>
							<div className='radio-section'>
								{questions[currentQuestion].answerOptions.map((answerOption) => {
									return (
										<div>
											<input type='radio' name='answer' value={answerOption} onChange={() => onChangeValue(answerOption)} id={answerOption.answerText}/>
											<label className='p-2' for={answerOption.answerText}>{answerOption.answerText}</label>
										</div>
									)
								})}
							</div>
						</div>
						<div className='d-flex btn-container flex-column-reverse p-0'>
							<button className='button rounded fs-1' onClick={() => handleAnswerOptionClick()}>Next</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
