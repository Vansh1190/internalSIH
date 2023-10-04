import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './CreateEvent';
import Tab2 from './RegisterUser';
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
// import './theme/variables.css';

import { useEffect, useState } from 'react';
import  Axios from 'axios';
import { API } from '../constants';

const Page = () => {
    const [IsVerified, setIsVerified] = useState(false);
    useEffect(() => { 


    })
   
return (
        <IonPage>
            <IonContent>
              Welcome to EMS {localStorage.getItem("Identity2") } PANEL
            </IonContent>
        </IonPage>
)

}
export default Page;
