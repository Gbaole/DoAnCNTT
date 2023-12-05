const mongoose = require('mongoose');

module.exports = function (id, skip = 0, limit = 4) {
  return [
    {
      $match: {
        _id: mongoose.Types.ObjectId(id)
      }
    },
    {
      $project: {
        _id: 0,
        balance: 1
      }
    },
    {
      $unwind: {
        path: '$balance'
      }
    },
    {
      $sort: {
        'balance.dateAdded': -1
      }
    },
    {
      $group: {
        _id: '$_id',
        count: {
          $sum: 1
        },
        total: {
          $sum: '$balance.moneyTotal'
        },
        codTotal: {
          $sum: '$balance.moneyCOD'
        },
        returnTotal: {
          $sum: '$balance.moneyReturn'
        },
        cashbackTotal: {
          $sum: '$balance.moneyCashback'
        },
        records: {
          $push: '$$ROOT.balance'
        }
      }
    },
    {
      $project: {
        _id: 0,
        count: 1,
        total: 1,
        codTotal: 1,
        returnTotal: 1,
        cashbackTotal: 1,
        records: {
          $slice: ['$records', parseInt(skip), parseInt(limit)]
        }
      }
    }
  ];
};
