import './Question.scss'
import adventure from './assets/adventure.svg'

const LETTERS = ['A', 'B', 'C', 'D']

function Question (props) {

    let correctAnswer = props.question.answers[props.question.correctAnswer]
    console.log(correctAnswer)

    const answers = props.question.answers.map((item, index) => {
        return(
            <div className="question__answer" 
                key={index} onClick={() => props.handleAnswerClick(index)} 
                data-index={index}>
                <p>
                    <span className="answer__letter">{LETTERS[index]}</span>
                    {item.name}
                </p>
            </div>
        )
    })

    return(
        <div className="question">
            <div>
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