import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    // console.log("Register")
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
      
        const newUser = new User({
            // username: req.body.username,
            // email: req.body.email,
            ...req.body,
            password: hash,
        })
        console.log(newUser.password)
        await newUser.save()
        console.log("New Register")
        res.status(200).send(`User ${req.body.username} has been created`)
    }
    catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        console.log("hello world")
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Wrong password, try again !"))


        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        )

        const { password, isAdmin, ...otherDetails } = user._doc
        return res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
            // .json({ ...otherDetails })

    }
    catch (err) {
        next(err)
    }
}