import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { login } from './common/redux/user/slice';
import { DashboardLayout } from "./common/layouts/DashboardLayout";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser === null) {
      navigate("/login")
      return;
    }

    const user = JSON.parse(localUser);
    dispatch(login(user))

  }, [])

  return (
    <DashboardLayout>
    <Outlet />
  </DashboardLayout>
  )
}

export default App