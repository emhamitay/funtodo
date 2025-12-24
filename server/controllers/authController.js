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
    const { username, password } = req.body;

    const isValidAdminPassword = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    // Validate admin credentials before performing destructive action
    if (username !== process.env.ADMIN_USERNAME || !isValidAdminPassword) {
      return res.sendStatus(403);
    }

    try {
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

      // Send token to client
      const token = authController.generateToken(user);
      res.status(200).json({ token: token, userId: user.id });
    } catch (error) {
      // Log error and return 500 status
      console.error("LoginUser error:", error);
      res.sendStatus(500);
    }
  },

  generateToken: (user) => {
    // Generate JWT token with user ID, expires in 7 days
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  },

  /**
   * Registers a new user with validation
   * @param {Object} req - Express request object containing username and password
   * @param {Object} res - Express response object
   */
  RegisterUser: async function registerUser(req, res) {
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

      // Check if username already exists in database
      let existingUser = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      // Return error if user already exists
      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }

      // Hash the password with salt rounds of 10
      const passwordHash = await bcrypt.hash(password, 10);

      // Insert new user into database
      const inserted = await db
        .insert(users)
        .values({
          username: username,
          passwordHash: passwordHash,
        })
        .returning({ id: users.id });
      console.log("Inserted user:", inserted);
      const newUserId = inserted[0]?.id;
      if (!newUserId) {
        console.error("RegisterUser: failed to get new userId");
        return res.sendStatus(500);
      }

      const token = authController.generateToken({ userId: newUserId });
      // Return success response
      return res
        .status(201)
        .json({ success: true, userId: newUserId, token: token });
    } catch (error) {
      // Log error and return 500 status
      console.error("RegisterUser error:", error);
      res.sendStatus(500);
    }
    console.log("RegisterUser function execution completed.");
  },
};

export default authController;
