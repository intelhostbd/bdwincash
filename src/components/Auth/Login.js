import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Auth from './Auth';
import { Redirect, useHistory } from 'react-router-dom';
import useApi from '../Inc/Api';
import ImageSlider from '../Inc/ImageSlider';
import Notice from '../Inc/Notice';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const axios = require('axios');
    const Swal = require('sweetalert2');
    const history = useHistory();
    const [api, setApi] = useApi();

    const classes = useStyles();
    const [state, setState] = React.useState({
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();

        let user = JSON.stringify({
            email: state.email,
            password: state.password,
        });
        let url = `${api}/login?email=${state.email}&password=${state.password}`;
        axios.get(url)
            .then(res => {
                if (res.data.error) {
                    Swal.fire({
                        title: res.data.error,
                        icon: 'error',
                    });
                }

                if (res.data.success) {
                    Swal.fire({
                        title: res.data.success,
                        icon: 'success',
                    }).then(() => {
                        window.sessionStorage.setItem("user", JSON.stringify(res.data.user));

                        history.push('/');
                        window.location.reload();
                    });
                }
            });
    }

    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    if (Auth()) {
        return <Redirect to={'/'} />
    }

    return (
        <div style={{ background: "#182137" }}>
            <ImageSlider />
            <Notice />

            <Container component="main" maxWidth="xs" className="pb-5">
                <CssBaseline />
                <div className={classes.paper} style={{
                    border: "2px solid yellow",
                    padding: "60px 30px",
                    borderRadius: "10px",
                }}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography style={{ color: "white" }} component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <input type="email"
                            name="email"
                            onChange={handleInput}
                            value={state.email}
                            placeholder="Email"
                            className="form-control"
                            autoFocus
                        />
                        <input type="password"
                            name="password"
                            onChange={handleInput}
                            value={state.password}
                            placeholder="Password"
                            className="form-control mt-3"
                        />
                        <button
                            type="submit"
                            className="btn btn-warning w-100 mt-3"
                        >
                            Sign In
                        </button>
                        <h6 className="text-white mt-4 text-center">Don't have an account?</h6>
                        <a type="button" href="/register" className="btn btn-warning w-100 mt-1">
                            Sign Up
                        </a>
                    </form>
                </div>
            </Container>

        </div>
    );
}
