import { useCookies } from 'react-cookie';

const useUser = () => {
  const [cookies] = useCookies(['auth']);

  if (!cookies.auth) return { isUser: false };

  return {
    isUser: true,
  };
};

export default useUser;
