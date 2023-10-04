import {
    IonChip,
    IonCol,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonLoading,
    IonPage,
    IonRow,
    
    IonTitle,
    IonToolbar
} from '@ionic/react';
// import Tab2 from './RegisterUser';
// import Tab3 from './pages/Ma';



/* Theme variables */
// import './theme/variables.css';

import { useEffect, useState } from 'react';
import Axios from 'axios';
import { API } from '../../constants';
// import { API } from '../constants';

const Profile = () => {
    const [IsVerified, setIsVerified] = useState(false);
    const [Loading, setLoading] = useState(false)
    const [UserInfo, setUserInfo]:any = useState({});

    useEffect(() => {

        if (localStorage.getItem('Identity') && localStorage.getItem('Identity2')) {
            setLoading(true)
            Axios.get((localStorage.getItem('Identity2') == 'user' ? API.GET_USERINFO : API.GET_SOCIETYINFO), {
                headers: {
                    'auth-token': localStorage.getItem('Identity')
                }
            }).then((e) => {
                console.log(e)
                setLoading(false);
                if (e.data.user) {
                    console.log(e.data.user);
                    setUserInfo(e.data.user)
                    //   setUserRole(e.data.user.role)
                }
                setIsVerified(true);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })

        }
    },[])

    return (
        <IonPage>
            <IonLoading
                isOpen= {Loading}
                message={"Please wait"}
            ></IonLoading>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRow class="ion-justify-content-center">
                    <IonList>
                        <IonItem>
                            <IonChip  color={'tertiary'}>Name </IonChip>
                            <IonItem>{UserInfo.name}</IonItem>
                        </IonItem>
                        <IonItem>
                            <IonChip color={'tertiary'}>Email</IonChip>
                            <IonItem>{UserInfo.email}</IonItem>
                        </IonItem>
                        <IonItem>
                            <IonChip color={'tertiary'}>Phone </IonChip>
                            <IonItem>{UserInfo.phone}</IonItem>
                        </IonItem>
                        <IonItem>
                            <IonChip color={'tertiary'}>Gender</IonChip>
                            <IonItem>{UserInfo.gender}</IonItem>
                        </IonItem>
                    </IonList>
                    {/* <IonCol size="3">
                        <div>2 of 2</div>
                    </IonCol> */}
                </IonRow>

            </IonContent>
        </IonPage>
    )

}
export default Profile;
