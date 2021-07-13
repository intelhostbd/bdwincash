import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from '../Auth/Auth';
import useApi from '../Inc/Api';
import useUser from '../Auth/useUser';
import ImageSlider from '../Inc/ImageSlider';
import Notice from '../Inc/Notice';

export default function WithdrawForm() {

    const [inputs, setInputs] = useState({
        number: "",
        amount: "",
        method: "0",
        password: ""
    });
    const [api] = useApi();
    const [user] = useUser();
    const [paymentMethods, setPaymentMethods] = useState([{
        name: 'Loading..',
        number: '00000',
    }]);

    useEffect(() => {
        axios.post(`${api}/get-payment-methods`)
            .then(res => {
                setPaymentMethods(res.data.paymentMethods);
                setInputs({
                    ...inputs,
                    to_number: paymentMethods[0].number,
                });
            });
    }, []);

    const handleChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (inputs.method == 0) {
            Swal.fire({
                title: "PLease select a valid payment method",
                icon: "warning"
            });
            return;
        }

        axios.post(`${api}/withdraw`, {
            user_id: user.id,
            amount: inputs.amount,
            number: inputs.number,
            method: inputs.method,
            password: inputs.password,
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
                    window.localStorage.setItem('user', JSON.stringify(res.data.user));
                }
            });

    }

    if (!Auth()) {
        return <Redirect to={'/login'} />
    }


    return (
        <div style={{ background: "#182137" }}>
            <ImageSlider />
            <Notice />

            <div className="row justify-content-center mx-3 py-5">
                <div className="col-md-6 shadow" style={{
                    border: "2px solid yellow",
                    padding: "60px 30px",
                    borderRadius: "10px",
                }}>
                    <Form onSubmit={handleSubmit} className="py-3 text-white">
                        <h3 className="text-center pb-3 text-white">
                            Request withdraw
                        </h3>
                        <Form.Group>
                            <Form.Label>To</Form.Label>
                            <InputGroup>
                                <FormControl value={inputs.number} onChange={handleChange} name="number" placeholder="Enter number:" autoFocus required />
                                <Form.Control value={inputs.method} onChange={handleChange} name="method" as="select" required>
                                    {
                                        paymentMethods.map((method, idx) => {
                                            return <option key={idx} value={method.number}>{method.name}</option>
                                        })
                                    }
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control value={inputs.amount} onChange={handleChange} name="amount" placeholder="Enter amount:" required />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={inputs.password} onChange={handleChange} name="password" type="password" placeholder="Password" required />
                        </Form.Group>

                        <button
                            type="submit"
                            className="btn btn-warning w-100 mt-2"
                        >
                            Submit
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
