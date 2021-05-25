import './Question.scss'
import adventure from './assets/adventure.svg'

const LETTERS = ['A', 'B', 'C', 'D']

function Question (props) {

    const answers = props.question.answers.map((item, index) => {
        return(
            <div className={`question__answer
                ${props.isAnswered ? 'question__answer-unactive' : ''}
                ${(props.isAnswered && props.question.correctAnswer === index) ?
                'question__answer-correct' : ''}
                ${(props.isAnswered && props.question.correctAnswer !== index 
                    && props.answered === index) ? 'question__answer-incorrect' : ''}`} 
                key={index} onClick={() => props.handleAnswerClick(index)} 
                data-index={index}>
                
                    <p className="answer__letter">{LETTERS[index]}</p>
                    <p className="answer__text">{item.name}</p>
                
            </div>
        )
    })

    return(
        <div className="question">
            <div className="question__image">
                <img src={adventure} alt="adventure" />
            </div>    
            
            <div className="question__text">
                {props.question.type ? (<div className="question__flag">
                    <img src={(props.question.answers[props.question.correctAnswer]).flag} alt="flag" />
                </div>) : ''}
                <p>{props.question.text}</p>
            </div>

            <div className="question__answers">
                {answers}
            </div>

            {props.isAnswered && <div className="question__next" onClick={() => props.handleNextClick()}>
                <p>Next</p>
            </div>}
        </div>
    )
}

export default Question