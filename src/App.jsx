import { useState, useEffect, useRef } from 'react'
import playlogo from './assets/icons8-play-50.png'
import pauselogo from './assets/icons8-pause-64.png'
import flaglogo from './assets/icons8-flag.png'
import resetlogo from './assets/icons8-reset-50.png'

import './App.css'

function App() {

  const [isRunning, setisRunning] = useState(false);
  const [elapsedTime, setelapsedTime] = useState(0);
  const [Laps, setLaps] = useState([])
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const id = useRef(0);
  const animationref = useRef();

  const timeObject = {
    hours: String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, "0"),
    minutes: String(Math.floor(elapsedTime / (1000 * 60) % 60)).padStart(2, "0"),
    seconds: String(Math.floor(elapsedTime / (1000) % 60)).padStart(2, "0"),
    miliseconds: String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0")
  };

  const { hours, minutes, seconds, miliseconds } = timeObject;

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setelapsedTime(Date.now() - startTimeRef.current)
      }, 10)
      console.log(intervalIdRef.current)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }

  }, [isRunning])

  const start = () => {
    setisRunning(true);
    startTimeRef.current = Date.now() - elapsedTime
    animationref.current.style.animationPlayState = "running"


  }

  const stop = () => {
    setisRunning(false)
    animationref.current.style.animationPlayState = "paused"


  }

  const reset = () => {
    setisRunning(false)
    setelapsedTime(0)
    setLaps([])
    id.current = 0;
    animationref.current.style.animationPlayState = "paused"
    animationref.current.style.strokeDashoffset = 0


  }

  const lap = () => {
    id.current = id.current + 1
    const { minutes, seconds, miliseconds } = timeObject;
    const lapTime = `${minutes} : ${seconds} : ${miliseconds}`;


    setLaps((Laps) => [...Laps, { iD: id.current, lapTime: lapTime }])


  }



  return (
    <>
      <div className="screenborder">
        <h2>Stopwatch</h2>
        <div className="box">
          <svg height="100%" width="100%" className='outerSVG' xmlns="http://www.w3.org/2000/svg">
            <circle className='innerCircle' r="135" cx="150" cy="145" />
            <circle ref={animationref} className='circularAnimaion' r="135" cx="150" cy="145" fill="none" stroke="#31134b" strokeWidth="11px" />
            <foreignObject x="0" y="0" width="100%" height="100%">
              <div className="innerdisplay" >
                <div className="hours">
                  <span className="labels">Hours</span>
                  <span className="hoursText">{hours}</span>
                </div>
                <div className="MinSec">
                  <div className="minutes">
                    <span className='labels'>Minutes</span>
                    <span className='minutesText'>{minutes}</span>
                  </div>
                  <span className="colon">:</span>
                  <div className="seconds">
                    <span className='labels'>Seconds</span>
                    <span className='secondsText'>{seconds}</span>
                  </div>
                </div>
                <span className="miliseconds">{miliseconds}</span>
              </div>
            </foreignObject>
          </svg>
        </div>



        <div className="laps" >
          {Laps.map(item => {
            return <div key={item.iD} className="lap">
              <div className="lapText">Lap{item.iD} </div>
              <div className="lapTime"> {item.lapTime}</div>
            </div>
          }

          )}

        </div>

        <div className="buttons">
          <button className="reset" onClick={reset}><img src={resetlogo} width="20px" height="20px" /></button>

          {!isRunning ? (
            <button className="Play-Pause" onClick={start} >
              <img src={playlogo} width="30px" height="30px" />
            </button>
          ) : (
            <button className="Play-Pause" onClick={stop} >
              <img src={pauselogo} width="30px" height="30px" />
            </button>
          )}


          <button className="flag" onClick={lap}><img src={flaglogo} width="20px" height="20px" /></button>
        </div>

      </div>
    </>
  )
}

export default App
