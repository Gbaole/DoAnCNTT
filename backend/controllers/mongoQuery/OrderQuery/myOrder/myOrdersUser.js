module.exports = function (filter = {}, id, skip = 0, limit = 4) {
  return [
    {
      $match: {
        $and: [
          {
            createdUser: id
          },
          filter
        ]
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'shipper',
        foreignField: '_id',
        as: 'shipper'
      }
    },
    {
      $project: {
        'shippingInfo.mdh': 1,
        'shippingInfo.senderAddress.location': 1,
        'shippingInfo.senderAddress.address': 1,
        'shippingInfo.recieverAddress.location': 1,
        'shippingInfo.recieverAddress.address': 1,
        'shippingInfo.recieverName': 1,
        'shippingInfo.senderName': 1,
        shippingPrice: 1,
        totalPrice: 1,
        shippingDistance: 1,
        orderStatus: 1,
        createdAt: 1,
        'paymentInfo.serviceType': 1,
        'shipper.name': 1,
        'packageDetail.name': 1,
        createdUser: 1
      }
    },
    { $group: { _id: null, count: { $sum: 1 }, orderList: { $push: '$$ROOT' } } },
    {
      $project: {
        _id: 0,
        count: 1,
        orderList: { $slice: ['$orderList', parseInt(skip), parseInt(limit)] }
      }
    }
  ];
};
