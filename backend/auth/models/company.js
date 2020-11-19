const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Company', CompanySchema);