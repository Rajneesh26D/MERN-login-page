import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendWelcomeEmail } from "../services/mockEmailService";
import melodyverse from "../assets/images/concert-5471823_1280.jpg";
import login from '../assets/images/4957136.jpg'

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Please enter the required fields");
    }

    if (!termsAccepted) {
      return handleError("Please confirm the terms and conditions");
    }

    try {
      setIsSubmitting(true);

      // 1. Signup API call
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        // 2. Send welcome email
        try {
          const emailResult = await sendWelcomeEmail(name, email);
          if (emailResult.success) {
            handleSuccess("Account created successfully! Welcome email sent.");
          }
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          // Don't block the signup process if email fails
          handleSuccess(
            "Account created successfully! (Email notification failed)"
          );
        }

        // 3. Navigate to login page
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Increased timeout to show email success message
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsSubmitting(false);
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
        backgroundImage: `url(${melodyverse})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50vw',
        borderRadius: '10px 0 0 10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        margin: '0 0 0 150px'
      }}>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.name}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password..."
                value={signupInfo.password}
                className="password-input"
                disabled={isSubmitting}
              />
              <span className="eye_icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAccepted}
              onChange={handleTermsChange}
              disabled={isSubmitting}
            />
            <span htmlFor="terms">
              I accept the <Link to="/terms">terms and conditions</Link>
              <span style={{ color: "red" }}>*</span>
            </span>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Signup"}
          </button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        width: '50vw'
      }}>
        <img src={login} alt="placeholder" style={{
          width: "80%",
          height: "80%",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: '0 10px 10px 0'
        }}></img>
      </div>
    </div>
  );
}

export default Signup;
