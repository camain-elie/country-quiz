import { Component } from 'react'

import Question from './Question'
import Results from './Results'

import './Quiz.scss'

const URL = 'https://restcountries.eu/rest/v2/all'
const QUESTION_TYPES = [
    { name: "capital-city", text: "is the capital of" },
    { name: "flag", text: "Which country does this flag belong to ?"}
]

const getCountriesData = async () => {
    const data = await fetch(URL)
    const jsonData = await data.json()
    return jsonData
}

const COUNTRIES = getCountriesData()

class Quiz extends Component {
    constructor(props){
        super(props)

        this.handleTryAgain = this.handleTryAgain.bind(this)
        this.handleAnswerClick = this.handleAnswerClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)

        this.state={
            turns: 0,
            endGame: false,
            score: 0,
            questionIsAnswered: false,
            gameInitiated: false,


        }
    }

    restartGame(){
        this.setState({
            turns: 0,
            endGame: false,
            score: 0,
            questionIsAnswered: false,
        })
    }

    handleAnswerClick(index){
        
        const win = this.state.question.correctAnswer === index

        this.setState({
            questionIsAnswered: true,
            score: win ? this.state.score + 1 : this.state.score,
            turns: this.state.turns + 1,
            answered: index,
        })
        
    }

    handleNextClick(){

        this.setState({
            questionIsAnswered: false
        })

        if(this.state.turns > 9){
            this.setState({
                endGame: true,
            })
        }else{
            this.generateNextQuestion()
        }
        
        console.log('next')
    }

    handleTryAgain(){
        this.generateNextQuestion()
        this.restartGame()
    }

    generateNextQuestion(){
        let question = {
            answers: [],
            type: Math.round(Math.random()),
            correctAnswer: Math.floor(Math.random() * 4)
        }
        let countries = []

        COUNTRIES.then( res => {
            for(let i = 0; i<4; i++){
                countries.push(res[Math.floor(Math.random() * res.length)])
            }
            question.answers = countries
            let text
            if(question.type){
                text = QUESTION_TYPES[question.type].text
            } else {
                text = `${(question.answers[question.correctAnswer]).capital} ${(QUESTION_TYPES[question.type]).text}`
            }
            question.text = text
            this.setState({ 
                question: question,
                gameInitiated: true })
        })
    }

    render(){

        const state = this.state

        if (!this.state.gameInitiated){
            this.generateNextQuestion()
        }

        return (
            <div className="quiz">

                <h1 className="quiz__title">COUNTRY QUIZ</h1>

                <div className="quiz__game">

                    {!state.endGame && state.gameInitiated &&
                    <Question question={state.question}
                        isAnswered={state.questionIsAnswered}
                        handleAnswerClick={this.handleAnswerClick}
                        handleNextClick={this.handleNextClick}
                        answered={this.state.answered} />
                    }

                    {state.endGame && <Results score={state.score} click={this.handleTryAgain} />}
                </div>

            </div>
        )
    }
}

export default Quiz