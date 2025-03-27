import { jwtDecode } from 'jwt-decode';
class AuthService {
    /**
     * Get the decoded token (profile) from localStorage.
     */
    getProfile() {
        const token = this.getToken();
        return token ? jwtDecode(token) : null;
    }
    /**
     * Check if the user is logged in.
     * Returns true if a valid, unexpired token exists.
     */
    loggedIn() {
        const token = this.getToken();
        return token ? !this.isTokenExpired(token) : false;
    }
    /**
     * Check if the token is expired.
     */
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (!decoded.exp)
                return true; // No expiration field, treat as expired.
            return decoded.exp * 1000 < Date.now(); // Compare expiration time (in ms) to current time.
        }
        catch (error) {
            console.error('Error checking token expiration:', error);
            return true; // Treat as expired if any errors occur.
        }
    }
    /**
     * Retrieve the token from localStorage.
     */
    getToken() {
        try {
            return localStorage.getItem('token') || ''; // Default to an empty string if no token exists.
        }
        catch (error) {
            console.error('Error retrieving token:', error);
            return ''; // Fallback to empty string if localStorage access fails.
        }
    }
    /**
     * Store the token in localStorage and redirect to the home page.
     */
    login(idToken) {
        try {
            console.log('Storing token:', idToken); // Debugging log to verify token.
            localStorage.setItem('token', idToken);
            window.location.assign('/'); // Redirect to home page after login.
        }
        catch (error) {
            console.error('Error during login:', error);
        }
    }
    /**
     * Remove the token from localStorage and redirect to the login page.
     */
    logout() {
        try {
            localStorage.removeItem('token');
            window.location.assign('/login'); // Redirect to login page after logout.
        }
        catch (error) {
            console.error('Error during logout:', error);
        }
    }
}
export const authenticateToken = (req, res, next) => {
    // Middleware logic
};
//# sourceMappingURL=auth.js.map