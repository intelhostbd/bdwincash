import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import useApi from '../../Inc/Api';
import useUser from '../../Auth/useUser';
import Auth from '../../Auth/Auth';

export default function Notifications() {


    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'To', field: 'to' },
        { title: 'Subject', field: 'subject' },
        { title: 'Message', field: 'message' },
        { title: 'Date', field: 'date' },
    ]);
    const [data, setData] = useState([]);
    const [api] = useApi();
    const [user] = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (Auth()) {
            axios.post(`${api}/get-notifications`)
                .then(res => {
                    setData(res.data.notifications);
                    setIsLoading(false);
                });
        }

    }, [])

    return (
        <>
            <div className="card m-3">
                <div className="card-header">
                    All Notifications
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
        </>
    )
}
