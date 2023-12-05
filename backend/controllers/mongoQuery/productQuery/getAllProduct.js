const getAllProductQuery = (skip = 0, limit = 4, filter = {}) => {
  return [
    {
      $match: filter
    },
    {
      $project: {
        reviews: 0
      }
    },
    {
      $sort: {
        _id: -1
      }
    },
    {
      $group: {
        _id: null,
        productCount: {
          $sum: 1
        },
        products: {
          $push: '$$ROOT'
        }
      }
    },
    {
      $project: {
        _id: 0,
        productCount: 1,
        products: {
          $slice: ['$products', parseInt(skip), parseInt(limit)]
        }
      }
    },
    {
      $addFields: {
        definition: [
          { dis: 'Tên sản phẩm', key: 'name', type: 'string' },
          { dis: 'Phân loại', key: 'category', type: 'string' },
          { dis: 'Giá sản phẩm', key: 'price', type: 'number' },
          { dis: 'Số lượng tồn kho', key: 'stock', type: 'number' },
          { dis: 'Ratings', key: 'ratings', type: 'number' }
        ]
      }
    }
  ];
};

module.exports = { getAllProductQuery };
