import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUser from '../../Auth/useUser';
import useApi from '../../Inc/Api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function UserEdit() {

    const query = useQuery();
    const [user, setUser] = useState([]);
    const user_id = query.get('user_id');
    const [api] = useApi();
    const [err, setErr] = useState('');
    const [admin] = useUser();

    useEffect(() => {
        axios.post(`${api}/get-user`, {
            user_id: user_id,
        })
            .then(res => {
                console.log(res);
                setUser(res.data.user);
            })
            .catch(err => {
                setErr('User not found');
            });
    }, []);

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`${api}/user/${user.id}`, {
            name: user.name,
            email: user.email,
            phone: user.phone,
            username: user.username,
            balance: user.balance,
            password: user.password,
        })
            .then(res => {
                if (res.data.error) {
                    Swal.fire({
                        title: res.data.error,
                        icon: 'error',
                    });
                }

                if (res.data.success) {
                    Swal.fire({
                        title: res.data.success,
                        icon: 'success',
                    });
                }
            });
    }


    if (admin.id == 2) {
        return <Redirect to="/admin" />
    }

    return (
        <>
            <div className="card">

                <div className="card-header">
                    <h5>Edit user: {user.id} </h5>
                    {
                        err
                            ? <div className="alert alert-danger">{err}</div>
                            : ''
                    }
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="form-group">
                            <b>Name</b>
                            <input required name="name" value={user.name} onChange={handleChange} type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <b>Username</b>
                            <input required name="username" value={user.username} onChange={handleChange} type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <b>Email</b>
                            <input required name="email" value={user.email} onChange={handleChange} type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <b>Phone</b>
                            <input required name="phone" value={user.phone} onChange={handleChange} type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <b>Balance</b>
                            <input required name="balance" value={user.balance} onChange={handleChange} type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <b>Password</b>
                            <input name="password" defaultValue="" onChange={handleChange} type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-success w-100">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
