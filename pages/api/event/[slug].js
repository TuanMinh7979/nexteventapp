import Event from "@/model/eventModel";
import User from "@/model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/utils/connectDB";
import cookie from "cookie"
import nextConnect from 'next-connect';
import authorMiddleWare from "../middleware/authorMiddleWare";
connectDB();
const hdler = nextConnect();

hdler.use(authorMiddleWare)
//patch "event/:eventId"
hdler.patch(async (req, res) => {
    if (!req.user)
        return res.status(401).json({ msg: "Invalid Authentication." });

    try {

        const existingEvent = await Event.findOne({
            _id: { $ne: req.query.slug },
            start: req.body.data.start,
        });
        if (existingEvent)
            return res.status(400).json({
                msg: `StartTime at req.body.data.start already have a event`,
            });
        const newEvent = await Event.findOneAndUpdate(
            { _id: req.body.data._id },
            {
                $set: req.body.data,
            },
            { new: true }
        );

        if (newEvent) return res.json({ msg: "Update Success!", newEvent });
        return res.status(400).json({ msg: "Not found " });
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
})


hdler.delete(async (req, res) => {
    if (!req.user)
        return res.status(401).json({ msg: "Invalid Authentication." });

    try {
        const event = await Event.findByIdAndDelete(req.query.slug);

        if (!event) return res.status(400).json({ msg: "Event not exist" });
        res.status(200).json({ msg: "Delete Success!" });
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
})


export default hdler

