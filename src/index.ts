import storeToDB from "./scripts/storeToDB.js";
import { connectDB } from "./config/db.js";

async function main() {
 await connectDB();
 await storeToDB();
 
}
main();