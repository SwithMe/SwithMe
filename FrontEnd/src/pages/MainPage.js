import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Title from "../components/Title";
import Image from "../components/Image";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  getTotalTime,
  getRanking,
  getRankingstudy,
  recommendedStudy,
} from "../_actions/actions";

const Fix = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Upper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 74px;
  justify-content: center;
`;
const Lower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  align-items: center;
`;

const Timer = styled.div`
  width: 1000px;
  height: 350px;
  background-color: #56be9c;
  display: inline-block;
  border-radius: 10px;
  margin-right: 40px;
  margin-top: 18px;
  padding: 97px 220px;
`;

const Time = styled.div`
  width: 560px;
  height: 160px;
  font-size: 110px;
  font-family: "NotoSans";
  font-weight: 700;
  color: white;
  line-height: 159.28px;
  text-align: center;
`;

const Rank = styled.div`
  border: 1px solid #56be9c;
  border-radius: 10px;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  width: 480px;
  height: 350px;
  margin-top: 18px;
`;
const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "black"};
  display: inline-block;
  margin-right: 8px;
`;
const Slider = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-direction: row;
  transition: 0.1s;
`;
const Study = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hour = useRef(0);
  const minute = useRef(0);
  const second = useRef(0);
  const [ranktoggle, setRankToggle] = useState(1);
  const [ranking, setRanking] = useState([]);
  const [studyRanking, setStudyRanking] = useState([]);
  const [studies, setStudies] = useState([
    {
      study_idx: 1,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 2,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 3,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 4,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 5,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 6,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 7,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 8,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
    {
      study_idx: 9,
      type: "online",
      src: "../assets/books",
      study_name: "스터디명",
      member_cnt: 0,
      manner_temperature: "0",
      hashtag: ["태그1", "태그2", "태그3", "태그4", "태그5", "태그6"],
    },
  ]);
  const move = useRef(0);
  const move_max = useRef((studies.length - 6) * 260);

  const slideRef = useRef();

  useEffect(() => {
    dispatch(getTotalTime(window.localStorage.getItem("id"))).then(
      (response) => {
        if (response.payload) {
          hour.current = response.payload;
          minute.current = response.payload;
          second.current = response.payload;
        } else {
          console.log("공부 시간 가져오기 에러");
        }
      }
    );
    dispatch(getRanking()).then((response) => {
      if (response.payload) {
        setRanking(response.payload);
      } else {
        console.log("랭킹 가져오기 에러");
      }
    });
    dispatch(getRankingstudy()).then((response) => {
      if (response.payload) {
        setStudyRanking(response.payload);
      } else {
        console.log("스터디 랭킹 가져오기 에러");
      }
    });
    dispatch(recommendedStudy()).then((response) => {
      if (response.payload) {
        setStudies(response.payload);
      } else {
        console.log("추천 스터디 가져오기 에러");
      }
    });
    slideRef.current.style.transform = `translateX(-0%)`;
  }, []);

  const slide = (dir) => {
    if (dir === "left" && move.current !== 0) {
      move.current += 260;
      slideRef.current.style.transform = `translateX(${move.current}px)`;
    } else if (dir === "right" && move.current !== -move_max.current) {
      move.current -= 260;
      slideRef.current.style.transform = `translateX(${move.current}px)`;
    }
  };

  return (
    <Fix>
      <Header page="0" />
      <Wrapper>
        <Upper>
          <div>
            <Title>나의 누적 공부 시간</Title>
            <div></div>
            <Timer>
              <Time>
                {hour.current} : {minute.current} : {second.current}
              </Time>
            </Timer>
          </div>
          <div>
            <Title>누적 공부 시간 랭킹</Title>
            {ranktoggle === 1 ? (
              <span style={{ float: "right" }}>
                <span
                  style={{ marginRight: "31px", cursor: "pointer" }}
                  onClick={() => setRankToggle(1)}
                >
                  <Circle />
                  개인
                </span>
                <span
                  style={{ color: "#cccccc", cursor: "pointer" }}
                  onClick={() => setRankToggle(2)}
                >
                  <Circle color="#cccccc" />
                  스터디
                </span>
              </span>
            ) : (
              <span style={{ float: "right" }}>
                <span
                  style={{
                    marginRight: "31px",
                    color: "#cccccc",
                    cursor: "pointer",
                  }}
                  onClick={() => setRankToggle(1)}
                >
                  <Circle color="#cccccc" />
                  개인
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setRankToggle(2)}
                >
                  <Circle />
                  스터디
                </span>
              </span>
            )}
            <Rank>
              {ranktoggle === 1
                ? ranking?.map((person, i) => {
                    return (
                      <div
                        key={i}
                        style={{ marginBottom: "16px", height: "43px" }}
                      >
                        <Title
                          weight="400"
                          size="24"
                          lineHeight="34.75"
                          marginLeft="24"
                        >
                          {i + 1}위
                        </Title>
                        <Title
                          weight="400"
                          size="24"
                          lineHeight="34.75"
                          marginLeft="114"
                        >
                          {person.name}
                        </Title>
                        <Title
                          weight="700"
                          size="24"
                          lineHeight="34.75"
                          color="#56BE9C"
                        >
                          {person.time}
                        </Title>
                      </div>
                    );
                  })
                : studyRanking?.map((person, i) => {
                    return (
                      <div
                        key={i}
                        style={{ marginBottom: "16px", height: "43px" }}
                      >
                        <Title
                          weight="400"
                          size="24"
                          lineHeight="34.75"
                          marginLeft="24"
                        >
                          {i + 1}위
                        </Title>
                        <Title
                          weight="400"
                          size="24"
                          lineHeight="34.75"
                          marginLeft="114"
                        >
                          {person.name}
                        </Title>
                        <Title
                          weight="700"
                          size="24"
                          lineHeight="34.75"
                          color="#56BE9C"
                        >
                          {person.time}
                        </Title>
                      </div>
                    );
                  })}
            </Rank>
          </div>
        </Upper>
        <Lower>
          <div
            style={{
              width: "1520px",
              display: "inline-block",
            }}
          >
            <Title marginBottom="18">추천 스터디</Title>
            <span style={{ float: "right" }}>
              <span style={{ marginRight: "31px" }}>
                <Circle />
                온라인
              </span>
              <span style={{ color: "#cccccc" }}>
                <Circle color="#cccccc" />
                오프라인
              </span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "1640px",
            }}
          >
            <div
              style={{
                width: "18.81px",
                height: "31.81px",
                marginTop: "80px",
                marginRight: "40px",
              }}
              onClick={() => slide("left")}
            >
              <Image
                alt="left arrow"
                src={require("../assets/leftarrow.png").default}
                width="18.81"
                height="31.81"
              />
            </div>
            <div style={{ overflowX: "hidden" }}>
              <Slider ref={slideRef}>
                {studies.map((study, i) => {
                  return (
                    <Study
                      key={i}
                      onClick={() =>
                        history.push(`/studydetail/${study.study_idx}`)
                      }
                    >
                      <Image
                        alt="스터디 이미지"
                        src={require("../assets/books.jpg").default}
                        height="190"
                      />
                      <Title lineHeight="34.75" size="24" marginTop="11">
                        스터디명
                      </Title>
                      <Title size="18" weight="400" lineHeight="26.06">
                        {study.member_cnt}명 / 매너온도{" "}
                        {study.manner_temperature}°C
                      </Title>
                      <div>
                        <span style={{ size: "18px", color: "#CCCCCC" }}>
                          {study.hashtag}
                        </span>
                      </div>
                    </Study>
                  );
                })}
              </Slider>
            </div>
            <div
              style={{
                width: "18.81px",
                height: "31.81px",
                marginTop: "80px",
                marginLeft: "40px",
              }}
              onClick={() => slide("right")}
            >
              <Image
                alt="right arrow"
                src={require("../assets/rightarrow.png").default}
                width="18.81"
                height="31.81"
              />
            </div>
          </div>
        </Lower>
      </Wrapper>
    </Fix>
  );
};

export default MainPage;