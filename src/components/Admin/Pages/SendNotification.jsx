import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useApi from '../../Inc/Api';

export default function SendNotification() {

    const [columns, setColumns] = useState([
        {
            title: 'Selected', field: 'selected', render: row => {
                return <input onChange={toggleUserId} value={row.id} type="checkbox" />
            }
        },
        { title: 'id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Username', field: 'username' },
        { title: 'Phone', field: 'phone' },
        { title: 'Email', field: 'email' },
        { title: 'Balance', field: 'balance' }
    ]);
    const [data, setData] = useState([]);
    const [api] = useApi();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        axios.post(`${api}/get-users`)
            .then(res => {
                setData(res.data.users);
                setIsLoading(false);
            });
    }

    const [notification, setNotification] = useState({
        subject: "",
        message: "",
        receiver: "all",
        user_ids: []
    });

    const handleChange = e => {
        setNotification({
            ...notification,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log(notification.user_ids);

        axios.post(`${api}/notification`, {
            subject: notification.subject,
            message: notification.message,
            user_ids: notification.user_ids,
            receiver: notification.receiver,
        })
            .then(res => {
                console.log(res);
                handleSuccessError(res);
            });
    }

    const toggleUserId = e => {

        const index = notification.user_ids.indexOf(e.target.value);
        if (index > -1) {
            notification.user_ids.splice(index, 1);
        } else {
            notification.user_ids.push(e.target.value);
        }
    }

    const handleSuccessError = res => {
        if (res.data.success) {
            Swal.fire({
                text: res.data.success,
                icon: 'success',
            });
        }
        if (res.data.error) {
            Swal.fire({
                text: res.data.error,
                icon: 'error',
            });
        }
    }

    useEffect(() => {
        if (notification.receiver == 'indivisual') {
            fetchData();
        }
    }, [notification.receiver]);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Send notification
                </div>
                <div className="card-body">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Subject</label>
                                <input required name="subject" onChange={handleChange} value={notification.subject} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea required name="message" onChange={handleChange} defaultValue={notification.message} className="form-control" rows="5"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Receiver: </label>
                                <select required name="receiver" defaultValue={notification.receiver} onChange={handleChange} name="receiver" className="form-control">
                                    <option value="all">Everyone</option>
                                    <option value="indivisual">Indivisual</option>
                                </select>
                            </div>
                            {
                                (notification.receiver == 'indivisual') ?
                                    <MaterialTable
                                        title=""
                                        columns={columns}
                                        data={data}
                                        isLoading={isLoading}
                                    />
                                    : ''
                            }

                            <button className="btn btn-success mt-3">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
