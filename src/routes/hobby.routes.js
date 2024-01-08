const express = require('express');
const model = require('../models/hobby.model');

const router = express.Router()

router.post('/', async (req, res) => {
  const body = req.body;
  const data = new model({
    label: body.label,
    color: body.color,
    icon: body.icon,
    order: body.order,
  })

  try {
    await data.save().then(
      res.status(200).json({ message: 'Succesfully added!!' })
    ).catch((err) => {
      res.status(500).json({ message: err })
    })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/', async (req, res) => {
  try {
    const data = await model.find();
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})


//Get by ID Method
router.get('/:id', async (req, res) => {
  try {
    const data = await model.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await model.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await model.findByIdAndDelete(id)
    res.send(`Document with ${data.title} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;