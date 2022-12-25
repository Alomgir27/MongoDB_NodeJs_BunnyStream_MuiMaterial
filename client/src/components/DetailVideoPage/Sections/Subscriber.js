import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useTheme } from '@mui/material';
import { Button } from '@mui/material';

function Subscriber(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    
    const theme = useTheme();

    const onSubscribe = ( ) => {

        let subscribeVariables = {
                userTo : userTo,
                userFrom : userFrom
        }

        if(Subscribed) {
            //when we are already subscribed 
            axios.post('http://localhost:27017/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success){ 
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to unsubscribe')
                    }
                })

        } else {
            // when we are not subscribed yet
            
            axios.post('http://localhost:27017/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }


    useEffect(() => {

        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
        axios.post('http://localhost:27017/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        axios.post('http://localhost:27017/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })

    }, [userTo, userFrom])


    return (
            <Button
                variant="contained"
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    width: '100%',
                }}
             >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
    )
}

export default Subscriber

