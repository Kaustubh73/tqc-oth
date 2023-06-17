import React, { useState, useEffect } from 'react';
import '../css/ContestCountdownTimer.css'

function ContestCountdownTimer() {
    const contestEndDate = new Date('2023-06-20T23:59:59');

    const [remainingTime, setRemainingTime] = useState(0);

    function getRemainingTime() {
        const now = new Date();
        const timeDifference = contestEndDate - now;

        if (timeDifference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference  / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    }
    
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return ( 
        <div className='countdown-timer'>
            <h3>Starts in</h3>
            <div className='timer'>
                <div>
                    <span>{remainingTime.days}</span>
                    <span> Days</span>
                </div>
                <div>
                    <span>{remainingTime.hours}</span>
                    <span> Hours</span>
                </div>
                <div>
                    <span>{remainingTime.minutes}</span>
                    <span> Minutes</span>
                </div>
                <div>
                    <span>{remainingTime.seconds}</span>
                    <span> Seconds</span>
                </div>
            </div>
        </div>
     );
}

export default ContestCountdownTimer;