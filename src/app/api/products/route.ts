import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // Ensure the path is correct

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({ message: "Connected to MongoDBs" });
    } catch (error) {
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}
