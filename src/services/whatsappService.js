import axios from "axios";

export async function sendWhatsAppMessage(data) {
  const url = "https://graph.facebook.com/v21.0/491560174040223/messages";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
  };

  return await axios.post(url, data, { headers });
}

export async function markMessageAsRead(messageId) {
  const url = `https://graph.facebook.com/v21.0/491560174040223/messages`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
  };

  return await axios.post(
    url,
    {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    },
    { headers }
  ).catch((error) => console.log('sendWhatsAppMessageError' ,{error}));
}
