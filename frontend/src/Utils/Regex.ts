const emailValidate = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

const vietnamPhoneNumberValidate = new RegExp(
  '^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$'
);

const vietnamIDValidate = new RegExp(`^\\d{9}(\\d{3})?$`);

const usernameValidation = new RegExp('^[0-9a-z_]{6,30}$');

const passwordValidation = new RegExp('^[\\w\\d\\s]{6,100}$');

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
let mediumPassword = new RegExp(
  '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
);

export {
  emailValidate,
  vietnamPhoneNumberValidate,
  vietnamIDValidate,
  usernameValidation,
  passwordValidation,
  strongPassword,
  mediumPassword
};