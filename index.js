import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import routes from "./src/routes/routes.js";
import { errorHandling } from "./src/utils/errorHandling.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); 
app.get("/", (req, res) => res.send("Hello World!")); 
app.use("/whatsapp", routes);
app.use(errorHandling);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

