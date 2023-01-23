import React, { useContext } from "react";
import {
  IoIosCheckmark,
  IoIosInformation,
  IoIosClose,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import {
  Container,
  Row,
  Column,
  Title,
  Message,
  Icon,
  CloseButton,
} from "./styles";
import { ToastContext } from "../../providers/contexts/toast";

export function ToastNotification() {
  let { type, title, message, active, closeToastBar } =
    useContext(ToastContext);

  // message =
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book. It hassurvived not only five centuries, but also the leap intoelectronic typesetting, remaining essentially unchanged. It waspopularised in the 1960s with the release of Letraset sheetscontaining Lorem Ipsum passages, and more recently with desktoppublishing software like Aldus PageMaker including versions ofLorem Ipsum.";
  // title = "testando ";
  // active = true;
  // type = "success";

  if (active && title) {
    return (
      <Container type={type}>
        <Row>
          <Icon>
            {type == "info" ? (
              <IoIosInformation />
            ) : type == "success" ? (
              <IoIosCheckmark />
            ) : (
              <IoIosClose />
            )}
          </Icon>
          <Column>
            <Title>{title}</Title>
            <Message>{message}</Message>
          </Column>
          <CloseButton onClick={closeToastBar}>
            <IoIosCloseCircleOutline />
          </CloseButton>
        </Row>
      </Container>
    );
  } else {
    <></>;
  }
}

export default ToastNotification;
