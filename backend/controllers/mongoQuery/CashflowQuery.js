module.exports = function (period, filter = {}, sort = { dateAdded: -1 }, skip = '0', limit = '4') {
  return [
    {
      $match: filter
    },
    period !== undefined
      ? {
          $match: {
            dateAdded: {
              $gte: period.from,
              $lte: period.to
            }
          }
        }
      : null,
    {
      $project: {
        _id: 0,
        __v: 0
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
        total: {
          $sum: '$amount'
        },
        codTotal: {
          $sum: '$COD'
        },
        shippingPriceTotal: {
          $sum: '$shippingPrice'
        },
        returnTotal: {
          $sum: '$xeduProfit'
        },
        cashbackTotal: {
          $sum: '$shipperProfit'
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
        total: 1,
        codTotal: 1,
        shippingPriceTotal: 1,
        returnTotal: 1,
        cashbackTotal: 1,
        records: {
          $slice: ['$records', parseInt(skip), parseInt(limit)]
        }
      }
    },
    {
      $addFields: {
        definition: [
          { dis: 'Mã đơn hàng', key: 'mdh', type: 'string' },
          { dis: 'Tổng', key: 'amount', type: 'currency' },
          { dis: 'Phí ship', key: 'shippingPrice', type: 'currency' },
          { dis: 'COD', key: 'COD', type: 'currency' },
          { dis: 'Đã thanh toán ship', key: 'shippingPriceIsPaid', type: 'boolean' },
          { dis: 'Đã thanh toán COD', key: 'CODIsPaid', type: 'boolean' },
          { dis: 'Doanh thu Xe dù', key: 'xeduProfit', type: 'currency' },
          { dis: 'Doanh thu shipper', key: 'shipperProfit', type: 'currency' },
          { dis: 'Ngày hoàn thành', key: 'dateAdded', type: 'date' }
        ]
      }
    }
  ];
};
