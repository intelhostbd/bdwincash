import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import useApi from '../../Inc/Api';
import { DoneAll, Delete } from '@material-ui/icons';
import { ButtonGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Withdraws() {

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
                                <Delete />
                            </button>
                        </ButtonGroup>
                    </>;
                }

                return buttons;
            }
        },

    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        axios.post(`${api}/get-withdraws`)
            .then(res => {
                console.log(res.data.withdraws);
                setData(res.data.withdraws);
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
