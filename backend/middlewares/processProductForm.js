const { ErrorHandler } = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const cloudinary = require('cloudinary').v2;

exports.processProductForm = catchAsyncErrors(async (req, res, next) => {
  try {
    req.body.createdUser = req.user.id;
    const ptArray = [];
    // // process pt image
    if (req.files) {
      let filesArrayName = Object.getOwnPropertyNames(req.files);
      for (let i = 0; i < filesArrayName.length; i++) {
        if (filesArrayName[i] == 'thumbnail') continue;
        const val = filesArrayName[i].split('_');
        const attName = val.pop();
        const index = val.pop();
        const att = val.pop();
        if (att === 'productType') {
          ptArray.push({
            index,
            image: [req.files[filesArrayName[i]]]
          });
        }
      }
    }
    console.log(ptArray);

    // process pt body + uploaded image
    const attArray = Object.getOwnPropertyNames(req.body);
    for (let i = 0; i < attArray.length; i++) {
      const val = attArray[i].split('_');
      if (val.length === 3) {
        const attName = val.pop();
        const index = val.pop();
        const att = val.pop();
        if (att === 'productType') {
          console.log(attArray[i]);
          const pos = getArrayIndex(index, ptArray);
          if (pos === -1) {
            ptArray.push({
              index,
              [attName]: req.body[attArray[i]]
            });
          } else {
            if (attName !== 'image') {
              ptArray[pos][attName] = req.body[attArray[i]]; //mutate
            } else {
              if (typeof req.body[attArray[i]] == 'object') {
                const tmp = [];
                for (let j = 0; j < req.body[attArray[i]].length; j++) {
                  console.log(typeof req.body[attArray[i]][j]);
                  if (typeof req.body[attArray[i]][j] === 'string') {
                    tmp.push(JSON.parse(req.body[attArray[i]][j]));
                  } else {
                    tmp.push(req.body[attArray[i]][j]);
                  }
                }
                if (ptArray[pos]?.image === undefined) {
                  ptArray[pos].image = tmp;
                } else {
                  ptArray[pos].image = [...ptArray[pos].image, ...tmp];
                }
              } else {
                if (ptArray[pos]?.image === undefined) {
                  ptArray[pos].image = [JSON.parse(req.body[attArray[i]])];
                } else {
                  ptArray[pos].image = [...ptArray[pos].image, JSON.parse(req.body[attArray[i]])];
                }
              }
            }
          }
        }
      }
    }
    const thumbnailFiles = req.files?.thumbnail;
    const thumbArray = [];
    if (thumbnailFiles !== undefined) {
      if (thumbnailFiles.length !== undefined) {
        for (let i = 0; i < thumbnailFiles.length; i++) {
          const imgObj = await uploadImg(thumbnailFiles[i]);
          thumbArray.push(imgObj);
        }
      } else {
        const imgObj = await uploadImg(thumbnailFiles);
        thumbArray.push(imgObj);
      }
    }
    if (req.body.thumbnail) {
      if (typeof req.body.thumbnail == 'object') {
        for (let i = 0; i < req.body.thumbnail.length; i++) {
          thumbArray.push(JSON.parse(req.body.thumbnail[i]));
        }
      } else {
        console.log(req.body.thumbnail);
        thumbArray.push(JSON.parse(req.body.thumbnail));
      }
    }

    console.log('Uploading state');

    for (let i = 0; i < ptArray.length; i++) {
      for (let j = 0; j < ptArray[i].image.length; j++) {
        if (ptArray[i].image[j].mv !== undefined) {
          const imgObj = await uploadImg(ptArray[i].image[j]);
          console.log(imgObj);
          ptArray[i].image[j] = imgObj;
        }
      }
    }

    ptArray.sort((a, b) => {
      if (a.index > b.index) return 1;
      if (a.index < b.index) return -1;
      return 0;
    });

    // console.log(ptArray);
    req.body.ecomURL = JSON.parse(req.body.ecomURL);

    const { name, price, description, category, createdUser, ecomURL } = req.body;

    req.body = {
      name,
      price,
      description,
      category,
      ecomURL,
      thumbnail: thumbArray,
      createdUser,
      productType: ptArray
    };
    next();
  } catch (error) {
    console.log(error);
    return next(ErrorHandler(error.message, 500, res));
  }
});

async function uploadImg(imFile) {
  const savePath = '/tmp/' + imFile.name;
  await imFile.mv(savePath);
  const type = imFile.mimetype.split('/');
  const cloudinaryUrl = await upload2Cloudinary(savePath, imFile.name, type[0]);
  return {
    url: cloudinaryUrl,
    name: imFile.name,
    mediaType: imFile.mimetype
  };
}

async function upload2Cloudinary(path, mdh, resource_type = 'image') {
  let res;
  console.log('Uploading to cloudinary');
  await cloudinary.uploader
    .upload(path, { public_id: mdh, resource_type })
    .then((data) => {
      // console.log(data);
      // console.log(data.secure_url);
      res = data.secure_url;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('Upload done!');
  return res;
}

function getArrayIndex(index, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].index === index) return i;
  }
  return -1;
}
