import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import useApi from '../../Inc/Api';
import { DoneAll, Delete, Close } from '@material-ui/icons';
import { ButtonGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useUser from '../../Auth/useUser';

export default function Withdraws() {
    const [user] = useUser();
    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'Username', field: 'username' },
        { title: 'Number', field: 'number' },
        { title: 'Method', field: 'method' },
        { title: 'Amount', field: 'amount' },
        { title: 'Date', field: 'date' },
        { title: 'Status', field: 'statusText' },
        {
            title: 'Actions', field: 'actions', render: row => {
                var buttons = '';
                if (row.status != 1 && row.status != 0) {
                    buttons = <>
                        <ButtonGroup>
                            <button onClick={() => approve(row.id)} className="btn btn-success btn-sm">
                                <DoneAll />
                            </button>
                            <button onClick={() => reject(row.id)} className="btn btn-danger btn-sm">
                                <Close />
                            </button>
                            {
                                user.id == 2 ? ''
                                    : <button onClick={() => deleteWithdraw(row.id)} className="btn btn-danger btn-sm">
                                        <Delete />
                                    </button>

                            }
                        </ButtonGroup>
                    </>;
                }

                return buttons;
            }
        },

    ]);
    const [data, setData] = useState([]);
    const [api] = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState(0);

    const fetchData = () => {
        axios.post(`${api}/get-withdraws`)
            .then(res => {
                setData(res.data.withdraws);
                setIsLoading(false);
            });
        axios.post(`${api}/get-deposit-withdraw-notification`)
            .then(res => {
                setNotification(res.data);
            });
    }

    useEffect(() => {
        if (document.getElementById("total-deposit-withdraw"))
            document.getElementById("total-deposit-withdraw").innerHTML = (notification.withdraw_count + notification.deposit_count);

        if (document.getElementById("withdraw_count"))
            document.getElementById("withdraw_count").innerHTML = notification.withdraw_count;

        if (document.getElementById("deposit_count"))
            document.getElementById("deposit_count").innerHTML = notification.deposit_count;
    }, [notification]);

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

    const approve = id => {
        setIsLoading(true);
        axios.put(`${api}/withdraw/${id}`, {
            status: 1,
        })
            .then(res => {
                handleSuccessError(res);
                fetchData();
            });
    }
    const reject = id => {
        setIsLoading(true);
        axios.put(`${api}/withdraw/${id}`, {
            status: 0,
        })
            .then(res => {
                handleSuccessError(res);
                fetchData();
            });
    }
    const deleteWithdraw = id => {
        setIsLoading(true);
        Swal.fire({
            title: 'Are you sure to delete ?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: `Back`,
            denyButtonText: `Delete`,
        }).then(result => {

            if (result.isConfirmed) {
                setIsLoading(false);
            } else if (result.isDenied) {
                axios.delete(`${api}/withdraw/${id}`)
                    .then(res => {
                        handleSuccessError(res);
                        fetchData();
                    });
            }
        });
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="text-center">Withdraws</h3>
                <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
