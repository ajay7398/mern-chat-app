import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const isProduction = process.env.NODE_ENV === "production";
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
   const trimmedEmail=email.trim();

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: username,
      email:trimmedEmail,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        _id: newUser._id,
      name: newUser.name,
      image:newUser.profilePic || ""
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // true in production (HTTPS), false in localhost
      sameSite: isProduction ? "none" : "lax", // "none" required for cross-site cookies
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    console.error("Signup error:", error); // add this to see real error
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        image:user.profilePic || ""
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
console.log("User logged in:", user);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const Logout=(req,res)=>{
  res.clearCookie("token", {
    httpOnly: true,
     secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const allUser=async(req,res)=>{
try {
    const users=await User.find().select("-password");
    res.status(200).json({users});
} catch (error) {
    res.status(400).json({message:error.message});
}
}


export const searchUser=async(req,res)=>{
    const { userEmail } = req.body;
console.log("usermail:",userEmail)
  try {
    const trimmedEmail = userEmail.trim();
    const result = await User.findOne({email:trimmedEmail});
    console.log("result:",result);
    if (!result) {
      return res.status(404).json({success:false, message: "User not found" });
    }
    res.status(200).json({result,success:true});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};