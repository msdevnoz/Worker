"use strict";
exports.__esModule = true;
exports.authRouter = void 0;
var express_1 = require("express");
var auth_controller_js_1 = require("../controller/auth.controller.js");
var authController = new auth_controller_js_1.AuthController();
exports.authRouter = express_1.Router();
exports.authRouter.post('/login', authController.login);
exports.authRouter.post('/register', authController.register);
