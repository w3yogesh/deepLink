// CompanyController.js

const Company = require("../models/CompanyModel");

const CreateCompany = async (req, res,next) => {
  try {
    const {
      companyName,
      field,
      headquarter,
      website,
      email,
      companySize,
      about
    } = req.body;

    // Assuming Company is a Mongoose model
    const company = await Company.create({
      companyName,
      field,
      headquarter,
      website,
      email,
      companySize,
      about
    });

    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company,
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { CreateCompany };
