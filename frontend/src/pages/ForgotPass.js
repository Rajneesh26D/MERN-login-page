import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import melodyverse from "../assets/images/concert-5471823_1280.jpg";

function ForgotPass() {
  const [forgotPassInfo, setForgotPassInfo] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Load remembered email and remember me preference on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPreference = localStorage.getItem("rememberMe") === "true";

    if (rememberedEmail && rememberedPreference) {
      setForgotPassInfo((prev) => ({
        ...prev,
        email: rememberedEmail,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyForgotPassInfo = { ...forgotPassInfo };
    copyForgotPassInfo[name] = value;
    setForgotPassInfo(copyForgotPassInfo);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleForgotPass = async (e) => {
    e.preventDefault();
    const { email, newPassword, confirmNewPassword } = forgotPassInfo;
    if (!email || !newPassword || !confirmNewPassword) {
      return handleError("Email and password are required");
    }

    if (newPassword !== confirmNewPassword) {
      return handleError("Passwords do not match");
    }

    try {
      const url = `http://localhost:8080/auth/forgot-pass`;
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

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
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
        width: '40%',
        padding: '20px 0 20px 20px'
      }}>
        <h1>Forgot Password?</h1>
        <form onSubmit={handleForgotPass} style={{
          width: '95%'
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
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter your password..."
                value={forgotPassInfo.newPassword}
                className="password-input"
              />
              <span className="eye_icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="new-password">Confirm Password</label>
            <div className="password-container">
              <input
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                placeholder="Enter your password..."
                value={forgotPassInfo.confirmNewPassword}
                className="password-input"
              />
              <span
                className="eye_icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit">Submit</button>
          <span>
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPass;
