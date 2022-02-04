import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from '../../interfaces';
import './profile.scss';
import getUser from '../../redux/selectors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, InputAdornment, OutlinedInput, TextField, Button } from '@mui/material';
import { checkName, checkPass, checkPhone } from '../../utils/formValidation';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Profile: React.FC = (): JSX.Element => {
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

  const editProfile = () => {
    if (showEdit) {
      setUsername(user?.username);
      setPhone(user?.phone);
    }
    setShowEdit(!showEdit);
  };

  const checkUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkErr = checkName(event.target.value);
    console.log(checkErr);
    setUsername(event.target.value);
  };
  const checkPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkErr = checkPhone(event.target.value);
    console.log(checkErr);
    setPhone(event.target.value);
  };

  const checkPasswordValue = (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...passwords, [input]: event.target.value });
    const errorRes = checkPass(event.target.value);
    console.log(errorRes);
    //   const setError(errorRes);
  };

  const handleShowPassword = (input: string) => {
    setShowPassword({
      ...showPassword,
      [input]: !showPassword[input as keyof typeof showPassword],
    });
  };
  console.log(showEdit, username);

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
                id="outlined-basic"
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
                  marginLeft: '35px',
                  '& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ff6600',
                  },
                }}
              />
            )}
          </div>
          {showEdit ? (
            <>
              <div className="pswd">
                <p>Password:</p>
                <OutlinedInput
                  type={showPassword.password ? 'text' : 'password'}
                  id="outlined-basic"
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
              </div>
              <div>
                <p>New password:</p>
                <OutlinedInput
                  type={showPassword.newPassword ? 'text' : 'password'}
                  id="outlined-basic"
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
              </div>
              <div>
                <p>Confirm new password:</p>
                <OutlinedInput
                  type={showPassword.confirmNewPassword ? 'text' : 'password'}
                  id="outlined-basic"
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
              </div>
              <div className="btn-wrap">
                <Button
                  sx={{
                    backgroundColor: '#ff6600',
                    '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
                  }}
                  className="confirm"
                  variant="contained"
                  // onClick={}
                >
                  Confirm
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#ff6600',
                    '&:hover': { backgroundColor: '#ff6600', color: '#1f1f1f' },
                  }}
                  className="confirm cancel"
                  variant="contained"
                  onClick={editProfile}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
