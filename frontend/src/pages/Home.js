import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import melodyverse from '../assets/images/concert-5471823_1280.jpg';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${melodyverse})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden'
        }}>
            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
                zIndex: 1
            }}></div>

            <h1 style={{
                color: 'white',
                fontSize: '80px',
                padding: '5px',
                margin: 'auto',
                zIndex: 2,
                animation: 'fadeIn 2s'
            }}>MelodyVerse</h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: 'pink',
                borderWidth: '5px',
                borderStyle: 'solid',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
                zIndex: 2,
                animation: 'slideIn 1.5s ease-out'
            }}>
                <h1 style={{
                    padding: '5px',
                    marginBottom: '20px'
                }}>Welcome {loggedInUser}</h1>
                
                <button onClick={handleLogout} style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(45deg, #ff6b6b, #f06595)',
                    border: 'none',
                    borderRadius: '30px',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.5)'
                }} 
                onMouseOver={(e) => e.target.style.background = 'linear-gradient(45deg, #f06595, #ff6b6b)'}
                onMouseOut={(e) => e.target.style.background = 'linear-gradient(45deg, #ff6b6b, #f06595)'}>
                    Logout
                </button>
            </div>

            <ToastContainer />

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default Home;
