import fs from "fs";

import axios from "axios";
const receivedMessagesLogs = new console.Console(fs.createWriteStream("./received_messages.log"));

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
export const receivedMessage = (req, res, next) => {
  console.log(req.body);
  
  const entry = req.body.entry[0];
  const changes = entry?.changes[0];
  const value = changes?.value;
  const messageObject = value?.messages[0];
  const messageText = messageObject?.text?.body;
  console.log({messageText ,messageObject ,value ,changes,entry ,});
  res.send("hi  receivedMessage");
  
};
