import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';
import axios from 'axios';
import useApi from '../Inc/Api';
import useUser from '../Auth/useUser';

export default function Withdraw() {
    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'Number', field: 'number' },
        { title: 'Method', field: 'method' },
        { title: 'Amount', field: 'amount' },
        { title: 'Status', field: 'statusText' },
        { title: 'Date', field: 'date' },
    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [user, setUser] = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const url = `${api}/get-withdraws`;
        axios.post(url, {
            user_id: user.id
        })
            .then(res => {
                console.log(res.data.withdraws);
                setData(res.data.withdraws);
                setIsLoading(false);
            })

        return () => { }
    }, [])

    if (!Auth()) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className="row justify-content-center mx-1 my-3">
            <div className="col-md-6 shadow-sm">
                <h3 className="text-center">Withdraw Statement</h3>
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
