import "server-only";
import mongoose from "mongoose";
const globalDb = globalThis as typeof globalThis & { curriculumDb?: Promise<typeof mongoose> };
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Configure MONGODB_URI no servidor.");
  if (!globalDb.curriculumDb) {
    globalDb.curriculumDb = mongoose.connect(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 10000 }).catch(error => {
      globalDb.curriculumDb = undefined;
      throw error;
    });
  }
  return globalDb.curriculumDb;
}
