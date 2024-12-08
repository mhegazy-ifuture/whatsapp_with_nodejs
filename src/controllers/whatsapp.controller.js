import fs from "fs";

import axios from "axios";
import sendWhatsAppMessage from "../services/whatsappService";
const receivedMessagesLogs = new console.Console(
  fs.createWriteStream("./received_messages.log")
);

const verifyToken = (req, res) => {
  try {
    const { query } = req;
    const { "hub.verify_token": verifyToken, "hub.challenge": challenge } =
      query;
    const accessToken = "RTQWWTVHBDS32145698741258963";

    if (challenge && verifyToken && verifyToken === accessToken) {
      res.send(challenge);
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const receivedMessage = async (req, res) => {
  try {
    const { body } = req;
    const [{ changes }] = body.entry;
    const [{ value }] = changes;
    const { from, messages } = value;
    const [{ type, text: messageText, id: messageId }] = messages;

  


    // await sendWhatsAppMessage(`hi ${from} i'm pleased to message you`, from);
    await sendWhatsAppMessage(sampleMenuFlow({ number: from }));

    res.status(200).send("hi  receivedMessage");
  } catch (error) {
    receivedMessagesLogs.error(error);
    res.status(400).send(error);
  }
};

export { verifyToken, receivedMessage };
