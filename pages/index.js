import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import {
  START_TIMER,
  ADD_SECOND,
  STOP_TIMER,
  RESET_TIMER,
  SET_TIMER,
  START_TIMER_AND_TODO_CREATE_REQUEST,
} from '../reducers/timer';

const Home = () => {
  const { TextArea } = Input;
  const [todoContent, setTodoContent] = useState('');
  const { totalTime, elapsedTime, isStarting, isRunning } = useSelector(
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

  const verifyContent = (content) => {
    const verified = content && content.trim();
    return verified && verified.length > 0 ? verified : null;
  };

  const onStart = useCallback(() => {
    const verified = verifyContent(todoContent);
    if (!verified) {
      return alert('Todo에 할 일을 적어주세요.');
    }
    dispatch({
      type: START_TIMER_AND_TODO_CREATE_REQUEST,
      data: {
        todoContent: verified,
        duration: timeFormat(totalTime).total,
        startedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
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
          <Button
            type="primary"
            onClick={onStart}
            loading={isStarting}
            style={{ width: '70%' }}
          >
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
