import User from "../../../model/userModel"
import jwt from "jsonwebtoken";

const authorMiddleWare = async (req, res, next) => {
    try {


        const token = req.headers.authorization;

        if (!token) return res.status(400).json({ msg: "Invalid authenticate(token is missing )" });
        const decoded = jwt.verify(token, `${process.env.ACCESS_SECRET}`);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(400).json({ msg: "user dose not exist" });
        req.user = user;



        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
export default authorMiddleWare;
