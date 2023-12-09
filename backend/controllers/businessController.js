const Business = require('../models/businessModel');
const mongoose = require('mongoose');

// get all published businesses
const getPublishedBusinesses = async (req, res) => {
  const businesses = await Business.find({ isPublished: true }).sort({
    createdAt: -1,
  });

  res.status(200).json(businesses);
};

// get one users businesses
const getUsersBusinesses = async (req, res) => {
  const user_id = req.user._id;

  const businesses = await Business.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(businesses);
};

// get a single business
const getBusiness = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business = await Business.findById(id);

  if (!business) {
    return res.status(404).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

// create new business
const createBusiness = async (req, res) => {
  const {
    businessName,
    owner,
    campus,
    shortDescription,
    longDescription,
    category,
    addressOne,
    addressTwo,
    city,
    state,
    zip,
    phone,
    areasServed,
    isPublished,
  } = req.body;

  let emptyFields = [];

  if (!businessName) {
    emptyFields.push('businessName');
  }
  if (!owner) {
    emptyFields.push('owner');
  }
  if (!campus) {
    emptyFields.push('campus');
  }
  if (!shortDescription) {
    emptyFields.push('shortDescription');
  }
  if (!longDescription) {
    emptyFields.push('longDescription');
  }
  if (!category) {
    emptyFields.push('category');
  }
  if (!addressOne) {
    emptyFields.push('addressOne');
  }
  if (!addressTwo) {
    emptyFields.push('addressTwo');
  }
  if (!city) {
    emptyFields.push('city');
  }
  if (!state) {
    emptyFields.push('state');
  }
  if (!zip) {
    emptyFields.push('zip');
  }
  if (!phone) {
    emptyFields.push('phone');
  }
  if (!areasServed) {
    emptyFields.push('areasServed');
  }
  if (!isPublished) {
    emptyFields.push('isPublished');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const business = await Business.create({
      businessName,
      owner,
      campus,
      shortDescription,
      longDescription,
      category,
      addressOne,
      addressTwo,
      city,
      state,
      zip,
      phone,
      areasServed,
      isPublished,
      user_id,
    });
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a business
const deleteBusiness = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business = await Business.findOneAndDelete({ _id: id });

  if (!business) {
    return res.status(400).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

// update a business
const updateBusiness = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business = await Business.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!business) {
    return res.status(400).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

module.exports = {
  getUsersBusinesses,
  getPublishedBusinesses,
  getBusiness,
  createBusiness,
  deleteBusiness,
  updateBusiness,
};
