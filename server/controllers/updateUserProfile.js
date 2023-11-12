const EducationModel = require("../models/EducationModel");
const UserModel = require("../models/UserModel");
const SkillModel = require("../models/SkillModel");
require("dotenv").config();

exports.updateUserProfile = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      phoneNumber,
      gender,
      headline,
      city,
      country,
    } = req.body;
    // res.json({ success: true, message: gender });

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        headline: headline,
        gender: gender,
        // city: city,
        // country: country,
      },
      { new: true }
    );

    if (updatedUser) {
      res.json({ success: true, message: "Update Successfully" });
    } else {
      res.json({ success: false, message: "Not Update" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const { userId, institution, degree, field, grade, startDate, endDate } =
      req.body;

    const education = await EducationModel.create({
      institution,
      degree,
      field,
      grade,
      startDate,
      endDate,
    });
    const educationId = education._id;
    // const user = await UserModel.findByIdAndUpdate(
    //   userId,
    //   { $push: { education: educationId } },
    //   { new: true }
    // );

    // return res.json({ success: true, message: user });
    if (updatedUser) {
      res.json({ success: true, message: "Update Successfully" });
    } else {
      res.json({ success: false, message: "Not Update" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// exports.deleteEducation = async (req, res) => {
//   try {
//     const {educationId} =  req.params;
//     const user = await UserModel.findOne({education: educationId});
//     if(user){
//       await UserModel.findByIdAndUpdate(user._id,{$pull:{education: educationId}})
//       await EducationModel.findByIdAndDelete(educationId);
//       return res.json("Suceessfully Deleted!");

//     }else{
//       return res.json("Education not belongs to you!");
//     }

//   } catch (error) {
    
//   }
// }


exports.updateSkill = async (req, res) => {
  try {
    const {userId, skillName, level } =
      req.body;

    const skill = await SkillModel.create({
      skillName: skillName,
      skillLavel: level,
    });
    const skillId = skill._id;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { skill: skillId } },
      { new: true }
    );

    return res.json({ success: true, message:  user});
    if (updatedUser) {
      res.json({ success: true, message: "Update Successfully" });
    } else {
      res.json({ success: false, message: "Not Update" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
