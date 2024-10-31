import bcrypt from "bcrypt";
import { createAccessToken } from "../lib/jwt.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import {  profileModel} from "../models/profile.model.js";

export class profileController {
  static async getProfile(req, res) {
    const { token } = req.cookies;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await profileModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
