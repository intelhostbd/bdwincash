import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useApi from '../../Inc/Api';
import axios from 'axios';
import { Delete, Edit, Person } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { ButtonGroup } from '@material-ui/core';
import useUser from '../../Auth/useUser';

export default function Users() {

    const [user] = useUser();
    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Username', field: 'username' },
        { title: 'Phone', field: 'phone' },
        { title: 'Email', field: 'email' },
        {
            title: 'Balance', field: 'balance', render: row => {
                return user.id == 2 ? '' : row.balance
            }
        },
        // { title: 'Club', field: 'club' },
        { title: 'Joined at', field: 'joinded_at' },
        {
            title: 'Actions', field: 'is_admin', render: row => {
                if (row.id != 1 && user.id != 2)
                    return <ButtonGroup>
                        <Link to={"/admin/user/edit?user_id=" + row.id} className="btn btn-success btn-sm" >
                            <Edit />
                        </Link >
                        <button onClick={() => deleteUser(row.id)} className="btn btn-danger btn-sm">
                            <Delete />
                        </button>
                        <button onClick={() => loginToUser(row.id)} className="btn btn-warning btn-sm">
                            <Person />
                        </button>
                        <button onClick={() => toggleActive(row.id)} className={row.is_active ? "btn btn-info" : "btn btn-secondary"}>
                            {row.is_active ? 'Active' : 'Inactive'}
                        </button>
                    </ButtonGroup>
            }
        },
    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const toggleAdminRole = (id) => {
        console.log(id);
    }

    const loginToUser = id => {
        axios.post(`${api}/get-user`, {
            user_id: id,
        })
            .then(res => {
                window.sessionStorage.setItem("user", JSON.stringify(res.data.user));

                history.push('/');
                window.location.reload();
            });
    }

    const toggleActive = id => {
        setIsLoading(true);
        axios.post(`${api}/toggle-user`, {
            user_id: id
        })
            .then(res => {
                handleSuccessError(res);
                setData(res.data.users);
                setIsLoading(false);
            });
    }

    const deleteUser = id => {
        Swal.fire({
            title: "Are you sure to delete the user?",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
        })
            .then(res => {
                if (res.isConfirmed) {
                    setIsLoading(true);
                    axios.delete(`${api}/user/${id}`)
                        .then(response => {
                            handleSuccessError(response);
                            fetchData();
                        });
                }
            });
    }

    const fetchData = () => {
        axios.post(`${api}/get-users`)
            .then(res => {
                setData(res.data.users);
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


    return (
        <div className="card ">
            <div className="card-body">
                <h3 className="text-center">Users</h3>
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
