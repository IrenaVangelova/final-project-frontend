import SectionTitle from '../../components/sectionTitle';
import Card from '../../components/UI/Card/Card';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../../Helpers/userContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import Pagination from '../../components/UI/Pagination/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Dinner = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentUser, getUser] = useCurrentUser();

  const navigation = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const get = (page) => {
    if (page === null || page === undefined) page = 0;
    axios
      .get("https://irenas-final-project-frontend.herokuapp.com/recipes/category/dinner/" + page)
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data.recipes);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    get();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(recipes.length);

  const prevPageHandler = () => {
    if (currentPage - 1 < 0) return;
    setCurrentPage(currentPage - 1);
    get(currentPage);
    console.log(currentPage);
  };
  const nextPageHandler = () => {
    if (currentPage + 1 > totalPages - 1) return;
    setCurrentPage(currentPage + 1);
    get(currentPage);
    console.log(currentPage);
  };

  useEffect(() => {
    get(currentPage);
    console.log(currentPage);
  }, [currentPage]);

  const openModalHandler = (event) => {
    setModalData(event.currentTarget.id);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setModalData({});
  };

  const likeHandler = (event) => {
    if (
      typeof currentUser === undefined ||
      currentUser === null ||
      currentUser.token === null
    ) {
      navigation("/login");
    } else {
      let recipeId = event.currentTarget.id;
      let userId = currentUser.userId;

      axios
        .post("https://irenas-final-project-frontend.herokuapp.com/recipes/like", { recipeId, userId })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  };


  let modal = null;

  if (showModal === true) {
    modal = <Modal closeModal={closeModalHandler} show={showModal} data={modalData} like={likeHandler}/>;
  } else {
    modal = null;
  }

  return (
    <div>
      <SectionTitle title={"Dinner"} />
      <div
        className="cards-content"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "1rem",
          flexWrap: "wrap"
        }}
      >
        {recipes.map((item) => {
          return (
            <Card
              key={item._id}
              id={item._id}
              imgUrl={
                "https://irenas-final-project-frontend.herokuapp.com/" + item.image
              }
              title={item.title}
              category={item.category}
              shortDescription={item.shortDescription}
              preparationTime={item.preparationTime}
              likes={item.likes}
              numberOfPeople={item.numberOfPeople}
              openModal={openModalHandler}
              like={likeHandler}
            />
          );
        })}
      </div>
      {modal}

      <div className="pagination-arrows" style={{ marginTop: "3rem" }}>
        <button onClick={prevPageHandler} style={{border: "0",
    background: "#F8F7F2"}}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            color="gray"
            style={{
              width: "16.6px",
              height: "30.1px",
              cursor: "pointer",
            }}
          />
        </button>
        <span>&nbsp;&nbsp;{currentPage + 1}&nbsp;&nbsp;</span>
        <button onClick={nextPageHandler} style={{border: "0",
    background: "#F8F7F2"}}>
          <FontAwesomeIcon
            icon={faChevronRight}
            color="gray"
            style={{
              width: "16.6px",
              height: "30.1px",
              cursor: "pointer",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default Dinner;