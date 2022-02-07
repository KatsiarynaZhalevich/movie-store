import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../interfaces';
import './profile.scss';
import getUser from '../../redux/selectors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, InputAdornment, OutlinedInput, TextField, Button } from '@mui/material';
import { checkConfirm, checkName, checkPass, checkPhone } from '../../utils/formValidation';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authAction } from '../../redux/actions';

const Profile: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const user: IUser | null = useSelector(getUser);
  const [username, setUsername] = useState(user?.username);
  const [phone, setPhone] = useState(user?.phone);

  const [passwords, setPassword] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [errors, setErrors] = useState({
    username: '',
    phone: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [serverErrors, setServerErrors] = useState({
    username: '',
    password: '',
  });

  const editProfile = () => {
    if (showEdit) {
      setUsername(user?.username);
      setPhone(user?.phone);
      setErrors({ username: '', phone: '', newPassword: '', confirmNewPassword: '' });
      setServerErrors({
        username: '',
        password: '',
      });
    }
    setShowEdit(!showEdit);
  };

  const checkUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkErr = checkName(event.target.value);
    setErrors({ ...errors, username: checkErr });
    setUsername(event.target.value);
  };
  const checkPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkErr = checkPhone(event.target.value);
    setErrors({ ...errors, phone: checkErr });
    setPhone(event.target.value);
  };

  const checkPasswordValue = (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...passwords, [input]: event.target.value });
    if (input === 'newPassword') {
      const checkErr = checkPass(event.target.value);
      setErrors({ ...errors, newPassword: checkErr });
    }
    if (input === 'confirmNewPassword') {
      const confirmErr = checkConfirm(passwords.newPassword, event.target.value);
      setErrors({ ...errors, confirmNewPassword: confirmErr });
    }
  };

  const handleShowPassword = (input: string) => {
    setShowPassword({
      ...showPassword,
      [input]: !showPassword[input as keyof typeof showPassword],
    });
  };

  const editProfileData = async () => {
    const newData = { id: user?.id, username, phone };

    try {
      await fetch('http://localhost:8081/api/updateProfileData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
        .then((response) => {
          switch (response.status) {
            case 400:
              setServerErrors({ ...serverErrors, username: 'This username is unavailable' });
              break;
            default:
              break;
          }
          return response.json();
        })
        .then((response) => {
          if (response) {
            editProfile();
            setUsername(response.username);
            setPhone(response.phone);
            dispatch(authAction(response));
          }
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  const editPassword = async () => {
    const newData = {
      newPassword: passwords.newPassword,
      password: passwords.password,
      id: user?.id,
    };
    try {
      const response = await fetch('http://localhost:8081/api/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      switch (response.status) {
        case 200:
          editProfile();
          break;
        case 400:
          setServerErrors({
            ...serverErrors,
            password: 'The old password was entered incorrectly',
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content -profile">
      <div className="profile-container">
        <div className="title">
          <h3>YOUR PROFILE</h3>
          <IconButton
            type="submit"
            size="large"
            aria-label="edit"
            color="inherit"
            onClick={editProfile}
          >
            {showEdit ? <CloseOutlinedIcon /> : <ModeEditIcon />}
          </IconButton>
        </div>
        <div className="profile-data">
          <div>
            <p>Username:</p>
            {!showEdit ? (
              <strong className="profileName">{user?.username}</strong>
            ) : (
              <TextField
                id="Username"
                value={username}
                variant="outlined"
                onChange={checkUsername}
                sx={{
                  height: '31px',
                  backgroundColor: '#fff',
                  marginLeft: '5px',
                  '& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ff6600',
                  },
                }}
              />
            )}
            {serverErrors.username ? <p className="error -data">{serverErrors.username}</p> : null}
          </div>
          <div>
            <p>Phone:</p>
            {!showEdit ? (
              <strong className="phone">{user?.phone}</strong>
            ) : (
              <TextField
                id="outlined-basic"
                value={phone}
                variant="outlined"
                onChange={checkPhoneNumber}
                sx={{
                  height: '31px',
                  backgroundColor: '#fff',
                  marginLeft: '34px',
                  '& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ff6600',
                  },
                }}
              />
            )}
            {errors.phone ? <p className="error -data">{errors.phone}</p> : null}
          </div>

          {showEdit ? (
            <>
              <div className="btn-wrap">
                <Button
                  sx={{
                    backgroundColor: '#ff6600',
                    '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
                  }}
                  className="confirm"
                  variant="contained"
                  onClick={editProfileData}
                  disabled={errors.username !== '' || errors.phone !== ''}
                >
                  Confirm
                </Button>
                {/* <Button
              sx={{
                backgroundColor: '#ff6600',
                '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
              }}
              className="confirm cancel"
              variant="contained"
              onClick={editProfile}
            >
              Cancel
            </Button> */}
              </div>
              <div className="pswd">
                <p>Password:</p>
                <OutlinedInput
                  type={showPassword.password ? 'text' : 'password'}
                  id="password"
                  value={passwords.password}
                  onChange={checkPasswordValue('password')}
                  sx={{
                    width: '170px',
                    height: '31px',
                    backgroundColor: '#fff',
                    marginLeft: '112px',
                    '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff6600',
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleShowPassword('password')}
                        edge="end"
                      >
                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {serverErrors.password ? (
                  <p className="error -pswd">{serverErrors.password}</p>
                ) : null}
              </div>
              <div>
                <p>New password:</p>
                <OutlinedInput
                  type={showPassword.newPassword ? 'text' : 'password'}
                  id="new-password"
                  value={passwords.newPassword}
                  onChange={checkPasswordValue('newPassword')}
                  sx={{
                    width: '170px',
                    height: '31px',
                    backgroundColor: '#fff',
                    marginLeft: '70px',
                    '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff6600',
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleShowPassword('newPassword')}
                        edge="end"
                      >
                        {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.newPassword ? <p className="error -newPswd">{errors.newPassword}</p> : null}
              </div>
              <div>
                <p>Confirm new password:</p>
                <OutlinedInput
                  type={showPassword.confirmNewPassword ? 'text' : 'password'}
                  id="confirm-new-password"
                  value={passwords.confirmNewPassword}
                  onChange={checkPasswordValue('confirmNewPassword')}
                  sx={{
                    width: '170px',
                    height: '31px',
                    backgroundColor: '#fff',
                    marginLeft: '5px',
                    '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff6600',
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleShowPassword('confirmNewPassword')}
                        edge="end"
                      >
                        {showPassword.confirmNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.confirmNewPassword ? (
                  <p className="error">{errors.confirmNewPassword}</p>
                ) : null}
              </div>
              <div className="btn-wrap">
                <Button
                  sx={{
                    backgroundColor: '#ff6600',
                    '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
                  }}
                  className="confirm"
                  variant="contained"
                  onClick={editPassword}
                  disabled={
                    errors.newPassword !== '' ||
                    errors.confirmNewPassword !== '' ||
                    passwords.password === '' ||
                    passwords.newPassword === '' ||
                    passwords.confirmNewPassword === ''
                  }
                >
                  Confirm
                </Button>
                {/* <Button
                  sx={{
                    backgroundColor: '#ff6600',
                    '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
                  }}
                  className="confirm cancel"
                  variant="contained"
                  onClick={editProfile}
                >
                  Cancel
                </Button> */}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
