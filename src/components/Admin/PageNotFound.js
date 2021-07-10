import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function PageNotFound() {
    return <Redirect to="/admin/" />
    //  <>
    //     <div className="row justify-content-center">
    //         <div className="col-4">
    //             <div className="alert alert-danger text-center">
    //                 <p> Page not found.</p>
    //                 <Link to="/admin/" className="text-info">Go to admin dashboard</Link>
    //             </div>
    //         </div>
    //     </div>
    // </Redirect>
}
