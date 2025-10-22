import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserDataError, selectLoading } from '@selectors';
import { loginUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(selectUserDataError);
  const isloading = useSelector(selectLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    dispatch(
      loginUser({
        email: email,
        password: password
      })
    );
  };

  if (isloading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={loginError ? loginError : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
