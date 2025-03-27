import { UserLogin } from "../interfaces/UserLogin";

const login = async (
  userInfo: UserLogin
): Promise<{ token?: string; error?: string }> => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      return { error: "Failed to log in" }; // Return an error object instead of null
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Network error" }; // Always return an object, even on failure
  }
};

export { login };
