import React, { useState, useEffect } from 'react';
import useApi from '../Inc/Api';
import axios from 'axios';

export default function AdminDashboard() {

    const [data, setData] = useState([]);
    const [api] = useApi();

    useEffect(() => {
        axios.post(`${api}/get-dashboard-details`)
            .then(res => {
                setData(res.data);
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
        </>
    )
}
