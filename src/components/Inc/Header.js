import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory, Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import MenuIcon from '@material-ui/icons/Menu';
import { Dropdown } from 'react-bootstrap';

const useStyles = makeStyles({
    root: {
        width: 500,
    },
    navOption: {
        color: "white !important",
    }
});

export default function Header() {


    const classes = useStyles();
    const [value, setValue] = React.useState('recents');


    const history = useHistory();
    const handleRouteChange = (newRoute) => {
        setValue(newRoute);
        let allowedRoutes = [
            '/',
            'home',
            'profile',
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

/*
 <BottomNavigationAction key='balanceTransfer' className={classes.navOption} label="Balance Transfer" value="balance-transfer-statement" icon={<SwapVertIcon />} />,
*/


    var menus = [];
    var dropdown = '';

    if (Auth()) {

        dropdown = <Dropdown style={{ marginLeft: "8px", cursor: "pointer" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <MenuIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleRouteChange('deposit')}>
                    New Deposit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRouteChange('withdraw')}>
                    Withdraw
                </Dropdown.Item>
                {/*<Dropdown.Item onClick={() => handleRouteChange('balance-transfer')}>
                    Balance Transfer
                </Dropdown.Item>*/}
                <Dropdown.Item onClick={() => handleRouteChange('headtail-statement')}>
                    Head Tail Statement
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRouteChange('evenodd-statement')}>
                    Even Odd Statement
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRouteChange('kings-statement')}>
                    Kings Queen Statement
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleRouteChange('ludos-statement')}>
                    Ludo Statement
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;

        menus = [
            <BottomNavigationAction key='home' className={classes.navOption} label="Home" value="home" icon={<HomeIcon />} />,
            <BottomNavigationAction key='deposit' className={classes.navOption} label="Deposit" value="deposit-statement" icon={<MonetizationOnIcon />} />,
            <BottomNavigationAction key='withdraw' className={classes.navOption} label="Withdraw" value="withdraw-statement" icon={<AccountBalanceIcon />} />,
            <BottomNavigationAction key='profile' className={classes.navOption} label="Profile" value="profile" icon={<AccountCircleIcon />} />
        ];

    } else {

        menus = [
            <BottomNavigationAction key="1" className={classes.navOption} label="Home" value="home" icon={<HomeIcon />} />,
            <BottomNavigationAction key="2" className={classes.navOption} label="Login" value="login" icon={<PersonIcon />} />,
            <BottomNavigationAction key="3" className={classes.navOption} label="Register" value="register" icon={<LockOpenIcon />} />
        ];

    }

    return (
        <header>
            {/* className="sticky-top" */}
            <div className="row align-items-center justify-content-center" style={{
                background: "#01180f",
                width: "100%",
                color: "white",
                borderBottom: "1px solid white",
                padding: "10px 0",
                margin: "0",
            }}>

                {dropdown}


                <h4 className="text-center" style={{ width: "74%" }}>logo</h4>
            </div>
            <BottomNavigation style={{ background: "#01180f", width: "100%" }} value={value} onChange={handleChange} className={classes.root}>
                {
                    menus.map((menu, key) => menu)
                }
            </BottomNavigation>
        </header>
    );

}
