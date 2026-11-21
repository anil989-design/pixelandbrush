import html from "../../../assets/tech/html.png";
import css from "../../../assets/tech/css.png";
import javascript from "../../../assets/tech/javascript.png";
import reactjs from "../../../assets/tech/reactjs.png";
import gsapIcon from "../../../assets/tech/gsap.png";
import framer from "../../../assets/tech/framer.png";
import threejs from "../../../assets/tech/threejs.svg";
import figma from "../../../assets/tech/figma.png";
import redux from "../../../assets/tech/redux.png";
import tailwind from "../../../assets/tech/tailwind.png";
import mui from "../../../assets/tech/mui.png";
import nodejs from "../../../assets/tech/nodejs.png";
import express from "../../../assets/tech/express.png";
import aws from "../../../assets/tech/aws.png";
import mongodb from "../../../assets/tech/mongodb.png";
import mysql from "../../../assets/tech/mysql.png";
import git from "../../../assets/tech/git.png";

const TECHNOLOGIES = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "React JS", icon: reactjs },
  { name: "gsap", icon: gsapIcon },
  { name: "framer", icon: framer },
  { name: "Three JS", icon: threejs },
  { name: "figma", icon: figma },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Material Ui", icon: mui },
  { name: "Node JS", icon: nodejs },
  { name: "Express Js", icon: express },
  { name: "AWS", icon: aws },
  { name: "MongoDB", icon: mongodb },
  { name: "MySql", icon: mysql },
  { name: "git", icon: git },
];

const TechSection = () => {
  return (
    <section
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "4rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        className="tech-icons-wrapper"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        {TECHNOLOGIES.map((technology) => (
          <div key={technology.name} style={{ width: 112, height: 112 }}>
            <img
              src={technology.icon}
              alt={technology.name}
              className="tech-icon"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechSection;
