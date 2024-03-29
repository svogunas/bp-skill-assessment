import { useParams } from 'react-router-dom';

const GroupPage = () => {
  const { slug } = useParams();

  return <div>{slug}</div>;
};

export default GroupPage;
