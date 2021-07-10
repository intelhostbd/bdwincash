import React, { useState } from 'react';
import { Table, Form, Button, ButtonGroup } from 'react-bootstrap';
import Logout from './Logout';
import Auth from './Auth';
import axios from 'axios';
import useApi from '../Inc/Api';
import Swal from 'sweetalert2';
import useUser from './useUser';

export default function ChangePassword() {

    const [api, setApi] = useApi();
    const [user, setUser] = useUser();

    const [passwords, setPasswords] = useState({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = e => {
        e.preventDefault();

        if (passwords.new_password != passwords.new_password_confirmation) {
            Swal.fire({
                title: "Passwords don\'t match",
                icon: "error",
            });
            return;
        }

        axios.post(`${api}/change-password`, {
            oldPassword: passwords.old_password,
            newPassword: passwords.new_password,
            user_id: user.id,
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
                    setPasswords({
                        old_password: "",
                        new_password: "",
                        new_password_confirmation: "",
                    });
                }
            });
    }

    const handleChange = e => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <div className="row justify-content-center my-5">
                <div className="col-md-4 px-4">
                    <Form onSubmit={handleSubmit}>

                        <Table striped bordered hover size="sm">
                            <tbody className="text-center">
                                <tr>
                                    <th>Old password: </th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={passwords.old_password} onChange={handleChange} name="old_password" required />
                                        </Form.Group>
                                    </th>
                                </tr>
                                <tr>
                                    <th>New password: </th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={passwords.new_password} onChange={handleChange} name="new_password" required />
                                        </Form.Group>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Confirm password: </th>
                                    <th>
                                        <Form.Group className="my-1">
                                            <Form.Control value={passwords.new_password_confirmation} onChange={handleChange} name="new_password_confirmation" required />
                                        </Form.Group>
                                    </th>
                                </tr>
                            </tbody>
                        </Table>

                        <div className="row justify-content-end px-4">
                            <ButtonGroup>
                                <Button variant="success" type="submit">Change password</Button>
                            </ButtonGroup>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
}
