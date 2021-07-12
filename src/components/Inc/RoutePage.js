import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Home from '../Pages/Home';
import Profile from '../Auth/Profile';
import Deposit from '../Statements/Deposit';
import Withdraw from '../Statements/Withdraw';
import BalanceTransfer from '../Statements/BalanceTransfer';
import DepositForm from '../Payments/DepositForm';
import WithdrawForm from '../Payments/WithdrawForm';
import BalanceTransferForm from '../Payments/BalanceTransferForm';
import HeadTail from '../Games/HeadTail';
import HeadTailHistory from '../Statements/HeadTailHistory';
import EvenOdd from '../Games/EvenOdd';
import EvenOddHistory from '../Statements/EvenOddHistory';
import Kings from '../Games/Kings';
import KingsHistory from '../Statements/KingsHistory';
import Ludo from '../Games/Ludo';
import LudoHistory from '../Statements/LudoHistory';
import AdminLogin from '../Admin/Pages/AdminLogin';
import Notifications from '../Statements/Notifications';

const PageNotFound = () => {
    return <Redirect to="/home" />;
}

export default function RoutePage() {
    return (
        <>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/home" exact component={Home}></Route>
                <Route path="/notifications" exact component={Notifications}></Route>
                <Route path="/deposit-statement" exact component={Deposit}></Route>
                <Route path="/withdraw-statement" exact component={Withdraw}></Route>
                <Route path="/balance-transfer-statement" exact component={BalanceTransfer}></Route>


                <Route path="/deposit" exact component={DepositForm}></Route>
                <Route path="/withdraw" exact component={WithdrawForm}></Route>
                <Route path="/balance-transfer" exact component={BalanceTransferForm}></Route>

                {/* games */}
                <Route path="/headtail" exact component={HeadTail}></Route>
                <Route path="/headtail-statement" exact component={HeadTailHistory}></Route>
                <Route path="/evenodd" exact component={EvenOdd}></Route>
                <Route path="/evenodd-statement" exact component={EvenOddHistory}></Route>
                <Route path="/kings" exact component={Kings}></Route>
                <Route path="/kings-statement" exact component={KingsHistory}></Route>
                <Route path="/ludo" exact component={Ludo}></Route>
                <Route path="/ludos-statement" exact component={LudoHistory}></Route>

                {/* auth */}
                <Route path="/login" exact component={Login}></Route>
                <Route path="/admin-new-url" exact component={AdminLogin}></Route>
                <Route path="/profile" exact component={Profile}></Route>
                <Route path="/register" exact component={Register}></Route>

                <Route component={PageNotFound}></Route>
            </Switch>
        </>
    )
}
