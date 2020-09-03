const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const secret = process.env.JWT_SECRET_KEY;
const withAuth = function(req, res, next) {
  console.log(req.headers)
  const bearer=req.headers.authorization.split(" ")
  console.log(bearer)
  const token=bearer[1];
  if (!token) {
    console.log('Unauthorized: No token provided')

    return res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
          console.log(err)
          return res.status(401).send('Unauthorized: Invalid token');
      } else {
        console.log("checked")
        next();
      }
    });
  }
}
module.exports = withAuth;
