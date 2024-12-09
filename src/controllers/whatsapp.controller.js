import sendWhatsAppMessage from "../services/whatsappService.js";
import { sampleMenu } from "../shared/sampleModels.js";
import { asyncHandler } from "../utils/errorHandling.js";

export const verifyToken = asyncHandler(async (req, res) => {
  const { query } = req;
  const { "hub.verify_token": verifyToken, "hub.challenge": challenge } = query;
  const accessToken = "RTQWWTVHBDS32145698741258963";

  if (challenge && verifyToken && verifyToken === accessToken) {
    res.send(challenge);
  } else {
    next(new Error("Failed to verify token", { cause: 500 }));
  }
});

// ============== Receieve Message ==============
export const receivedMessage = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const [{ changes }] = body.entry;
  const [{ value }] = changes;
  const { messages } = value;
  const [
    {
      from,
      body: { text },
    },
  ] = messages;

  console.log(text);
  await sendWhatsAppMessage(sampleMenu({ number: from })).catch((error) => {
    next(new Error(error.response.data, { cause: 500 }));
  });

  res.status(200).json({ messages: "ok" });
});
