const auth = require("../middleware/auth");
const express = require("express");
const productBL = require("../models/productBL");

const router = express.Router();

router.post("/addAccountProduct", auth, async (req, res) => {
  const token = req.headers["authorization"]
  const product = req.body;
  try {
    const prod = await productBL.addAccountProduct(product, token);
    res.status(201).json({ message: `Account Product ${product.name} added successfully` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

  // router.post("/addCustomerProduct", auth, async (req, res) => {
  //   const product = req.body;
  //   product.account_id = req.account_id
  //   try {
  //     const newProduct = await productBL.addCustomerProduct(product);
  //     res.status(201).json({ message: `Customer Product ${newProduct.name} added successfully` });
  //   } catch (error) {
  //     res.status(409).json({ message: error.message });
  //   }
  // });

  router.delete("/deleteAccountProduct/:serial_number" , auth, async (req, res) => {
    const {serial_number} = req.params
    try {
      await productBL.deleteAccountProduct(req.account_id, serial_number);
      res.status(201).json({ message: `Account Product ${serial_number} deleted successfully`})
    } catch (error) {
      res.status(404).json({message :error.message})
    }
  })

  // router.delete("/deleteCustomerProduct/:product_id" , auth, async (req, res) => {
  //   const product_id = req.params.product_id
  //   try {
  //     const deleted_product = await productBL.deleteCustomerProduct(req.account_id, product_id);
  //     res.status(201).json({ message: `Customer Product ${deleted_product.name} deleted successfully`})
  //   } catch (error) {
  //     res.status(404).json({message :error.message})
  //   }
  // })

  router.put("/updateAccountProduct/:serial_number" , auth, async (req, res) => {
    const {serial_number} = req.params
    const updateProduct = req.body
    try{
      await productBL.updateAccountProduct(req.account_id, serial_number, updateProduct);
      res.status(201).json({message : `Account Product ${updateProduct.name} Updated successfully`})
    } catch (error) {
      res.status(400).json({message: error.message})
    }
    })

  router.put("/updateCustomerProduct/:product_id" , auth, async (req, res) => {
    const updateProduct = req.body
    const {product_id} = req.params
    try{
      await productBL.updateCustomerProduct(req.account_id, product_id, updateProduct );
      res.status(201).json({message : `Customer Product ${updateProduct.name} Updated successfully`})
    } catch (error) {
      res.status(400).json({message: error.message})
    }
    })

    module.exports = router;