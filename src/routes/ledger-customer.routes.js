const express = require("express");
const customerModel = require("../models/ledger-customer.model");
const transactionModel = require("../models/ledger-transaction.model");

const router = express.Router();

//add customer with the transaction
router.post("/:ledgerType", async (req, res) => {
  const { name, balance, details } = req.body;
  const amount = req.params.ledgerType == 1 ? -balance : balance;

  const data = new customerModel({
    name,
    balance: amount,
  });

  try {
    if (name, balance, details) {
      await data.save().then(async (result) => {
        const transactionData = new transactionModel({
          amount,
          customerId: result._id,
          details,
        });

        transactionData
          .save()
          .then(() =>
            res
              .status(200)
              .json({ message: "User has been added with the transaction" })
          )
          .catch((err) => res.status(400).json({ message: err }));
      });
    } else {
      res.status(400).json({ message: 'Bad Request' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/", async (req, res) => {
  try {
    const data = await customerModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get by customer by id
router.get("/:id", async (req, res) => {
  try {
    const data = await customerModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await customerModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await customerModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
