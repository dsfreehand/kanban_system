import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const data = await login(loginData);
      console.log("Login response data:", data); // Log response data to inspect its structure

      if (!data.token) {
        console.error("Token is missing or invalid");
        setError("Login failed. Please try again.");
        return;
      }

      // Store the token (you can modify this based on your token storage strategy)
      Auth.login(data.token);

      // Redirect the user or show a success message
      console.log("Login successful, token stored!");
      // Optionally redirect to another page, e.g.:
      // window.location.href = '/dashboard';
    } catch (err) {
      console.error("Failed to login", err);
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Show error message */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username || ""}
          onChange={handleChange}
          disabled={loading} // Disable inputs while loading
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password || ""}
          onChange={handleChange}
          disabled={loading} // Disable inputs while loading
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit Form"}
        </button>
      </form>
    </div>
  );
};

export default Login;
