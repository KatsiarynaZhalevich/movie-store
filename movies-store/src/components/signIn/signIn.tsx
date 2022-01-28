import React, { useState } from 'react';
import UserNameInput from '../../elements/userNameInput/userNameInput';
import PasswordInput from '../../elements/passwordInput/passwordInput';
import { Button } from '@mui/material';
import './signIn.scss';

type Props = {
  closeModal: () => void;
};

const SignIn = ({ closeModal }: Props): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setSetPassword] = useState('');
  const [serverError, setServerError] = useState('');

  const setPasswordValue = (value: string) => {
    setSetPassword(value);
  };
  const setUsernameValue = (value: string) => {
    setUsername(value);
  };

  const submitForm = async (event: any) => {
    const user = { username, password };
    try {
      await fetch('http://localhost:8081/api/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          switch (response.status) {
            case 400:
              setServerError('Incorrect username or password');
              // event.preventDefault();
              // return false;
              break;
            default:
              break;
          }
          return response.json();
        })
        .then((response) => {
          window.localStorage.setItem('token', response.token);
          // dispatch(authAction(response.user));
          // history.push(route);
          console.log('tre');
          closeModal();
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(serverError);

  return (
    <form className="signIn">
      <UserNameInput setUsernameValue={setUsernameValue} typeModal="signIn" />
      <PasswordInput setPasswordValue={setPasswordValue} typeModal="signIn" typePass="password" />
      <Button
        className="submit"
        type="button"
        variant="contained"
        disabled={username === '' || password === ''}
        sx={{
          backgroundColor: '#ff6600',
          height: '45px',
          '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
        }}
        size="large"
        onClick={submitForm}
      >
        SignIn
      </Button>
      {serverError ? <p className="error -server">{serverError}</p> : null}
    </form>
  );
};
export default SignIn;
