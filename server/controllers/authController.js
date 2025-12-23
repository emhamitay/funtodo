// Import required dependencies
import bcrypt from "bcrypt";
import { db } from "../db/client.js";
import { users } from "../db/schema/user.js";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

// Authentication controller with login and registration functions
const authController = {
  /**
   * Admin-only endpoint to delete all users from the database.
   */
  Reset: async function Reset(req, res) {
    console.log("Reset endpoint called");
    const { username, password } = req.body;

    const isValidAdminPassword = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    // Validate admin credentials before performing destructive action
    if (username !== process.env.ADMIN_USERNAME || !isValidAdminPassword) {
      console.log("Unauthorized reset attempt");
      return res.sendStatus(403);
    }

    try {
      console.log("Resetting all users...");
      await db.delete(users);
      console.log("All users have been reset by admin.");
      res.send("Reset successful");
    } catch (error) {
      console.error("Reset error:", error);
      res.sendStatus(500);
    }
  },

  /**
   * Authenticates a user and returns a JWT token
   * @param {Object} req - Express request object containing username and password
   * @param {Object} res - Express response object
   */
  LoginUser: async function LoginUser(req, res) {
    try {
      // Extract username and password from request body
      const { username, password } = req.body;

      // Search for user in database by username
      const user = (
        await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1)
      )[0];

      // Return 401 if user not found
      if (!user) return res.sendStatus(401);

      // Compare provided password with stored hash
      const isValid = await bcrypt.compare(password, user.passwordHash);

      // Return 401 if password is invalid
      if (!isValid) return res.sendStatus(401);

      // Generate JWT token with user ID, expires in 7 days
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send token to client
      res.json({ token });
    } catch (error) {
      // Log error and return 500 status
      console.error("LoginUser error:", error);
      res.sendStatus(500);
    }
  },

  /**
   * Registers a new user with validation
   * @param {Object} req - Express request object containing username and password
   * @param {Object} res - Express response object
   */
  RegisterUser: async function registerUser(req, res) {
    console.log("RegisterUser called");
    try {
      // Extract username and password from request body
      const { username, password } = req.body;

      // Validate that username and password are provided
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }

      console.log("Checking if user exists...");
      // Check if username already exists in database
      let existingUser = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      console.log("fetched existing user:", existingUser);
      // Return error if user already exists
      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }

      console.log("Hashing password...");
      // Hash the password with salt rounds of 10
      const passwordHash = await bcrypt.hash(password, 10);

      console.log("Inserting new user...");
      // Insert new user into database
      await db.insert(users).values({
        username: username,
        passwordHash: passwordHash,
      });

      console.log("User registered successfully.");
      // Return success response
      return res.json({ success: true });
    } catch (error) {
      // Log error and return 500 status
      console.error("RegisterUser error:", error);
      res.sendStatus(500);
    }
    console.log("RegisterUser function execution completed.");
  },
};

export default authController;
