import User from "@/model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import cookie from "cookie"
import nextConnect from 'next-connect';
connectDB();
const googleLogin = nextConnect();
googleLogin.post(async (req, res, next) => {

    try {
        const { name, email, picture } = req.body;
        const password = email + "your google secret password";
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.findOne({ account: email });

        if (user) {

            return loginUser(user, password, res);
        } else {
            const user = {
                name,
                account: email,
                password: passwordHash,
                avatar: picture,
                type: "google",
            };
            console.log(">>>create nwe user", user)
            return registerUserByGoogleLogin(user, res);
        }

    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
})

const registerUserByGoogleLogin = async (user, res) => {
    const newUser = new User(user);
    await newUser.save();
    const accessToken = jwt.sign(
        { id: newUser._id },
        `${process.env.ACCESS_SECRET}`
    );
    const refresh_token = jwt.sign(
        { id: newUser._id },
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

    res.json({
        msg: "Google login (Register + Login) success",
        accessToken,
        user: { ...newUser._doc, password: "" },
    });
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
    res.json({
        msg: "Login Success!",
        accessToken,
        user: { ...user._doc, password: "" },
    });
};

// googleLogin.use(decodeToken)

export default googleLogin