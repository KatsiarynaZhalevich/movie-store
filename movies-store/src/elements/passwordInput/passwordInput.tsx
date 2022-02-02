import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import './passwordInput.scss';
import { checkPass } from '../../utils/formValidation';

type Props = {
  typeModal: string;
  typePass: string;
  setPasswordValue: (value: string, error: string) => void;
  checkEnter: () => void;
};

const PasswordInput = ({
  typeModal,
  typePass,
  setPasswordValue,
  checkEnter,
}: Props): JSX.Element => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const changePasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    let errorRes = '';
    setPassword(event.target.value);
    if (typeModal === 'signUp' && typePass === 'password') {
      errorRes = checkPass(event.target.value);
      setError(errorRes);
    }
    setPasswordValue(event.target.value, errorRes);
  };

  const checkKeyCode = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkEnter();
    }
  };

  return (
    <div className="password">
      <FormControl variant="outlined" sx={{ marginBottom: '35px' }}>
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{
            color: '#1f1f1f',
            '&.Mui-focused': { color: '#1f1f1f' },
          }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          sx={{
            color: '#1f1f1f',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6600' },
          }}
          required
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={changePasswordValue}
          onKeyPress={checkKeyCode}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <p className="error -pass">{error}</p>
    </div>
  );
};

export default PasswordInput;
