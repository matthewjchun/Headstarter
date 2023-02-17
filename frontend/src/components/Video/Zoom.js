import React, { useEffect, useRef, useState } from 'react';
// import ZoomMtgEmbedded from '@zoomus/websdk/embedded' <-- component view
import { ZoomMtg } from '@zoomus/websdk'; // client view
import axios from 'axios';
// import Modal from 'react-bootstrap/Modal';

const Zoom = (props) => {
    // const { lgShow, setLgShow } = prop

    const [ready, setReady] = useState(false)

    // setting up component view zoom integration
    // const client = ZoomMtgEmbedded.createClient()
    // let meetingSDKElement = document.getElementById('meetingSDKElement')
    // client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US' })

    const zoomMeeting = useRef(null);

    const meetingId = 74467570103
    var signature = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJRMHlMcFNVblQtYVgzSkswRkFVYUlRIiwiaWF0IjoxNjc2NTk4MTEwLCJleHAiOjE2NzY2MDUzMTAsImFwaUtleSI6IlEweUxwU1VuVC1hWDNKSzBGQVVhSVEiLCJ0b2tlbkV4cCI6MTY3NjYwNTMxMH0.qA7RwlaLtWnBAwV3BPtWh-2s5n3HURa8BSm4hgNM77E'
    var sdkKey = 'Q0yLpSUnT-aX3JK0FAUaIQ'

    // setting up the body for the server request to grab the meeting signature and sdkKey required for join operation
    const body = {
        meetingNumber: meetingId,
        role: 0
    }

    useEffect(() => {
        ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.7/lib', '/av')
        // loads dependent assets
        ZoomMtg.preLoadWasm()
        ZoomMtg.prepareWebSDK()
        // loads language files, also passes any error messages to the ui
        ZoomMtg.i18n.load('en-US')
        ZoomMtg.i18n.reload('en-US')

        async function fetchData() {
            await axios.post('http://localhost:4000/signature', body)
                .then(response => {
                    signature = response.data.signature
                })
                .catch(error => {
                    console.log(error)
                });

            await axios.post('http://localhost:4000/creds')
                .then(response => {
                    sdkKey = response.data.sdkKey
                })
                .catch(error => {
                    console.log(error)
                });

            console.log(signature)
            console.log(sdkKey)
        }

        fetchData();

        document.getElementById('zmmtg-root').style.display = 'block'

        console.log(signature)
        console.log(sdkKey)

        ZoomMtg.init({
            leaveUrl: 'http://localhost:3000',
            success: (success) => {
                ZoomMtg.join({
                    meetingNumber: meetingId,
                    userName: "Matt",
                    sdkKey: sdkKey,
                    signature: signature,
                    passWord: "y8eAyK",
                    success: (success) => {
                        console.log('Zoom Meeting Joined!')
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })
            },
            error: (error) => {
                console.log(error)
            },
        })
    }, []);



    return (
        <div>
            {ready ?
                <div ref={zoomMeeting}></div>
                :
                null
            }

        </div>
    )

};

export default Zoom;
