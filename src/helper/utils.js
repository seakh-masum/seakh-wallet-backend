const accountModel = require('../models/account.model');
const customerModel = require('../models/ledger-customer.model');

const Utils = {
  updateBalance: async (id, amount, type) => {
    const update = {
      $set: {
        balance: amount
      }
    };
    return type == 'customer' ? await customerModel.updateOne({ _id: id }, update) : await accountModel.updateOne({ _id: id }, update)
  },
}


module.exports = Utils;