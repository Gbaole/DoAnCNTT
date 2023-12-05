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
    },
    {
      $addFields: {
        definition: [
          { dis: 'Danh mục', key: 'type', type: 'string' },
          { dis: 'Tiêu đề', key: 'heading', type: 'string' },
          // { dis: 'Ảnh bìa', key: 'coverImage', type: 'string' },
          { dis: 'Lượt xem', key: 'view', type: 'number' },
          { dis: 'Trạng Thái', key: 'status', type: 'number' },
          { dis: 'Độ ưu tiên', key: 'priority', type: 'number' },
          { dis: 'Thời gian tạo', key: 'createdAt', type: 'date' },
          { dis: 'Người tạo', key: 'createdUser', type: 'string' },
          { dis: 'Người chỉnh sửa', key: 'editedUSer', type: 'string' }
        ]
      }
    }
  ];
};
