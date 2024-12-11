import { sendWhatsAppMessage, markMessageAsRead } from "../services/whatsappService.js";
import { sampleMenu, sampleMultiSelectMenu } from "../shared/sampleModels.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { findItemById, getListItemName } from "../utils/MenuItems.js";

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
// ==============in memory session store ==============
const userSessions = {};
const SESSION_ACTIVE = "active";

// ==============confirm selections ==============

const confirmSelection = async (from, selections) => {
  await sendWhatsAppMessage(
    sampletext({
      textResponse: `Thank you! Your selections are: ${selections}. Please proceed to payment.`,
      number: from,
    })
  );
  delete userSessions[from]; // Clear the session after completion
}; 

// ============== Receive Message ==============
export const receivedMessage = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const { changes } = body.entry[0];
  const { value } = changes[0];
  const { messages } = value;
  const { from, id, type } = messages[0];

  await markMessageAsRead(id);

  let session = userSessions[from] || { selections: [], status: null };

  switch (type) {
    case "text":
      if (messages[0].text.body.trim().toLowerCase() === "confirm" && session.status === SESSION_ACTIVE) {
        await confirmSelection(from, session.selections);
      } else {
        await sendWhatsAppMessage(sampleMenu({ number: from }));
      }
      break;

    case "interactive":
      const optionId = messages[0].interactive.button_reply.id;
      const { item, listName } = findItemById(optionId);

      if (listName === "menuItems") {
        await sendWhatsAppMessage(
          sampleMultiSelectMenu({ number: from, optionId })
        );
      } else {
        session.selections.push(item);
        session.status = SESSION_ACTIVE;
        userSessions[from] = session;
      }
  }

  res.status(200).json({ message: "ok" });
});

