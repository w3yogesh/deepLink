const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    field: {
        type: String,
        trim: true,
    },
    headquarter: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // If each company should have a unique email
        // Add validation for email format
        validate: {
            validator: (value) => {
                // Use a regular expression or a library to validate the email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email format",
        },
    },
    companySize: {
        type: String, // Adjust the data type if it represents a numeric value
        required: true,
    },
    about: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Company", CompanySchema);
