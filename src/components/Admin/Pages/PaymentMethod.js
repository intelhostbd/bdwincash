import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useApi from '../../Inc/Api';
import axios from 'axios';
import { Delete } from '@material-ui/icons';
import { ButtonGroup } from 'react-bootstrap';

export default function PaymentMethod() {

    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Number', field: 'number' },
        {
            title: 'Actions', field: 'actions', render: row => {
                return <>
                    <ButtonGroup>
                        <button onClick={() => deletePaymentMethod(row.id)} className="btn btn-danger btn-sm">
                            <Delete />
                        </button>
                    </ButtonGroup>
                </>;
            }
        },
    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        number: "",
        name: "",
    });

    const deletePaymentMethod = id => {
        setIsLoading(true);
        axios.delete(`${api}/paymentMethod/${id}`)
            .then(res => {
                handleSuccessError(res);
                fetchData();
            });
    }

    const handleInputChange = (e) => {
        setNewPaymentMethod({
            ...newPaymentMethod,
            [e.target.name]: e.target.value,
        });
    }

    const fetchData = () => {
        axios.post(`${api}/get-payment-methods`)
            .then(res => {
                setData(res.data.paymentMethods);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleSuccessError = res => {
        if (res.data.success) {
            Swal.fire({
                text: res.data.success,
                icon: 'success',
            });
        }
        if (res.data.error) {
            Swal.fire({
                text: res.data.error,
                icon: 'error',
            });
        }
    }
    // ! TODO backend - save new payment 
    const saveNewPaymentMethod = () => {
        setIsLoading(true);

        axios.post(`${api}/paymentMethod`, {
            name: newPaymentMethod.name,
            number: newPaymentMethod.number,
        })
            .then(res => {
                handleSuccessError(res);
                setData([
                    ...data,
                    {
                        id: data.length + 1,
                        name: newPaymentMethod.name,
                        number: newPaymentMethod.number,
                    }
                ]);
                setIsLoading(false);
                setNewPaymentMethod({
                    number: "",
                    name: "",
                });
            });
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="text-center">Payment methods</h3>

                <div className="row">
                    <div className="col-6">
                        <input value={newPaymentMethod.number} onChange={handleInputChange} name="number" className="form-control" placeholder="Number" />
                    </div>

                    <div className="col-6">
                        <input value={newPaymentMethod.name} onChange={handleInputChange} name="name" className="form-control" placeholder="Method name" />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-md-4">
                        <button onClick={saveNewPaymentMethod} className="btn btn-success btn-xs">Save</button>
                    </div>
                </div>

                <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
