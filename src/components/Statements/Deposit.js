import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Auth from '../Auth/Auth';
import { Redirect } from 'react-router-dom';
import useApi from '../Inc/Api';
import useUser from '../Auth/useUser';
import axios from 'axios';

export default function Deposit() {
    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'From Number', field: 'from_number' },
        // { title: 'From Method', field: 'from_method' },
        { title: 'To Number', field: 'to_number' },
        { title: 'To Method', field: 'to_method' },
        { title: 'Amount', field: 'amount' },
        { title: 'Transaction Number', field: 'transaction_number' },
        { title: 'Status', field: 'statusText' },
        { title: 'Date', field: 'date' },
    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [user, setUser] = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = `${api}/get-deposits`;
        axios.post(url, {
            user_id: user.id
        })
            .then(res => {
                setData(res.data.deposits);
                setIsLoading(false);
            })

        return () => { }
    }, [])


    if (!Auth()) {
        return <Redirect to={'/login'} />
    }


    return (

        <div className="card m-3">
            <div className="card-header">
                Deposit Statement
            </div>
            <div className="card-body p-0 m-0">
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
