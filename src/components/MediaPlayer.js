import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import GoldSilverMedley from '../assets/audio/Gold-Silver_Medley.mp3';
import BattleLoreKeeper from '../assets/audio/Battle (Lorekeeper Zinnia).mp3';
import MainTheme from '../assets/audio/MainTheme.mp3';
import RedBlueMedley from '../assets/audio/Red-Blue-Medley.mp3';
import './MediaPlayer.css';

class MediaPlayer extends React.Component {
    state = {
        musicFiles: [],
    }

    componentDidMount = () => {
        this.setState({
            musicFiles: [GoldSilverMedley, BattleLoreKeeper, MainTheme, RedBlueMedley]
        });
    }

    generateRandomSong = (min, max) => {
        return this.state.musicFiles[Math.floor(Math.random() * (max - min + 1) + min)];
    }

    render() {
        return (
            <ReactAudioPlayer
                src={this.generateRandomSong(0, this.state.musicFiles.length-1)}
                autoPlay
                controls
                loop
                id='mediaplayer'
            />
        );
    }
}

export default MediaPlayer;