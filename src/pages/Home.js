import { useEffect, useState } from "react";
import SectionTitle from "../components/sectionTitle";
import Card from "../components/UI/Card/Card";
import Modal from "../components/UI/Modal/Modal";
import axios from "axios";
import { useCurrentUser } from "../Helpers/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentUser, getUser] = useCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getLatest = () => {
    axios
      .get("http://localhost:5000/recipes/latest")
      .then((res) => {
        setLatest(res.data.recipes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPopular = () => {
    axios
      .get("http://localhost:5000/recipes/popular")
      .then((res) => {
        setPopular(res.data.recipes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getLatest();
    getPopular();
  }, []);

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
        .post("http://localhost:5000/recipes/like", { recipeId, userId })
        .then((response) => { })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let modal = null;

  if (showModal === true) {
    modal = (
      <Modal
        closeModal={closeModalHandler}
        show={showModal}
        data={modalData}
        like={likeHandler}
      />
    );
  } else {
    modal = null;
  }

  return (
    <>
      <SectionTitle title={"Fresh & New"} />
      <div
        className="cards-fresh-and-new"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "2.5rem",
        }}
      >
        {latest.map((item) => {
          return (
            <Card
              key={item._id}
              id={item._id}
              imgUrl={
                "http://localhost:5000/" + item.image
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
      <SectionTitle title={"Most Popular Recipes"} />
      <div
        className="cards-fresh-and-new"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {popular.map((item) => {
          return (
            <Card
              key={item._id}
              id={item._id}
              imgUrl={
                "http://localhost:5000/" + item.image
              }
              title={item.title}
              category={item.category}
              shortDescription={item.shortDescription}
              preparationTime={item.preparationTime}
              numberOfPeople={item.numberOfPeople}
              likes={item.likes}
              openModal={openModalHandler}
              like={likeHandler}
            />
          );
        })}
      </div>
      {modal}
    </>
  );
};

export default Home;