const express = require("express");
const userRouter = express.Router();
const userCtrl = require("../controllers/userCtrl");

const upload = require("../middlewares/multerConfig");

/*Returns middleware that processes a single file
associated with the given form field*/

userRouter.post("/signUp", upload.single("avatar"), userCtrl.signUp);
userRouter.post("/signIn", userCtrl.signIn);
userRouter.get("/ranking", userCtrl.ranking);

module.exports = userRouter;
