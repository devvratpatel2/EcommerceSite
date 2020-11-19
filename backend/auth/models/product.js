const Company = require('../models/company.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    code: String,
    name: String,
    details: String,
    image: String,
    price: Number,
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Product', ProductSchema);