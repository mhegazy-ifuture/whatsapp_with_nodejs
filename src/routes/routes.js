import  { Router } from "express";
import * as whatsappController from "../controllers/whatsapp.controller.js";
const router = Router();
router
  .get("/", whatsappController.verifyToken)
  .post("/", whatsappController.receivedMessage);

  export default router     