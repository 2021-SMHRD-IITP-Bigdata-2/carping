const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  //   console.log(req.body);
  const accessToken = req.body.accessToken;

  if (!accessToken) return res.json({ error: "User not logged in" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
