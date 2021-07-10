import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';
import axios from 'axios';
import useApi from '../Inc/Api';
import useUser from '../Auth/useUser';
import ImageSlider from '../Inc/ImageSlider';
import Notice from '../Inc/Notice';

export default function DepositForm() {

    const [inputs, setInputs] = useState({
        from_number: "",
        to_number: "",
        amount: "",
        from_method: "0",
        to_method: "0",
        transaction_number: "",
    });

    const [api, setApi] = useApi();
    const [user, setUser] = useUser();
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
        if (e.target.name == 'to_method') {
            setInputs({
                ...inputs,
                to_number: e.target.value,
                to_method: e.target.value
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (inputs.from_method == 0 || inputs.to_method == 0) {
            Swal.fire({
                title: "PLease select a valid payment method",
                icon: "warning"
            });
            return;
        }

        axios.post(`${api}/deposit`, {
            user_id: user.id,
            amount: inputs.amount,
            from_number: inputs.from_number,
            from_method: inputs.from_method,
            to_number: inputs.to_number,
            to_method: inputs.to_method,
            transaction_number: inputs.transaction_number,
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
                        <h3 className="text-center pb-3">
                            Request Deposit
                        </h3>


                        <Form.Group>
                            <Form.Label>From</Form.Label>
                            <InputGroup>
                                <FormControl value={inputs.from_number} onChange={handleChange} name="from_number" placeholder="Enter number:" required />
                                <Form.Control value={inputs.from_method} onChange={handleChange} name="from_method" as="select" required>
                                    {
                                        paymentMethods.map((method, idx) => {
                                            return <option key={idx} value={method.number}>{method.name}</option>
                                        })
                                    }
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>To</Form.Label>
                            <InputGroup>
                                <Form.Control value={inputs.to_number} placeholder="Enter number:" required disabled={true} />
                                <Form.Control value={inputs.to_method} onChange={handleChange} name="to_method" as="select" required>
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
                            <Form.Label>Transaction Number</Form.Label>
                            <Form.Control value={inputs.transaction_number} onChange={handleChange} name="transaction_number" placeholder="Enter transaction number:" required />
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
