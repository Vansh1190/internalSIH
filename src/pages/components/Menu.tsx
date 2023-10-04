import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { Link, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useStoreState } from 'easy-peasy';
import { ICON, appPages } from '../constants';

interface AppPage {
  url: string;
  icon: string;
  mdIcon: string;
  title: string;
  role: string;
}

const MenuPages: AppPage[] = appPages
// const appPages: AppPage[] = [
//   {
//     title: 'Inbox',
//     url: '/page/Inbox',
//     iosIcon: mailOutline,
//     mdIcon: mailSharp
//   },
//   {
//     title: 'Outbox',
//     url: '/page/Outbox',
//     iosIcon: paperPlaneOutline,
//     mdIcon: paperPlaneSharp
//   },
//   {
//     title: 'Favorites',
//     url: '/page/Favorites',
//     iosIcon: heartOutline,
//     mdIcon: heartSharp
//   },
//   {
//     title: 'Archived',
//     url: '/page/Archived',
//     iosIcon: archiveOutline,
//     mdIcon: archiveSharp
//   },
//   {
//     title: 'Trash',
//     url: '/page/Trash',
//     iosIcon: trashOutline,
//     mdIcon: trashSharp
//   },
//   {
//     title: 'Spam',
//     url: '/page/Spam',
//     iosIcon: warningOutline,
//     mdIcon: warningSharp
//   }
// ];


const Menu: React.FC = ({ UserData }: any) => {
  const location = useLocation();
  const UserInfo = useStoreState<any>((state) => state.UserInfo)

  return (
    <IonMenu contentId="main" type="overlay"  >
      <IonContent>
        <IonList id="allRoutes">
          <IonListHeader>{UserInfo.name}</IonListHeader>
          <IonNote>{UserInfo.email}</IonNote>
          <IonMenuToggle autoHide={true} >

            {MenuPages.map((MenuItem, index) => {
              if (UserInfo.role === 'superAdmin') {
                return (
                  <IonItem key={index} className={location.pathname === MenuItem.url ? 'selected' : ''} routerLink={MenuItem.url} routerDirection='none' lines='full' >
                    <IonIcon icon={ICON[MenuItem.icon]} className='ion-padding-horizontal'></IonIcon>
                    <IonLabel>{MenuItem.title}</IonLabel>
                  </IonItem>
                );
              }
              else if(UserInfo.role === 'admin'){
                  if(MenuItem.role.includes('admin')){
                    return (
                      <IonItem key={index} className={location.pathname === MenuItem.url ? 'selected' : ''} routerLink={MenuItem.url} routerDirection='none' lines='full' >
                      <IonIcon icon={ICON[MenuItem.icon]} className='ion-padding-horizontal'></IonIcon>
                      <IonLabel>{MenuItem.title}</IonLabel>
                    </IonItem>
                  )
                }
              }
              else {
                if (MenuItem.role.includes('user')) {
                  return (
                    <IonItem key={index} className={location.pathname === MenuItem.url ? 'selected' : ''} routerLink={MenuItem.url} routerDirection='none' lines='full' >
                      <IonIcon icon={ICON[MenuItem.icon]} className='ion-padding-horizontal'></IonIcon>
                      <IonLabel>{MenuItem.title}</IonLabel>
                    </IonItem>
                  )
                }
              }
            })}
          </IonMenuToggle>
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
