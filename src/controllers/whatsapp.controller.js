import fs from "fs";


const myConsole = fs.createWriteStream("./logs.log", { flags: "a" });

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
  try {
   
    const {entry} = req.body;
    const message = entry[0].changes[0].value.messages[0];
    const sender = message.from;
    const messageText = message.text.body;
    myConsole.log(messageText);
  
 } catch (error) {
  res.status(500).send("EVENT_RESPONSE_ERROR");
 }
};
