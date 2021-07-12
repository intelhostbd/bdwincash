import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useApi from '../../Inc/Api';
import { ButtonGroup } from 'react-bootstrap';

export default function GameSetting() {
    const [api, setApi] = useApi();
    const [settings, setSettings] = useState([]);

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

    const toggleGameStatus = (setting) => {
        axios.put(`${api}/gameSetting/${setting.id}`, {
            status: 'toggle',
        })
            .then(res => {
                handleSuccessError(res);
                fetchData();
            });
    }

    const fetchData = () => {
        axios.post(`${api}/get-game-settings`)
            .then(res => {
                setSettings(res.data.data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const saveSetting = (setting) => {
        axios.put(`${api}/gameSetting/${setting.id}`, {
            rate: document.getElementById(setting.game_name + "rate").value,
            min: document.getElementById(setting.game_name + "min").value,
            max: document.getElementById(setting.game_name + "max").value,
        })
            .then(res => {
                handleSuccessError(res);
                fetchData();
                console.log(res);
            });
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="text-center">Game settings</h3>


                {
                    settings.map((setting, idx) => {
                        return (
                            <div key={idx} className="mt-3">

                                <h6 className="pr-3 d-inline">{setting.game_name}:</h6>

                                <ButtonGroup >
                                    {
                                        setting.status
                                            ? <button onClick={() => toggleGameStatus(setting)} className="btn btn-info btn-sm">
                                                On
                                            </button>
                                            : <button onClick={() => toggleGameStatus(setting)} className="btn btn-secondary btn-sm">
                                                Off
                                            </button>
                                    }
                                    <input id={setting.game_name + "rate"} defaultValue={setting.rate} className="form-control ml-2" placeholder="Rate" />
                                    <input id={setting.game_name + "min"} defaultValue={setting.min} className="form-control" placeholder="Minimum: " />
                                    <input id={setting.game_name + "max"} defaultValue={setting.max} className="form-control" placeholder="Maximum: " />
                                    <button onClick={() => saveSetting(setting)} className="btn btn-success btn-sm">Save</button>
                                </ButtonGroup>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
