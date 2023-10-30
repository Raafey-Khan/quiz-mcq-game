import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from 'materialize-css';
import questions from '../../questions.json';
import isEmpty from "../../utils/is-empty";
import correctNotification from "../../assets/audio/correct-answer.mp3";
import buttonSound from "../../assets/audio/button-sound.mp3";
import wrongNotification from "../../assets/audio/wrong-answer.mp3";

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0, // Initialize wrongAnswers
            hints: 5,
            fiftyFifty: 2,
            previousRandomNumbers: [],
            usedFiftyFifty: false,
            time: {}
        };
    }

    componentDidMount() {
        this.displayQuestions();
    }

    displayQuestions() {
        let { currentQuestionIndex, questions } = this.state;
        if (!isEmpty(questions)) {
            const currentQuestion = questions[currentQuestionIndex];
            const nextQuestion = questions[currentQuestionIndex + 1];
            const previousQuestion = questions[currentQuestionIndex - 1];

            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: []
            },() => {
                this.showOptons();
            });
        }
    }

    handleOptionClick = (e) => {
       if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        setTimeout(() => {
            document.getElementById('correct-sound').play();
        }, 1)
        
        this.correctAnswer();
       } else {
        setTimeout(() => {
            document.getElementById('wrong-sound').play();
        }, 1)
        
        this.wrongAnswer();
       }
    }

    handleNextButtonClick = () => {
        this.playButtonSound();
        if (this.state.nextQuestion !== undefined){
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () =>{
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };


    handlePreviousButtonClick = () => {
        this.playButtonSound();
        if (this.state.previousQuestion !== undefined){
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () =>{
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };


    handleQuitButtonClick = () => {
        this.playButtonSound();
        window.confirm('Are you sure you want to quit ?');
        if(window.confirm('Are you sure you want to quit ?')){
            this.props.history.push('/');
        }

    }

    handleButtonClick = (e) => {
        switch(e.target.id){
            case 'next-button':
                this.handleNextButtonClick();
                break;

            case 'previous-button':
                this.handlePreviousButtonClick();
                break;

            case 'quit-button':
            this.handleQuitButtonClick();
            break;
            default:
                break;
        }
        this.playButtonSound();
    };

    playButtonSound = () =>{
        setTimeout(() => {
            document.getElementById('button-sound').play();
        }, 0);
    };
    

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions();
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        }), () => {
            this.displayQuestions();
        });
    }

    showOptons = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(options =>{
            options.style.visibility = 'visible';
        });
    }

    handleHints = () =>{
        if (this.state.hints > 0){
            const options = Array.from(document.querySelectorAll('.option'));
            let indexofAnswer;
            
            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                indexofAnswer = index;
            }
        });
        while (true){
            const randomNumber = Math.round(Math.random() * 3);
            if (randomNumber !== indexofAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                options.forEach((option,index) => {
                    if(index === randomNumber){
                        option.style.visibility = 'hidden';

                        this.setState((prevState) => ({
                            hints: prevState.hints - 1,
                            previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                        }));

                    }

                  
                });
                break;
            }
            if(this.state.previousRandomNumbers.length >= 3) break;
        }
        }
        
    }

    handleFiftyFifty = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty == false){
            const options = document.querySelectorAll('.option');
            const randomNumbers = []
            let indexofAnswer;
            options.forEach((option, index) =>{
                if (option.innerHTML.toLowerCase() === this.state.toLowerCase()){
                    indexofAnswer = index;
                }
            });
            let count = 0;
            do{
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexofAnswer){
                    if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexofAnswer)){
                        randomNumbers.push(randomNumber);
                        count ++;
                    }else{
                        while (true){
                            const newrandomNumber = Math.round(Math.random() * 3);

                            if(!randomNumbers.includes(newrandomNumber) && !randomNumbers.includes(indexofAnswer)){
                                randomNumbers.push(newrandomNumber);
                                count ++;
                                break;
                            }
                        }
                    }
                }
            } while (count < 2);
            options.forEach((options, index =>{
                if(randomNumbers.includes(index)){
                    option.style.visibility = 'hidden';
                }
            }));
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty -1,
                usedFifty: true
            }));
        }
    }

    render() {
        const { currentQuestion, currentQuestionIndex,fiftyFifty, hints, numberOfQuestions } = this.state;
        return (
            <Fragment>
                <Helmet>
                    <title>Quiz Page</title>
                </Helmet>
                <Fragment>
                        <audio id="correct-sound" src={correctNotification}></audio>
                        <audio id="wrong-sound" src={wrongNotification}></audio>
                        <audio id="button-sound" src={buttonSound}></audio>
                    </Fragment>
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div className="lifeline-container">
                        <p>
                            <span onClick={this.handleFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon">
                            <span className="lifeline">{fiftyFifty}</span>
                            </span>
                        </p>
                        <p>
                        <span onClick={this.handleHints} className=" mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                            <span className="lifeline">{hints}</span>
                        </span>
                        </p>
                    </div>

                    <div>
                        <p>
                            <span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                            <span className="right">2:15<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                        </p>
                    </div>

                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>

                    <div className="button-container">
                        <button id="previous-button" onClick={this.handleButtonClick}>Previous</button>
                        <button id="next-button" onClick={this.handleButtonClick}>Next</button>
                        <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Play;
