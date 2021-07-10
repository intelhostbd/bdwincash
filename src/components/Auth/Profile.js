import React, { useState } from 'react';
import { Table, Form, Button, ButtonGroup } from 'react-bootstrap';
import Logout from './Logout';
import Auth from './Auth';
import { Redirect } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import useUser from './useUser';
import axios from 'axios';
import useApi from '../Inc/Api';
import Swal from 'sweetalert2';


export default function Profile() {

    const [user, setUser] = useUser();
    const [api, setApi] = useApi();

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`${api}/user/${user.id}`, {
            name: user.name,
            email: user.email,
            phone: user.phone,
            username: user.username,
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
                    });
                    window.sessionStorage.setItem('user', JSON.stringify(res.data.user));
                }
            });
    }

    const handleChange = e => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
    }

    if (!Auth()) {
        return <Redirect to={'/home'} />
    }


    return (
        <>

            <div className="row justify-content-center mt-3">
                <div className="col">
                    <h3 className="text-center"> Profile</h3>
                </div>
            </div>
            <hr />



            <div className="row justify-content-center">
                <div className="col-md-4 px-4">
                    <Form onSubmit={handleSubmit}>

                        <Table striped bordered hover size="sm">
                            {/* <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Club</th>
                            </tr>
                        </thead> */}
                            <tbody className="text-center">
                                <tr>
                                    <th>Name</th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={user.name} onChange={handleChange} name="name" required />
                                        </Form.Group>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={user.email} onChange={handleChange} name="email" required />
                                        </Form.Group>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={user.username} onChange={handleChange} name="username" required />
                                        </Form.Group>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={user.phone} onChange={handleChange} name="phone" required />
                                        </Form.Group>
                                    </th>
                                </tr>
                                {/* <tr>
                                    <th>Club</th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={user.club_id} disabled required />
                                        </Form.Group>
                                    </th>
                                </tr> */}
                            </tbody>
                        </Table>

                        <div className="row justify-content-end px-4">
                            <ButtonGroup>
                                <Button onClick={Logout} variant="danger" type="button">Logout</Button>
                                <Button variant="success" type="submit">Save changes</Button>
                            </ButtonGroup>
                        </div>
                    </Form>
                </div>
            </div>

            <ChangePassword />
        </>
    )
}
