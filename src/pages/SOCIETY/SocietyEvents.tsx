
import {

    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
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

// import './Style/AllEvents.css'
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { API } from '../../constants';
import { isEmpty } from 'lodash';
import { useStoreState } from 'easy-peasy';
import { refreshState } from '../components/CustomFunctions/refreshState';
import UserInfoMenu from '../components/UserInfoMenu';
// import { API } from '../constants';



const SocietyEvents = () => {

    const [Loading, setLoading] = useState(false)

    const UserInfo = useStoreState<any>((state) => state.UserInfo);

    const [IsVerified, setIsVerified] = useState(false);
    const [StateUpdaed, setStateUpdaed] = useState(false);
    const [FetchedEvents, setFetchedEvents]: any = useState({});
    const [AllParticipants, setAllParticipants] = useState([]);

    console.log(UserInfo);

    const FetchedEventDetails = (eventID: any) => {
        Axios.get(API.EVENT_DETAILS + eventID, {
            headers: {
                'auth-token': localStorage.getItem('Identity')
            }
        }).then((e) => {
            console.log(e);
            setAllParticipants(e.data.users)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        if (localStorage.getItem('Identity') && localStorage.getItem('Identity2') && UserInfo.name) {
            setLoading(true)
            Axios.post(API.SOCIETY_EVENTS, {
                societyId: UserInfo._id
            }, {
                headers: {
                    'auth-token': localStorage.getItem('Identity')
                }
            }).then((e) => {
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
    }, [StateUpdaed])


    if (!Loading) {
        if (!UserInfo.name) {
            setLoading(true)
            refreshState().then(() => {
                setLoading(false)
                setStateUpdaed(true)
            })
        }
    }

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
                        <IonTitle>My Events</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCol class="ion-align-item-center AllEventsIonCol">

                    {FetchedEvents.map((event: any, index: any) => {
                        return (
                            <IonItem key={index} className='AllEventsIonItem'>
                                <IonCard id={'open-modal' + event._id} onClick={() => { FetchedEventDetails(event._id) }} className='EventCards'>
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

                                        {/* <IonItem>
                                                <IonChip>
                                                    Society ID
                                                </IonChip>
                                                <IonItem>{event.societyId}</IonItem>
                                            </IonItem> */}

                                    </IonCardHeader>
                                </IonCard>

                                <IonModal id={'modal' + event._id} trigger={'open-modal' + event._id} >
                                    <IonHeader>
                                        <IonToolbar>
                                            <IonButtons slot="end">
                                                <IonButton onClick={() => { (document.getElementById('modal' + event._id) as HTMLIonModalElement).dismiss(); console.log(document.getElementById('modal' + event.societyId)) }}>Cancel</IonButton>
                                            </IonButtons>                                              <IonTitle>Event Name</IonTitle>
                                        </IonToolbar>
                                    </IonHeader>
                                    <IonContent className="ion-padding">
                                        <IonItem>
                                            <IonButton onClick={() => {

                                                navigator.share({
                                                    title: event.name,
                                                    text: event.createdAt.split('T')[0],
                                                    url: `http://localhost:8100/register/${event._id}`,
                                                })

                                            }} >
                                                Share Registration URL

                                            </IonButton>
                                        </IonItem>
                                        <IonItem>
                                            <IonTitle>All Registrations</IonTitle>
                                        </IonItem>
                                        {AllParticipants.map((user:any) => {
                                            return (
                                                <IonCard>
                                                    <IonCardHeader>

                                                        <IonItem>
                                                            <IonChip>
                                                                Name 
                                                            </IonChip>
                                                            <IonTitle>{user.name}</IonTitle>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonChip>
                                                                Email
                                                            </IonChip>
                                                            <IonTitle>{user.email}</IonTitle>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonChip>
                                                                CRN
                                                            </IonChip>
                                                            <IonTitle>{user.crn}</IonTitle>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonChip>
                                                                URN
                                                            </IonChip>
                                                            <IonTitle>{user.urn}</IonTitle>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonChip>
                                                                Branch
                                                            </IonChip>
                                                            <IonTitle>{user.branch}</IonTitle>
                                                        </IonItem>

                                                    </IonCardHeader>
                                                </IonCard>
                                            )
                                        })}
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
        </IonPage >
    )

}
export default SocietyEvents;
