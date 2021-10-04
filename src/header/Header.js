import React from "react";
import Style from "./header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <h1 id={Style.Titre}>Exemple de Quiz</h1>
      <div className={Style.Link}>
        <Link to="/test/quiz/history">Histoire</Link>
        <Link to="/test/quiz/granguil">Ecrits de Granguil</Link>
      </div>
    </div>
  );
}

export default Header;
