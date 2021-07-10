import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';
import axios from 'axios';
import useApi from '../Inc/Api';
import useUser from '../Auth/useUser';

export default function EvenOddHistory() {
    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'Amount', field: 'amount' },
        { title: 'Rate', field: 'rate' },
        { title: 'Possible Return', field: 'possible_return' },
        { title: 'On', field: 'on' },
        { title: 'Status', field: 'status' },
        { title: 'Date', field: 'date' },
    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [user, setUser] = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (Auth()) {
            const url = `${api}/get-evenOdds`;
            axios.post(url, {
                user_id: user.id
            })
                .then(res => {
                    setData(res.data.evenOdds);
                    setIsLoading(false);
                });
        }

    }, [])

    if (!Auth()) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className="row justify-content-center mx-1 my-3">
            <div className="col-md-6 shadow-sm">
                <h3 className="text-center">Even-Odd Statement</h3>
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
