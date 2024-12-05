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
  res.send("hi receivedMessage");
};
