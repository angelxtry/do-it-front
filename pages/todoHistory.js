import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Row, Col } from 'antd';

import TodoCalendar from '../components/TodoCalendar';
import TodoCard from '../components/TodoCard';
import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

const todoHistory = () => {
  const { todos } = useSelector((state) => state.todoHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(moment().format('YYYY-MM-DD'));
    const today = moment().format('YYYY-MM-DD');
    dispatch({
      type: LOAD_TODOS_REQUEST,
      date: today,
    });
  }, []);

  console.log(todos);
  return (
    <div>
      <Row>
        <Col xs={24} md={8}>
          <TodoCalendar />
        </Col>
        <Col xs={24} md={14}>
          {todos.map((todo) => {
            return <TodoCard key={todo.id} todo={todo} />;
          })}
        </Col>
      </Row>
    </div>
  );
};

export default todoHistory;
