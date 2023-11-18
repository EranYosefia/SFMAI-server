const Product = require("./productModel");
const axios = require("axios");

const addAccountProduct = async function(product, token) {
    const {data} =  await axios.get('http://localhost:8080/customer/getCustomers', {
        headers: {
            'Authorization': `${token}`
        }
    })
    if (await Product.findOne({"serial_number":product.serial_number})){
        throw new Error(`The serial number ${product.serial_number} already exist`)
    }
    if (await Product.findOne({"name":product.name})){
        throw new Error(`The product ${product.name} already exist`)
    }
    for(const customer of data) {
        product.customer_id = customer._id
        product.account_id = customer.account_id
        const newProduct = await Product.create(product);
        newProduct.save();
    }
}
const deleteAccountProduct = async function (account_id, serial_number) {
    const deleteResult = await Product.deleteMany({"account_id": account_id, "serial_number": serial_number});
    console.log(deleteResult)
    if (deleteResult.deletedCount == 0){
        throw new Error(`Serial Number ${serial_number} not found`)
    } 
}

const updateAccountProduct = async function (account_id, serial_number, updateProduct) {
    if (serial_number != updateProduct.serial_number){
        if (await Product.findOne({"serial_number":updateProduct.serial_number})){
            throw new Error(`The serial number ${updateProduct.serial_number} already exist`)
        }
    }
    const prod = await Product.findOne({"name":updateProduct.name})
    if (prod && prod.serial_number != updateProduct.serial_number){
        throw new Error(`The product ${updateProduct.name} already exist`)
    }
    const updateResult = await Product.updateMany({"account_id": account_id, "serial_number": serial_number} ,updateProduct);
    if (updateResult.matchedCount == 0){
        throw new Error(`Product ${updateProduct.name} does not found`)
    }
}

const updateCustomerProduct = async function (account_id, product_id, updateProduct  ) {
    const updatedProduct = await Product.findOneAndUpdate ({"account_id": account_id, "_id": product_id}, updateProduct)
    if (!updatedProduct){
        throw new Error(`Product ${product_id} does not found`)
    }
}







module.exports= {
    addAccountProduct,
    deleteAccountProduct,
    updateAccountProduct,
    updateCustomerProduct,

}