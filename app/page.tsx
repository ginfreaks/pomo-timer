"use client";
import Footer from "@/components/Footer"
import About from "@/components/About"
import Navigation from "@/components/Navigation"
import Timer from "@/components/Timer"
import { useEffect, useRef, useState } from "react";
import Alarm from "@/components/Alarm";
import SettingsPopUp from "@/components/SettingsPopUp";

export default function Home() {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortPomodoro, setShortPomodoro] = useState(5);
  const [longPomodoro, setLongPomodoro] = useState(10);
  const [stage, setStage] = useState(0);
  const [seconds, setSeconds] = useState(0)
  const [ticking, setTicking] = useState(false);
  const [consumedSecond, setConsumedSecond] = useState(0)
  const [isTimesUp, setIsTimesUp] = useState(false);
  const [openSettings, setOpenSettings] = useState(false)

  const alarmRef = useRef<HTMLAudioElement | null>(null);
  
	const pomodoroRef = useRef<HTMLInputElement | null>(null);
	const longPomodoroRef = useRef<HTMLInputElement | null>(null);
	const shortPomodoroRef = useRef<HTMLInputElement | null>(null);

  
  const updateTimeDefaultValue = () => {
    const pomodoroValue = pomodoroRef.current?.value;
    const shortPomodoroValue = shortPomodoroRef.current?.value;
    const longPomodoroValue = longPomodoroRef.current?.value;
    const parsedPomodoro = parseInt(pomodoroValue || '0', 10);
    const parsedShortPomodoro = parseInt(shortPomodoroValue || '0', 10);
    const parsedLongPomodoro = parseInt(longPomodoroValue || '0', 10);

    setPomodoro(parsedPomodoro);
    setShortPomodoro(parsedShortPomodoro);
    setLongPomodoro(parsedLongPomodoro);

    setOpenSettings(false);
    setSeconds(0);
    setConsumedSecond(0);
	};
  

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? "Show warning" : null;
    }
    const timer = setInterval(() => {
      if(ticking) {
        setConsumedSecond(value => value+1)
        clockTicking();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [seconds, pomodoro, shortPomodoro, longPomodoro, ticking]);


  const muteAlarm = () => {
    alarmRef?.current?.pause();
    if (alarmRef?.current) { alarmRef.current.currentTime = 0; }
  }

  const switchStages = (index: number)=> {
    const isSwitched = consumedSecond && stage !== index ? true : false;

    if(isSwitched) {
      reset();
      setStage(index);
    } else if(!consumedSecond) {
      setStage(index);
    }
  }

  const getTickingTime = () => {
    const timeStage: any = {
      0: pomodoro,
      1: shortPomodoro,
      2: longPomodoro
    };
    return timeStage[stage];
  }

  const updateMinute = () => {
    const updateStage: any = {
      0: setPomodoro,
      1: setShortPomodoro,
      2: setLongPomodoro
    };
    return updateStage[stage];
  }

  const timesUp = () => {
    reset();
    setIsTimesUp(true);
    alarmRef.current?.play();
  }


  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();

    if(minutes === 0 && seconds === 0) {
      timesUp();
    } else if(seconds === 0) {
      setMinutes((minute: any) => minute - 1)
      setSeconds(59)
    } else {
      setSeconds(seconds => seconds -1)
    }
  }

  const reset = () => {
    setTicking(false);
    setSeconds(0);
    setPomodoro(25);
    setLongPomodoro(10);
    setShortPomodoro(5);
    setConsumedSecond(0);
  }

  const startTimer = () => {
    setIsTimesUp(false);
    setTicking((ticking: boolean) => !ticking);
    muteAlarm();
  }

  return (
    <div className="bg-gray-900 min-h-screen font-inter">
        <div className="max-w-2xl min-h-screen mx-auto">
             <Navigation setOpenSettings={setOpenSettings} />
             <Timer 
                stage={stage} 
                switchStages={switchStages} 
                getTickingTime={getTickingTime} 
                seconds={seconds}
                ticking={ticking}
                isTimesUp={isTimesUp}
                reset={reset}
                muteAlarm={muteAlarm}
                startTimer={startTimer}/>
             <About />     
             <Alarm ref={alarmRef} />
             <SettingsPopUp 
              pomodoroRef={pomodoroRef}
              shortBreakRef={shortPomodoroRef}
              longBreakRef={longPomodoroRef}
              setOpenSettings={setOpenSettings} 
              openSettings={openSettings}
              updateTimeDefaultValue={updateTimeDefaultValue}
             />
             <Footer />
        </div>
    </div>
  )
}
 