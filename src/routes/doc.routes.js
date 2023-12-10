const express = require('express');
const model = require('../models/doc.model');

const router = express.Router()

//Post Method
router.post('/', async (req, res) => {
  const body = req.body;
  const data = new model({
    title: body.title,
    details: body.details,
    color: body.color,
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
    // await model.createIndexes({ title: 'text' });
    const data = await model.find();
    res.json(data)

    // await model.createIndexes({ title: 'text' }, (err, result) => {
    //   if (err) throw err;

    //   console.log('Text index created successfully');

    //   // Now you can perform a $text search
    //   model.find({ $text: { $search: 'your search query' } }).toArray((err, docs) => {
    //     if (err) throw err;

    //     console.log('Found the following documents:');
    //     console.log(docs);

    //     // Close the connection
    //     // client.close();
    //   });
    // });
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
router.patch('/:id', async (req, res) => {
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