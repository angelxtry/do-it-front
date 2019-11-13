import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Input, Row, Col } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { LOAD_USER_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, []);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/index">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="history">
          <Link href="/todohistory">
            <a>History</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={18}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
