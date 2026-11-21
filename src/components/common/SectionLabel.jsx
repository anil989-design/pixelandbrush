const SectionLabel = ({text}) => (
  <p style={{
    display:"inline-block",
    background:"linear-gradient(135deg,#c084fc 0%,#f97316 65%,#fbbf24 100%)",
    WebkitBackgroundClip:"text",
    WebkitTextFillColor:"transparent",
    fontSize:".72rem",
    letterSpacing:".22em",
    textTransform:"uppercase",
    marginBottom:".65rem",
    fontFamily:"'Baloo 2',sans-serif",
    fontWeight:800,
  }}>{text}</p>
);

export default SectionLabel;
