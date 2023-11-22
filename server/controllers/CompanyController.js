// CompanyController.js
const express = require("express");
const app = express();
const path = require("path");

const Company = require("../models/CompanyModel");
const Service = require("../models/ServiceModel");
const Job = require("../models/JobModel");
const UserModel = require("../models/UserModel");

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const CreateCompany = async (req, res, next) => {
  // return res.json({message:"hello"})
  try {
    const logo = req.file ? req.file.filename : null;

    const { userId } = req.params;
    const {
      companyName,
      field,
      headquarter,
      website,
      email,
      companySize,
      about,
    } = req.body;

    const company = await Company.create({
      userId,
      companyName,
      field,
      headquarter,
      website,
      email,
      companySize,
      about,
      logo,
    });

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { company: company._id } },
      { new: true }
    );

    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Utility function for email validation
function isValidEmail(email) {
  // Implement your email validation logic here
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Companies = async (req, res) => {
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

const MyCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const CreateService = async (req, res) => {
  try {
    const { serviceName, description, price, createdBy } = req.body;

    // Validate request data
    if (!serviceName || !description || !price || !createdBy) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Create a new service
    const newService = new Service({
      serviceName,
      description,
      price,
      createdBy,
    });

    // Save the service to the database
    const savedService = await newService.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Service created successfully",
        data: savedService,
      });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const CreateJob = async (req, res) => {
  try {
    // Destructure job data from the request body
    const { title, company, location, description, requirements, postedBy } =
      req.body;

    // Create a new job instance
    const newJob = new Job({
      title,
      company,
      location,
      description,
      requirements,
      postedBy,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    res.json({ success: true, job: savedJob });
  } catch (error) {
    console.error("Error submitting job form:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const GetService = async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const services = await Service.find({ createdBy: companyId });

    res.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetJobs = async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const jobs = await Job.find({ postedBy: companyId });

    res.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Jobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("postedBy");
    res.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ApplyJob = async (req, res) => {
  try {
    const { jobId, myId } = req.body;
    //const job = await Job.findById(jobId);
    // const user = await User.findById(myId);

    const j = await Job.findById(jobId);
    if (j.appliedBy.includes(myId)) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job" });
    }

    const update = await Job.findByIdAndUpdate(
      jobId,
      { $push: { appliedBy: myId } },
      { new: true }
    );
    // if (update) {
    //   res.json({ success: true, message: "applied to job successfully." });
    // } else {
    //   res.json({ success: false, message: " application Retry." });
    // }

    console.log(`User ${myId} applied for job ${jobId}`);

    return res.json({ status: true, message: "Application successful." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

const withdrawJob=async(req,res)=>{
  try{
    const { jobId, myId } = req.body;
    //const job = await Job.findById(jobId);
    // const user = await User.findById(myId);

    const j=await Job.findById(jobId);

    const update = await Job.findByIdAndUpdate(
      jobId,
      { $pull: { appliedBy: myId } },
      { new: true }
    );
    // if (update) {
    //   res.json({ success: true, message: "applied to job successfully." });
    // } else {
    //   res.json({ success: false, message: " application Retry." });
    // }

    console.log(`User ${myId} withdraw for job ${jobId}`);

    return res.json({ status: true, message: 'withdraw successful.' });

  }catch(error){
    res.status(500).json({ success: false, error: error.message });
  }
}

const GetCompanies = async (req, res) => {
  try {
    const companyId = req.params.companyId;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Adjust the response format based on your company model
    // const companyDetails = {
    //   _id: company._id,
    //   companyName: company.companyName,
    //   // Add other company details as needed
    // };

    res.json(company);
  } catch (error) {
    console.error("Error fetching company details:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAppliedUsers = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const jobs = await Job.find({ postedBy: companyId }).populate({
      path: "appliedBy",
      select: "firstName lastName _id",
    });
    return res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UploadLogo = async (req, res) => {
  try {
    const image = req.file.originalname;
    const { companyId } = req.body;

    const result = await Company.findOneAndUpdate(
      { _id: companyId },
      { $set: { logo: image } },
      { new: true }
    );
    if (result) {
      return res.json({ status: true, message: "Logo uploaded successfully" });
    } else {
      return res.json({ status: false, message: "Please try again!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UploadCover = async (req, res) => {
  return res.json({ status: true, message: "Cover uploaded successfully" });

  try {
    const image = req.file.originalname;
    const { companyId } = req.body;

    const result = await Company.findOneAndUpdate(
      { _id: companyId },
      { $set: { cover: image } },
      { new: true }
    );
    if (result) {
      return res.json({ status: true, message: "Cover uploaded successfully" });
    } else {
      return res.json({ status: false, message: "Please try again!" });
    }
  } catch (error) {
  res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  CreateCompany,
  Companies,
  MyCompany,
  UploadLogo,
  UploadCover,
  CreateService,
  CreateJob,
  GetService,
  GetJobs,
  Jobs,
  ApplyJob,
  GetCompanies,
  getAppliedUsers,
};
module.exports = { CreateCompany, Companies,MyCompany,CreateService,CreateJob,GetService,GetJobs,Jobs,ApplyJob,withdrawJob,GetCompanies,getAppliedUsers};

