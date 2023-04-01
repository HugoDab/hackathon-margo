import { Row, Col } from "antd";

export const NavInfo = () => (
  <div style={{ margin: "12px", color: "black", minHeight: "42px" }}>
    <Row gutter={20} style={{ width: "100%", marginTop: "8px" }}>
      <Col span={4}>
        <h2>Duration</h2>
        <p style={{ fontSize: "15px" }} id={"duration"}></p>
      </Col>
      <Col span={4}>
        <h2>Distance</h2>
        <p style={{ fontSize: "15px" }} id={"distance"}></p>
      </Col>
      <Col span={4}>
        <h2>Type of road</h2>
        <p style={{ fontSize: "15px" }} id={"type"}></p>
      </Col>
      <Col span={4}>
        <h2>Difficulty</h2>
        <p style={{ fontSize: "15px" }} id={"diff"}></p>
      </Col>
    </Row>
  </div>
);
