const cloudinary = require('cloudinary').v2;

exports.uploadImg = async (imFile) => {
  const savePath = '/tmp/' + imFile.name;
  await imFile.mv(savePath);
  const type = imFile.mimetype.split('/');
  const cloudinaryUrl = await upload2Cloudinary(savePath, imFile.name, type[0]);
  return {
    url: cloudinaryUrl,
    name: imFile.name,
    mediaType: imFile.mimetype
  };
};

const upload2Cloudinary = async (path, mdh, resource_type = 'image') => {
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
};

exports.deleteCloudinaryImage = async (imgName) => {
  console.log('deleting', imgName);
  await cloudinary.uploader.destroy(imgName, function (error, result) {
    console.log(result, error);
  });
};
