module.exports = function (app) {

    var companies = require('../controllers/company.controller.js')

    app.get('/api/companies', companies.findAll);

    app.get('/api/companies/:id', companies.findById);

    app.post('/api/companies', companies.addCompany);

    app.put('/api/companies/:id', companies.updateById);

    app.delete('/api/companies/:id', companies.removeById);

}