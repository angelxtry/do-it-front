import React from 'react';
import { Row, Col } from 'antd';

import Timer from '../components/Timer';
import WritingTodoCard from '../components/WritingTodoCard';

const Home = () => {
  return (
    <div>
      {/* <Row>
        <Col xs={24} md={8}>
          <Timer />
        </Col>
        <Col xs={24} md={14}>
          <WritingTodoCard />
        </Col>
      </Row> */}
      <Timer />
      {/* <WritingTodoCard /> */}
    </div>
  );
};

export default Home;
