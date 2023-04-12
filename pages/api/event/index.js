import Event from "@/model/eventModel";
import User from "@/model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import cookie from "cookie"
import nextConnect from 'next-connect';
import authorMiddleWare from "../middleware/authorMiddleWare";
connectDB();
const eventCtrl = nextConnect();

eventCtrl.use(authorMiddleWare)

//route "event/"
eventCtrl.post(async (req, res, next) => {

    if (!req.user)
        return res.status(400).json({ msg: "Invalid Authentication." });

    const existingEvent = await Event.findOne({
        start: req.body.data.start,
    });

    if (existingEvent)
        return res
            .status(500)
            .json({
                msg: `StartTime at ${req.body.data.start} already have a event`,
            });

    try {
        const newEvent = new Event(req.body.data);
        newEvent.userId = req.user._id
        await newEvent.save();
        // return res.status(500).json({ msg: "error now" });
        return res.status(201).json({ newEvent, msg: "create success" });
    } catch (err) {
        let errMsg;

        if (err.code === 11000) {
            errMsg = Object.values(err.keyValue)[0] + " already exists.";
        } else {
            let name = Object.keys(err.errors)[0];
            errMsg = err.errors[`${name}`].message;
        }

        return res.status(400).json({ msg: errMsg });
    }
})






export default eventCtrl

