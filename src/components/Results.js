import './Results.scss'

import win from './assets/undraw_winners_ao2o 2.svg'

const Results = (props) => {

    return (
        <div className="results">
            <div className="results__img">
                <img src={win} alt="win" />
            </div>

            <div className="results__text">
                <h2>Results</h2>
                <p>You got <span className={props.score>3 ? 'green' : 'red'}>{props.score}</span> correct answer{props.score > 1 ? 's' : ''}</p>
            </div>

            <div className="results__button" onClick={() => props.click()}>
                <p>Try again</p>
            </div>
        </div>

    )
}

export default Results