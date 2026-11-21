import html from "../../../assets/tech/html.png";
import css from "../../../assets/tech/css.png";
import javascript from "../../../assets/tech/javascript.png";
import reactjs from "../../../assets/tech/reactjs.png";
import threejs from "../../../assets/tech/threejs.svg";
import tailwind from "../../../assets/tech/tailwind.png";
import nodejs from "../../../assets/tech/nodejs.png";
import mongodb from "../../../assets/tech/mongodb.png";
import mysql from "../../../assets/tech/mysql.png";
import git from "../../../assets/tech/git.png";
import figma from "../../../assets/tech/figma.png";
import gsapIcon from "../../../assets/tech/gsap.png";
import framer from "../../../assets/tech/framer.png";
import aws from "../../../assets/tech/aws.png";

const TECHNOLOGIES = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "React JS", icon: reactjs },
  { name: "Three JS", icon: threejs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "GSAP", icon: gsapIcon },
  { name: "Framer", icon: framer },
  { name: "Figma", icon: figma },
  { name: "MongoDB", icon: mongodb },
  { name: "MySQL", icon: mysql },
  { name: "AWS", icon: aws },
  { name: "Git", icon: git },
];

const TechSection = () => {
  return (
    <section
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "3rem clamp(1.5rem, 5vw, 4rem) 5rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        {TECHNOLOGIES.map((tech) => (
          <div
            key={tech.name}
            title={tech.name}
            style={{
              width: 104,
              height: 104,
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, rgba(145,94,255,0.22), rgba(21,16,48,0.92))",
              border: "1px solid rgba(145,94,255,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              boxShadow: "0 14px 35px rgba(0,0,0,0.45), inset 0 2px 6px rgba(255,255,255,0.12)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.06)";
              e.currentTarget.style.boxShadow = "0 18px 40px rgba(145,94,255,0.35), inset 0 2px 8px rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 14px 35px rgba(0,0,0,0.45), inset 0 2px 6px rgba(255,255,255,0.12)";
            }}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              width="64"
              height="64"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechSection;
