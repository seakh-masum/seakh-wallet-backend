const express = require('express');
const transactionModel = require('../models/transaction.model');
const accountModel = require('../models/account.model');
const Utils = require('../helper/utils');

const router = express.Router()

//Post Method
router.post('/', async (req, res) => {
  const data = new transactionModel({
    amount: req.body.amount,
    category: req.body.category,
    fromAccount: req.body.fromAccount,
    toAccount: req.body.toAccount,
    type: req.body.type
  })

  try {
    await data.save().then(async (result) => {
      const fromAccountDetails = await accountModel.findOne({ _id: result.fromAccount });
      let amount;

      if (result.type == 2) { // for transfer
        const toAccountDetails = await accountModel.findOne({ _id: result.toAccount });
        amount = fromAccountDetails.balance - result.amount;
        await Utils.updateBalance(result.fromAccount, amount, 'account'); // take amount from from-account; 
        amount = toAccountDetails.balance + result.amount;
        await Utils.updateBalance(result.toAccount, amount, 'account'); // give amount to to-account;
        res.status(200).json({ message: `$${result.amount} is transferred from ${fromAccountDetails.name} to ${toAccountDetails.name}` });
      } else {
        amount = result.type == 0 ? fromAccountDetails.balance + result.amount : fromAccountDetails.balance - result.amount;
        await Utils.updateBalance(result.fromAccount, amount, 'account').then(
          res.status(200).json({ message: `$${result.amount} is ${result.type == 0 ? ' credited to' : 'debited from'} ${fromAccountDetails.name}` })
        )
      }
    });
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});




//Get all Method
router.get('/', async (req, res) => {
  try {
    await transactionModel.find({})
      .populate('fromAccount').populate('toAccount').then((result) => {
        res.json(result);
      }).catch((error) => {
        res.status(500).json({ message: error })
      });;

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    // await transactionModel.find({})
    //   .populate('fromAccount').populate('toAccount').then((result) => {
    //     res.json(result);
    //   }).catch((error) => {
    //     res.status(500).json({ message: error })
    //   });;

    const result = await transactionModel.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: 'fromAccount',
          foreignField: '_id',
          as: 'account'
        }
      },
      {
        $unwind: '$account' // Unwind the array created by $lookup
      },
      {
        $project: {
          _id: 1,
          category: 1,
          type: 1,
          accountName: '$account.name',
          balance: '$account.balance',
          color: '$account.color',
        }
      }
    ]).then((data) => res.json(data))


    // console.log(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await transactionModel.findById(req.params.id);
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

    const result = await transactionModel.findByIdAndUpdate(
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
    const data = await transactionModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;