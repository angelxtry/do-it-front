import React, { useState, useEffect, useCallback } from 'react';
import { Button, Input } from 'antd';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState('');
  const [totalTime, setTotalTime] = useState(0);

  const onChangeMinutes = useCallback((e) => {
    setMinutes(e.target.value);
  }, []);

  const onChangeSeconds = useCallback((e) => {
    setSeconds(e.target.value);
  }, []);

  const timeFormat = (totalTime) => {
    const min = String(Math.floor(totalTime / 60)).padStart(2, 0);
    const sec = String(totalTime % 60).padStart(2, 0);
    return `${min}:${sec}`;
  };

  let elapsedTime = 0;
  let totalTime2 = 0;
  const onToggle = useCallback(() => {
    if (!minutes && !seconds) {
      return alert('시간을 입력해주세요.');
    }
    setIsActive((prev) => !prev);
    console.log(minutes, seconds);
    totalTime2 = parseInt(minutes, 10) * 60 + parseInt(seconds, 10) - 1;
    setTotalTime(totalTime2);
    const interval = setInterval(() => {
      elapsedTime += 1;
      setTotalTime(totalTime2 - elapsedTime);
      console.log(totalTime, elapsedTime);
    }, 1000);

    setTimer(interval);
  }, [minutes, seconds]);

  // useEffect(() => {
  //   if (!isActive) {
  //     clearInterval(timer);
  //   }
  //   if (isActive && totalTime < 0) {
  //     clearInterval(timer);
  //     setTotalTime(0);
  //     return alert('타이머가 종료되었습니다.');
  //   }
  //   return () => clearInterval(timer);
  // }, [isActive, totalTime]);

  // let elapsedTime = 0;
  // let tempTime = 0;
  // let interval = 0;
  // const onStart = useCallback(() => {
  //   if (!minutes && !seconds) {
  //     return alert('시간을 입력해주세요.');
  //   }
  //   setIsActive(true);
  //   console.log(minutes, seconds);
  //   tempTime = parseInt(minutes, 10) * 60 + parseInt(seconds, 10) - 1;
  //   // setTotalTime(totalTime2);
  //   interval = setInterval(() => {
  //     elapsedTime += 1;
  //     setTotalTime(tempTime - elapsedTime);
  //     console.log(elapsedTime);
  //   }, 1000);

  //   // setTimer(interval);
  // }, [minutes, seconds]);

  // const onStop = useCallback(() => {
  //   clearInterval(interval);
  // }, [])


  const onReset = useCallback(() => {
    setSeconds('00');
    setMinutes('00');
    setIsActive(false);
    clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ fontSize: '100px', padding: '10px' }}>
        {isActive ? (
          <div>{timeFormat(totalTime)}</div>
        ) : (
          <div>
            <span>
              <Input
                name="timer-minutes"
                value={minutes}
                onChange={onChangeMinutes}
                style={{ height: '150px', width: '150px' }}
              />
            </span>
            :
            <span>
              <Input
                name="timer-seconds"
                value={seconds}
                onChange={onChangeSeconds}
                style={{ height: '150px', width: '150px' }}
              />
            </span>
          </div>
        )}
      </div>
      <div>
        <Button onClick={onToggle}>{isActive ? 'Pause' : 'Start'}</Button>
        {/* <Button onClick={onStart}>Start</Button>
        <Button onClick={onStop}>Stop</Button>
        <Button onClick={onReset}>Reset</Button> */}
      </div>
    </div>
  );
};

export default Timer;
