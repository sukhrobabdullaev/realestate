import express from "express";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import usersRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/user", usersRoute);

app.listen(8080, () => {
  console.log(`Server is running! https://localhost:8080`);
});
