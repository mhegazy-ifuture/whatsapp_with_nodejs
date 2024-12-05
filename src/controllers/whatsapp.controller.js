import fs from "fs";

import axios from "axios";
const myConsole = new console.Console(fs.createWriteStream("./log.txt"));

export const verifyToken = (req, res, next) => {

  try {
  console.log(req.query)
  const accessToken = 'RTQWWTVHBDS32145698741258963'
  const token = req.query['hub.verify_token'];
  const challenage = req.query["hub.challenge"];
  if(challenage && token && token === accessToken){
    res.send(challenage);
  }else{
    res.status(403).send("Forbidden");
  }
} catch (error) {
 return res.status(500).send(error);   
}


  res.send("hi  verifyToken");
};
export const receivedMessage = async(req, res, next) => {
 console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
  

  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: "Echo: " + message.text.body },
        context: {
          message_id: message.id, // shows the message as a reply to the original user message
        },
      },
    });

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }

  res.sendStatus(200);
};
