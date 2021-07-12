import React from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import PageNotFound from '../Admin/PageNotFound';
import Withdraws from '../Admin/Pages/Withdraws';
import Deposits from '../Admin/Pages/Deposits';
import PaymentMethod from '../Admin/Pages/PaymentMethod';
import Users from '../Admin/Pages/Users';
import Settings from '../Admin/Pages/Settings';
import GamesHistory from '../Admin/Pages/GamesHistory';
import UserEdit from '../Admin/Pages/UserEdit';
import Notice from '../Admin/Pages/Notice';
import BalanceTransfer from '../Admin/Pages/BalanceTransfer';
import SendNotification from '../Admin/Pages/SendNotification';
import AllNotifications from '../Admin/Pages/AllNotifications';

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
            <Route path="/admin/game-settings" exact component={Settings}></Route>
            <Route path="/admin/game-history" exact component={GamesHistory}></Route>
            <Route path="/admin/notice" exact component={Notice}></Route>
            <Route path="/admin/user/edit" exact component={UserEdit}></Route>
            <Route path="/admin/balance-transfer" exact component={BalanceTransfer}></Route>
            <Route path="/admin/notification" exact component={SendNotification}></Route>
            <Route path="/admin/all-notification" exact component={AllNotifications}></Route>

            <Route component={PageNotFound}></Route>
        </Switch>
    );
}
