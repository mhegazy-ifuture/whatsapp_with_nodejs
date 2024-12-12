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
const SESSION_ACTIVE = "active";

// ==============confirm selections ==============

// ============== Receive Message ==============
export const receivedMessage = asyncHandler(async (req, res) => {
  const {
    entry: [
      {
        changes: [
          {
            value: { messages },
          },
        ],
      },
    ],
  } = req.body;
  if (!messages) {
    return res.status(500).json({ message: "No messages" });
  }

  const { from, id, type } = messages[0];
  try {
    await markMessageAsRead(id);
  } catch (error) {
    console.log({ error: "markMessageAsReadError", message: error.message });
    return res.status(500).json({ message: error.message });
  }

  let session = userSessions[from] || { selections: [], status: null, totalPrice: 0 };

  switch (type) {
    case "text":
      try {
        await sendWhatsAppMessage(sampleMenu({ number: from }));
      } catch (error) {
        console.log({ error: "sendWhatsAppMessageError", message: error.message });
        return res.status(500).json({ message: error.message });
      }

      break;

    case "interactive":
      const { button_reply, list_reply } = messages?.[0].interactive;
      session.status = SESSION_ACTIVE;

      if (button_reply !== undefined) {
        console.log({ button_reply });
        const { id } = button_reply;
        if (id === "cancel") {
          try {
            await sendWhatsAppMessage(
              sampletext({ textResponse: "Goodbye!", number: from })
            );
          } catch (error) {
            console.log({ error: "sendWhatsAppMessageError", message: error.message });
            return res.status(500).json({ message: error.message });
          }
          delete userSessions[from];
          return res.status(200).json({ message: "ok" });
        } else if (id === "confirm") {
          if (
            userSessions?.[from]?.selections?.length === 0 ||
            userSessions?.[from]?.selections === undefined
          ) {
            try {
              await sendWhatsAppMessage(
                sampletext({
                  textResponse: "You have not selected any items",
                  number: from,
                })
              );
            } catch (error) {
              console.log({ error: "sendWhatsAppMessageError", message: error.message });
              return res.status(500).json({ message: error.message });
            }
            return res.status(200).json({ message: "ok" });
          }

          try {
            await sendWhatsAppMessage(
              samplePaymentGateWay({
                number: from,
                totalPrice: userSessions[from].totalPrice,
              })
            );
          } catch (error) {
            console.log({
              error: "sendWhatsAppMessageError",
              message: JSON.stringify(error.response.data),
            });
            return res.status(500).json({ message: error.message });
          }
          delete userSessions[from];
          return res.status(200).json({ message: "ok" });
        } else if (id === "ask_for_more") {
          try {
            await sendWhatsAppMessage(sampleMenu({ number: from }));
          } catch (error) {
            console.log({ error: "sendWhatsAppMessageError", message: error.message });
            return res.status(500).json({ message: error.message });
          }
          return res.status(200).json({ message: "ok" });
        } else {
          const { listName } = findItemById(id);
          if (listName !== "unknown") {
            try {
              await sendWhatsAppMessage(
                sampleMultiSelectMenu({ number: from, optionId: id })
              );
            } catch (error) {
              console.log({ error: "sendWhatsAppMessageError", message: error.message });
              return res.status(500).json({ message: error.message });
            }
            return res.status(200).json({ message: "ok" });
          } else {
            try {
              await sendWhatsAppMessage(sampleMenu({ number: from }));
            } catch (error) {
              console.log({ error: "sendWhatsAppMessageError", message: error.message });
              return res.status(500).json({ message: error.message });
            }
            return res.status(200).json({ message: "ok" });
          }
        }
      }

      if (list_reply !== undefined) {
        console.log({ list_reply });
        const { id } = list_reply;
        const { item } = findItemById(id);
        console.log({item})
        session.selections.push(item);
        session.totalPrice += getPrice(item);
        userSessions[from] = session;
        console.log({ userSessions: JSON.stringify(userSessions), item });
        try {
          await sendWhatsAppMessage(
            sampleConfirmMenu({
              number: from,
              selections: [...userSessions[from].selections],
            })
          );
        } catch (error) {
          console.log({ error: "sendWhatsAppMessageError", message: error.message });
          return res.status(500).json({ message: error.message });
        }
      }

    default:
      return res.status(404).json({ message: "not found" });
  }

  res.status(200).json({ message: "ok" });

});

