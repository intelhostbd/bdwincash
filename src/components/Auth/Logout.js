import React from 'react';
import Swal from 'sweetalert2';

export default function Logout() {
    Swal.fire({
        text: 'Are you sure?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: `Back`,
        denyButtonText: `Logout`,
    }).then(result => {
        if (result.isConfirmed) {} else if (result.isDenied) {
            window.localStorage.removeItem('user');
            window.location.reload();
        }
    });
}