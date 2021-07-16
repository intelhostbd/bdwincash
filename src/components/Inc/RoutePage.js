import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLogin from '../Admin/Pages/AdminLogin';
const Register = lazy(() => import('../Auth/Register'));
const Home = lazy(() => import('../Pages/Home'));
const Deposit = lazy(() => import('../Statements/Deposit'));
const Withdraw = lazy(() => import('../Statements/Withdraw'));
const BalanceTransfer = lazy(() => import('../Statements/BalanceTransfer'));
const DepositForm = lazy(() => import('../Payments/DepositForm'));
const WithdrawForm = lazy(() => import('../Payments/WithdrawForm'));
const BalanceTransferForm = lazy(() => import('../Payments/BalanceTransferForm'));
const HeadTail = lazy(() => import('../Games/HeadTail'));
const HeadTailHistory = lazy(() => import('../Statements/HeadTailHistory'));
const EvenOdd = lazy(() => import('../Games/EvenOdd'));
const EvenOddHistory = lazy(() => import('../Statements/EvenOddHistory'));
const Kings = lazy(() => import('../Games/Kings'));
const KingsHistory = lazy(() => import('../Statements/KingsHistory'));
const Ludo = lazy(() => import('../Games/Ludo'));
const LudoHistory = lazy(() => import('../Statements/LudoHistory'));
const Notifications = lazy(() => import('../Statements/Notifications'));
const Login = lazy(() => import('../Auth/Login'));
const Profile = lazy(() => import('../Auth/Profile'));
const Loading = () => {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '60px',
        position: 'absolute',
        zIndex: '9999',
        left: '0',
        right: '0',
        margin: '100px',
    }}>
        <div className="spinner-border p-2 m-auto bg-transparent text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>;
}

const PageNotFound = () => {
    return <Redirect to="/home" />;
}

export default function RoutePage() {
    return (
        <>
            <Switch>
                <Route path="/admin-new-url" exact component={AdminLogin}></Route>


                <Suspense fallback={<Loading />}>

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
                    <Route path="/profile" exact component={Profile}></Route>
                    <Route path="/register" exact component={Register}></Route>

                    <Route component={PageNotFound}></Route>
                </Suspense>
            </Switch>
        </>
    )
}
