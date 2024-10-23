import React, { useState } from "react"; // Import necessary modules from React
import { Link, useNavigate } from "react-router-dom"; // Import components for navigation
import { ToastContainer } from "react-toastify"; // For displaying toast notifications
import { handleError, handleSuccess } from "../utils"; // Utility functions for handling messages
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password visibility toggle
import { sendWelcomeEmail } from "../services/mockEmailService"; // Service to send welcome emails
import melodyverse from "../assets/images/concert-5471823_1280.jpg"; // Background image
import login from '../assets/images/4957136.jpg'; // Image for the right side of the form

function Signup() {
  // State to manage password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  // State to track whether terms and conditions have been accepted
  const [termsAccepted, setTermsAccepted] = useState(false);
  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to hold the user's signup information
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Get input name and value
    const copySignupInfo = { ...signupInfo }; // Create a copy of the current signup info
    copySignupInfo[name] = value; // Update the relevant field
    setSignupInfo(copySignupInfo); // Set the updated signup info
  };

  // Toggle the visibility of the password input
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Switch between showing and hiding the password
  };

  // Handle the state of the terms and conditions checkbox
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked); // Set terms acceptance based on checkbox
  };

  // Handle the signup process when the form is submitted
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { name, email, password } = signupInfo; // Destructure user input

    // Check if all required fields are filled
    if (!name || !email || !password) {
      return handleError("Please enter the required fields"); // Alert user if fields are empty
    }

    // Ensure the user has accepted the terms and conditions
    if (!termsAccepted) {
      return handleError("Please confirm the terms and conditions"); // Alert user to accept terms
    }

    try {
      setIsSubmitting(true); // Indicate that submission is in progress

      // 1. Signup API call
      const url = `http://localhost:8080/auth/signup`; // Endpoint for signup
      const response = await fetch(url, {
        method: "POST", // Set the HTTP method
        headers: {
          "Content-Type": "application/json", // Indicate that we are sending JSON
        },
        body: JSON.stringify(signupInfo), // Send signup info as a JSON string
      });

      const result = await response.json(); // Parse the JSON response
      const { success, message, error } = result; // Destructure the result

      if (success) {
        // 2. Send welcome email after successful signup
        try {
          const emailResult = await sendWelcomeEmail(name, email); // Send email
          if (emailResult.success) {
            handleSuccess("Account created successfully! Welcome email sent."); // Show success message
          }
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError); // Log email error
          // Don't block the signup process if email fails
          handleSuccess("Account created successfully! (Email notification failed)"); // Notify user
        }

        // 3. Navigate to login page after a short delay
        setTimeout(() => {
          navigate("/login"); // Redirect to the login page
        }, 1500); // Increased timeout to show email success message
      } else if (error) {
        const details = error?.details[0]?.message; // Extract error details
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
        <h1>Signup</h1> {/* Title of the form */}
        <form onSubmit={handleSignup}> {/* Form submission handler */}
          <div>
            <label htmlFor="name">Name
              <span style={{ color: "red" }}>*</span> {/* Required field indicator */}
            </label>
            <input
              onChange={handleChange} // Handle input changes
              type="text" // Input type for name
              name="name" // Name field
              autoFocus // Autofocus on the name input
              placeholder="Enter your name..." // Placeholder text
              value={signupInfo.name} // Controlled input
              disabled={isSubmitting} // Disable during submission
            />
          </div>
          <div>
            <label htmlFor="email">Email
              <span style={{ color: "red" }}>*</span> {/* Required field indicator */}
            </label>
            <input
              onChange={handleChange} // Handle input changes
              type="email" // Input type for email
              name="email" // Email field
              placeholder="Enter your email..." // Placeholder text
              value={signupInfo.email} // Controlled input
              disabled={isSubmitting} // Disable during submission
            />
          </div>
          <div>
            <label htmlFor="password">Password
              <span style={{ color: "red" }}>*</span> {/* Required field indicator */}
            </label>
            <div className="password-container">
              <input
                onChange={handleChange} // Handle input changes
                type={showPassword ? "text" : "password"} // Toggle password visibility
                name="password" // Password field
                placeholder="Enter your password..." // Placeholder text
                value={signupInfo.password} // Controlled input
                className="password-input" // Custom class for styling
                disabled={isSubmitting} // Disable during submission
              />
              <span className="eye_icon" onClick={togglePasswordVisibility}> {/* Toggle visibility icon */}
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon changes based on visibility state */}
              </span>
            </div>
          </div>
          <div className="terms"> {/* Terms and conditions checkbox */}
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAccepted} // Checked state based on user input
              onChange={handleTermsChange} // Handle checkbox changes
              disabled={isSubmitting} // Disable during submission
            />
            <span htmlFor="terms">
              I accept the <Link to="/terms">terms and conditions</Link> {/* Link to terms */}
              <span style={{ color: "red" }}>*</span> {/* Required field indicator */}
            </span>
          </div>
          <button type="submit" disabled={isSubmitting}> {/* Submit button */}
            {isSubmitting ? "Creating Account..." : "Signup"} {/* Button text changes based on state */}
          </button>
          <span>
            Already have an account? <Link to="/login">Login</Link> {/* Link to login page */}
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
          width: "78.7%", // Set image width
          height: "80%", // Set image height
          objectFit: "cover", // Cover the area without distortion
          objectPosition: "center", // Center the image
          borderRadius: '0 10px 10px 0' // Rounded corners
        }} />
      </div>
    </div>
  );
}

export default Signup; // Export the Signup component for use in other parts of the application
