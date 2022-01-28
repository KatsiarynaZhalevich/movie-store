import React, { useState } from 'react';
import UserNameInput from '../../elements/userNameInput/userNameInput';
import PasswordInput from '../../elements/passwordInput/passwordInput';
import { Button } from '@mui/material';
import './signUp.scss';
import { checkConfirm } from '../../utils/formValidation';

type Props = {
  closeModal: () => void;
};

const SignUp = ({ closeModal }: Props): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
  });

  const setUsernameValue = (value: string, error?: string) => {
    setUsername(value);
    setErrors({ ...errors, usernameError: error || '' });
  };

  const setPasswordValue = (value: string, error?: string) => {
    setPassword(value);
    setErrors({ ...errors, passwordError: error || '' });
    console.log('err', error);
  };

  const setConfirmPasswordValue = (value: string) => {
    setConfirmPassword(value);
    const confirmErr = checkConfirm(password, value);
    setConfirmError(confirmErr);
  };

  const submitForm = async () => {
    console.log(serverError);
    const newUser = { username, password };
    try {
      await fetch('http://localhost:8081/api/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          switch (response.status) {
            case 400:
              setServerError('this username is unavailable');
              return;
              break;
            default:
              break;
          }
          return response.json();
        })
        .then((response) => {
          if (response) {
            window.localStorage.setItem('token', response.token);
            // dispatch(authAction(response.newUser));
            // history.push(routers.PROFILE_ROUTE);
            closeModal();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="signIn">
      <UserNameInput setUsernameValue={setUsernameValue} typeModal="signUp" />
      <PasswordInput setPasswordValue={setPasswordValue} typeModal="signUp" typePass="password" />
      <PasswordInput
        setPasswordValue={setConfirmPasswordValue}
        typeModal="signUp"
        typePass="confirmPassword"
      />
      {confirmError ? <p className="error -confirm">{confirmError}</p> : null}
      <Button
        className="submit"
        type="button"
        variant="contained"
        disabled={
          username === '' ||
          password === '' ||
          confirmPassword === '' ||
          errors.passwordError !== ''
        }
        sx={{
          backgroundColor: '#ff6600',
          height: '45px',
          '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
        }}
        onClick={submitForm}
      >
        SignUp
      </Button>
      {serverError ? <p className="error -server - signUp">{serverError}</p> : null}
    </form>
  );
};
export default SignUp;
