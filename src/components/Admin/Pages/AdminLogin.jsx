import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import useApi from '../../Inc/Api';

function AdminLogin() {


    const [api] = useApi();
    const history = useHistory();
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

    return (
        <>
            <div className="row justify-content-center flex-column align-items-center py-5" style={{
                background: "rgb(164 255 219)",
                padding: "0",
                margin: "0",
            }}>
                <span className="text-info h4 text-center mb-4">Login to admin panel</span>

                <div className="col-md-8 " style={{
                    background: "#008c55",
                    border: "2px solid yellow",
                    padding: "30px",
                    margin: "0 20px",
                    color: "white",
                    borderRadius: "10px",
                    width: "90%",
                }}>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label >Email address:</label>
                            <input type="email"
                                name="email"
                                onChange={handleInput}
                                value={state.email}
                                placeholder="Email"
                                className="form-control"
                                autoFocus />
                        </div>
                        <div className="form-group">
                            <label >Password:</label>
                            <input type="password"
                                name="password"
                                onChange={handleInput}
                                value={state.password}
                                placeholder="Password"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-warning w-100 mt-3">Submit</button>
                    </form>

                </div>

            </div>
        </>
    )
}

export default AdminLogin;