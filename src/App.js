
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

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
			<Container className='d-flex justify-content-center'>
				{surveyDone ? (
					<Row>
						<div className='score-section'>
							<div>
								Thank you for filling the survey
								{JSON.stringify(answer)}
							</div>
							<div>
								<button onClick={() => restartSurvey()}>Restart</button>
							</div>
						</div>
					</Row>
				) : (
					<Row className='question'>
						<Col className='bg-white rounded-3 question-body'>
							<Row>
								<Col className='question-count'>
									<p>Q{currentQuestion + 1}</p>
								</Col>
								<Col className='counter text-align-center'>
									<p>{counter}</p>
								</Col>
							</Row>
							<div className='question-text'>{questions[currentQuestion].questionText}</div>
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
						</Col>
					</Row>
				)}
			</Container>
		</div>
	);
}
