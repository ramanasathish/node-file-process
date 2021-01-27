const fs = require('fs');
const csv = require('csv-parser');
const Joi = require('joi');
const fileModel = require('../model/file-model');
const app = {};

const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    manufacturer: Joi.number().required()
})

app.fetchFromFile = (req, res) => {
    const products = [];
    const insertList = [];
    const readStream = fs.createReadStream('../sample.csv');
    readStream.pipe(csv())
        .on('data', async (product) => {
            const validation = await schema.validateAsync(product);
            console.log(validation);
            const {id,name,quantity,price,manufacturer} = product;
            insertList.push([id,name,quantity,price,manufacturer]);
            products.push(user);
        }).on('end', async () =>{
            console.table(users);
            console.table(insertList)
            await fileModel.bulkInsert(insertList);
            res.send(products)
        });
}




module.exports = app;