import User from "@/model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import cookie from "cookie"
connectDB();

//stable
export default async (req, res) => {

  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { account, password } = req.body;

    const user = await User.findOne({ account });
    // console.log(">>>>", user)
    if (!user) return res.status(400).json({ msg: "login failed" });

    loginUser(user, password, res);
  } catch (err) {
    if (err instanceof Error) return res.status(400).json({ msg: err.message });
    return res.status(400).json({ msg: err.code });
  }
};

const loginUser = async (user, password, res) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });
  const accessToken = jwt.sign(
    { id: user._id },
    `${process.env.ACCESS_SECRET}`,
    {
      expiresIn: "60m",
    }
  );
  const refresh_token = jwt.sign(
    { id: user._id },
    `${process.env.REFRESH_SECRET}`,
    {
      expiresIn: "30d",
    }
  );
  res.setHeader("Set-Cookie", cookie.serialize("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/auth/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  }))

  // console.log(">>>>>>>>>", accessToken)

  return res.json({
    msg: "Login Success!",
    accessToken,
    user: { ...user._doc, password: "" },
  });
};
