import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import { Buffer } from 'buffer';
import Stream from 'stream-browserify';
import crypto from 'crypto-browserify';
import { pbkdf2, randomBytes, createCipheriv, createDecipheriv } from 'crypto-browserify';


const Zoom = () => {
    const axios = require('axios')
    crypto.util = {
        Buffer,
        process: {
            nextTick: setTimeout,
        },
        randomBytes(size, callback) {
            const buffer = Buffer.alloc(size);
            window.crypto.getRandomValues(buffer);
            callback(null, buffer);
        },
    };

    crypto.stream = Stream;


    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.7/lib', '/av')
    // loads dependent assets
    ZoomMtg.preLoadWasm()
    ZoomMtg.prepareWebSDK()
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load('en-US')
    ZoomMtg.i18n.reload('en-US')

    var sdkKey = '5EWJyhRPSSizDcvZp86VDA'
    var sdkSecret = '1S93XeAqMMlcLtttqzbk8QZvvSvaISmLpg5l'
    var meetingId = 73053542475
    var signature = ''

    const timestamp = new Date().getTime();
    const message = Buffer.from(sdkKey + meetingId + timestamp + 0).toString('base64');
    const hash = crypto.createHmac('sha256', sdkSecret).update(message).digest('base64');
    const signaturePost = Buffer.from(`${sdkKey}.${meetingId}.${timestamp}.0.${hash}`).toString('base64');

    useEffect = async () => {
        await axios.post(`https://api.zoom.us/v2/meetings/${meetingId}/token`, {}, {
            headers: {
                'Authorization': `Bearer ${signaturePost}`
            }
        }).then((response) => {
            signature = response.data.token;
            // Use the meetingToken to join the meeting using the Zoom SDK
        }).catch((error) => {
            console.error(error);
        });
    }

    var passWord = 74359834331
    var userName = "Matthew Chun"

    ZoomMtg.init({
        leaveUrl: 'http://localhost:3000',
        success: (success) => {
            ZoomMtg.join({
                sdkKey: sdkKey,
                signature: signature,
                meetingNumber: meetingId,
                passWord: passWord,
                userName: userName,
                success: (success) => {
                    console.log(success)
                },
                error: (error) => {
                    console.log(error)
                }
            })
        },
        error: (error) => {
            console.log(error)
        }
    })


};

export default Zoom;
