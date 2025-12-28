import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authService from "../services/authService.js";

const authController = {
  /**
   * Admin-only endpoint to delete all users & tasks from the database
   */
  Reset: async (req, res) => {
    const { username, password } = req.body;

    try {
      const isValidAdminPassword = await bcrypt.compare(
        password,
        process.env.ADMIN_PASSWORD_HASH
      );

      if (username !== process.env.ADMIN_USERNAME || !isValidAdminPassword) {
        return res.sendStatus(403);
      }

      await authService.Reset();
      res.status(200).send("Reset successful");
    } catch (error) {
      console.error("Reset error:", error);
      res.sendStatus(500);
    }
  },

  /**
   * Authenticate user and return JWT token
   */
  LoginUser: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    try {
      const user = await authService.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }

      const token = authController.generateToken(user);
      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      console.error("LoginUser error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  /**
   * Generate JWT token for a user
   */
  generateToken: (user) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  },

  /**
   * Middleware to authenticate JWT token
   */
  authenticateTokenMiddleware: (req, res, next) => {
    console.log("Authenticating token for request:", req.path);
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err || !payload?.userId) {
        console.log("JWT verification failed:", err);
        return res.sendStatus(403);
      }
      req.userId = payload.userId;
      console.log("Authenticated userId:", req.userId);
      next();
    });
  },

  /**
   * Register new user
   */
  RegisterUser: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    try {
      const exists = await authService.isUsernameExists(username);
      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Username is already taken",
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const userId = await authService.Create(username, passwordHash);

      if (!userId) {
        console.error("Failed to create user in DB");
        return res.sendStatus(500);
      }

      const token = authController.generateToken({ id: userId });
      res.status(201).json({ success: true, userId, token });
    } catch (error) {
      console.error("RegisterUser error:", error);
      res.sendStatus(500);
    }
  },
};

export default authController;
