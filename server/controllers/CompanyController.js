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

const Companies=async (req, res) => {
  const { query } = req.query;
  try {
    let companies;
    if (query) {
      // If there's a search query, filter companies by name
      companies = await Company.find({
        companyName: { $regex: new RegExp(query, "i") }, // Case-insensitive regex search
      });
    } else {
      // If no search query, fetch all companies
      companies = await Company.find();
    }
    res.json({ success: true, companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const MyCompany= async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = { CreateCompany, Companies,MyCompany};
