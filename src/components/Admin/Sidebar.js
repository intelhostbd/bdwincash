import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';

export default function Sidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/admin/" className="brand-link">
                <span className="brand-text font-weight-light">Admin Panel (WinCash)</span>
            </Link>


            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link to="/admin/" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Dashboard
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/withdraws" className="nav-link">
                                <i className="nav-icon far fa-money-bill-alt"></i>
                                <p>
                                    Withdraw Requests
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/deposits" className="nav-link">
                                <i className="nav-icon far fa-money-bill-alt"></i>
                                <p>
                                    Deposit Requests
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/payment-methods" className="nav-link">
                                <i className="nav-icon fab fa-paypal"></i>
                                <p>
                                    Payment Methods
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/users" className="nav-link">
                                <i className="nav-icon fas fa-user"></i>
                                <p>
                                    Users
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/game-settings" className="nav-link">
                                <i className="nav-icon fas fa-cogs"></i>
                                <p>
                                    Settings
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/game-history" className="nav-link">
                                <i className="nav-icon fas fa-gamepad"></i>
                                <p>
                                    Game history
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <i className="nav-icon"></i>
                            <p>
                                <Button onClick={Logout} variant="danger" type="button">Logout</Button>
                            </p>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>

    )
}
