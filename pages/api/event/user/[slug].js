import Event from "@/model/eventModel";
import User from "@/model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import cookie from "cookie"
import nextConnect from 'next-connect';

connectDB();
const hdler = nextConnect();
//route get event/user/:userId
hdler.get(async (req, res) => {

    try {

        const events = await Event.find({ userId: req.query.slug });
        res.json({ events });
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
})


export default hdler

