export const checkName = (name: string): string => {
  if (name.length < 3) {
    return 'username should have minimum 3 symbols';
  }
  return '';
};

export const checkPass = (pass: string): string => {
  const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z]).{3,}$/);
  if (!regExp.test(pass)) {
    return 'password should include at least one digit, at least one uppercase letter, min length 3 characters';
  }
  return '';
};

export const checkConfirm = (pass: string, confirmPass: string): string => {
  if (pass !== confirmPass) {
    return 'passwords mismatch';
  }
  return '';
};

export const checkPhone = (phone: string): string => {
  const regExp = new RegExp(/^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/);
  if (!regExp.test(phone)) {
    return 'phone number should have minimum 12 symbols';
  }
  return '';
};
