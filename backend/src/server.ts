import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import callsRoutes from "./routes/callsRoutes"; // Import the routes
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGO_URL;


// Initialize Express
const app: Application = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json()); // Only body-parser is needed

// MongoDB Connection
const mongoURI = mongoURL || "";
// const mongoURI = "mongodb://localhost:27017/data_analytics";
mongoose.connect(mongoURI, {} as mongoose.ConnectOptions);

// MongoDB Connection Success/Error Handlers
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use Routes
app.use("/calls", callsRoutes); // Mount the routes on the '/calls' path

// Start the server
app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
