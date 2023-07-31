import { LikeOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

export const Feed = () => {
  return (
    <div>
      <div>
        <Row>
        <Col xs={{ span: 3, offset: 1 }} lg={{ span: 3, offset: 2 }}>
            Profile details will be generated
          </Col>
          <Col xs={{ span: 12, offset: 1 }} lg={{ span: 8, offset: 2 }} style={{border:'2px solid red'}}>
            <div>
              <Card
                hoverable
                style={{ width: '20vw' }}
                cover={
                  <img
                    alt="example"
                    src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"
                  />
                }
              >
                <Meta title="Profile Pic" description="about something......" />
                <Meta title="" description="about something......" />
              </Card>
            </div>
            <div>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img
                    alt="example"
                    src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"
                  />
                }
              >
                <Meta title="Profile Pic" description="about something......" />
                <Meta title="" description="about something......" />
              </Card>
              <button style={{ border: "none" }}>
                <LikeOutlined style={{ color: "green", fontSize: "40px" }} />
              </button>
            </div>
            <div>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img
                    alt="example"
                    src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"
                  />
                }
              >
                <Meta title="Profile Pic" description="about something......" />
                <Meta title="" description="about something......" />
              </Card>
              <button style={{ border: "none" }}>
                <LikeOutlined style={{ color: "green", fontSize: "40px" }} />
              </button>
            </div>
            <div>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img
                    alt="example"
                    src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"
                  />
                }
              >
                <Meta title="Profile Pic" description="about something......" />
                <Meta title="" description="about something......" />
              </Card>
              <button style={{ border: "none" }}>
                <LikeOutlined style={{ color: "green", fontSize: "40px" }} />
              </button>
            </div>
            <div>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img
                    alt="example"
                    src="https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"
                  />
                }
              >
                <Meta title="Profile Pic" description="about something......" />
                <Meta title="" description="about something......" />
              </Card>
              <button style={{ border: "none" }}>
                <LikeOutlined style={{ color: "green", fontSize: "40px" }} />
              </button>
            </div>
          </Col>
          <Col xs={{ span: 2, offset: 1 }} lg={{ span: 3, offset: 2 }}>
            Recent News
          </Col>
         

        </Row>
      </div>
    </div>
  );
};

export default Feed;
