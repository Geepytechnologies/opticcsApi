"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOtp = exports.sendOtp = exports.resetPassword = exports.verifyEmail = exports.forgotpassword = exports.changepassword = exports.signout = exports.signin = exports.signup = void 0;
//@ts-nocheck
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../../middlewares/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const db_1 = __importDefault(require("../../config/db"));
const adminUser_1 = require("../../queries/admin/adminUser");
const request_1 = __importDefault(require("request"));
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "POST",
        url: "https://api.sendchamp.com/api/v1/verification/create",
        headers: {
            Accept: "application/json,text/plain,*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer sendchamp_live_$2a$10$8i7elhCUcmIi2b921WjFkedBImY5YDWsZU86MNRw..wz1e11pcZDq",
        },
        body: JSON.stringify({
            channel: "sms",
            sender: "SAlert",
            token_type: "numeric",
            token_length: 4,
            expiration_time: 5,
            customer_mobile_number: req.body.mobile_number,
            meta_data: { description: "demo" },
            in_app_token: false,
        }),
    };
    (0, request_1.default)(options, (error, response, body) => {
        if (error) {
            console.error(error.message);
            return res
                .status(500)
                .json({ error: "An error occurred while sending OTP." });
        }
        const mydata = JSON.parse(body);
        console.log(mydata);
        res.json(mydata);
    });
});
exports.sendOtp = sendOtp;
const confirmOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "POST",
        url: "https://api.sendchamp.com/api/v1/verification/confirm",
        headers: {
            Accept: "application/json,text/plain,*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer sendchamp_live_$2a$10$8i7elhCUcmIi2b921WjFkedBImY5YDWsZU86MNRw..wz1e11pcZDq",
        },
        body: JSON.stringify({
            verification_reference: req.body.verification_reference,
            verification_code: req.body.verification_code,
            channel: "sms",
            token_type: "numeric",
            token_length: 4,
            expiration_time: 5,
            meta_data: { description: "demo" },
            in_app_token: false,
        }),
    };
    (0, request_1.default)(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "An error occurred while sending OTP." });
        }
        const mydata = JSON.parse(body);
        console.log(mydata);
        res.json(mydata);
    });
});
exports.confirmOtp = confirmOtp;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, phone, staffid, accountType } = req.body;
    const connection = yield db_1.default.getConnection();
    const existingEmail = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield connection.execute((0, adminUser_1.getExistingEmailQuery)(req.body.email));
        return (_a = result[0]) === null || _a === void 0 ? void 0 : _a.emsil;
    });
    const existingphone = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield connection.execute((0, adminUser_1.getExistingPhoneQuery)(req.body.phone));
        return result[0];
    });
    const existinguser = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield connection.execute((0, adminUser_1.getExistingUserQuery)(req.body.email, req.body.phone));
        return result[0];
    });
    const newUser = () => {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedpassword = bcryptjs_1.default.hashSync(password, salt);
        return new Promise((resolve, reject) => {
            db_1.default.query((0, adminUser_1.createUserQuery)(firstname, lastname, email, hashedpassword, phone, staffid, accountType), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const user = result;
                    resolve(user);
                }
            });
        });
    };
    try {
        const user = yield existinguser();
        const email = yield existingEmail();
        const phone = yield existingphone();
        if (user) {
            return res.status(409).json("User already exists");
        }
        if (email) {
            return res.status(409).json("Email already exists");
        }
        if (phone) {
            return res.status(409).json("Phone number already exists");
        }
        // Create a new user
        const newuser = yield newUser();
        return res.status(201).json(newuser);
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    // Find the user with the matching verification token
    const user = yield prisma.user.findMany({
        where: {
            verificationToken: token,
        },
    });
    if (!user.length) {
        return res.status(400).json({ error: "Invalid verification token" });
    }
    const currentDate = new Date();
    if (user && currentDate > user.expiresAt) {
        return res.status(400).json({ error: "Verification link has expired" });
    }
    // Update the user's verification status
    const userId = user[0].id;
    const updatedUser = yield prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            verified: true,
            verificationToken: null,
        },
    });
    res
        .status(200)
        .json({ message: "Email address verified", user: updatedUser });
});
exports.verifyEmail = verifyEmail;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const existingEmail = () =>
    //   return new Promise((resolve, reject) => {
    //     db.query(getExistingEmailQuery(req.body.email), (err, result) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         const user = result[0];
    //         resolve(user);
    //       }
    //     });
    //   });
    // };
    const createRefresh = (access) => {
        return new Promise((resolve, reject) => {
            db_1.default.query((0, adminUser_1.updateUserRefresh)(req.body.email, access), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    const user = result;
                    resolve(user);
                }
            });
        });
    };
    try {
        const user = yield existingEmail();
        console.log({ user: user });
        if (!user)
            return res.status(404).json("User not found");
        const isMatched = bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!isMatched)
            return res.status(400).json("Wrong credentials");
        //access Token
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.ACCESS_SECRET, {
            expiresIn: "60s",
        });
        //refresh Token
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_SECRET, {
            expiresIn: "1d",
        });
        //save refresh token to the user model
        const updatedUser = yield createRefresh(refreshToken);
        // Creates Secure Cookie with refresh token
        res.cookie("token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });
        const { password } = user, others = __rest(user, ["password"]);
        res.status(200).json({ others, accessToken });
    }
    catch (err) {
        next(err);
    }
});
exports.signin = signin;
const changepassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmail = () => {
        return new Promise((resolve, reject) => {
            db_1.default.query((0, adminUser_1.getExistingEmailQuery)(req.body.email), (err, result) => {
                var _a;
                if (err) {
                    reject(err);
                }
                else {
                    const email = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.email;
                    resolve(email);
                }
            });
        });
    };
    const updateUser = (password) => {
        const q = `
        UPDATE healthadmin
        SET password = '${password}'
        WHERE email = '${req.body.email}'
          `;
        return new Promise((resolve, reject) => {
            db_1.default.query(q, (err, result) => {
                var _a;
                if (err) {
                    reject(err);
                }
                else {
                    const email = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.email;
                    resolve(email);
                }
            });
        });
    };
    try {
        const user = yield existingEmail();
        if (!user)
            return next((0, error_1.createError)(404, "User not found"));
        const isMatched = bcryptjs_1.default.compareSync(req.body.oldpassword, user.password);
        if (!isMatched)
            return next((0, error_1.createError)(400, "Old password is incorrect"));
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedpassword = bcryptjs_1.default.hashSync(req.body.newpassword, salt);
        yield updateUser(hashedpassword);
        res.status(201).json("successful");
    }
    catch (err) {
        next(err);
    }
});
exports.changepassword = changepassword;
const forgotpassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, redirecturl } = req.body;
    const existingEmail = () => {
        return new Promise((resolve, reject) => {
            db_1.default.query((0, adminUser_1.getExistingEmailQuery)(req.body.email), (err, result) => {
                var _a;
                if (err) {
                    reject(err);
                }
                else {
                    const email = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.email;
                    resolve(email);
                }
            });
        });
    };
    try {
        // Find the user with the matching email address
        const user = yield existingEmail();
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        // Generate a unique token
        const token = crypto_1.default.randomBytes(20).toString("hex");
        const hashedToken = crypto_1.default
            .createHash("sha256")
            .update(token + email)
            .digest("hex");
        // Set the expiration time for the token (1 hour from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        // Store the token in the database
        yield prisma.passwordResetToken.create({
            data: {
                token: hashedToken,
                expiresAt: expiresAt,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
        // Send an email to the user with a link containing the token
        const mailOptions = {
            from: "example@gmail.com",
            to: user.email,
            subject: "Reset your password",
            text: `Click the following link to reset your password: http://localhost:5000/reset-password?token=${hashedToken}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
        res.status(200).json({ message: "Password reset email sent" });
    }
    catch (err) {
        next(err);
    }
});
exports.forgotpassword = forgotpassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    app.post("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token, password } = req.body;
        // Find the token with the matching value
        const resetToken = yield prisma.passwordResetToken.findUnique({
            where: {
                token: token,
            },
            include: {
                user: true,
            },
        });
        if (!resetToken) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }
        // Check if the token has expired
        const currentDate = new Date();
        if (currentDate > resetToken.expiresAt) {
            return res.status(400).json({ error: "Token has expired" });
        }
        // Update the user's password
        const user = resetToken.user;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        yield prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });
        // Delete the password reset token
        yield prisma.passwordResetToken.delete({
            where: {
                id: resetToken.id,
            },
        });
    }));
});
exports.resetPassword = resetPassword;
const signout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.token))
        return res.sendStatus(204); //No content
    const refreshToken = cookies.token;
    // Is refreshToken in db?
    const foundUser = yield prisma.user.findUnique({
        where: {
            refreshtoken: refreshToken,
        },
    });
    if (!foundUser) {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204);
    }
    // Delete refreshToken in db
    foundUser.refreshtoken = "";
    const updatedUser = yield prisma.user.update({
        where: {
            refreshtoken: refreshToken,
        },
        data: {
            refreshtoken: foundUser.refreshtoken,
        },
    });
    console.log(updatedUser);
    res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
});
exports.signout = signout;
