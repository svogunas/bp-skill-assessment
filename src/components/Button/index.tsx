import { ComponentProps, ReactNode } from 'react';
import classnames from 'classnames';
import style from './style.module.sass';

interface Props extends ComponentProps<'button'> {
  children: ReactNode;
  hollow?: boolean;
  wrapper?: boolean;
}

const Button = (props: Props) => {
  const { children, hollow, wrapper, className = '', ...otherProps } = props;

  return (
    <button
      type="button"
      className={classnames(style.button, {
        [style.hollow]: hollow,
        [style.wrapper]: wrapper,
        [className]: className,
      })}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
