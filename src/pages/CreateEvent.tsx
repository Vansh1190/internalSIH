import { IonAlert, IonButton, IonCard, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { IonInputNew } from './components/CustomComp/IonInputNew';
import { useEffect, useState } from 'react';
import Axios  from 'axios';
import { API } from '../constants';
import { setCharacterSpacing } from 'pdf-lib';

const CreateEvent: React.FC = () => {
  const [showToast] = useIonToast();

  const [Loading, setLoading] = useState(false);
  const [EventCreated, setEventCreated] = useState(false);
  const [EventURL, setEventURL] = useState('');
  const [SocietyName, setSocietyName] = useState('');
  const [EventName, setEventName] = useState('');
  const [SocietyDetails, setSocietyDetails]:any = useState('');
  useEffect(() => {
    Axios.get(API.GET_SOCIETYINFO, {
      headers: {
        'auth-token': localStorage.getItem('Identity')
      }
    }).then((e) => {
      console.log(e)
      setSocietyDetails(e.data.user)
      setSocietyName(e.data.user.name)
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  // const [, setSocietyName] = useState('');
  const CreatEvent = () => {
    Axios.post(API.CREATE_EVENT, {
      EventName: EventName,
      SocietyName: SocietyName,
      societyid:SocietyDetails._id,

    }).then((e) => {
      setLoading(false);
      console.log(e)
      localStorage.removeItem('stage')
      setEventCreated(true);
      // showToast('Event Created Successfully .http://localhost:8100/Register/'+ e.data.savedEvent._id )
      setEventURL(`http://localhost:8100/Register/${e.data.savedEvent._id}`)
      // router.push('/dashboard', 'none', 'replace');
  }).catch((err) => {
      console.log(err)
      setLoading(false);
      // setIsOpen(true)
      // setAlertMessage(err.response.data.message)
      // showToast(err.response.data.message + " Please contact Sports Department", 3000)
  })
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonCard>


          <IonInputNew
            title="Society Name"
            type='text'
            readonly = {true}
            value={SocietyName}
            label='Enter new name'
            minlength={5}
            onChange={setSocietyName}
            labelPlacement="floating"
          />
          <IonInputNew
            title="Event Name"
            type='text'
            value={EventName}
            label='Enter new name'
            minlength={5}
            onChange={setEventName}
            labelPlacement="floating"
          />
          <IonInputNew
            title="Date"
            type='text'
            value={(new Date).toLocaleDateString()}
            label='Enter new name'
            minlength={5}
            onChange={setEventName}
            labelPlacement="floating"
          />
          
          {/* {console.log(} */}
          {/* <IonInputNew
                                        title="Announcement Link"
                                        type='text'
                                        value={NewAnnouncementLink}
                                        label='Enter new name'
                                        minlength={5}
                                        onChange={setNewAnnouncementLink}
                                        labelPlacement="floating"
                                    /> */}
        </IonCard>
        <IonButton onClick={CreatEvent} className="ion-margin">Submit</IonButton>

        {(EventCreated) ? 
        <IonCard>

          <IonAlert
          isOpen = {EventCreated}
          header="Event Created Successfully"
          message="Share this URL with people to register for Event."
          // message="This is an alert!"
          buttons={[
            {
              text: 'Copy URL',
              role: 'cancel',
              handler: () => {
                console.log('Alert canceled');
                showToast('Copied Successfully: '+  EventURL , 4000);
                navigator.clipboard.writeText(EventURL);
                setEventCreated(false)
              },
            },
            {
              text: 'Share URL',
              role: 'confirm',
              handler: () => {
                navigator.share({
                  title: SocietyName,
                  text: EventName,
                  url: EventURL,
                })
              },
            },
          ]}
  
          ></IonAlert>
      </IonCard>
        : null  
      }
      </IonContent>

</IonPage>
);
};

export default CreateEvent;
