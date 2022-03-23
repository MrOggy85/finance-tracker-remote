import { useRef } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import BrowserTab from "../../components/BrowserTab";

type Props = {
  visible: boolean;
  url: string;
  accountName: string;
  bottomBarBackgroundColor: string;
  bottomBarButtonColor: string;
  autoLogin: (webViewRef: any) => void;
};

const BankTab = ({
  visible,
  url,
  bottomBarBackgroundColor,
  bottomBarButtonColor,
  autoLogin,
}: Props) => {
  const webViewRef = useRef<any>(null);
  const onLoginClick = () => {
    const webView = webViewRef.current;
    if (!webView) {
      return;
    }
    autoLogin(webView);
  };

  return (
    <Container style={{ display: visible ? "block" : "none" }}>
      <Row>
        <Col xs={4}></Col>
        <Col>
          <BrowserTab src={url} bottomMargin={88} webViewRef={webViewRef} />
          <div
            style={{
              height: 40,
              backgroundColor: bottomBarBackgroundColor,
              paddingLeft: 20,
            }}
          >
            <Button onClick={onLoginClick} color={bottomBarButtonColor}>
              Login
            </Button>{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BankTab;
