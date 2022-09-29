import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Blogging website</span>
        {/* <span className="headerTitlesm">Welcome!!!</span> */}
        &nbsp;
        &nbsp;
        &nbsp;
      </div>
      <img
        className="headerImg"
        src="	https://image.shutterstock.com/image-vector/welcom…oster-spectrum-brush-strokes-260nw-1146069941.jpg"
        alt=""
      />
    </div>
  );
}
