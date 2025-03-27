import { UserLogin } from "../interfaces/UserLogin";

const login = async (
  userInfo: UserLogin
): Promise<{ token?: string; error?: string }> => {
  console.log("Attempting to log in with data:", userInfo);

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Log detailed server error
      console.error("Failed to log in:", errorMessage);
      return { error: "Failed to log in" };
    }

    const data = await response.json();
    console.log("Login API response:", data);

    if (!data.token) {
      return { error: "Token is missing in response" };
    }

    return data; // Return the successful response
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Network error" };
  }
};

export { login };
