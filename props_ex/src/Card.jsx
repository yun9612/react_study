export function Card({ title, imgUrl, tags, highlight, style }) {
  return (
    <div style={style}>
      <h2 style={{ color: highlight ? "red" : "black" }}>{title}</h2>
      <img src={imgUrl} alt="이미지" style={{ width: "100px" }} />
      <ul>
        {tags.map((tag, i) => (
          <li key={i}>#{tag}</li>
        ))}
      </ul>
    </div>
  );
}
