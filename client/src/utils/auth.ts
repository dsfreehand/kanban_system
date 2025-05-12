import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;

  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
        const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
        const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp ? decodedToken.exp < currentTime : false;
  }

  getToken(): string {
    // TODO: return the token
        const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
        localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();




// class AuthService {
  
//   // Check if the user is logged in by retrieving the token from localStorage
//   loggedIn() {
//     const token = this.getToken();
//     return token;
//   }

//   // Retrieve the JWT token from localStorage
//   getToken(): string {
//     const loggedUser = localStorage.getItem('id_token') || '';
//     return loggedUser;
//   }

//   // Store the JWT token in localStorage and redirect to the home page
//   login(idToken: string) {
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/');
//   }

//   // Remove the JWT token from localStorage and redirect to the home page
//   logout() {
//     localStorage.removeItem('id_token');
//     window.location.assign('/');
//   }
// }

// // Export an instance of the AuthService class
// export default new AuthService();
