import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterDonor from './pages/RegisterDonor'
import RegisterNeedy from './pages/RegisterNeedy'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardDonor from './pages/DashboardDonor'
import DashboardNeedy from './pages/DashboardNeedy'
import NavbarHome from './components/NavbarHome'
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import ManageDonors from './pages/ManageDonors';
import ManageNeedy from './pages/ManageNeedy';
import PageNotFound from './pages/PageNotFound';

function App() {
  const [user, setUser] = useContext(UserContext)
  return (
    <div className="App">
      <Router>
        <NavbarHome />
        <Routes>

          {
            user?.accessToken       //means user is logged in
              ? <>
                {user.role_id === 1       //means logged in user is needy
                  ? <Route path='/' element={<DashboardNeedy />} />
                  : <>
                    {user.role_id === 2
                      ? <Route path='/' element={<DashboardDonor />} />        //means logged in user in donor
                      : <>
                        <Route path='/' element={<DashboardAdmin />} />       //means logged in user is admin
                        <Route path='/manage-donors' element={<ManageDonors />} />       
                        <Route path='/manage-needy' element={<ManageNeedy />} />       
                      </>
                    }
                  </>
                }
              </>

              : <>
                <Route path='/' element={<Home />} />
                <Route path='/register-donor' element={<RegisterDonor />} />
                <Route path='/register-needy' element={<RegisterNeedy />} />
                <Route path='/login' element={<Login />} />
              </>
          }

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
