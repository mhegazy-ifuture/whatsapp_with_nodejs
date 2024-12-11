import { sendWhatsAppMessage, markMessageAsRead } from "../services/whatsappService.js";
import { sampleMenu } from "../shared/sampleModels.js";
import { asyncHandler } from "../utils/errorHandling.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { "hub.verify_token": verifyToken, "hub.challenge": challenge } = query;
  const accessToken = "RTQWWTVHBDS32145698741258963";

  if (challenge && verifyToken && verifyToken === accessToken) {
    res.status(200).send(challenge);
  } else {
    next(new Error("Failed to verify token", { cause: 500 }));
  }
});

// ============== Receive Message ==============
export const receivedMessage = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const { changes } = body.entry[0];
  const { value } = changes[0];
  const { messages } = value;
  console.log({ messages })
  const { from, id, text: { body: messageBady } } = messages[0];
  console.log(messageBady)

  try {    
    await markMessageAsRead(id);
    
    await sendWhatsAppMessage(sampleMenu({ number: from }));
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error(error.response.data);
    next(new Error(error.response.data, { cause: 500 }));
  }
});
