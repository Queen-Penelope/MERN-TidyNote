import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./lib/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
const app = express();

dotenv.config();
const port = process.env.PORT;

//MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173",
}))
app.use(express.json()); //get access to req.body
app.use(rateLimiter);


//Routes
app.use("/api/notes", notesRoutes);


connectDB().then(() => {
  app.listen(port, () => {
    console.log("SERVER RUNNING ON PORT: ", port);
  });
});


