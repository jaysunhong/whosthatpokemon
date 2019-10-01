import React from 'react';
import Fab from '@material-ui/core/Fab';
import pokeball from '../assets/static/pokeball.jpg';
import './ButtonGenerator.css';

const ButtonGenerator = props => {
    return (
        <Fab variant="extended" color="primary" aria-label="add" onClick={props.onClick}>
            <img id='pokeball' src={pokeball} alt='pokeball.png'/>
            New Encounter
        </Fab>
    );
}

export default ButtonGenerator;