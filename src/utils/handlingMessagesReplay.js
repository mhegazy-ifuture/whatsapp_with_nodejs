import { sendWhatsAppMessage } from "../services/whatsappService.js";
import { sampleConfirmMenu, sampleMenu, sampleMultiSelectMenu, samplePaymentGateWay, sampletext } from "../shared/sampleModels.js";
import { findItemById } from "./MenuItems.js";

export const handleTextMessage = async (from, session, next) => {
  await sendWhatsAppMessage(sampleMenu({ number: from })).catch((error) =>
    next(
      new Error(error?.response.data || "Failed to send message", {
        cause: 500,
      })
    )
  );
};

export const handleInteractiveMessage = async (from, session, next) => {
  const { button_reply, list_reply } = messages[0].interactive || {};

  if (button_reply) {
    await handleButtonReply(button_reply, from, session, next);
  }

  if (list_reply) {
    await handleListReply(list_reply, from, session, next);
  }
};

export const handleButtonReply = async (button_reply, from, session, next) => {
  const { id: buttonId } = button_reply;
  switch (buttonId) {
    case "cancel":
      await sendWhatsAppMessage(
        sampletext({ textResponse: "Goodbye!", number: from })
      ).catch((error) =>
        next(
          new Error(error?.response.data || "Failed to send message", {
            cause: 500,
          })
        )
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
        ).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
      } else {
        await sendWhatsAppMessage(
          samplePaymentGateWay({ number: from, totalPrice: session.totalPrice })
        ).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
        delete userSessions[from];
      }
      break;
    case "ask_for_more":
      await sendWhatsAppMessage(sampleMenu({ number: from })).catch((error) =>
        next(
          new Error(error?.response.data || "Failed to send message", {
            cause: 500,
          })
        )
      );
      break;
    default:
      const { listName } = findItemById(buttonId);
      if (listName !== "unknown") {
        await sendWhatsAppMessage(
          sampleMultiSelectMenu({ number: from, optionId: buttonId })
        ).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
      } else {
        await sendWhatsAppMessage(sampleMenu({ number: from })).catch((error) =>
          next(
            new Error(error?.response.data || "Failed to send message", {
              cause: 500,
            })
          )
        );
      }
      break;
  }
};

export const handleListReply = async (list_reply, from, session, next) => {
  const { id: listId } = list_reply;
  const { item } = findItemById(listId);
  session.selections.push(item);
  session.totalPrice += getPrice(item);
  await sendWhatsAppMessage(
    sampleConfirmMenu({ number: from, selections: [...session.selections] })
  ).catch((error) =>
    next(
      new Error(error?.response.data || "Failed to send message", {
        cause: 500,
      })
    )
  );
};
