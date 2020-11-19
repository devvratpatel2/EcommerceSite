module.exports = function (app) {

    var products = require('../controllers/product.controller.js');

    // Get all products
    app.get('/api/products', products.findAll);

    // Get Product by Id
    app.get('/api/products/:id', products.findProductById);

    // Get Product by Name
    app.get('/api/products/:productName', products.findByName);

    // Get all Products of a Company
    app.get('/api/products/company/:companyId', products.findByCompanyId);

    // Add New Product
    app.post('/api/products', products.addProduct);

    // Delete a Product By Id
    app.delete('/api/products/:id', products.removeById);

    // Update a Product By Id
    app.put('/api/products/:id', products.updateById);
}