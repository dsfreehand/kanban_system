import { jwtDecode, JwtPayload } from 'jwt-decode';


class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn(): boolean {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }
  
  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
      
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("token") ?? "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("token", idToken);
    // TODO: redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("token");
    // TODO: redirect to the login page
    window.location.assign("/login");
  }
}

export default new AuthService();
