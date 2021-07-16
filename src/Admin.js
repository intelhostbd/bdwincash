import React, { Suspense } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import AdminRoutePage from './components/Inc/AdminRoutePage';
import Nav from './components/Admin/Nav';
import Footer from './components/Admin/Footer';
import Sidebar from './components/Admin/Sidebar';


const Loading = () => {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '60px',
        position: 'absolute',
        zIndex: '9999',
        left: '0',
        right: '0',
        margin: '100px',
    }}>
        <div className="spinner-border p-2 m-auto bg-transparent text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>;
}

export default function Admin() {

    return (

        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <div className="wrapper">
                    <Nav />
                    <Sidebar />
                    <div className="content-wrapper">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col mt-3">
                                        <AdminRoutePage />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Suspense>
        </BrowserRouter>
    )
}
