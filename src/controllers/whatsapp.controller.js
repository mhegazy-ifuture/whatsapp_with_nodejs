import express from "express";

import {
  sendWhatsAppMessage,
  markMessageAsRead,
} from "../services/whatsappService.js";
import {
  sampleMenu,
  sampleMultiSelectMenu,
  sampleConfirmMenu,
  sampletext,
  samplePaymentGateWay,
} from "../shared/sampleModels.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { findItemById, getPrice } from "../utils/MenuItems.js";

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

// ==============confirm selections ==============

// ============== Receive Message ==============
export const receivedMessage = asyncHandler(async (req, res, next) => {
  const messages = req.body.entry?.[0]?.changes?.[0]?.value?.messages;
  console.log(JSON.stringify(req.body.entry[0].changes[0].value));
  if (!messages || !messages.length) {
    const { conversation } = req.body.entry[0].changes[0].value.statuses[0];
    // next(new Error("messages not found", { cause: 404 }));
    console.log({ conversation });
  } else {
    const { from, id, type } = messages[0];
    try {
      await markMessageAsRead(id);
    } catch (error) {
      console.error("markMessageAsReadError:", error.message);
      next(new Error("Failed to mark message as read", { cause: 500 }));
    }
    const session = userSessions[from] || {
      selections: [],
      status: null,
      totalPrice: 0,
    };
    try {
      switch (type) {
        case "text":
          await sendWhatsAppMessage(sampleMenu({ number: from }));
          break;
        case "interactive":
          const { button_reply, list_reply } = messages[0].interactive || {};
          if (button_reply) {
            await handleButtonReply(button_reply, from, session);
          }
          if (list_reply) {
            await handleListReply(list_reply, from, session);
          }
          break;
        default:
          next(new Error("Message type not found", { cause: 404 }));
      }
    } catch (error) {
      next(new Error(error.message, { cause: 500 }));
    }
    userSessions[from] = session;
    res.status(200).json({ message: "ok" });
  }
});
const handleButtonReply = async (button_reply, from, session) => {
  const { id: buttonId } = button_reply;
  switch (buttonId) {
    case "cancel":
      await sendWhatsAppMessage(
        sampletext({ textResponse: "Goodbye!", number: from })
      );
      delete userSessions[from];
      break;
    case "confirm":
      if (!session.selections.length) {
        await sendWhatsAppMessage(
          sampletext({
            textResponse: "You have not selected any items",
            number: from,
          })
        );
      } else {
        await sendWhatsAppMessage(
          samplePaymentGateWay({ number: from, totalPrice: session.totalPrice })
        );
        delete userSessions[from];
      }
      break;
    case "ask_for_more":
      await sendWhatsAppMessage(sampleMenu({ number: from }));
      break;
    default:
      const { listName } = findItemById(buttonId);
      if (listName !== "unknown") {
        await sendWhatsAppMessage(
          sampleMultiSelectMenu({ number: from, optionId: buttonId })
        );
      } else {
        await sendWhatsAppMessage(sampleMenu({ number: from }));
      }
      break;
  }
};
const handleListReply = async (list_reply, from, session) => {
  const { id: listId } = list_reply;
  const { item } = findItemById(listId);
  session.selections.push(item);
  session.totalPrice += getPrice(item);
  await sendWhatsAppMessage(
    sampleConfirmMenu({ number: from, selections: [...session.selections] })
  );
};
