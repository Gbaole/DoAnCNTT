//Create and send tolen and save in cookie
const sendToken = (user, statusCode, res) => {
  //create jwt token
  const token = user.getJwtToken();

  //Option for cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'lax',
    domain: process.env.NODE_ENV === 'prod' ? `.${process.env.FRONTEND_DOMAIN}` : '',
    path: '/',
    secure: process.env.NODE_ENV === 'prod'
  };

  res
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    })
    .status(statusCode);
};
module.exports = { sendToken };
