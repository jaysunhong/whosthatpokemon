import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonGenerator from './ButtonGenerator';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import pokeball from '../assets/static/pokeball.jpg';
import './Game.css';

class Game extends Component {
    state = {
        isLoaded: false,
        pokemon: [],
        error: null,
        userGuess: '',
        answerIsCorrect: false,
    }
    // function to generate a random number using parameters: min, max
    randomNumGenerator = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    fetchPokemon = () => {
        const genAll = this.randomNumGenerator(1, 807);
        // populate Pokemon using fetch and hitting the pokeapi API
        fetch(`https://pokeapi.co/api/v2/pokemon/${genAll}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    pokemon: result,
                    answerIsCorrect: false,
                });
            }, error => {                   // Note: it's important to handle errors here
                this.setState({             // instead of a catch() block so that we don't swallow
                    isLoaded: true,         // exceptions from actual bugs in components.
                    error,
                    answerIsCorrect: false,
                });
            });
    }
    handleInputChange = event => {
        this.setState({
            userGuess: event.target.value
        });
    }
    handleEnterKey = event => {
        const grabUserGuess = this.state.userGuess.toLowerCase().trim();
        if (event.key === 'Enter') {
            this.handleSubmit(grabUserGuess);
        }
    }
    handleSubmit = () => {
        const grabUserGuess = this.state.userGuess.toLowerCase().trim();

        this.guessCheck(grabUserGuess);
    }

    guessCheck = userGuess => {
        const grabPokemonName = this.state.pokemon.name.toLowerCase().trim();
        if (userGuess === grabPokemonName) {
            this.setState({
                answerIsCorrect: true,
                userGuess: '',
            });
            alert("Correct!");
        } else {
            this.setState({
                userGuess: ''
            });
            alert("Wrong. Guess again.");
        }
    }
    
    componentDidMount() {
        this.fetchPokemon();
    }

    render() {
        const { error, isLoaded, pokemon } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <CircularProgress />;
        } else {
            return (
                <React.Fragment>             
                    <Grid
                        container
                        direction="row"
                     >
                        <Grid item md={6} className='pokemonGuessGrid'>
                            <img className={this.state.answerIsCorrect ? 'pokemon' : 'pokemonHidden'} src={pokemon.sprites.front_default} alt={pokemon.sprites.front_default} />
                            <div className='inputs'>
                                <TextField
                                    id="outlined-name"
                                    label="Who's That Pokemon?"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleInputChange}
                                    onKeyDown={this.handleEnterKey}
                                    value={this.state.userGuess}
                                />
                                <Fab type='submit' onClick={this.handleSubmit} size="medium" color="secondary" aria-label="add">
                                    <img className='pokeball' src={pokeball} alt='pokeball.jpg'/>
                                </Fab>
                            </div>
                            <ButtonGenerator onClick={this.fetchPokemon} />
                        </Grid>
                        <Grid item md={6}/>
                    </Grid>   
                </React.Fragment>
            );
        }
    }
}

export default Game;