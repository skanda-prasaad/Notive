import { Outlet } from "react-router";
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <div>
      <Outlet />
      <Toaster /> 
    </div>
  );
};

export default App;
