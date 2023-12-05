module.exports = function (id, skip = 0, limit = 4) {
  return [
    {
      $match: {
        // name: 1,
        username: id
      }
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        createdAt: 1,
        countBalance: {
          $sum: 1
        },
        balance: { $slice: ['$balance', parseInt(skip), parseInt(limit)] }
      }
    }
  ];
};
