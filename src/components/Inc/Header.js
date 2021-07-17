import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import useUser from '../Auth/useUser';
import { AccountCircle, ArrowDownward, CardGiftcard, Close, CreditCard, ExitToApp, Lock, Notifications, People } from '@material-ui/icons';
import Menu from '@material-ui/icons/Menu';
import { useEffect } from 'react';
import axios from 'axios';
import useApi from './Api';
import Logout from '../Auth/Logout';

export default function Header() {

    const [value, setValue] = React.useState('recents');
    const [new_notification_count, set_new_notification_count] = React.useState(0);
    const [user] = useUser();
    const $ = require('jquery');
    const [api] = useApi();

    useEffect(() => {
        if (Auth()) {
            axios.post(`${api}/get-notification-count`, {
                user_id: user.id
            })
                .then(res => {
                    set_new_notification_count(res.data.notification_count);
                });

            $(document).click(e => {
                if (e.target.id == 'menu-container') {
                    $("#menus").hide('slow');
                    $("#menu1").removeClass('d-none');
                    $("#menu2").addClass('d-none');
                }
            });
        }
    }, []);


    const history = useHistory();
    const handleRouteChange = (newRoute) => {
        setValue(newRoute);
        let allowedRoutes = [
            '/',
            'home',
            'profile',
            'notifications',
            'deposit-statement',
            'withdraw-statement',
            'balance-transfer-statement',

            'deposit',
            'withdraw',
            'balance-transfer',

            'login',
            'register',

            'headtail-statement',
            'evenodd-statement',
            'kings-statement',
            'ludos-statement',
        ];
        if (allowedRoutes.includes(newRoute)) {
            history.push(newRoute);
        } else if (newRoute != 'logout') {
            history.push('404');
        }
    }

    const handleChange = (event, newValue) => {
        handleRouteChange(newValue);
    };

    const toggleMenu = e => {
        e.preventDefault();
        $("#menus").toggle('slow');
        $("#menu1").toggleClass('d-none');
        $("#menu2").toggleClass('d-none');
    }


    var menus = [];

    if (Auth()) {

        menus = [
            <span key="1" style={{ color: "white", cursor: "pointer" }} onClick={toggleMenu}>
                <Menu id="menu1" />
                <Close id="menu2" className="d-none" />
            </span>,
            <span key="2" style={{ color: "green" }} id="user-balance">
                ${user.balance}
            </span>,
            <Link key="3" to="/withdraw-statement" style={{ color: "green", }}>
                <CreditCard />
            </Link>,
            <Link key="4" to="/balance-transfer-statement" style={{ color: "green", }}>
                <CardGiftcard />
            </Link>,
            <Link key="5" to="/notifications" style={{ color: "green", }}>
                <Notifications />
                <sub className="text-danger">{new_notification_count}</sub>
            </Link>,

            <div className="dropdown" key="6" className="btn bg-white" style={{
                borderRadius: "50%",
                padding: "4px 6px",
                border: "2px solid black"
            }}>
                <People className="dropdown-toggle" id="profile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                <div className="dropdown-menu" aria-labelledby="profile">
                    <Link className="dropdown-item" to="/profile">
                        <AccountCircle /> Profile</Link>
                    <span className="dropdown-item" onClick={Logout}>
                        <ExitToApp /> Logout</span>
                </div>
            </div>


        ];

    } else {

        menus = [
            <div key="9">
                <Link key="7" to="/register" style={{ fontSize: "14px" }} className="btn border-warning px-3 text-white">
                    <People style={{ fontSize: "19px", paggingTop: "3px" }} />Signup
                </Link>
                <Link key="8" to="/login" style={{ fontSize: "14px" }} className="ml-2 btn border-warning px-3 text-white">
                    <Lock style={{ fontSize: "19px", paggingTop: "3px" }} />Signin
                </Link>
            </div>
        ];

    }

    return (

        <>

            <header>
                <div className="row align-items-center justify-content-center" style={{
                    background: "#01180f",
                    width: "100%",
                    borderBottom: "1px solid white",
                    padding: "3px 0",
                    margin: "0",
                    fontSize: "20px",
                    fontWeight: "bold",
                }}>
                    <Link to="/home" className="text-white">WinCash</Link>
                </div>

                <div style={{
                    background: "#01180f",
                    width: "100%",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: "20px",
                    padding: "6px 0"
                }}>
                    {
                        menus.map((menu, key) => menu)
                    }
                </div>

            </header>

            <div style={{
                position: "absolute",
                zIndex: "11",
                width: "100%",
            }} id="menu-container">
                <ul className="list-group menu-list" id="menus" style={{ display: "none" }}>
                    <li className="list-group-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/deposit">Deposit</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/withdraw">Withdraw</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/balance-transfer">Transfer</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/transfer" data-toggle="collapse" data-target="#statements">Statement <ArrowDownward /> </Link>
                        <ul className="list-group collapse hide" id="statements" >
                            <li className="list-group-item border-0">
                                <Link to="headtail-statement">
                                    Head Tail statement
                                </Link>
                            </li>
                            <li className="list-group-item border-0">
                                <Link to="evenodd-statement">
                                    Even Odd statement
                                </Link>
                            </li>
                            <li className="list-group-item border-0">
                                <Link to="kings-statement">
                                    Kings statement
                                </Link>
                            </li>
                            <li className="list-group-item border-0">
                                <Link to="ludos-statement">
                                    Ludo statement
                                </Link>
                            </li>
                            <li className="list-group-item border-0">
                                <Link to="deposit-statement">
                                    Deposit statement
                                </Link>
                            </li>
                            <li className="list-group-item border-0">
                                <Link to="withdraw-statement">
                                    Withdraw statement
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>

    );

}
