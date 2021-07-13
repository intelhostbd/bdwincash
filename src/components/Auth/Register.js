import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Swal from 'sweetalert2';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    const [api, setApi] = useApi();

    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        username: "",
        club_id: "",
        phone: "",
    });

    const validated = () => {
        if (!state.name ||
            !state.email ||
            !state.password ||
            !state.password_confirmation ||
            !state.username ||
            !state.phone
        ) {
            Swal.fire({
                title: 'All fields are required',
                icon: 'error',
            });
            return false;
        }

        if (state.password != state.password_confirmation) {
            Swal.fire({
                title: 'Passwords don\'t match.',
                icon: 'error',
            });
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validated()) {
            let url = `${api}/register`;
            axios.post(url, {
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    password_confirmation: state.password_confirmation,
                    // club_id: state.club_id,
                    phone: state.phone,
                    username: state.username
                })
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
                            window.localStorage.setItem("user", JSON.stringify(res.data.user));

                            history.push('home');
                            window.location.reload();
                        });
                    }
                });
        }
    }

    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }


    if (Auth()) {
        return <Redirect to = { '/home' }
        />
    }

    return ( <
        div style = {
            { background: "#182137" } } >
        <
        ImageSlider / >
        <
        Notice / >

        <
        Container component = "main"
        maxWidth = "xs" >
        <
        CssBaseline / >
        <
        div className = { classes.paper }
        style = {
            {
                border: "3px solid yellow",
                padding: "60px 30px",
                borderRadius: "4px"
            }
        } >
        <
        Avatar className = { classes.avatar } >
        <
        LockOutlinedIcon / >
        <
        /Avatar> <
        Typography style = {
            { color: "white" } }
        component = "h1"
        variant = "h5" >
        Sign up <
        /Typography> <
        form className = { classes.form }
        onSubmit = { handleSubmit } >
        <
        Grid container spacing = { 2 } >
        <
        Grid item xs = { 12 } >
        <
        input type = "text"
        className = "form-control"
        name = "name"
        required onChange = { handleInput }
        value = { state.name }
        placeholder = "Name: "
        autoFocus /
        >
        <
        /Grid> <
        Grid item xs = { 12 } >
        <
        input type = "text"
        className = "form-control"
        name = "username"
        required onChange = { handleInput }
        value = { state.username }
        placeholder = "Username: " /
        >
        <
        /Grid> <
        Grid item xs = { 12 } >
        <
        input type = "email"
        className = "form-control"
        name = "email"
        required onChange = { handleInput }
        value = { state.email }
        placeholder = "Email: " /
        >
        <
        /Grid> <
        Grid item xs = { 12 } >
        <
        input type = "text"
        className = "form-control"
        name = "phone"
        required onChange = { handleInput }
        value = { state.phone }
        placeholder = "Phone: " /
        >
        <
        /Grid> <
        Grid item xs = { 12 } >
        <
        input type = "text"
        className = "form-control"
        name = "password"
        required onChange = { handleInput }
        value = { state.password }
        placeholder = "Password: " /
        >
        <
        /Grid> <
        Grid item xs = { 12 } >
        <
        input type = "text"
        className = "form-control"
        name = "password_confirmation"
        required onChange = { handleInput }
        value = { state.password_confirmation }
        placeholder = "Confirm Password: " /
        >
        <
        /Grid> <
        /Grid> <
        button type = "submit"
        className = "btn btn-warning w-100 mt-4" >
        Sign Up <
        /button> <
        h6 className = "text-white mt-4 text-center" > Already have an account ? < /h6> <
        a type = "button"
        href = "/login"
        className = "btn btn-warning w-100 mt-1" >
        Sign In <
        /a> <
        /form> <
        /div> <
        /Container> <
        /div>
    );
}