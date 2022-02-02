import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './userNameInput.scss';
import { checkName } from '../../utils/formValidation';
type Props = {
  typeModal: string;
  setUsernameValue: (value: string, error: string) => void;
  checkEnter: () => void;
};

const UserNameInput = ({ typeModal, setUsernameValue, checkEnter }: Props): JSX.Element => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    let errorRes = '';
    setUsername(event.target.value);
    if (typeModal === 'signUp') {
      errorRes = checkName(event.target.value);
      setError(errorRes);
    }
    setUsernameValue(event.target.value, errorRes);
  };

  const checkKeyCode = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkEnter();
    }
  };

  return (
    <div className="username">
      <FormControl variant="outlined" sx={{ width: '263px', marginBottom: '30px' }}>
        <InputLabel
          htmlFor="outlined-adornment-username"
          sx={{
            color: '#1f1f1f',
            '&.Mui-focused': { color: '#1f1f1f' },
          }}
        >
          Username
        </InputLabel>
        <OutlinedInput
          sx={{
            color: '#1f1f1f',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6600' },
          }}
          required
          id="outlined-adornment-username"
          value={username}
          onChange={changeValue}
          onKeyPress={checkKeyCode}
          label="username"
          endAdornment={
            <InputAdornment position="end">
              <AccountBoxIcon className="icon account" />
            </InputAdornment>
          }
        />
      </FormControl>
      <p className="error">{error}</p>
    </div>
  );
};
export default UserNameInput;
