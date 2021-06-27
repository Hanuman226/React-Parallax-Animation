import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import "./styles.css";

function App() {
  const [offset,setOffset]=useState(0);
  const [show, doShow] = useState({
    itemOne: false,
    itemTwo: false
  });
  // const [speed, setSpeed] = useState({
  //   itemOne: 0,
  //   itemTwo: 0
  // });
  const [scaleFactor, setScaleFactor] = useState({
    itemOne: 0,
    itemTwo: 0
  });

  console.log({ scale1: scaleFactor.itemOne });
  console.log({ scale2: scaleFactor.itemTwo });
  const wrapper1Ref = useRef(null);
  const wrapperRef = useRef(null);
  const carousel1Ref = useRef(null);
  const carousel2Ref = useRef(null);
  useLayoutEffect(() => {
    const topPos = (element) => element.getBoundingClientRect().top;
    const getHeight = (element) => element.offsetHeight;
    const bottomPos = (element) => element.getBoundingClientRect().bottom;
    // const wrapper1Pos = topPos(wrapper1Ref.current);
    const wrapperPos = topPos(wrapperRef.current);
    // const wrapperHeight = getHeight(wrapperRef.current)
    const carousel1Height = getHeight(carousel1Ref.current);
    const carousel2Height = getHeight(carousel2Ref.current);
    // const carousel1Pos = topPos(carousel1Ref.current);
    const carousel2Pos = topPos(carousel2Ref.current);
    const carousel1Bot = bottomPos(carousel1Ref.current);
    const carousel2Bot = bottomPos(carousel2Ref.current);
    // const div3Height = getHeight(carousel2Ref.current)
    // const div4Height = getHeight(refFour.current)

    const onScroll = () => {
      setOffset(window.pageYOffset);
      const scrollPos = window.scrollY + window.innerHeight;
      // 1st Carousel
      if (wrapperPos < scrollPos) {
        doShow((state) => ({ ...state, itemOne: true }));
        doShow((state) => ({ ...state, itemTwo: true }));
        let itemOnePercent = ((scrollPos - carousel1Bot) * 100) / carousel1Height;
        if (itemOnePercent > 100) itemOnePercent = 100;
        if (itemOnePercent < 0) itemOnePercent = 0;
        setScaleFactor((prevState) => ({
          ...prevState,
          itemOne: 2 - itemOnePercent / 100
        }));
      }

      // if (scrollPos > carousel1Pos) {
      //   setSpeed((prevState) => ({
      //     ...prevState,
      //     itemOne: carousel1Pos - scrollPos
      //   }));
      // }

      // 2nd Carousel
      if (carousel2Pos< scrollPos) {
        let itemTwoPercent =
          ((scrollPos - carousel2Bot) * 100) / carousel2Height;
          // console.log({itemTwoPercent})
        if (itemTwoPercent > 100) itemTwoPercent = 100;
        if (itemTwoPercent < 0) itemTwoPercent = 0;

        setScaleFactor((prevState) => ({
          ...prevState,
          itemTwo:2- itemTwoPercent / 100
        }));
      }

      // if (scrollPos > carousel1Pos) {
      //   setSpeed((prevState) => ({
      //     ...prevState,
      //     itemTwo: carousel2Pos - scrollPos
      //   }));
      // }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [wrapperRef, carousel1Ref, carousel2Ref,offset]);
  return (
    <>
      <p>scroll down</p>
      <Container>
      <Wrapper1 ref={wrapper1Ref}>
        <Text>
          Ultimate fitness
          <br />
          subscription to all gyms
        </Text>
        <Img1 speed={350-offset} src={image1} alt="gym" width="450" height="316" />
        <Img1 speed={700-offset*1.95} src={image1} alt="gym" width="450" height="316" />
        <br />
        <Img1 speed={700-offset*1.4} src={image1} alt="gym" width="450" height="316" />
        <Img1 speed={700-offset*1.2} src={image1} alt="gym" width="450" height="316" />
        <Img1 speed={700-offset*1.6} src={image1} alt="gym" width="450" height="316" />
      </Wrapper1>
      <Wrapper2 ref={wrapperRef}>
        <Text>
          World Class Workouts
          <br />
          By The World's Best Trainers
        </Text>
        <Carousel
          animate={show.itemOne}
          scaleFactor={scaleFactor.itemOne}
          speed={700-offset}
          ref={carousel1Ref}
          zIndex={0}
        >
          <Img2 src={image2} alt="gym" width="300" height="374" />
          <Img2 src={image2} alt="gym" width="300" height="374" />
          <Img2 src={image2} alt="gym" width="300" height="374" />
          <Img2 src={image2} alt="gym" width="300" height="374" />
        </Carousel>
        <Carousel
          animate={show.itemTwo}
          scaleFactor={scaleFactor.itemTwo}
          speed={800-offset}
          ref={carousel2Ref}
          zIndex={0}
        >
          <Img2 src={image2} alt="gym" width="300" height="374" />
          <Img2 src={image2} alt="gym" width="300" height="374" />
          <Img2 src={image2} alt="gym" width="300" height="374" />
          <Img2 src={image2} alt="gym" width="300" height="374" />
        </Carousel>
      </Wrapper2>
      </Container>
    </>
  );
}
const Container=styled.div`
     /* height: 200vh; */
    /* overflow-x: hidden; */
    /* &::-webkit-scrollbar{display:none}; */
    /* overflow-y:scroll; */
    /* scroll-snap-type: y; */
`;
// first animation
const Wrapper1 = styled.div`
height:150vh;
  /* scroll-snap-align: start; */
  /* overflow: hidden; */
  /* margin-top: 100vh; */
  /* margin-bottom: 100vh; */
  text-align:center;
  background: orange;
  position: relative;
`;
const Img1 = styled.img`
 transform: translateY(${({ speed }) => 100 + speed + "px"});
  border-radius: 5%;
  margin: 1rem;
  max-width: 100%;
  transition:transform 2s;
  /* filter: grayscale(); */
`;

const Carousel = styled.div`
  /* height: 100%; */
  margin-top: 5vh;
  transform: translateY(${({ speed }) => 100 + speed + "px"})
  scale(${({ scaleFactor }) => scaleFactor});
  transition: scale 2s,transform 2s;
  z-index: ${({ zIndex }) => zIndex};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
  // overflow:hidden;
`;
const Text = styled.p`
  font-size: 2rem;
  font-weight: bold;
  position: absolute;
  height: 100%;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  color: white;
  text-align: center;
`;

const Img2 = styled.img`
  border-radius: 10%;
  margin: 1rem;
  max-width: 100%;
  /* filter: grayscale(); */
`;
const Wrapper2 = styled.div`
  /* min-height: 100vh; */
  /* scroll-snap-align: start; */
  /* overflow-x:hidden; */
  /* overflow-y:scroll; */
  /* overflow: hidden; */
  /* margin-top: 100vh; */
  margin-bottom: 100vh;
/* &::-webkit-scrollbar{display:none}; */
  display: flex;
  flex-flow: column;
  align-items: center;
  background: orange;
  position: relative;
  /* &::before {
    content: "";
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    background: black;
    opacity: 0.3;
  } */
`;

export default App;
