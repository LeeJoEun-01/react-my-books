import { Col, Row, Input, Button } from "antd";
// index.tsx 파일에 import "antd/dist/antd.css"; 해줘야지 css가 제대로 적용된다.
import React, { useRef } from "react";
import { LoginReqType } from "../types";
import styles from "./Signin.module.css"; 

// 로그인을 요청하기 위해서 컨테이너에서 로그인이라고 하는
// props로 함수를 찔러 넣고 이 컴포넌트에서 로그인 함수를 호출한다. 
// 로그인 props 정의 => 다른 곳에서도 사용할 수 있으므로 types.ts 파일에서 관리 

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  // 작업한 UI에 unctrolled component로 이 input를 레퍼런스 삼고, 그 레퍼런스에서 값을 꺼낸 다음에 signin 버튼을 클릭하면
  // 로그인 API를 칠 수 있도록 작업
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  return (
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img
              src="/bg_signin.png"
              alt="signin"
              className={styles.signin_bg}
            />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Please Note Your Opinion
            </div>
            <div className={styles.signin_unerline} />
            <div className={styles.email_title}>
              Email
              <span className={styles.required}>*</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
                ref={emailRef}
              />
            </div>
            <div className={styles.password_title}>
              Passwoed
              <span className={styles.required}>*</span>
            </div>
            <div className={styles.input_area}>
              <Input
                type="password"
                placeholder="current-passwoed"
                className={styles.input}
                ref={passwordRef}
              />
            </div>
            <div className={styles.button_area}>
              <Button size="large" className={styles.button} onClick={click}>
                Sign In
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  function click() {
    //email과 password의 값을 꺼낸다.
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;
    login({ email, password });
  }
};

export default Signin;