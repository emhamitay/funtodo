/**
 * Authentication Service
 *
 * Handles user authentication requests to the backend API.
 * Uses environment variables for API endpoints (VITE_API_USERS_LOGIN, VITE_API_USERS_REGISTER).
 *
 * NOTE: This service uses callback functions (onLoginSuccess, onFail) for handling responses.
 * Consider updating to use Promise-based returns for better integration with modern React patterns.
 */

// Load API endpoints from environment variables
const API_USERS_LOGIN_URL = import.meta.env.VITE_API_USERS_LOGIN;
const API_USERS_REGISTER_URL = import.meta.env.VITE_API_USERS_REGISTER;

const authService = {
  /**
   * Login user with username and password
   *
   * Makes a POST request to the login endpoint with user credentials.
   * Executes success or failure callback based on the API response.
   *
   * @param {string} username - User's username/email
   * @param {string} password - User's password
   * @param {Function} onLoginSuccess - Callback function when login succeeds, receives userId
   * @param {Function} onFail - Callback function when login fails, receives error message
   */
  Login: async (username, password, onLoginSuccess, onFail) => {
    try {
      // Send login request to backend
      const res = await fetch(API_USERS_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Login successful - parse response and call success callback
        const data = await res.json();
        // Expect { token, userId }
        onLoginSuccess(data.userId, data.token);
      } else {
        // Login failed - extract error message and call failure callback
        const data = await res.json();
        onFail("Login failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      // Network or parsing error - call failure callback with error message
      onFail("Login failed: " + err.message);
    }
  },

  /**
   * Register new user with username and password
   *
   * Makes a POST request to the register endpoint with user credentials.
   * Executes success or failure callback based on the API response.
   *
   * @param {string} username - New user's username/email
   * @param {string} password - New user's password
   * @param {Function} onRegisterSuccess - Callback function when registration succeeds, receives userId
   * @param {Function} onFail - Callback function when registration fails, receives error message
   */
  Register: async (username, password, onRegisterSuccess, onFail) => {
    try {
      // Send registration request to backend
      const res = await fetch(API_USERS_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        // Registration successful - parse response and call success callback
        const data = await res.json();
        // Expect { success, userId, token }
        onRegisterSuccess(data.userId, data.token);
      } else {
        // Registration failed - extract error message and call failure callback
        const data = await res.json();
        onFail("Registration failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      // Network or parsing error - call failure callback with error message
      onFail("Registration failed: " + err.message);
    }
  },
};

// Export the authentication service for use in other modules
export default authService;
