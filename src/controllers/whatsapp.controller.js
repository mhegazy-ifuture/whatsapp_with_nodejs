export const verifyToken = (req, res, next) => {

try {
    
} catch (error) {
 return res.status(500).send(error);   
}


  res.send("hi  verifyToken");
};
export const receivedMessage = (req, res, next) => {
  res.send("hi receivedMessage");
};
