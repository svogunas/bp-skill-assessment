import { useState } from 'react';
import Button from '@components/Button';
import { Link } from 'react-router-dom';
import useUser from '@/hooks/useUser';
import { useCookies } from 'react-cookie';
import LoginModal from './LoginModal';
import UserPng from './user.png';
import style from './style.module.sass';

const Navigation = () => {
  const { isUser } = useUser();
  const [, , removeCookie] = useCookies();
  const [showLogin, setShowLogin] = useState(false);

  const onLoginClick = () => {
    setShowLogin((current) => !current);
  };

  const onLogout = () => {
    removeCookie('auth');
    window.location.reload();
  };

  return (
    <div className={style.navContainer}>
      <Link to="/" className={style.logo}>
        Logo
      </Link>
      {isUser && (
        <>
          <Button onClick={onLogout}>Log out</Button>
          <Button wrapper className={style.userControlsButton}>
            <img src={UserPng} alt="User" />
          </Button>
        </>
      )}
      {!isUser && (
        <>
          <div className={style.buttonWrapper}>
            <Button hollow onClick={onLoginClick}>
              Log in
            </Button>
            <Button>Sign up</Button>
          </div>
          <LoginModal show={showLogin} />
        </>
      )}
    </div>
  );
};

export default Navigation;
