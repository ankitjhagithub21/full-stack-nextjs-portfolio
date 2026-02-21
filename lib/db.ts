import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

// Proper global type
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Extend NodeJS global type safely
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

let cached = global.mongooseCache

if (!cached) {
  cached = global.mongooseCache = {
    conn: null,
    promise: null,
  }
}

export async function connectDB() {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected")
        return mongooseInstance
      })
  }

  cached!.conn = await cached!.promise
  return cached!.conn
}
