import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './common/redux/user/slice';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser === null) {
      //navigate("/login")
      return;
    }

    const user = JSON.parse(localUser);
    dispatch(login(user))

  }, [])

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default App