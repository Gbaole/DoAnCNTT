module.exports = function (filter = {}, id, skip = 0, limit = 7) {
  return [
    {
      $match: {
        $and: [
          {
            $or: [
              {
                shipper: id
              },
              {
                orderStatus: 0
              }
            ]
          },
          { orderStatus: { $ne: 4 } },
          filter
        ]
      }
    },
    {
      $addFields: {
        rejected: {
          $in: [id.toString(), '$rejectShipper']
        }
      }
    },
    {
      $match: {
        rejected: false
      }
    },
    {
      $project: {
        'shippingInfo.mdh': 1,
        'shippingInfo.senderAddress.location': 1,
        'shippingInfo.senderAddress.address': 1,
        'shippingInfo.recieverAddress.location': 1,
        'shippingInfo.recieverAddress.address': 1,
        shippingPrice: 1,
        shippingDistance: 1,
        orderStatus: 1,
        createdAt: 1,
        'paymentInfo.serviceType': 1
      }
    },
    {
      $sort: {
        createdAt: -1
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
