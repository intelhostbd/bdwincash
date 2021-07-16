import React, { useState, useEffect } from 'react';
import useApi from '../Inc/Api';
import axios from 'axios';
import { ButtonGroup } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import useUser from '../Auth/useUser';

export default function AdminDashboard() {

    const [data, setData] = useState([]);
    const [api] = useApi();
    const [username, setUsername] = useState('');
    const history = useHistory();
    const [user] = useUser();

    const handleChange = e => {
        setUsername(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        history.push('/admin/user/edit?user_id=' + username);
    }


    useEffect(() => {
        axios.post(`${api}/get-dashboard-details`)
            .then(res => {
                setData(res.data);
                console.log(res);
            });
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-info"><i className="fas fa-user" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Total users
                                    </span>
                                    <span className="info-box-number">
                                        {data.total_user}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-success"><i className="far fa-money-bill-alt" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Today Deposit
                                    </span>
                                    <span className="info-box-number">
                                        {data.today_deposit}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-warning"><i className="far fa-money-bill-alt" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Today Withdraw
                                    </span>
                                    <span className="info-box-number">
                                        {data.today_withdraw}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-info"><i className="far fa-money-bill-alt" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Total Deposit
                                    </span>
                                    <span className="info-box-number">
                                        {data.total_deposit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-success"><i className="far fa-money-bill-alt" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Total Withdraw
                                    </span>
                                    <span className="info-box-number">
                                        {data.total_withdraw}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                user.id == 2
                    ? ''
                    : <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group">
                                    <ButtonGroup>
                                        <input onChange={handleChange} value={username} type="text" className="form-control" placeholder="Username" />
                                        <button onClick={handleSubmit} className="btn btn-success btn-xs" type="submit">
                                            <Search />
                                        </button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}
