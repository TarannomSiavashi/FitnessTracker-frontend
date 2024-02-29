import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../home-components/styles/toolBar.css";
export default function ToolBar({userId}) {
  console.log("bar ID:", userId);
  return (
    <div className="toolbar">
      <h3>Fitness Tracker</h3>
      <Link to={`/User/${userId}`}>
        <FontAwesomeIcon icon={faUser} size="2x" id="icon" />
      </Link>
    </div>
  );
}
