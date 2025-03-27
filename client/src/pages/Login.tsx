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
      // Log the data sent to the login function
      console.log("Attempting to log in with data:", loginData);

      const data = await login(loginData);

      // Log the raw response from the login function
      console.log("Login response data:", data);

      // Check if the token exists in the response
      if (!data.token) {
        console.error("Token is missing or invalid");
        setError("Login failed. Please try again.");
        return;
      }

      // Store the token (you can modify this based on your token storage strategy)
      Auth.login(data.token);

      // Log success and redirect or handle accordingly
      console.log("Login successful, token stored!");
      // Optionally redirect to another page, e.g.:
      // window.location.href = '/dashboard';
    } catch (err) {
      // Log the error to inspect it further
      console.error("Failed to login, error details:", err);

      // You might want to extract and log error details more explicitly
      if (err instanceof Error && (err as any).response) {
        // If you are using axios, this will capture any HTTP response errors
        if (err instanceof Error && (err as any).response) {
          console.error("Error response:", (err as any).response);
        }
      } else if (
        err instanceof Error &&
        (err as any).isAxiosError &&
        (err as any).request
      ) {
        // This will capture if the request was made but no response was received
        console.error("No response received:", (err as any).request);
      } else {
        if (err instanceof Error) {
          console.error("Error message:", err.message);
        } else {
          console.error("An unknown error occurred:", err);
        }
      }

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
