import React from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import PageNotFound from '../Admin/PageNotFound';
import Withdraws from '../Admin/Pages/Withdraws';
import Deposits from '../Admin/Pages/Deposits';
import PaymentMethod from '../Admin/Pages/PaymentMethod';
import Users from '../Admin/Pages/Users';
import GameSetting from '../Admin/Pages/GameSetting';
import GamesHistory from '../Admin/Pages/GamesHistory';

const RedirectToAdminPage = () => {
    return <Redirect to="/admin/" />
}

export default function AdminRoutePage() {
    return (
        <Switch>
            <Route path="/admin/" exact component={AdminDashboard}></Route>
            <Route path="/admin/dashboard" exact component={AdminDashboard}></Route>
            <Route path="/admin/withdraws" exact component={Withdraws}></Route>
            <Route path="/admin/deposits" exact component={Deposits}></Route>
            <Route path="/admin/payment-methods" exact component={PaymentMethod}></Route>
            <Route path="/admin/users" exact component={Users}></Route>
            <Route path="/admin/game-settings" exact component={GameSetting}></Route>
            <Route path="/admin/game-history" exact component={GamesHistory}></Route>
            <Route component={PageNotFound}></Route>
        </Switch>
    );
}
