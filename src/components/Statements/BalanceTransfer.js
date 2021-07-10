import React from 'react';
import MaterialTable from 'material-table';

export default function BalanceTransfer() {
    const columns = [
        { title: 'Date', field: 'date' }
    ];
    const data = [
        { date: '123' }
    ];
    return (
        <div className="row justify-content-center mx-1 my-3">
            <div className="col-md-6 shadow-sm">
                <h3 className="text-center">Balance Transfer Statement</h3>
                <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}
