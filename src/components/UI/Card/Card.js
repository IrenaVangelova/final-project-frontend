import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faClock,
  faStar,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { useEffect, useState } from "react";

const Card = (props) => {
  const {
    id,
    imgUrl,
    title,
    category,
    shortDescription,
    preparationTime,
    numberOfPeople,
    openModal,
    like,
    likes,
  } = props;

  const [likeCounter, setCounter] = useState(likes);

  const onClick = (event) => {
    let element = event.currentTarget;
    element.style = "color: yellow";
    setCounter(likeCounter + 1);
  };

  return (
    <div className="card-wrapper">
      <div className="card-top" style={{ backgroundImage: `url(${imgUrl})` }}>
        <div className="recipe-type">{category}</div>
      </div>
      <div className="card-bottom">
        <div className="card-content">
          <h2>{title}</h2>
          <p>{shortDescription}</p>
        </div>
        <div className="card-icons">
          <div className="card-time">
            <FontAwesomeIcon
              icon={faClock}
              color="#B8B8B8"
              style={{ marginRight: "0.2rem" }}
            />{" "}
            {preparationTime} min
          </div>
          <div className="card-people">
            <FontAwesomeIcon
              icon={faUtensils}
              color="#B8B8B8"
              style={{ marginRight: "0.2rem" }}
            />{" "}
            {numberOfPeople} people
          </div>
          <div className="card-stars">
            <FontAwesomeIcon
              id={id}
              onClick={like}
              icon={faStar}
              color="#B8B8B8"
              style={{ marginRight: "0.2rem" }}
            />
            {likeCounter}
          </div>
          <div className="card-button">
            <button onClick={openModal} id={props.id}>
              <FontAwesomeIcon icon={faAnglesRight} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;