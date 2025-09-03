const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchId: {
        type: String,
        required: true,
        unique: true
    },
    branchName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true  // optional field, but unique if present
    }
}, { timestamps: true });

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
