import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  START_TIMER,
  ADD_SECOND,
  STOP_TIMER,
  RESET_TIMER,
  SET_TIMER,
} from '../reducers/timer';

const Home = () => {
  const { TextArea } = Input;
  const [todoContent, setTodoContent] = useState('');
  const { totalTime, elapsedTime, isRunning } = useSelector(
    (state) => state.timer,
  );
  const [timer, setTimer] = useState('');
  const dispatch = useDispatch();

  const timeFormat = (totalTime) => {
    const min = String(Math.floor(totalTime / 60)).padStart(2, 0);
    const sec = String(totalTime % 60).padStart(2, 0);
    return {
      total: `${min}:${sec}`,
      minutes: min,
      seconds: sec,
    };
  };

  const onStart = useCallback(() => {
    console.log('onStart - todoContent: ', todoContent);
    dispatch({
      type: START_TIMER,
    });
  }, [todoContent]);

  const onStop = useCallback(() => {
    dispatch({
      type: STOP_TIMER,
    });
  }, []);

  const onReset = useCallback(() => {
    dispatch({
      type: RESET_TIMER,
    });
  }, []);

  const onClickTimeSetting = useCallback(
    (time) => () => {
      dispatch({
        type: SET_TIMER,
        time,
      });
    },
    [],
  );

  const onChangeTodoContent = useCallback((e) => {
    setTodoContent(e.target.value);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        dispatch({
          type: ADD_SECOND,
        });
      }, 1000);
      setTimer(interval);
    } else {
      clearInterval(timer);
    }
  }, [isRunning]);

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <Button type="dashed" onClick={onClickTimeSetting(25)}>
          25
        </Button>
        <Button type="dashed" onClick={onClickTimeSetting(45)}>
          45
        </Button>
        <Button type="dashed" onClick={onClickTimeSetting(60)}>
          60
        </Button>
      </div>
      <div style={{ fontSize: '80px', padding: '10px' }}>
        <div>{timeFormat(totalTime - elapsedTime).total}</div>
      </div>
      <div>
        <Card type="inner" title="Todo" style={{ width: '80%' }}>
          <TextArea
            value={todoContent}
            onChange={onChangeTodoContent}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Card>
        <Card style={{ marginTop: 16, width: '80%' }} type="inner" title="Done">
          <TextArea
            // value={value}
            // onChange={this.onChange}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Card>
        {isRunning || (
          <Button type="primary" onClick={onStart} style={{ width: '70%' }}>
            Start
          </Button>
        )}
        {!isRunning || (
          <Button
            type="primary"
            ghost
            onClick={onStop}
            style={{ width: '70%' }}
          >
            Stop
          </Button>
        )}
        <Button
          type="danger"
          onClick={onReset}
          style={{ marginTop: '16px', width: '10%' }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Home;
