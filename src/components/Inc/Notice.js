import React, { useState, useEffect } from 'react';
import '../../styles/Notice.css';
import useApi from '../Inc/Api';
import axios from 'axios';

export default function Notice() {

    const [text, setText] = useState('');
    const [api] = useApi();

    useEffect(() => {
        axios.post(`${api}/get-notice`)
            .then(res => {
                setText(res.data.notice.text);
            });
    }, []);

    return (
        <>
            <marquee className="text-notice">
                {text}
            </marquee>
        </>
    )
}
