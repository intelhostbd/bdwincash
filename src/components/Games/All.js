import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../styles/games.css';
import useApi from '../Inc/Api';
import Game from './Game';
import Slider from "react-slick";

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

    const options = {
        className: "slider variable-width",
        dots: false,
        centerMode: true,
        slidesToScroll: 1,
        variableWidth: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 2000,
        arrows: false,
    };

    const options2 = {
        className: "slider variable-width",
        dots: false,
        centerMode: true,
        slidesToScroll: 1,
        variableWidth: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 2500,
        arrows: false,
    };

    var imageOf = new Map();
    imageOf.set('headtail', '/assets/headtail.png');
    imageOf.set('evenodd', '/assets/game/evenodd.png');
    imageOf.set('kings', '/assets/game/kings.gif');
    imageOf.set('ludo', '/assets/game/ludo.png');


    return (
        <>


            <Slider {...options}>
                {
                    games.map((game, idx) => {
                        return settings.some(setting => setting.game_name == game && setting.status)
                            ? <Game key={idx} img={imageOf.get(game)} link={`/${game}`} />
                            : '';
                    })
                }
            </Slider>

            <Slider {...options2}>
                {
                    games.reverse().map((game, idx) => {
                        return settings.some(setting => setting.game_name == game && setting.status)
                            ? <Game key={idx} img={imageOf.get(game)} link={`/${game}`} />
                            : '';
                    })
                }
            </Slider>

            <Slider {...options}>
                {
                    games.map((game, idx) => {
                        return settings.some(setting => setting.game_name == game && setting.status)
                            ? <Game key={idx} img={imageOf.get(game)} link={`/${game}`} />
                            : '';
                    })
                }
            </Slider>

            <Slider {...options2}>
                {
                    games.reverse().map((game, idx) => {
                        return settings.some(setting => setting.game_name == game && setting.status)
                            ? <Game key={idx} img={imageOf.get(game)} link={`/${game}`} />
                            : '';
                    })
                }
            </Slider>

            <Slider {...options}>
                {
                    games.map((game, idx) => {
                        return settings.some(setting => setting.game_name == game && setting.status)
                            ? <Game key={idx} img={imageOf.get(game)} link={`/${game}`} />
                            : '';
                    })
                }
            </Slider>

        </>
    )
}