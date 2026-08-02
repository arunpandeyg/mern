// // lib/mongo.ts
// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_DB_URI!;
// if (!MONGO_URI) throw new Error("MONGO_URI not defined in env");

// const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = {
//   conn: null,
//   promise: null,
// };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     const opts = {
//       // useNewUrlParser etc are not necessary on modern drivers but harmless
//       bufferCommands: false,
//       autoIndex: true,
//     };
//     cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => m);
//     console.log("MONGO_DB_URI:", MONGO_URI);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// };




// lib/mongoose.ts
import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/nextjs_products';


if (!MONGODB_URI) {
throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}


let cached = globalThis.__mongo;


if (!cached) {
cached = globalThis.__mongo = { conn: null, promise: null };
}


export async function connectDB() {
if (cached.conn) return cached.conn;
if (!cached.promise) {
const opts = { bufferCommands: false };
cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);

}
cached.conn = await cached.promise;
return cached.conn;
}