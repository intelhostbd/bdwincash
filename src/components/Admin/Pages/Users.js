import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useApi from '../../Inc/Api';
import axios from 'axios';
import { ButtonGroup } from 'react-bootstrap';
import { Delete } from '@material-ui/icons';

export default function Users() {

    const [columns, setColumns] = useState([
        { title: 'id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Username', field: 'username' },
        { title: 'Phone', field: 'phone' },
        { title: 'Email', field: 'email' },
        { title: 'Balance', field: 'balance' },
        { title: 'Club', field: 'club' },
        { title: 'Joined at', field: 'joinded_at' },
        {
            title: 'Is Admin', field: 'is_admin', render: row => {
                if(row.id == 1) return <button disabled={true} className="btn btn-sm btn-info">
                      Admin
                     </button>;

                if(row.roles.includes('Admin')){
                     return <button onClick={()=>toggleAdminRole(row.id)} className="btn btn-sm btn-info">
                      Admin
                     </button>
                }
                return <button onClick={()=>toggleAdminRole(row.id)} className="btn btn-sm btn-success">
                      Normal
                     </button>
            }
        },
        // {
        //     title: 'Actions', field: 'actions', render: row => {
        //         return <>
        //             <ButtonGroup>
        //                 <button onClick={() => deleteUser(row.id)} className="btn btn-danger btn-sm">
        //                     <Delete />
        //                 </button>
        //             </ButtonGroup>
        //         </>;
        //     }
        // },
    ]);
    const [data, setData] = useState([]);
    const [api, setApi] = useApi();
    const [isLoading, setIsLoading] = useState(true);

    const toggleAdminRole = (id) => {
        console.log(id);
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
                console.table(res.data.users);
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
        <div className="card">
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
