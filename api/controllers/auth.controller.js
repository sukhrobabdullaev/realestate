import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

// Utility function for input validation
const validateInput = (username, password, email) => {
  if (!username || !password || !email) {
    throw new Error("All fields are required.");
  }
};

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    validateInput(username, password, email);

     // Check if the user already exists
     const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // HASH THE [PASSWORD]
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB.
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", userData: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create user." });
  }
};
export const login = async(req, res) => {
  const { username, password } = req.body;

  try {
    validateInput(username, password);

    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Here you can implement session creation or JWT token generation
    
    res.status(200).json({ message: "Login successful", userData: user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to log in." });
  }
};
export const logout = (req, res) => {
  // db operations
};
