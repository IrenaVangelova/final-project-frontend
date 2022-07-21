import AddRecipeTitle from "../../components/AddRecipeTitle";
import "./AddRecipe.css";
import recipeImg from "../../components/UI/images/recipe.jpg";
import axios from "axios";
import { useCurrentUser } from "../../Helpers/userContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [currentUser, getUser] = useCurrentUser();
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    if (
      typeof currentUser === undefined ||
      currentUser === null ||
      currentUser.token === null
    ) {
      navigate("/login");
    }
  }, []);

  const addRecipeHandler = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', event.target[1].value);
    formData.append('category', event.target[2].value);
    formData.append('preparationTime', event.target[3].value);
    formData.append('numberOfPeople', event.target[4].value);
    formData.append('shortDescription', event.target[5].value);
    formData.append('description', event.target[7].value);
    formData.append('user', currentUser.userId);
    formData.append('image', image);

    axios
      .post("http://localhost:5000/recipes/create", formData)
      .then((response) => {
        console.log(response);
        alert("Recipe added");
        navigate("/myRecipes");
      })
      .catch((error) => console.log("error"));
  };

  return (
    <>
      <AddRecipeTitle title={"My Recipes"} />

      <form onSubmit={addRecipeHandler} className="recipe-form">
        <div className="img-info">
          <h4 htmlFor="recipeImg">Recipe Image</h4>
          <img src={image ? URL.createObjectURL(image) : recipeImg} alt="Avatar" />
            <input id="file" type="file" style = {{visibility: "hidden"}} accept="image/*" onChange={(e) => { setImage(e.target.files[0]); }} />
            <label for="file">UPLOAD IMAGE</label>
        </div>
        <div className="form-info">
          <div className="form-names">
            <label htmlFor="recipeTitle">Recipe Title</label>
            <input id="recipeTitle" placeholder="Title" name="recipeTitle" />
          </div>
          <div className="form-inside">
            <div className="form-names">
              <label htmlFor="category">Category</label>
              <select id="category" name="category">
                <option selected="selected">Select</option>
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
              </select>
            </div>
            <div className="form-names">
              <label htmlFor="prepTime">Preparation Time</label>
              <input id="prepTime" name="prepTime" placeholder="0" />
            </div>
            <div className="form-names">
              <label htmlFor="numberOfPeople">No. People</label>
              <input
                id="numberOfPeople"
                name="numberOfPeople"
                placeholder="0"
              />
            </div>
          </div>
          <div className="form-names-shortDesp">
            <label htmlFor="shortDesc">Short Description</label>
            <textarea id="shortDesc" name="shortDesc" placeholder="Short description..." />
          </div>
          <button type="submit">SAVE</button>
        </div>
        <div className="recipe-info">
          <h4 htmlFor="recipe">Recipe</h4>
          <textarea
            id="recipe"
            name="recipe"
            placeholder="Description..."
          />
        </div>
      </form>
    </>
  );
};

export default AddRecipe;