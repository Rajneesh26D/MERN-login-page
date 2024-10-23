import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import melodyverse from '../assets/images/concert-5471823_1280.jpg';
import login from '../assets/images/4957136.jpg';

function Login() {
  // State to keep track of login information (email and password)
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // State to remember user's choice of keeping login info
  const [rememberMe, setRememberMe] = useState(false);
  
  // State to handle form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to capture error messages if login fails
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // On component mount, check if there's a remembered email and preference for "Remember Me"
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPreference = localStorage.getItem("rememberMe") === "true";

    // If found, set the email in login info and check the Remember Me box
    if (rememberedEmail && rememberedPreference) {
      setLoginInfo((prev) => ({
        ...prev,
        email: rememberedEmail,
      }));
      setRememberMe(true);
    }
  }, []);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the changed input
    const copyLoginInfo = { ...loginInfo }; // Create a copy of current login info
    copyLoginInfo[name] = value; // Update the relevant field
    setLoginInfo(copyLoginInfo); // Set the updated login info
  };

  // Toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Switch between showing and hiding the password
  };

  // Handle the state of the Remember Me checkbox
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked); // Set the Remember Me state based on checkbox
  };

  // Handle the login process when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { email, password } = loginInfo; // Destructure email and password from state
    if (!email || !password) {
      return handleError("Email and password are required"); // Alert user if fields are empty
    }

    setIsSubmitting(true); // Indicate that submission is in progress

    try {
      const url = `http://localhost:8080/auth/login`; // URL for the login endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate that we are sending JSON
        },
        body: JSON.stringify(loginInfo), // Send login info as a JSON string
      });
      const result = await response.json(); // Parse the JSON response
      const { success, message, jwtToken, name, error } = result; // Destructure the result

      if (success) {
        // If login was successful, handle Remember Me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email); // Save the email
          localStorage.setItem("rememberMe", "true"); // Save preference
        } else {
          localStorage.removeItem("rememberedEmail"); // Remove saved email if not remembered
          localStorage.removeItem("rememberMe"); // Remove preference
        }

        handleSuccess(message); // Show success message
        localStorage.setItem("token", jwtToken); // Save JWT token
        localStorage.setItem("loggedInUser", name); // Save username
        setTimeout(() => {
          navigate("/home"); // Redirect to home after a short delay
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || message; // Get error details
        // Check for specific error messages and handle accordingly
        if (details.includes("Too many login attempts")) {
          setErrorMessage("Too many login attempts. Please try again later."); // User feedback
        } else {
          setErrorMessage(details); // Set the error message for display
        }
        handleError(details); // Show error message
      } else if (!success) {
        handleError(message); // Handle generic error messages
      }
    } catch (err) {
      handleError(err); // Handle network or server errors
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${melodyverse})`, // Set background image
        backgroundSize: "cover", // Cover the whole area
        backgroundPosition: "center", // Center the background image
        height: "100vh", // Full height of the viewport
        width: "100vw", // Full width of the viewport
        overflow: "hidden", // Hide any overflow
      }}
    >
      <div className="container" style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50vw', // Set width for the form container
        borderRadius: '10px 0 0 10px', // Rounded corners
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)', // Add shadow for depth
        margin: '0 0 0 150px' // Margin for spacing
      }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email
              <span style={{ color: "red" }}>*</span> {/* Required field indicator */}
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email" // Input for email
              placeholder="Enter your email..."
              value={loginInfo.email} // Controlled input
            />
          </div>
          <div>
            <label htmlFor="password">Password
              <span style={{ color: "red" }}>*</span> {/* Required field indicator */}
            </label>
            <div className="password-container">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"} // Toggle password visibility
                name="password" // Input for password
                placeholder="Enter your password..."
                value={loginInfo.password} // Controlled input
                className="password-input"
              />
              <span className="eye_icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon toggle */}
              </span>
            </div>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe} // Check if Remember Me is checked
              onChange={handleRememberMe} // Update state on change
            />
            <label htmlFor="rememberMe">Remember Me</label> {/* Checkbox label */}
          </div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} {/* Display error message */}
          <span>
            Forgot password? <Link to="/forgot-pass">Click here</Link> {/* Link to password recovery */}
          </span>
          <button type="submit" disabled={isSubmitting}> {/* Disable button while submitting */}
            {isSubmitting ? "Logging in..." : "Login"} {/* Button text changes based on state */}
          </button>
          <span>
            Don't have an account? <Link to="/signup">Signup</Link> {/* Link to sign up */}
          </span>
        </form>
        <ToastContainer /> {/* For displaying toast notifications */}
      </div>
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        width: '50vw' // Set width for the image container
      }}>
        <img src={login} alt="placeholder" style={{
          width: "71%", // Responsive image width
          height: "80%", // Responsive image height
          objectFit: "cover", // Cover the area without distortion
          objectPosition: "center", // Center the image
          borderRadius: '0 10px 10px 0' // Rounded corners on the image
        }} />
      </div>
    </div>
  );
}

export default Login;
