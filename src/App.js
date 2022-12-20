
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function App() {
	const questions = [
		{
      id: 1,
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
			],
		},
		{
      id: 2,
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
			],
		},
		{
      id: 3,
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
			],
		},
		{
      id: 4,
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [surveyDone, setSurveyDone] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (answerOption) => {
		// if (isCorrect) {
		// 	setScore(score + 1);
		// }
    

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setSurveyDone(true);
		}
	};
	return (
		<div className='app'>
			{surveyDone ? (
				<div className='score-section'>
					Thank you for finishing the survey
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
