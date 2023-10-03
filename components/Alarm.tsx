import React, { forwardRef  } from 'react'


const Alarm =  forwardRef<HTMLAudioElement>((_, ref) => {
  return (
    <audio ref={ref} controls>
        <source src="/alarm.mp3" type="audio/mp3"  />
        Your browser doesn't support the audio element.
    </audio>
  )
});

export default Alarm