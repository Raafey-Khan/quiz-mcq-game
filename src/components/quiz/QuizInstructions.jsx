import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import answer from '../../assets/img/answer.jpg';
import fiftyFifty from '../../assets/img/fiftyFifty.jpg';
import hints from '../../assets/img/hints.jpg';
import options from '../../assets/img/options.jpg';

const QuizInstructions = () => (
    <Fragment>
        <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
        <div className="instructions container">
            <h1>How to Play the Game</h1>
            <br />
            <h5>Ensure you read this guide from start to finish</h5>
            <br />
            <ul className="browser-default" id="main-list">
                <li>The game has a duration of 15 minutes and ends as soon as your time elapses</li>
                <li>Each game consists of 15 questions.</li>
                <li>
                    Every question contains 4 options.
                    <img src={options} alt="" />
                </li>
                <li>
                    Select the option which best answers the question by clicking (or selecting) it

                    <img src={answer} alt="" />
                    </li>
                <li>
                    Each game has 2 lifelines namely:
                    <ul id="sublist">
                        <li>2 50-50 chances</li>
                        <li>5 Hints</li>
                    </ul>
                </li>  
                <li>
                    Selecting a 50-50 lifeline by clicking the icon
                    <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                    will remove 2 wrong answers, leaving the correct answer and one wrong answer
                    <img src={fiftyFifty} alt="" />
                </li>
                <li>
                    using a hint by clicking the icon
                    <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
                    will remove one wrong answer leaving two wrong answers and one correct answers.
                    You can use as many hint as possible on as possible on a single question.
                    <img src={hints} alt="" />
                </li>
                <li>
                    Feel free to quit (or retire from) the game at any time. In that case your score will revealed afterwards
                </li>
                <li>
                    The timer starts as soon as the game loads.
                </li>
                <li>Let's do this if you think you've got what it takes?</li>
            </ul>
            <div>
                <span className="left"><Link to="/">No take me back</Link></span>
                <span className="right"><Link to="/play/quiz">Okay, Let's do this !</Link></span>
            </div>
        </div>
    </Fragment>
);

export default QuizInstructions;
