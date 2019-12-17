  import React, { Component } from "react";
import { randomWord } from "./words";

  import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Hangman extends Component {
	static defaultProps = {
		maxWrong: 6,
		images: [step0, step1, step2, step3, step4, step5, step6]
	};

	constructor(props) {
		super(props);
		this.state = { mistake: 0, guessed: new Set(), answer: randomWord() };
		this.handleGuess = this.handleGuess.bind(this);
	}

	guessedWord() {
		return this.state.answer.split("").map(bingo => (this.state.guessed.has(bingo) ? bingo : "_"));
	}

	handleGuess(evt) {
		let letter = evt.target.value;

		// Generate Errors to test Raygun Crash Reporting
		// if ('raygun'.indexOf(letter) > -1)
		// {
		// 	alert("Boom! You've found an error - check it out in Raygun.");
		// 	this.generateError(letter);
		// }


		this.setState(st => ({
			guessed: st.guessed.add(letter),
			mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
		}));
	}

	generateError(letter) {
		switch(letter) {
			case 'r':
				throw new Error("Error with the letter " + letter);
				break;
			case 'a':
				this.handleGuess();
				break;
			case 'y':
				var foo = undefined;
				foo();
				break;
			case 'g':
				var someVal = null;
				console.log(someVal.foo);
				break;
			case 'u':
				var xhr = new XMLHttpRequest();
				xhr.setRequestHeader('Some-Header', 'val');
				break;
			case 'n':
				var x = document.getElementByID('foo');
				break;
		}
	}


	generateButtons() {
		return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
			<button
				key={letter}
				value={letter}
				onClick={this.handleGuess}
				disabled={this.state.guessed.has(letter)}
			>
				{letter}
			</button>
		));
	}

	resetButton = () => {
		this.setState({
			mistake: 0,
			guessed: new Set(),
			answer: randomWord()
		});
	};

	render() {
		const gameOver = this.state.mistake >= this.props.maxWrong;
		const altText = `${this.state.mistake}/${this.props.maxWrong} wrong guesses`;
		const isWinner = this.guessedWord().join("") === this.state.answer;
		let gameStat = this.generateButtons();
		if (isWinner) {
			gameStat = "YOU WON";
		}
		if (gameOver) {
			gameStat = "YOU LOST";
		}

		return (


            <div className='Hangman'>
                <nav className='navbar navbar-expand-lg'>
					<a className='navbar-brand text-light' href='/'>
						<h1 className='text-light'>Welcome to Raygun's sample app!</h1>
						<small>Look for errors in the site. HINT: "Raygun"</small>
					</a>
					<span className='d-xl-none d-lg-none text-primary'>
						Guessed wrong: {this.state.mistake}
					</span>
					<button
						className='navbar-toggler sr-only'
						type='button'
						data-toggle='collapse'
						data-target='#navbarText'
						aria-controls='navbarText'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarText'>
						<ul className='navbar-nav mr-auto'>
							<li className='nav-item '></li>
							<li className='nav-item'></li>
							<li className='nav-item'></li>
						</ul>
						<span className='navbar-text text-primary'>Guessed wrong: {this.state.mistake}</span>
					</div>
				</nav>
				<p className='text-center'>
					<img src={this.props.images[this.state.mistake]} alt={altText} />
				</p>
				<p className='text-center text-light'>Guess the Programming Language ?</p>
				<p className='Hangman-word text-center'>
					{!gameOver ? this.guessedWord() : this.state.answer}{" "}
				</p>

				<h1 className='text-center text-warning mt-4'>{gameStat}</h1>

				<div>
					<p className='text-center'>
						<button className='Hangman-reset' onClick={this.resetButton}>
							Reset
						</button>
					</p>
				</div>
                <img src='images/right-sandhill.png'/>
            </div>
    );
	}
}

export default Hangman;
