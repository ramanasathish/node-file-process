const fs = require('fs');
const csv = require('csv-parser');
const Joi = require('joi');
const fileModel = require('../model/file-model');
const app = {};

const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    manufacturer: Joi.string().required()
})

app.fetchFromFile = (_, res) => {
    const products = [];
    const errProducts = []
    const insertList = [];
    const readStream = fs.createReadStream('sample.csv');
    readStream.pipe(csv())
        .on('data', (product) => {
            schema.validateAsync(product).then(() => {
                const { id, name, quantity, price, manufacturer } = product;
                insertList.push([id, name, quantity, price, manufacturer]);
                products.push(product);
            }).catch(({details}) => {
                errProducts.push({...product,error:details});
            });
        }).on('end', async () => {
            await fileModel.bulkInsert(insertList);
            res.send(errProducts)
        });
}




module.exports = app;