import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useApi from '../../Inc/Api';

export default function Notice() {

    const [api] = useApi();
    const [text, setText] = useState('');

    useEffect(() => {
        axios.post(`${api}/get-notice`)
            .then(res => {
                setText(res.data.notice.text);
            });
    }, []);

    const saveNotice = (e) => {
        e.preventDefault();

        axios.put(`${api}/notice/1`, {
            text: text,
        })
            .then(res => {
                if (res.data.success) {
                    Swal.fire({
                        text: res.data.success,
                        icon: 'success',
                    });
                }
            });
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <b>Notice:</b>
                </div>
                <div className="card-body">
                    <div className="row">
                        <textarea onChange={e => setText(e.target.value)} defaultValue={text} name="text" rows="10" className="form-control w-100">
                        </textarea>
                    </div>
                    <div className="row mt-2">
                        <button onClick={saveNotice} className="btn btn-success">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}
