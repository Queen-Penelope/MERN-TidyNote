import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./lib/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

const app = express();

dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();


//MIDDLEWARE
if(process.env.NODE_ENV !== "production") {
  app.use(cors({
  origin: "http://localhost:5173",
}));;
}

app.use(express.json()); //get access to req.body
app.use(rateLimiter);


//Routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("SERVER RUNNING ON PORT: ", port);
  });
});


