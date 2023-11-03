import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import useSound from "use-sound";
import qala from "../assets/qala.mp3";
import { AiFillPlayCircle, AiFillPauseCircle} from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import { IconContext } from 'react-icons/lib';
const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound}] = useSound(qala);
    const [time, setTime] = useState({
        min: 0,
        sec: 0
    }) //current position of the audio in minutes and seconds
    const [seconds, setSeconds] = useState(); //current position of the audio in seconds
    useEffect(()=>{
        const sec = duration /1000;
        const min = Math.floor(sec/60);
        const secRemain = Math.floor(sec % 60)
        const timeData  = {
            min: min,
            sec: secRemain
        }
    })
    useEffect(()=>{
        const interval = setInterval(()=>{
            if (sound) {
                setSeconds(sound.seek([])); // setting the seconds state with the current state
                const min = Math.floor(sound.seek([])/ 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setTime({
                    min,
                    sec,
                })
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [sound])
    const playingButton = () => {
        if (isPlaying) {
            pause(); // this will pause the audio
            setIsPlaying(false);
        } else {
            play(); // this will play the audio
            setIsPlaying(true);
        }
    }
  return (
    <div className='component'>
        <h2>Playing Now</h2>
        <img
        className='musicCover'
        src="https://picsum.photos/200/200" 
        alt=''
        />
        <div>
            <h3 className='title'>MadhuKumar AP</h3>
            <p className='subTitle'>Qala</p>
        </div>
        <div>
            <div className='time'>
                <p>
                    {time.min} : {time.sec}
                </p>
                <p>
                    {time.min}:{time.sec}
                </p>
            </div>
            <input
            type='range'
            min="0"
            max={duration/1000}
            default="0"
            value={seconds}
            className='timeline'
            onChange={(e)=>{
                sound.seek([e.target.value])
            }}
            />
        </div>
        <div>
            <button className='playButton'>
                <IconContext.Provider value={{size: "3em", color:"#27AE60"}}>
                    <BiSkipPrevious/>
                </IconContext.Provider>
            </button>
            {!isPlaying ?(
                <button className='playButton' onClick={playingButton}>
                    <IconContext.Provider value={{size : "3em", color:"#27AE60"}}>
                        <AiFillPlayCircle/>
                    </IconContext.Provider>
                </button>
            ) : (
                <button className='playButton' onClick={playingButton}>
                    <IconContext.Provider value={{size: "3em", color: "#27AE60"}}>
                        <AiFillPauseCircle/>
                    </IconContext.Provider>
                </button>
            )}
            <button className='playButton'>
                <IconContext.Provider value={{size: "3em", color:"#27AE60"}}>
                    <BiSkipNext></BiSkipNext>
                </IconContext.Provider>
            </button>
        </div>
    </div>
  );
}
export default Player