const fs = require('fs');
const csv = require('csv-parser');
const Joi = require('joi');
const app = {};

const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    manufacturer: Joi.number().required()
})

app.fetchFromFile = (req, res) => {
    const products = [];
    const readStream = fs.createReadStream('../sample.csv');
    readStream.pipe(csv())
        .on('data', async (product) => {
            const validation = await schema.validateAsync(product);
            console.log(validation);
            products.push(user);
        }).on('end', function () {
            console.table(users);
            res.send(products)
        });

}




module.exports = app;