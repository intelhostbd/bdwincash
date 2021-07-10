import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import useApi from '../../Inc/Api';
import { DoneAll, Delete } from '@material-ui/icons';
import { ButtonGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function GameHistory() {
    const [selectedGame, setSelectedGame] = useState('headtail');
    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'Username', field: 'username' },
        { title: 'Game name', field: 'game_name', render: row => selectedGame },
        { title: 'On', field: 'on' },
        { title: 'Amount', field: 'amount' },
        { title: 'Rate', field: 'rate' },
        { title: 'Possible Return', field: 'possible_return' },
        { title: 'Dtatus', field: 'status' },
        { title: 'Date', field: 'date' },
    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        axios.post(`${api}/get-game-history`, {
            game_name: selectedGame,
        })
            .then(res => {
                console.log(res);
                setData(res.data.history);
                setIsLoading(false);
            });
    }

    useEffect(() => fetchData(), [selectedGame]);
    useEffect(() => fetchData(), []);

    const getGameHistory = e => {
        setIsLoading(true);
        setSelectedGame(e.target.value);
    }


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

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="text-center">
                    Game history for:

                    <div className="col-6 m-auto">
                        <select onChange={getGameHistory} defaultValue="headtail" className="form-control">
                            <option value="headtail">Head Tail</option>
                            <option value="evenodd">Even odd</option>
                            <option value="kings">Kings</option>
                            <option value="ludo">Ludo</option>
                        </select>
                    </div>

                </h3>
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
