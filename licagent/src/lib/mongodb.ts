// ❌ remove this:
// import dotenv from "dotenv";
// dotenv.config();

import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;
console.log("DEBUG env keys =>", Object.keys(process.env));
console.log("DEBUG MONGO_DB_URI =>", process.env.MONGO_DB_URI);

if (!MONGO_DB_URI) {
  throw new Error("Please define the MONGO_DB_URI environment variable");
}
console.log("MONGO_DB_URI =>", process.env.MONGO_DB_URI);
const cached = (global as any).mongoose || { conn: null, promise: null };

(global as any).mongoose = cached;

export async function connectToMongoDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_DB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
    console.log("✅ MongoDB Connected");
  }

  cached.conn = await cached.promise;
  return cached.conn;
}






// import dotenv from 'dotenv';
// dotenv.config();

// import mongoose from 'mongoose';


// const MONGO_DB_URI = process.env.MONGO_DB_URI as string;


// if (!MONGO_DB_URI) throw new Error('Please define the MONGO_DB_URI environment variable');



// let cached = (global as any).mongoose;


// if (!cached) {
// cached = (global as any).mongoose = { conn: null, promise: null };
// }


// export async function connectToMongoDB() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     const opts = { bufferCommands: false };
//     if (MONGO_DB_URI) {
//       cached.promise = mongoose.connect(MONGO_DB_URI, opts).then((mongoose) => mongoose);
//     } else {
//       throw new Error('MONGO_DB_URI is not defined');
//     }
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }






// // // lib/mongodb.ts
// // import mongoose from "mongoose";

// // let isConnected = false;

// // export async function connectToMongoDB() {
// //   if (isConnected) return;

// //   try {
// //     await mongoose.connect(process.env.MONGO_DB_URI as string);
// //     isConnected = true;
// //     console.log("✅ MongoDB Connected");
// //   } catch (error) {
// //     console.error("❌ MongoDB connection error:", error);
// //     throw new Error("MongoDB connection failed");
// //   }
// // }