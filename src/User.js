import React, { Suspense } from 'react';
import Header from './components/Inc/Header';
import RoutePage from './components/Inc/RoutePage';
import Footer from './components/Inc/Footer';
import { BrowserRouter } from 'react-router-dom';


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


export default function User() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Header />
                <RoutePage />
                <Footer />
            </Suspense>
        </BrowserRouter>
    )
}
