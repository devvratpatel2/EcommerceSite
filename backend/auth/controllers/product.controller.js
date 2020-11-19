const Product = require('../models/product.js');

// Get all products
exports.findAll = (req, res) => {

    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// Get a product by name
exports.findByName = (req, res) => {
    Product.findOne({ name: req.params.productName })
        .populate('company')
        .exec(function (err, product) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Product not found with given name " + req.params.productName
                    });
                }
                return res.status(500).send({
                    message: "No Products with given Company Id " + req.params.productName
                });
            }

            res.send(product);
        });
};

// Get all products by CompanyId
exports.findByCompanyId = (req, res) => {
    Product.find({ company: req.params.companyId })
        .exec(function (err, products) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Product not found with given Company Id " + req.params.companyId
                    });
                }
                return res.status(500).send({
                    message: "No Products with given Company Id " + req.params.companyId
                });
            }

            res.send(products);
        });
};

// Add a product
exports.addProduct = (req, res) => {
    Product.create(req.body, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
}

// Find a product by ID
exports.findProductById = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        console.log(product);
        res.send(product);
    })
};

// Remove a product by ID
exports.removeById = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) throw err;
        res.send(product);
    })
}

// Update a product by ID
exports.updateById = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, company) => {
        if (err) throw err;
        res.send(company);
    })
}