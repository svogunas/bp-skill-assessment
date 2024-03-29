import Button from '@components/Button';
import classnames from 'classnames';
import { useCookies } from 'react-cookie';
import { SyntheticEvent } from 'react';
import style from './style.module.sass';

interface Props {
  show: boolean;
}

const LoginModal = ({ show }: Props) => {
  const [cookies, setCookie] = useCookies(['auth']);

  const onLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAuth = parseInt(cookies.auth) === 1;
    if (isAuth) return;

    setCookie('auth', '1');
    window.location.reload();
  };

  return (
    <form
      onSubmit={onLogin}
      className={classnames(style.loginModalWrapper, { [style.visible]: show })}
    >
      <input type="email" placeholder="Email" className={style.loginInput} />
      <input
        type="password"
        placeholder="Password"
        className={style.loginInput}
      />
      <Button type="submit">Log in</Button>
    </form>
  );
};

export default LoginModal;
