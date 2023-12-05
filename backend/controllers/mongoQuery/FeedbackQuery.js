module.exports = function (filter = {}, sort = { createdAt: -1 }, skip = '0', limit = '4') {
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
        title: 1,
        content: 1,
        createdAt: 1,
        'createdUser.name': 1
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
      $sort: sort
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
    },
    {
      $addFields: {
        definition: [
          { dis: 'Tiêu đề', key: 'title', type: 'string' },
          { dis: 'Nội dung', key: 'content', type: 'string' },
          { dis: 'Thời gian tạo', key: 'createdAt', type: 'date' },
          { dis: 'Người tạo', key: 'createdUser', type: 'string' }
        ]
      }
    }
  ];
};
