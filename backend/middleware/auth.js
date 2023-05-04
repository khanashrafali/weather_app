const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");

const isAuth = async (req, res, next) => {
  const token = req.get('token');
  if (!token) return res.status(401).json({ message: "Unauthorize!" });

  try {
    const decoded = jwt.verify(token, "randomString");
    let user = await UserModel.findOne({_id: decoded.user.id});
    if(!user) return res.status(401).json({message: "Unauthorize!"});
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ message: "Unauthorized Access" });
  }
};

module.exports = isAuth;
