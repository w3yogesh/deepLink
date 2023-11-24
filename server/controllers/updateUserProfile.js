const EducationModel = require("../models/EducationModel");
const UserModel = require("../models/UserModel");
const SkillModel = require("../models/SkillModel");
const AddressModel = require("../models/AddressModel");
const Experience = require("../models/ExperienceModel");
const express = require("express");
const app = express();
const path = require("path");
const { response } = require("express");
require("dotenv").config();
const Skill=require("../models/SkillModel");

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

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        headline: headline,
        gender: gender,
      },
      { new: true }
    );
    const addressId = updatedUser.address[0]._id;
    await AddressModel.findByIdAndUpdate(addressId, { city, country });

    // return res.json({ success: true, message: addressId });
    if (updatedUser) {
      res.json({ success: true, message: "Profile successfully updated." });
    } else {
      res.json({ success: false, message: "Please try again later" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addEducation = async (req, res) => {
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
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { education: educationId } },
      { new: true }
    );
    if (user) {
      res.json({ success: true, message: "Education added successfully." });
    } else {
      res.json({ success: false, message: "Failed try again" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.editEducation = async (req, res) => {
  try {
    const { eduId, institution, degree, field, grade, startDate, endDate } =
      req.body;
    const result = await EducationModel.findByIdAndUpdate(
      eduId,
      { institution, degree, field, grade, startDate, endDate }
    );
    if (result) {
      res.json({ success: true, message: "Education update successfully." });
    } else {
      res.json({ success: false, message: "Failed try again" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const { educationId } = req.params;
    const user = await UserModel.findOne({ education: educationId });
    if (user) {
      await UserModel.findByIdAndUpdate(user._id, {
        $pull: { education: educationId },
      });
      await EducationModel.findByIdAndDelete(educationId);
      return res.json({ success: true, message: "Deleted Successfully" });
    } else {
      return res.json({ success: false, message: "Already Deleted" });
    }
  } catch (error) {}
};

exports.addSkill = async (req, res) => {
  try {
    const { userId, skillName, skillLevel } = req.body;
    const skill = await SkillModel.create({
      userId:userId,
      skillName: skillName,
      skillLevel: skillLevel,
    });
    const skillId = skill._id;
    const update = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { skill: skillId } },
      { new: true }
    );

    if (update) {
      res.json({ success: true, message: "Skill added successfully." });
    } else {
      res.json({ success: false, message: "Skill addition failed. Retry." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.editSkill = async (req, res) => {
  try {
    const { skillId, skillName, skillLevel } = req.body;
    const result = await SkillModel.findByIdAndUpdate(skillId,{skillName,skillLevel})
    if (result) {
      res.json({ success: true, message: "Update successfully." });
    } else {
      res.json({ success: false, message: "failed. Retry." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const user = await UserModel.findOne({ skill: skillId });
    if (user) {
      await UserModel.findByIdAndUpdate(user._id, {
        $pull: { skill: skillId },
      });
      await SkillModel.findByIdAndDelete(skillId);
      return res.json({ success: true, message: "Deleted Successfully" });
    } else {
      return res.json({ success: false, message: "Already Deleted" });
    }
  } catch (error) {}
};

exports.addExperience = async (req, res) => {
  try {
    const {
      userId,
      companyName,
      employmentType,
      location,
      description,
      startDate,
      endDate,
    } = req.body;

    const experience = await Experience.create({
      companyName,
      employmentType,
      location,
      description,
      startDate,
      endDate,
    });
    const experienceId = experience._id;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { experience: experienceId } },
      { new: true }
    );

    if (user) {
      res.json({ success: true, message: "Experience added successfully." });
    } else {
      res.json({ success: false, message: "Failed try again" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.editExperience = async (req, res) => {
  try {
    const {
      expId,
      companyName,
      employmentType,
      location,
      description,
      startDate,
      endDate,
    } = req.body;

    const result = await Experience.findByIdAndUpdate(
      expId,
      { companyName,
        employmentType,
        location,
        description,
        startDate,
        endDate,
       }
    );
    if (result) {
      res.json({ success: true, message: "Experience update successfully." });
    } else {
      res.json({ success: false, message: "Failed try again" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const user = await UserModel.findOne({ experience: experienceId });
    if (user) {
      await UserModel.findByIdAndUpdate(user._id, {
        $pull: { experience: experienceId },
      });
      await Experience.findByIdAndDelete(experienceId);
      return res.json({ success: true, message: "Deleted Successfully" });
    } else {
      return res.json({ success: false, message: "Already Deleted" });
    }
  } catch (error) {}
};

app.use(
  "/uploads/user/profile",
  express.static(path.join(__dirname, "/uploads/user/profile"))
);

exports.UploadProfile = async (req, res, next) => {
  try {
    const image = req.file.originalname;
    const { userId } = req.body;

    const result = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { profileImage: image } },
      { new: true }
    );
    if (result) {
      return res.json({ status: true, message: "Image uploaded successfully" });
    } else {
      return res.json({ status: false, message: "Please try again!" });
    }

    // return res.json(result.profileImage)
  } catch (error) {}
};
exports.UploadBackground = async (req, res, next) => {
  try {
    const image = req.file.originalname;
    const { userId } = req.body;

    const result = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { backgroundImage: image } },
      { new: true }
    );
    if (result) {
      return res.json({ status: true, message: "Image uploaded successfully" });
    } else {
      return res.json({ status: false, message: "Please try again!" });
    }

    // return res.json(result.profileImage)
  } catch (error) {}
};

exports.addEndorsement = async (req, res) => {
  const { skillId, endorserUserId } = req.params;
  try {
    const skill = await Skill.findById(skillId);
    const endorserUser = await UserModel.findById(endorserUserId);
  
    if (!skill || !endorserUser) {
      return res.json({ status: false, message: "Skill or user not found" });
    }
  
    if (skill.userId.toString() === endorserUserId.toString()) {
      return res.json({ status: false, message: "You can't endorse your own skill" });
    }
  
    if (skill.endorsement.includes(endorserUser._id)) {
      skill.endorsement.pull(endorserUser._id);
      await skill.save();
      return res.json({ status: true, message: "Endorsement reverted successfully" });
    }
  
    skill.endorsement.push(endorserUser._id);
    await skill.save();
  
    res.status(200).json( {status:true, message: 'Endorsement added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
};