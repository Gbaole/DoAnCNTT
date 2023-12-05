module.exports = function (filter = {}, sort = { createdAt: 1 }, skip = '0', limit = '10') {
  return [
    {
      $match: filter
    },
    {
      $project: {
        resetPasswordToken: 0
      }
    },
    {
      $sort: sort
    },
    {
      $project: {
        // _id: 0,
        password: 0,
        location: 0,
        balance: 0,
        avatar: 0,
        __v: 0
        // createdAt: 0
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
          { dis: 'Họ Tên', key: 'name', type: 'string' },
          { dis: 'username', key: 'username', type: 'string' },
          { dis: 'Ngày sinh', key: 'dateOfBirth', type: 'string' },
          { dis: 'Email', key: 'email', type: 'string' },
          { dis: 'Số điện thoại', key: 'phoneNumber', type: 'string' },
          { dis: 'CCCD', key: 'CCCD', type: 'string' },
          { dis: 'Điểm', key: 'point', type: 'number' },
          { dis: 'Tỉ lệ nhận đơn', key: 'ratio', type: 'number' },
          { dis: 'Phân quyền', key: 'role', type: 'string' },
          { dis: 'Trạng thái', key: 'status', type: 'number' },
          { dis: 'Recent active time', key: 'recentActiveTimes', type: 'period' },
          { dis: 'Tạo lúc', key: 'createdAt', type: 'date' }
        ]
      }
    }
  ];
};
