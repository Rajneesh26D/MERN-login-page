import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // To display notifications for success and error
import { handleError, handleSuccess } from "../utils"; // Utility functions for handling errors and success
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for showing/hiding passwords
import melodyverse from "../assets/images/concert-5471823_1280.jpg"; // Background image

function ForgotPass() {
  // State to hold user input for email, new password, and confirmation of new password
  const [forgotPassInfo, setForgotPassInfo] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // State to manage visibility of the new password and confirmation password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  // Load remembered email and preference for "remember me" on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPreference = localStorage.getItem("rememberMe") === "true";

    // If the user has chosen to remember their email, set the email field with the remembered value
    if (rememberedEmail && rememberedPreference) {
      setForgotPassInfo((prev) => ({
        ...prev,
        email: rememberedEmail,
      }));
    }
  }, []);

  // Update state when any input field value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyForgotPassInfo = { ...forgotPassInfo };
    copyForgotPassInfo[name] = value;
    setForgotPassInfo(copyForgotPassInfo);
  };

  // Toggle visibility for the new password input field
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle visibility for the confirm password input field
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission for the forgot password process
  const handleForgotPass = async (e) => {
    e.preventDefault();
    const { email, newPassword, confirmNewPassword } = forgotPassInfo;

    // Basic validation for empty fields and matching passwords
    if (!email || !newPassword || !confirmNewPassword) {
      return handleError("Email and password are required");
    }

    if (newPassword !== confirmNewPassword) {
      return handleError("Passwords do not match");
    }

    try {
      const url = `http://localhost:8080/auth/forgot-pass`; // API endpoint for resetting the password
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: newPassword,
        }),
      });

      const result = await response.json();
      const { success, message, error } = result;

      // Handle response based on success or failure
      if (success) {
        handleSuccess(message); // Show success message
        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful password reset
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details); // Handle validation error details
      } else if (!success) {
        handleError(message); // Handle failure message
      }
    } catch (err) {
      handleError(err); // Handle any unexpected errors
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
        backgroundImage: `url(${melodyverse})`, // Background image styling
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{
        width: '40%', // Set width for the container
        padding: '20px 0 20px 20px'
      }}>
        <h1>Forgot Password?</h1>
        <form onSubmit={handleForgotPass} style={{
          width: '95%' // Set form width
        }}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={forgotPassInfo.email}
            />
          </div>
          <div>
            <label htmlFor="new-password">New Password</label>
            <div className="password-container">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"} // Toggle between showing password as text or masked
                name="newPassword"
                placeholder="Enter your password..."
                value={forgotPassInfo.newPassword}
                className="password-input"
              />
              <span className="eye_icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="new-password">Confirm Password</label>
            <div className="password-container">
              <input
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"} // Toggle between showing confirm password as text or masked
                name="confirmNewPassword"
                placeholder="Enter your password..."
                value={forgotPassInfo.confirmNewPassword}
                className="password-input"
              />
              <span
                className="eye_icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
              </span>
            </div>
          </div>
          <button type="submit">Submit</button>
          <span>
            Don't have an account? <Link to="/signup">Signup</Link> {/* Link to signup page */}
          </span>
        </form>
        <ToastContainer /> {/* Container for displaying toast notifications */}
      </div>
    </div>
  );
}

export default ForgotPass;
