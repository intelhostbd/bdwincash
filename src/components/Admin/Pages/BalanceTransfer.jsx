import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import useApi from '../../Inc/Api';
import useUser from '../../Auth/useUser';

export default function BalanceTransfer() {
    const columns = [
        { title: 'id', field: 'id' },
        { title: 'From', field: 'from' },
        { title: 'To', field: 'to' },
        { title: 'Amount', field: 'amount' },
        { title: 'Date', field: 'date' },

    ];
    const [data, setData] = useState([]);
    const [api] = useApi();
    const [user] = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.post(`${api}/get-balance-transfers`)
            .then(res => {
                setData(res.data.data);
                setIsLoading(false);
            });
    }, [])

    return (
        <>
            <div className="card">
                <div className="card-header">
                    Balance Transfer Statement
                </div>
                <div className="card-body">
                    <MaterialTable
                        title=""
                        columns={columns}
                        data={data}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </>
    )
}
