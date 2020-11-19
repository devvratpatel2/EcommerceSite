

const Company = require('../models/company.js');


exports.findAll = (req, res) => {
    Company.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Company.findById(req.params.id, (err, company) => {
        if (err) throw err;
        res.send(company);
    })
};

exports.addCompany = (req, res) => {
    Company.create(req.body, (err, data) => {
        if (err) { throw err; }
        res.send(data);
    })
};

exports.removeById = (req, res) => {
    Company.findByIdAndRemove(req.params.id, (err, company) => {
        if (err) throw err;
        res.send(company);
    })
}

exports.updateById = (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body, (err, company) => {
        if (err) throw err;
        res.send(company);
    })
}
