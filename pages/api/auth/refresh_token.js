import User from "@/model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import cookie from "cookie"
import nextConnect from 'next-connect';
connectDB();
const refreshToken = nextConnect();
refreshToken.get(async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token)
            return res
                .status(400)
                .json({ msg: "Please login now(dont have token)!" });

        const decoded = jwt.verify(rf_token, `${process.env.REFRESH_SECRET}`);

        if (!decoded.id)
            return res.status(400).json({ msg: "Please login now!" });

        const user = await User.findById(decoded.id).select(
            "-password"
        );
        if (!user)
            return res.status(400).json({ msg: "This account does not exist." });

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


        res.json({ accessToken, user });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})
export default refreshToken