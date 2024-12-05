import express from "express";
import routes from "./src/routes/routes.js";
const app = express();
const PORT = process.env.PORT || 6680;
app.use(express.json()); 
app.get("/", (req, res) => res.send("Hello World!")); 
app.use("/whatsapp", routes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
