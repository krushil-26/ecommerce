import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import JWT
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

const JWT_SECRET = "feeae872269d3c1b3b2f7de7673931796abb622264a89244f2d141316e147f24"; // Use environment variables for security

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" } // Token expires in 1 hour
        );

        return NextResponse.json({ message: "Login successful", token });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
