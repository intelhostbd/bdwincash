import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../styles/games.css';
import useApi from '../Inc/Api';
import Game from './Game';


export default function All() {

    const [api, setApi] = useApi();
    const [settings, setSettings] = useState([]);
    const fetchData = () => {
        axios.post(`${api}/get-game-settings`)
            .then(res => {
                setSettings(res.data.data);
            });
    }
    const [games, setGames] = useState([
        'headtail',
        'evenodd',
        'kings',
        'ludo',
    ]);

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="games" style={{ marginTop: "-10px" }}>
                {
                    games.map((game, idx) => {
                        return settings.some(setting => setting.game_name == game && setting.status)
                            ? <Game key={idx} img={`/assets/${game}.png`} link={`/${game}`} />
                            : '';
                    })
                }
            </div>
        </>
    )
}