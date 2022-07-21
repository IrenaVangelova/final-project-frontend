import { useState, useEffect } from "react";

import MyRecipeTitle from "../../components/MyRecipeTitle";
import "./MyRecipes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCurrentUser } from "../../Helpers/userContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from "axios";

const MyRecipes = () => {
  const [currentUser, getUser] = useCurrentUser();

  const [myRecipes, setMyRecipes] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const navigate = useNavigate();

  const get = () => {
    axios
      .post("http://localhost:5000/recipes/myRecipes", {
        user: currentUser.userId,
      })
      .then((res) => {
        setMyRecipes(res.data.recipes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUser();
    get();
  }, []);

  const deleteHandler = (event) => {
    let id = event.currentTarget.id;
    axios
      .post(`http://localhost:5000/recipes/${id}/remove`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const edit = (e) => {
    navigate({
      pathname: "/edit",
      search: `?recipe=${e.currentTarget.id}`,
    });
  };

  return (
    <>
      <MyRecipeTitle title={"My Recipes"} />
      <table>
        <tr className="property-names">
          <th>Recipe Name</th>
          <th>Category</th>
          <th>Created On</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {myRecipes.map((item) => {
          return (
            <tr
              className="table-info"
              key={item._id}
              id={item._id}
            >
              <td style={{ fontWeight: "bold", color: "var(--midgrey)" }}>
                {item.title}
              </td>
              <td
                style={{
                  font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 12px/22px var(--unnamed-font-family-roboto)",
                  letterSpacing: "var(--unnamed-character-spacing-0)",
                  color: "var(--white)",
                  textAlign: "center",
                  textTransform: "uppercase",
                  opacity: "1",
                }}
              >
                <div className="my-recipes-category">{item.category}</div>
              </td>
              <td><div style={{marginRight: "130px"}}>{moment(item.createdOn).format('DD.MM.YYYY')}</div></td>
              <td>
                <FontAwesomeIcon
                  id={item._id}
                  icon={faEdit}
                  color="gray"
                  style={{
                    width: "16.6px",
                    height: "30.1px",
                    cursor: "pointer",
                  }}
                  onClick={edit}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  id={item._id}
                  icon={faTrashCan}
                  color="gray"
                  style={{
                    width: "16.6px",
                    height: "30.1px",
                    cursor: "pointer",
                  }}
                  onClick={deleteHandler}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default MyRecipes;