import React from 'react';
import { Link } from 'react-router-dom';

export default function Game({ img, link }) {
    return (
        <Link to={link} className="game">
            <img src={img} />
            <button>
                Play now
            </button>
        </Link>
    );
}
