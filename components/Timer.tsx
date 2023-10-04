"use client";
import React, { Component } from 'react'
import { BiBellOff } from 'react-icons/bi';

interface TimeProps {
  stage: number;
  seconds: number;
  ticking: boolean;
  isTimesUp:boolean;
  reset: () => void;  
  startTimer: () => void;
  switchStages: (index: number) => void; 
  getTickingTime: () => number; 
  muteAlarm: () => void;
}
export class Timer extends Component<TimeProps> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const options = ["Pomodoro", "Short Break", "Long Break"];
    const { 
      stage, 
      seconds, 
      ticking, 
      isTimesUp,
      startTimer, 
      switchStages, 
      getTickingTime,
      reset,
      muteAlarm
    } = this.props;
    return (
      <div className='w-10/12 mx-auto pt-5 text-white flex flex-col justify-center items-center'>
            <div className='flex gap-5 items-center'>
                {options.map((option, index) => (
                    <h1 
                      key={index} 
                      className={`${index  === stage ? 
                        'bg-gray-500 bg-opacity-30' : ''}  
                        p-1 cursor-pointer transition-all`}
                      onClick={() => switchStages(index)}
                      >{option}</h1>
                ))}
            </div>
            <div className='mt-10 mb-10'>
                <h1 className='text-8xl font-bold select-none m-0'>
                  {getTickingTime()}:{seconds.toString().padStart(2,"0")}
                </h1>
            </div>
            <div className='flex gap-3 items-center'>
              <button 
              className='px-16 py-2 text-2xl rounded-md bg-white text-blue-500  uppercase font-bold'
              onClick={startTimer}>
               {ticking ? "Stop": "Start"}
              </button>
              {isTimesUp && (
                <BiBellOff classNam="text-5xl text-white cursor-pointer" onClick={muteAlarm}/>
              )}          
            </div>
            {ticking && (
              <button className='uppercase text-white underline mt-5' onClick={reset}>
                Reset
              </button>
            )}
      </div>
    )
  }
}

export default Timer