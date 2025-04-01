import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const SECRET_KEY = "feeae872269d3c1b3b2f7de7673931796abb622264a89244f2d141316e147f24";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Find user by ID and exclude the password field
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Profile data", data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user data", error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Parse request body
    const { name, email, oldPassword, newPassword } = await req.json();

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update name and email if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // If changing password, verify old password first
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Old password is incorrect" }, { status: 400 });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Save updated user
    await user.save();

    return NextResponse.json({ success: true, message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating user profile", error }, { status: 500 });
  }
}
