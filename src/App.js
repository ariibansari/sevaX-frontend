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
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import AddItem from './pages/AddItem';
import AllItems from './pages/AllItems';
import Item from './pages/Item';
import ItemNeedyView from './pages/ItemNeedyView';
import AllItemsNeedyView from './pages/AllItemsNeedyView';
import RequestedItems from './pages/RequestedItems';
import AcceptedItems from './pages/AcceptedItems';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [user, getRole, isLoggedIn] = useContext(UserContext)
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <div className='top-wrapper'>
        <NavbarHome />
        <Routes>

          {
            isLoggedIn()
              ?
              <>
                {/* ---   COMMON ROUTES FOR LOGGED IN USERS --- */}
                <>
                  <Route path='/profile' element={<Profile />} />
                </>
                {/* ---   END OF COMMON ROUTES FOR LOGGED IN USERS --- */}


                <>
                  {user.role_id === 1
                    ?
                    //---   NEEDY ONLY ROUTES ---
                    <>
                      <Route path='/' element={<DashboardNeedy />} />
                      <Route path='/item/:item_id' element={<ItemNeedyView />} />
                      <Route path='/all-items' element={<AllItemsNeedyView />} />
                      <Route path='/requested-items' element={<RequestedItems />} />
                      <Route path='/accepted-items' element={<AcceptedItems />} />
                    </>
                    //---   END OF NEEDY ONLY ROUTES ---


                    : <>
                      {user.role_id === 2
                        ?
                        //---   DONOR ONLY ROUTES ---
                        <>
                          <Route path='/' element={<DashboardDonor />} />
                          <Route path='/add-item' element={<AddItem />} />
                          <Route path='/all-item' element={<AllItems />} />
                          <Route path='/item/:item_id' element={<Item />} />
                        </>
                        //---   DONOR ONLY ROUTES ---


                        :
                        //---   ADMIN ONLY ROUTES --- 
                        <>
                          <Route path='/' element={<DashboardAdmin />} />
                          <Route path='/manage-donors' element={<ManageDonors />} />
                          <Route path='/manage-needy' element={<ManageNeedy />} />
                        </>
                        //---   ADMIN ONLY ROUTES ---
                      }
                    </>
                  }
                </>
              </>


              :
              //---  ROUTES FOR UNLOGGED USER --- 
              <>
                <Route path='/' element={<Home />} />
                <Route path='/register-donor' element={<RegisterDonor />} />
                <Route path='/register-needy' element={<RegisterNeedy />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login />} />
              </>
            //---  END OF ROUTES FOR UNLOGGED USER --- 
          }

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
