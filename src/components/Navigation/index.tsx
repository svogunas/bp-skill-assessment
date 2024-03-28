import Button from '@components/Button';
import { Link } from 'react-router-dom';
import style from './style.module.sass';

const Navigation = () => {
  return (
    <div className={style.navContainer}>
      <Link to="/" className={style.logo}>
        Logo
      </Link>
      <div className={style.buttonWrapper}>
        <Button hollow>Log in</Button>
        <Button>Sign up</Button>
      </div>
    </div>
  );
};

export default Navigation;
