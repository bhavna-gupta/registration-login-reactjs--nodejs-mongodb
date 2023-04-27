const userModel = require('../Model/userModel');
const bcrypt = require('bcryptjs');
// const imageModel=require('../Model/imagesModel')
// const fs=require('fs');
// const path=require('path');

const SignUp = async (req, res) => {
    try {
        let find = await userModel.findOne({ username: req.body.username }, { _id: 0 })
        if (find) {
            res.status(201).json("Already you have account");
        } else {
            let user = new userModel({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 5),
                pin: bcrypt.hashSync(req.body.pin, 5)
            })
            user.save()
                .then(() => res.status(201).json("Account Created"))
                .catch(err => res.status(401).json(err))
        }
    }
    catch (err) {
        res.status(401).json(err);
    }
}

const SignIn = async (req, res) => {
    try {
        let find = await userModel.findOne({ username: req.body.username }, { _id: 0 });
        if (find) {
            bcrypt.compare(req.body.password, find.password, (err, result) => {
                if (result) {
                    bcrypt.compare(req.body.pin, find.pin, (err, result) => {
                        if (result) {
                            res.status(201).json("Sign in Successfully");
                        } else {
                            res.status(401).json("Please enter correct pin")
                        }
                    })
                } else {
                    res.status(401).json("Please enter correct password")
                }
            })
        }
        else {
            res.status(201).json("Please create new account")
        }
    }
    catch {
        res.status(401).json(err)
    }
}

const Forget = async (req, res) => {
    try {
        let find = await userModel.findOne({ username: req.body.username }, { _id: 0 });
        if (find) {
            let update = await userModel.updateOne(
                { username: req.body.username },
                { password: bcrypt.hashSync(req.body.password, 5) }
            );
            if (update.modifiedCount > 0) {
                res.status(201).json("Changed Password");
            }
        }
        else {
            res.status(401).json("Invalid Username");
        }
    }
    catch (err) {
        res.status(401).json(err);
    }
}

const Delete = async (req, res) => {
    try {
        let del = await userModel.deleteOne({ username: req.body.username }, { _id: 0 });
        if (del.deletedCount > 0) {
            res.status(200).json("Deleted Account Successfully")
        }
        else if (del.deletedCount === 0) {
            res.status(201).json("No Account found");
        }
    }
    catch (err) {
        res.status(401).json(err);
    }
}

const Verify=async (req,res)=>{
    try {
        let find = await userModel.findOne({ username: req.body.username }, { _id: 0 });
        if (find) {
            bcrypt.compare(req.body.pin, find.pin, (err, result) => {
                if (result) {
                    res.status(201).json("Sign in Successfully");
                } else {
                    res.status(401).json("Please enter correct pin")
                }
            })
        }
        else {
            res.status(201).json("Please create new account")
        }
    }
    catch {
        res.status(401).json(err)
    }
}



module.exports = { SignUp, SignIn, Forget, Delete,Verify };