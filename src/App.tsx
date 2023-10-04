import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/CreateEvent';
import Tab2 from './pages/RegisterUser';
// import Tab3 from './pages/Ma';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import CreateEvent from './pages/CreateEvent';
import RegisterUser from './pages/RegisterUser';
import Attendence from './pages/Attendence';
import Certificate from './pages/Certificate/Certificate';
import CheckOutAttendence from './pages/CheckOutAttendence';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Verification from './pages/Auth/Verification';
import HomePage from './pages/Auth/HomePage';
import { useEffect, useState } from 'react';
import Page from './pages/Page';
import { update } from 'lodash';
import SocietySignup from './pages/Auth/SocietySignup';
import Axios from 'axios';
import { API } from './constants';
import SocietyLogin from './pages/Auth/SocietyLogin';
import Profile from './pages/USER/Profile';
import AllEvents from './pages/USER/AllEvents';
import SocietyEvents from './pages/SOCIETY/SocietyEvents';

setupIonicReact();

const App: React.FC = () => {

  
  const [LoggedIn, setLoggedIn] = useState(false);
  const [UserRole, setUserRole] = useState('');
  const [IsVerified, setIsVerified] = useState(false);


  const UpdateLoggedIn = (status: any) => {
    setLoggedIn(status);
  }
  useEffect(() => {
    console.log(LoggedIn);
    console.log(UserRole);
  }, [LoggedIn])

  useEffect(() => {
    console.log(UserRole)

    if (localStorage.getItem('Identity') && localStorage.getItem('Identity2')) {

      Axios.get((localStorage.getItem('Identity2') == 'user' ? API.GET_USERINFO : API.GET_SOCIETYINFO), {
        headers: {
          'auth-token': localStorage.getItem('Identity')
        }
      }).then((e) => {
        console.log(e)
        if (e.data.user) {
          console.log(e.data.user.role)
          setUserRole(e.data.user.role)
        }
        setIsVerified(true);
      }).catch((err) => {
        console.log(err);
      })

    }
  }, [LoggedIn])
  if (UserRole == '') {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <CreateEvent />
              </Route>
              <Route exact path="/home">
                <Page />
              </Route>
              <Route exact path="/Register/:id">
                <RegisterUser />
              </Route>
              <Route path="/tab3">
                <Attendence />
              </Route>
              <Route path="/certiicate">
                <Certificate />
              </Route>
              <Route path="/CheckoutAttendence">
                <CheckOutAttendence />
              </Route>
              <Route exact path="/">
                {/* <Redirect to="/tab1" /> */}
                <HomePage />
              </Route>
              <Route exact path="/login">
                <Login isLoggesIn={setLoggedIn} updateUserRole={setUserRole} />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/Profile">
                <Profile />
              </Route>
              <Route exact path="/societysignup">
                <SocietySignup />
              </Route>
              <Route exact path="/allevents">
                <AllEvents />
              </Route>
              <Route exact path="/societyevents">
                <SocietyEvents />
              </Route>
              <Route exact path="/societylogin">
                <SocietyLogin isLoggesIn={setLoggedIn} updateUserRole={setUserRole} />
              </Route>
              <Route exact path="/verify">
                <Verification />
              </Route>
            </IonRouterOutlet>
            <IonTabBar>

            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    )
  }
  console.log(UserRole)
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <CreateEvent />
            </Route>
            <Route exact path="/home">
              <Page />
            </Route>
            <Route exact path="/Register/:id">
              <RegisterUser />
            </Route>
            <Route path="/tab3">
              <Attendence />
            </Route>
            <Route path="/certiicate">
              <Certificate />
            </Route>
            <Route path="/CheckoutAttendence">
              <CheckOutAttendence />
            </Route>
            <Route exact path="/">
              {/* <Redirect to="/tab1" /> */}
              <HomePage />
            </Route>
            <Route exact path="/login">
              <Login isLoggesIn={setLoggedIn} updateUserRole={setUserRole} />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/allevents">
              <AllEvents />
            </Route>
            <Route exact path="/societyevents">
                <SocietyEvents />
              </Route>
            <Route exact path="/Profile">
              <Profile />
            </Route>
            <Route exact path="/verify">
              <Verification />
            </Route>
          </IonRouterOutlet>

          {(UserRole == 'user') ?
            <IonTabBar style={{ overflow: 'auto', display: 'flex', justifyContent: 'flex-start' }} slot="bottom">
              <IonTabButton tab="tab1" href="/allevents">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>ALL EVENTS</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/Profile">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Download Certificate</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Export" href="/export">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>My Registrations</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Certificate" href="/certiicate">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Download Certificate</IonLabel>
              </IonTabButton>
              <IonTabButton tab="CheckoutAttendence" href="/CheckoutAttendence">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Check Out Attendence</IonLabel>
              </IonTabButton>
            </IonTabBar>

            :

            <IonTabBar style={{ overflow: 'auto', display: 'flex', justifyContent: 'flex-start' }} slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>Create Event</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/societyevents">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>My Events</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Mark Attendence</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Export" href="/export">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Export</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Certificate" href="/certiicate">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Download Certificate</IonLabel>
              </IonTabButton>
              <IonTabButton tab="CheckoutAttendence" href="/CheckoutAttendence">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Check Out Attendence</IonLabel>
              </IonTabButton>
            </IonTabBar>

          }

        </IonTabs>
      </IonReactRouter>
    </IonApp >
  )
}




export default App;
