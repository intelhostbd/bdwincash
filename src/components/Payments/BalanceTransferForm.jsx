import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function BalanceTransferForm() {

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

        console.log(inputs);
    }

    return (
        <>
            <div className="row justify-content-center mx-3 my-5">
                <div className="col-md-6 shadow">
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
                            <Form.Control value={inputs.amount} onChange={handleChange} name="amount" placeholder="Enter amount:" required />
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
        </>
    )
}
