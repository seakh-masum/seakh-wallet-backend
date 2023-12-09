const express = require('express');
const ledgerTransactionModel = require('../models/ledger-transaction.model');
const ledgerCustomerModel = require('../models/ledger-customer.model');
const Utils = require('../helper/utils');

const router = express.Router()

//Add transaction data
router.post('/:type/:customerId', async (req, res) => {
  const { body, params } = req;
  const amount = params.type == 1 ? -body.amount : body.amount;
  const data = new ledgerTransactionModel({
    amount: amount,
    customerId: params.customerId,
    details: body.details,
  })

  try {
    await data.save().then(async (result) => {
      const customerDetails = await ledgerCustomerModel.findOne({ _id: result.customerId });
      const message = amount < 0 ? `You give ${Math.abs(amount)} to ${customerDetails.name}` : `${customerDetails.name} give ${Math.abs(amount)} to You`
      await Utils.updateBalance(result.customerId, customerDetails.balance + amount, 'customer').then(
        res.status(200).json({ message })
      )
    });
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/', async (req, res) => {
  try {
    const data = await ledgerTransactionModel.find();
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get individual customer transactions
router.get('/customer/:id', async (req, res) => {
  try {
    const data = await ledgerTransactionModel.find({ customerId: req.params.id });
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await ledgerTransactionModel.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ledgerTransactionModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;