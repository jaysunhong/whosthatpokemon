import React, { Component } from 'react'
import './Game.css';

class Game extends Component {
    state = {
        isLoaded: false,
        pokemon: [],
        error: null,
    }

    randomNumGenerator = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    componentDidMount() {
        const genAll = this.randomNumGenerator(1, 964);

        fetch(`https://pokeapi.co/api/v2/pokemon/${genAll}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    pokemon: result,
                });
            }, error => {                   // Note: it's important to handle errors here
                this.setState({             // instead of a catch() block so that we don't swallow
                    isLoaded: true,         // exceptions from actual bugs in components.
                    error
                });
            });
    }

    render() {
        const { error, isLoaded, pokemon } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <img className='pokemon' src={pokemon.sprites.front_default} alt={pokemon.sprites.front_default} />
            );
        }
    }
}

export default Game;