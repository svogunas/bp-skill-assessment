import { ComponentProps, ReactNode } from 'react';
import classnames from 'classnames';
import style from './style.module.sass';

interface Props extends ComponentProps<'button'> {
  children: ReactNode;
  hollow?: boolean;
}

const Button = (props: Props) => {
  const { children, hollow } = props;

  return (
    <button
      type="button"
      className={classnames(style.button, { [style.hollow]: hollow })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
