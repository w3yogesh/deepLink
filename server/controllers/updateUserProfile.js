const UserModel = require("../models/UserModel");
require("dotenv").config();



exports.updateUserProfile = async (req, res) => {
  try {
    const {NewName,userId} = req.body;
    
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { firstName :NewName },
      { new: true }
    );
    if (updatedUser) {
      res.json({ success: true,message: "Update Successfully" });
    } else {
      res.json({ success: false, message: "Not Update" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};