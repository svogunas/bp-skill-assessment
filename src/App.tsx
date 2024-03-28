import Navigation from '@components/Navigation';
import { Outlet } from 'react-router-dom';
import './App.sass';

const App = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="bodyWrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
