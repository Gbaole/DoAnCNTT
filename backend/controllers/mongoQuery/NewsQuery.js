module.exports = function (filter = {}, skip = '0', limit = '4') {
  return [
    {
      $match: filter
    },
    {
      $lookup: {
        from: 'users',
        localField: 'createdUser',
        foreignField: '_id',
        as: 'createdUser'
      }
    },
    {
      $project: {
        __v: 0,
        image: 0
      }
    },
    {
      $addFields: {
        createdUser: {
          $first: '$createdUser'
        }
      }
    },
    {
      $addFields: {
        createdUser: '$createdUser.name'
      }
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1
        },
        records: {
          $push: '$$ROOT'
        }
      }
    },
    {
      $project: {
        _id: 0,
        count: 1,
        records: {
          $slice: ['$records', parseInt(skip), parseInt(limit)]
        }
      }
    }
  ];
};
