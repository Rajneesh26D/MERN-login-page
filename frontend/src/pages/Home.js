import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils'; // Utility function to show success messages
import { ToastContainer } from 'react-toastify'; // Toast notifications
import melodyverse from '../assets/images/concert-5471823_1280.jpg'; // Background image for the home page
import './Home.css'; // Import CSS for styling

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(''); // State to store the currently logged-in user
    const navigate = useNavigate(); // Hook for navigating between routes

    // Retrieve the logged-in user from localStorage when the component mounts
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    // Handle the logout process
    const handleLogout = (e) => {
        // Remove the token and logged-in user info from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out'); // Show success message
        // Redirect to the login page after a short delay
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <div
            className="home-container" // Container for the home page
            style={{
                backgroundImage: `url(${melodyverse})`, // Set background image
            }}
        >
            <div className="gradient-overlay"></div> {/* Overlay for visual effect */}

            <h1 className="home-title">MelodyVerse</h1> {/* Title of the application */}

            <div className="welcome-box"> {/* Box to display welcome message and logout button */}
                <h1 className="welcome-message">Welcome {loggedInUser}</h1> {/* Display logged-in user */}

                <button
                    className="logout-button"
                    onClick={handleLogout} // Call logout function when button is clicked
                >
                    Logout
                </button>
            </div>

            <ToastContainer /> {/* Toast container to display notifications */}
        </div>
    );
}

export default Home;
