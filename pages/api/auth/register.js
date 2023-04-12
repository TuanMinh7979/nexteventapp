import User from "@/model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import cookie from "cookie"
import nextConnect from 'next-connect';
connectDB();
const register = nextConnect()
register.post(async (req, res) => {

    try {
        const { name, account, password } = req.body;

        const user = await User.findOne({ account });
        if (user) {
            return res
                .status(400)
                .json({ msg: "Email or phone number already exist" });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = {
            name,
            account,
            password: passwordHash,
        };

        const newUserToSave = new User(newUser);
        await newUserToSave.save();



        return res.json({
            status: "OK",
            msg: "register success 123232",
            data: { ...newUser._doc, password: "" },

        });
    } catch (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
        return res.status(500).json({ msg: err.code });
    }
}
)
export default register 