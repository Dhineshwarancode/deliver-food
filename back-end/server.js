import express from "express";
import cors from "cors";
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import { ENV_VARS } from "./config/enVars.js";
import cartRouter from "./routes/cartRoute.js";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectdb();

// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

// Serve uploaded images
const imagesPath = resolve(__dirname, "uploads");
app.use("/images", express.static(imagesPath));

// Production configuration
if (ENV_VARS.NODE_ENV === "production") {
  const staticPath = resolve(__dirname, "..", "front-end", "dist");
  const indexPath = resolve(staticPath, "index.html");

  console.log('Serving static files from:', staticPath);
  console.log('Index file path:', indexPath);

  // Serve static files (JS, CSS, images, etc.)
  app.use(express.static(staticPath));

  // Serve index.html for all other routes (client-side routing)
  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
