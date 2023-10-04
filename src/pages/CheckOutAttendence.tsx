import { IonBadge, IonButton, IonCard, IonCardContent, IonChip, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonModal, IonPage, IonRadio, IonRadioGroup, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonToast, useIonViewDidLeave, useIonViewWillLeave } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
// import { refreshState } from '../../../components/CustomFunctions/refreshState';
// import { useStoreState } from 'easy-peasy';
import Axios from 'axios';
import { API, ICON } from '../constants';
import { IonSelectNew } from './components/CustomComp/IonSelectNew';
import { GENDER } from '../constants';
// import { capitalCase } from 'change-case'
import { IonSelectAdmin } from './components/CustomComp/IonSelectAdmin';
import './Attendence.css'
import { update } from 'lodash';
import SearchBox from './Searchbar';
import Fuse from 'fuse.js';

export default function CheckOutAttendence() {
    const [showToast] = useIonToast();
    const [result, setResult] = useState("Give Qr code");
    const [AllFieldsDisabled, setAllFieldsDisabled] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [AttendenceStatus, setAttendenceStatus] = useState('')
    const [AllEvents, setAllEvents] = useState([{ _id:15, sportName:'400m'}]);
    const [Society, setSociety] = useState([{title:'Causmic', value: 'causmic'}]);
    const [allSocieties, setallSocieties] = useState([{title:'Causmic', value: 'causmic'}]);
    const [Event, setEvent] = useState(['400m']);
    const [scanning, setScanning] = useState(false);
    const [EventEnrollments, setEventEnrollments] = useState([]);
    const [IsAttendenceMarked, setIsAttendenceMarked] = useState(false);
    const [searchText, setSearchText] = useState("");


    const videoRef = useRef<HTMLVideoElement>(null); // Create a ref for the video element
    const qrScannerRef = useRef<QrScanner | null>(null); // Create a ref for the QR scanner instance

    // const UserInfo = useStoreState<any>((state) => state.UserInfo);
    // console.log(UserInfo)


    const dismiss = () => {
        const modal = document.getElementById('eventEnrollmentsModal') as HTMLIonModalElement
        modal.dismiss();
    }
    const checkCameraPermission = async () => {
        const permissionResult = await Camera.checkPermissions();
        console.log(permissionResult)
        return permissionResult.camera === 'granted';
    };

    const UpdateAttendence = (event: any, jerseyNo: any) => {
        console.log(jerseyNo, event)
        // return
        setLoading(true)
        Axios.post(API.MARK_ATTENDANCE, {
            sportId: Event,
            jerseyNo: jerseyNo,
            status: event.detail.value
        }, {
            headers: {
                'auth-token': localStorage.getItem('Identity')
            }
        }
        ).then((e) => {
            setLoading(false)
            setIsAttendenceMarked(!IsAttendenceMarked);
            showToast(e.data.message, 2000)
        }).catch((err) => {
            showToast(err.response.data.message, 3000)
            console.log(err)
        })
    }

    // Function to start or stop scanning
    const toggleScanning = async () => {
        if (scanning) {
            qrScannerRef.current?.stop(); // Stop scanning
            qrScannerRef.current = null
            setAllFieldsDisabled(false);
            showToast('Scanning Stopped', 2000);
        } else {
            const hasCameraPermission = await checkCameraPermission();
            if (hasCameraPermission) {
                qrScannerRef.current?.start(); // Start scanning
                setAllFieldsDisabled(true);
                showToast('Scanning started', 2000);
            }
        }
        setScanning(!scanning); // Toggle scanning state
    };

    useIonViewDidLeave(() => {
        setScanning(false)
        setEvent([])
        // setSociety([])
        qrScannerRef.current?.stop()
        qrScannerRef.current = null
        console.log("hello")
    })


    useEffect(() => {
        console.log(scanning, qrScannerRef.current, 'scammog')
        if (scanning) {
            if (!qrScannerRef.current) {
                // Create a new QR scanner instance
                console.log(Event, 'hello i am vansh')
                qrScannerRef.current = new QrScanner(
                    videoRef.current as HTMLVideoElement,
                    (result) => {
                        setResult(result);
                        console.log(result)
                        qrScannerRef.current?.stop()
                        console.log(Event);
                        Axios.post(API.MARK_ATTENDANCE, {
                            email: result,
                            // checkIn: (new Date).toLocaleString,
                            checkOut: (new Date).toLocaleString
                            
                            // status: 'present'
                        }, {
                            headers: {
                                'auth-token': localStorage.getItem('Identity')
                            }
                        }
                        ).then((e) => {
                            // console.log(e, 'dei')
                            console.log("Attendence Updated")
                            showToast(e.data.message, 2000)

                            // UPDATEDATA()
                            // setIsAttendenceMarked(true);
                            console.log(IsAttendenceMarked)
                            setTimeout(() => {
                                qrScannerRef.current?.start()
                            }, 2000);
                        }).catch((err) => {
                            showToast(err.response.data.message, 3000)
                            console.log(err)
                        })

                        // console.log('scanned')
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
            qrScannerRef.current.start(); // Start scanning
            // if (!scanning) {
            //     console.log(Event, 'desteoyed')
            //     qrScannerRef.current?.destroy(); // Clean up the QR scanner instance
            //     qrScannerRef.current.stop(); // Stop scanning

            // } 
        }
    }, [scanning, Event]);

    // useEffect(() => {
    //     Axios.get(API.GET_SPORTS, {
    //         headers: {
    //             'auth-token': localStorage.getItem('Identity')
    //         }
    //     }).then((e) => {
    //         console.log(e.data);
    //         setAllEvents(e.data)
    //     })
    // }, [])

    const UPDATEDATA = () => {
        if (Event.length !== 0) {
            setLoading(true)
            console.log(IsAttendenceMarked, 'particular sports')

            Axios.post(API.PARTICULAR_SPORTS_ENROLLMENTS, {
                "sportId": Event,
            }
                , {
                    headers: {
                        "auth-token": localStorage.getItem('Identity')
                    }
                }
            ).then((res) => {
                setLoading(false)
                console.log(res);
                setEventEnrollments(res.data.users)
            }).catch((err) => {
                setLoading(false)
                console.log(err, 'errorroorrorooror');
                showToast(err.response.data.message, 3000)
            })
        }
    }

    useEffect(() => {
        // UPDATEDATA();
        Axios.get(API.ALL_EVENTS).then((e) =>{
            console.log(e)
            setAllEvents(e.data.events)
        }).catch((err)=>{
            console.log(err);
        })
    }, [Event, IsAttendenceMarked])


    // if (!UserInfo.email) {
    //     console.log('e')
    //     refreshState().then((e) => {
    //     });
    //     return (
    //         <IonLoading
    //             isOpen={true}
    //             message={'Sit back and Relax'}
    //         >
    //         </IonLoading> // You can add a loading component or return a message while data is being fetched.
    //     )
    // }
    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
        console.log(searchText);
    };

    // Function to filter enrollments based on search text using Fuse.js
    const filterEnrollments = () => {
        if (!searchText) {
            return EventEnrollments;
        }

        const fuse = new Fuse(EventEnrollments, {
            keys: ["jerseyNo", "name", "academicInfo.urn"],
        });

        const data = fuse.search(searchText);
        const newarray = data.map((item) => {
            return item.item;
        });
        return newarray;
    };


    console.log(Society, Event)

    return (
        <IonPage>
            <IonLoading
                isOpen={Loading}
                message={'Sit back and Relax....'}
            >

            </IonLoading>
            <IonContent className='ion-justify-content-center'>
                <IonSelectNew
                    title="Select Society"
                    ionIcon='Society'
                    value={Society}
                    onChange={setSociety}
                    data={allSocieties}
                //   error={error?.gender}
                />


                <IonSelectAdmin
                    title="Select Event"
                    ionIcon='email'
                    value={Event}
                    // disabled={(Gender.length === 0 || AllFieldsDisabled) ? true : false}
                    onChange={setEvent}
                    data={AllEvents}
                />

                {/* {console.log(Gender, Event, EventEnrollments)} */}
                <IonRow className='ion-justify-content-center ion-margin'>
                    <IonButton
                        onClick={toggleScanning}
                        disabled={Society?.length !== 0 && Event?.length !== 0 ? false : true}
                        style={{ scale: '0.65' }}
                    >
                        <div className='qrbutton'>
                            <IonIcon size='large' icon={ICON['qrscanner']}></IonIcon>
                            <span className="lable">{(scanning) ? 'Stop':'Scan Qr'}</span>
                        </div>
                    </IonButton>
                    <IonButton
                        id='ion-modal-eventEnrollments'
                        disabled={(Society.length !== 0 && Event.length !== 0) ? false : true}
                    >
                        <div className='qr-button'>
                            Event Enrollments
                        </div>
                    </IonButton>
                </IonRow>
                {/* <IonRow className='ion-justify-content-center'>
                    <IonChip color={'warning'} outline={true}>Total Participation {EventEnrollments.length} </IonChip>
                    <IonChip color={'secondary'} outline={true}>Present {EventEnrollments.filter((e: any) => (e.events[0].attendance === 'present')).length} </IonChip>
                    <IonChip color={'secondary'} outline={true}>Absent {EventEnrollments.filter((e: any) => (e.events[0].attendance === 'absent')).length} </IonChip>
                    <IonChip color={'secondary'} outline={true}>Not Marked {EventEnrollments.filter((e: any) => (e.events[0].attendance === 'not_marked')).length} </IonChip>
                </IonRow> */}
                <IonModal id='eventEnrollmentsModal' trigger='ion-modal-eventEnrollments'>
                    <IonToolbar>
                        <IonGrid>
                            <IonRow className="ion-padding-horizontal">
                                <IonTitle>
                                    Event Enrollments
                                </IonTitle>
                                <IonIcon size="large" onClick={dismiss} icon={ICON['closeIcon']}></IonIcon>
                            </IonRow>
                        </IonGrid>
                    </IonToolbar>
                    <IonContent>
                        <SearchBox
                            searchText={searchText}
                            onSearchChange={handleSearchChange}
                        />
                        {filterEnrollments().map((item: any, index) => {
                            return (
                                <IonCard className="card" key={index}>
                                    <IonCardContent className="EventCardContent">
                                        <IonItem className="row">
                                            <IonBadge>Jrsy No</IonBadge>
                                            <IonTitle style={{ overflow: 'hidden' }} className="data">{item.jerseyNo}</IonTitle>
                                        </IonItem>
                                        <IonItem className="row">
                                            <IonBadge color={'danger'}>Name</IonBadge>
                                            {/* <IonIcon icon={ICON['golf']} className="icon" /> */}
                                            <IonTitle className="data">{item.name}</IonTitle>
                                        </IonItem>
                                        <IonItem className="row">
                                            <IonBadge>URN</IonBadge>
                                            {/* <IonIcon icon={ICON['golf']} className="icon" />  */}
                                            <IonTitle className="data">{(item.academicInfo) ? item.academicInfo.urn : null}</IonTitle>
                                        </IonItem>
                                        {/* {console.log(`Attendence` + capitalCase(item.events[0].attendance))} */}
                                        <IonSegment scrollable={true} swipeGesture = {false} value={item.events[0].attendance} onIonChange={(e) => { UpdateAttendence(e, item.jerseyNo) }} >
                                            {/* <IonSegmentButton onClick={() => setAttendenceStatus('present')} className={`AttendenceP` + capitalCase(item.events[0].attendance)} value="present">
                                                <small>Present</small>
                                            </IonSegmentButton> */}
                                            <IonSegmentButton onClick={() => setAttendenceStatus('not_marked')} className={`Not_Marked AttendenceNM` + (item.events[0].attendance)} value="not_marked" >
                                                <small>Not Marked</small>
                                            </IonSegmentButton>
                                            <IonSegmentButton onClick={() => setAttendenceStatus('absent')} className={`AttendenceA` + (item.events[0].attendance)} value="absent">
                                                <small>Absent</small>
                                            </IonSegmentButton>
                                        </IonSegment>


                                    </IonCardContent>
                                </IonCard>
                            )
                        })

                        }
                    </IonContent>
                </IonModal>

                <video
                    ref={videoRef}
                    style={{ width: '100vw', height: '70vh' }}
                    id="video"
                    autoPlay
                    playsInline
                    muted
                ></video>
            </IonContent>
        </IonPage>
    );
}