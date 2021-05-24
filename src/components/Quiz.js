import { Component } from 'react'

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
        this.state={
            turns: 0,
            endGame: false,
            score: 0,
            questionIsAnswered: false,
            gameInitiated: false

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

    handleAnswerClick(){

    }

    handleNextClick(){

    }

    handleTryAgain(){

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

        if (!this.state.gameInitiated){
            console.log('gen')
            this.generateNextQuestion()
        }

        return (
            <div className="country-quiz">

                <h1 className="country-quiz__title">COUNTRY QUIZ</h1>

                <div className="game">

                    <div className="game__question">

                    </div>


                </div>

            </div>
        )
    }
}

export default Quiz