import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "../assets/chat.css";
import Title from "./Title";
import Input from "./Input";
import { getMessages } from "../_actions/actions";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 660px;
  background-color: #56be9c;
  padding: 30px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.location || "left"};
  align-items: center;
`;
const Bubble = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  font-family: "NotoSans";
  font-size: 14px;
  text-align: center;
  padding: 10px;
  max-width: 62px;
  margin-bottom: 10px;
  margin-left: 100px;
  margin-right: 15px;
  z-index: 5;
`;

const Chat = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, other_user, leader, user, room_idx } = props;
  //const myname = window.localStorage.getItem("name");
  //const myid = window.localStorage.getItem("id");
  const myid = 1;
  const myname = "나";
  const other = other_user;
  const leader_idx = leader;
  const member_idx = user;
  const last = useRef("");
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([
    {
      message: "안녕",
      time: "2021-07-28",
      sender_UserIdx: 2,
      sender_UserName: "친구",
      room_RoomIdx: 1,
    },
    {
      message: "안녕!",
      time: "2021-07-28",
      sender_UserIdx: 2,
      sender_UserName: "친구",
      room_RoomIdx: 1,
    },
    {
      message: "안녕?",
      time: "2021-07-28",
      sender_UserIdx: 1,
      sender_UserName: "나",
      room_RoomIdx: 1,
    },
    {
      message: "안녕!!!",
      time: "2021-07-28",
      sender_UserIdx: 1,
      sender_UserName: "나",
      room_RoomIdx: 1,
    },
    {
      message: "안녕~",
      time: "2021-07-28",
      sender_UserIdx: 1,
      sender_UserName: "친구",
      room_RoomIdx: 1,
    },
  ]);
  var client = new Client();
  client.configure({
    brokerURL: "ws://localhost:5000/sock",
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log("onConnect");
    },
  });

  const callback = (message) => {
    if (message.body) {
      alert("got message with body " + message.body);
    } else {
      alert("got empty message");
    }
  };

  client.onConnect = function (frame) {
    client.subscribe(`/topic/${room_idx}`, callback);
  };
  client.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  client.activate();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getMessages(room_idx)).then((response) => {
    //   if (response.payload) {
    //     setMessage(response.payload);
    //   } else {
    //     console.log("메세지 목록 가져오기 에러");
    //   }
    // });
    last.current = "";
  }, []);

  const onInputChange = (e) => {
    setMessage(e.target.value);
    last.current = "";
  };

  const sendMessage = () => {
    client.publish({
      destination: "/pub/message",
      body: JSON.stringify({
        room_idx: room_idx,
        user_idx: myid,
        user_name: myname,
        message: message,
      }),
    });
    setMessage("");
  };

  const disconnect = () => {
    client.publish({
      destination: "/pub/message",
      body: JSON.stringify({
        room_idx: room_idx,
        user_idx: myid,
      }),
    });
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? "openModal modal" : "modal"}
      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
    >
      {open ? (
        <section>
          <header
            style={{
              height: "95px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              boxShadow: "0px 5px 15px grey",
            }}
          >
            <div>
              <Title>
                {other ? other : member_idx ? member_idx : leader_idx}
              </Title>
            </div>
            {header}
            <button className="close" onClick={disconnect}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <Content>
            {messages?.map((message, i) => {
              if (
                last.current !== message.sender_UserName &&
                message.sender_UserName !== myname
              ) {
                last.current = message.sender_UserName;
                return (
                  <Row>
                    <img
                      alt="profile"
                      src={require("../assets/profile.png").default}
                      style={{
                        width: "70px",
                        height: "70px",
                        marginRight: "10px",
                        position: "absolute",
                      }}
                    />
                    <img
                      alt="left"
                      src={require("../assets/left.png").default}
                      style={{
                        width: "28px",
                        height: "17px",
                        marginRight: "-112px",
                        marginLeft: "85px",
                      }}
                    />
                    <Bubble>{message.message}</Bubble>
                  </Row>
                );
              } else if (message.sender_UserName !== myname) {
                return (
                  <Row>
                    <Bubble marginLeft="100">{message.message}</Bubble>
                  </Row>
                );
              } else if (
                last.current !== myname &&
                message.sender_UserName === myname
              ) {
                last.current = myname;
                return (
                  <Row location="flex-end">
                    <Bubble>{message.message}</Bubble>
                    <img
                      alt="right"
                      src={require("../assets/right.png").default}
                      style={{
                        width: "28px",
                        height: "17px",
                        marginLeft: "-27px",
                      }}
                    />
                  </Row>
                );
              } else {
                return (
                  <Row location="flex-end">
                    <Bubble>{message.message}</Bubble>
                  </Row>
                );
              }
            })}
          </Content>

          <footer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "67px",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Input
                width="382"
                validinput="true"
                placeholder="내용을 입력하세요"
                inputwidth="350"
                value={message}
                onChange={onInputChange}
              ></Input>
              <img
                alt="send"
                src={require("../assets/paperplane.png").default}
                style={{ width: "31px", height: "34px", cursor: "pointer" }}
                onClick={sendMessage}
              />
            </div>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Chat;
