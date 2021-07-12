import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ImageSlider from '../Inc/ImageSlider';
import Notice from '../Inc/Notice';
import useApi from '../Inc/Api';
import useUser from '../Auth/useUser';

export default function BalanceTransferForm() {

    const [api] = useApi();
    const [user] = useUser();

    const [inputs, setInputs] = useState({
        amount: "",
        to_username: "",
        password: ""
    });

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`${api}/balanceTransfer`, {
            from_user_username: user.username,
            to_user_username: inputs.to_username,
            password: inputs.password,
            amount: inputs.amount,
        })
            .then(res => {

                if (res.data.error) {
                    Swal.fire({
                        text: res.data.error,
                        icon: 'error',
                    });
                }
                if (res.data.success) {
                    Swal.fire({
                        text: res.data.success,
                        icon: 'success',
                    });

                    setInputs({
                        amount: "",
                        to_username: "",
                        password: ""
                    });
                }


                console.log(res)
            });
    }

    return (
        <div style={{ background: "#182137", color: "white", }}>
            <ImageSlider />
            <Notice />
            <div className="row justify-content-center mx-3 py-5">
                <div className="col-md-6 shadow" style={{
                    border: "2px solid yellow",
                    padding: "60px 30px",
                    borderRadius: "10px",
                }}>
                    <Form onSubmit={handleSubmit} className="py-3">
                        <h3 className="text-center pb-3">
                            User to user balance transfer
                        </h3>

                        <Form.Group >
                            <Form.Label>To username</Form.Label>
                            <Form.Control value={inputs.to_username} onChange={handleChange} name="to_username" placeholder="Username: " required />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control value={inputs.amount} onChange={handleChange} name="amount" placeholder="Enter amount:" required type="number" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={inputs.password} onChange={handleChange} name="password" type="password" placeholder="Password" required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
