import axios from "axios";


 function sendWhatsAppMessage(data) {


  const url = "https://graph.facebook.com/v21.0/491560174040223/messages";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
  };

  return axios.post(url, data, { headers });
}

export default sendWhatsAppMessage