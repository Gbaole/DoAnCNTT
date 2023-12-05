module.exports = function (filter = {}, skip = 0, limit = 4) {
  return [
    {
      $match: filter
    },
    {
      $addFields: {
        name: '$contactInfo.name',
        email: '$contactInfo.email',
        // phone: '$contactInfo.phone',
        // district: '$contactInfo.address.district',
        province: '$contactInfo.address.province',
        productCount: '$cart.count',
        totalPrice: '$cart.totalPrice'
      }
    },
    {
      $project: {
        contactInfo: 0,
        cart: 0,
        __v: 0
      }
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1
        },
        totalPrice: {
          $sum: '$totalPrice'
        },
        orders: {
          $push: '$$ROOT'
        }
      }
    },
    {
      $project: {
        count: 1,
        totalPrice: 1,
        orders: {
          $slice: ['$orders', parseInt(skip), parseInt(limit)]
        }
      }
    },
    {
      $addFields: {
        definition: [
          { dis: 'Ngày tạo', key: 'createdAt', type: 'period' },
          { dis: 'Mã đơn hàng', key: 'mdh', type: 'string' },
          { dis: 'Tên người đặt', key: 'name', type: 'string' },
          { dis: 'Email', key: 'email', type: 'string' },
          // { dis: 'Số điện thoại', key: 'phone', type: 'string' },
          // { dis: 'Quận/huyện', key: 'district', type: 'string' },
          { dis: 'Tỉnh/thành phố', key: 'province', type: 'string' },
          { dis: 'Số lượng', key: 'productCount', type: 'string' },
          { dis: 'Giá tiền', key: 'totalPrice', type: 'currency' }
        ]
      }
    }
  ];
};
