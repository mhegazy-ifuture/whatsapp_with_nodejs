import fs from "fs";

import axios from "axios";
const receivedMessagesLogs = new console.Console(
  fs.createWriteStream("./received_messages.log")
);

const verifyToken = (req, res) => {
  try {
    const { query } = req;
    const { "hub.verify_token": verifyToken, "hub.challenge": challenge } = query;
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
    const [{ type, text: messageText }] = messages;

    let text;
    switch (type) {
      case "text":
        text = messageText;
        break;
      case "interactive":
        const { interactive } = messages[0];
        console.log({interactive});
        
        const { type: interactiveType, button_reply, list_reply } = interactive;
        switch (interactiveType) {
          case "button_reply":
            text = button_reply.title;
            break;
          case "list_reply":
            text = list_reply.title;
            break;
          default:
            console.log("no message");
        }
        break;
      default:
        console.log("no message");
    }

    console.log(type ,text);

  //   await axios.post(
  //     "https://graph.facebook.com/491560174040223/messages",
  //     {
  //       messaging_product: "whatsapp",
  //       to: '201067574899',
  //       type: "interactive",
  //       interactive: {
  //         type: "list_replay",
  //         header: {
  //           type: "text",
  //           text: "<MESSAGE_HEADER_TEXT>",
  //         },
  //         body: {
  //           text: "<MESSAGE_BODY_TEXT>",
  //         },
  //         footer: {
  //           text: "<MESSAGE_FOOTER_TEXT>",
  //         },
  //         action: {
  //           sections: [
  //             {
  //               title: "<SECTION_TITLE_TEXT>",
  //               rows: [
  //                 {
  //                   id: "<ROW_ID>",
  //                   title: "<ROW_TITLE_TEXT>",
  //                   description: "<ROW_DESCRIPTION_TEXT>",
  //                 },
  //                 /* Additional rows would go here*/
  //               ],
  //             },
  //             /* Additional sections would go here */
  //           ],
  //           button: "<BUTTON_TEXT>",
  //         },
  //       },
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
  //       },
  //     }
  //   );

    res.status(200).send("hi  receivedMessage");
  } catch (error) {
    receivedMessagesLogs.error(error);
    res.status(400).send(error);
  }
};

export { verifyToken, receivedMessage };

