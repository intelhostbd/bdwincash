import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useApi from '../Inc/Api';
import { Link } from 'react-router-dom';

export default function Nav() {

    const [data, setData] = useState([]);
    const [api] = useApi();

    useEffect(() => {
        axios.post(`${api}/get-deposit-withdraw-notification`)
            .then(res => {
                setData(res.data);
            });
    }, []);

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="d-none" id="user-balance"></li>
                {/* Messages Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments" />
                        <span className="badge badge-danger navbar-badge" id="total-deposit-withdraw">
                            {data.withdraw_count + data.deposit_count}
                        </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className="dropdown-divider" />
                        <Link id="withdraw_count" to="/admin/withdraws" className="dropdown-item dropdown-footer">Withdraw Requests({data.withdraw_count})</Link>
                        <div className="dropdown-divider" />

                        <div className="dropdown-divider" />
                        <Link id="deposit_count" to="/admin/deposits" className="dropdown-item dropdown-footer">Deposit Requests({data.deposit_count})</Link>
                        <div className="dropdown-divider" />
                    </div>
                </li>
                {/* Notifications Dropdown Menu */}

            </ul>
        </nav>

    )
}
