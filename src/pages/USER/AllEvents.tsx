
import {
   
    IonButton,
    IonButtons,
    IonCard,
    IonCardHeader,
  
    IonChip,
    IonCol,
    IonContent,
    IonHeader,
   
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonModal,
    IonPage,
    IonRow,

    IonTitle,
    IonToolbar,
    setupIonicReact
} from '@ionic/react';

import './Style/AllEvents.css'
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { API } from '../../constants';
import { isEmpty } from 'lodash';
// import { API } from '../constants';



const AllEvents = () => {

    const modal = useRef<HTMLIonModalElement>(null);

    const [IsVerified, setIsVerified] = useState(false);
    const [Loading, setLoading] = useState(false)
    const [FetchedEvents, setFetchedEvents]: any = useState({});

    useEffect(() => {

        if (localStorage.getItem('Identity') && localStorage.getItem('Identity2')) {
            setLoading(true)
            Axios.get(API.ALL_EVENTS).then((e) => {
                console.log(e)
                setLoading(false);
                if (e.data) {
                    console.log(e.data);
                    setFetchedEvents(e.data.events)
                    //   setUserRole(e.data.user.role)
                }
                setIsVerified(true);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })

        }
    }, [])
    if (isEmpty(FetchedEvents)) {
        return <></>
    }
    return (
        <IonPage>
            <IonLoading
                isOpen={Loading}
                message={"Please wait"}
            ></IonLoading>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCol class="ion-align-item-center AllEventsIonCol">

                        {FetchedEvents.map((event: any, index:any) => {
                            return (
                                <IonItem key={index} className='AllEventsIonItem'>
                                    <IonCard id={'open-modal' + event._id}  className='EventCards'>
                                        <IonCardHeader>

                                            <IonItem>
                                                <IonChip>
                                                    Event Name
                                                </IonChip>
                                                <IonTitle>{event.EventName}</IonTitle>
                                            </IonItem>

                                            <IonItem>
                                                <IonChip>
                                                    Event Date
                                                </IonChip>
                                                <IonTitle>{event.createdAt.split('T')[0]}</IonTitle>
                                            </IonItem>

                                            <IonItem>
                                                <IonChip>
                                                    Society ID
                                                </IonChip>
                                                <IonItem>{event.societyId}</IonItem>
                                            </IonItem>

                                        </IonCardHeader>
                                    </IonCard>

                                    <IonModal id={'modal' + event._id} trigger={'open-modal' + event._id} >
                                        <IonHeader>
                                            <IonToolbar>
                                                <IonButtons slot="end">
                                                    <IonButton onClick={() => { (document.getElementById('modal' + event._id) as HTMLIonModalElement).dismiss(); console.log(document.getElementById('modal' + event.societyId)) }}>Cancel</IonButton>
                                                </IonButtons>00
                                                <IonTitle>Event Name</IonTitle>
                                            </IonToolbar>
                                        </IonHeader>
                                        <IonContent className="ion-padding">
                                            <IonItem>
                                                <IonLabel position="stacked">More details about registration of event</IonLabel>
                                            </IonItem>
                                        </IonContent>
                                    </IonModal>

                                </IonItem>

                            )
                        })}
                       
                    {/* <IonCol size="3">
                        <div>2 of 2</div>
                    </IonCol> */}
                </IonCol>

            </IonContent>
        </IonPage>
    )

}
export default AllEvents;
