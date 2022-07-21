import AddRecipeTitle from "../../components/AddRecipeTitle";
import "./EditRecipe.css";
import recipeImg from "../../components/UI/images/recipe.jpg";
import axios from "axios";
import { useCurrentUser } from "../../Helpers/userContext";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EditRecipe = () => {
  const [currentUser, getUser] = useCurrentUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipeData, setRecipeData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const recipe = searchParams.get("recipe");
  const [previewImage, setPreviewImage] = useState(true);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const getRecipeData = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${currentUser.token}`,
    };
    axios
      .get(`http://localhost:5000/recipes/${recipe}`)
      .then((response) => {
        console.log(response.data.recipes);
        setRecipeData(response.data.recipes);
        setImage(response.data.recipes.image);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
    if (
      typeof currentUser === undefined ||
      currentUser === null ||
      currentUser.token === null
    ) {
      navigate("/login");
    } else {
      getRecipeData();
    }
  }, []);

  const onChangeHandler = () => {
    setHasChanges(true);
  };

  const UpdateRecipeHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('id', currentUser.userId);
    formData.append('title', event.target[1].value);
    formData.append('category', event.target[2].value);
    formData.append('preparationTime', event.target[3].value);
    formData.append('numberOfPeople', event.target[4].value);
    formData.append('shortDescription', event.target[5].value);
    formData.append('description', event.target[7].value);
    formData.append('image', image);

    let id = currentUser.userId;

    axios
      .post(`http://localhost:5000/recipes/${recipe}/update`, formData)
      .then((response) => {
        alert("Recipe updated");
        navigate("/myRecipes");
      })
      .catch((error) => console.log("error"));
  };

  return (
    <>
      <AddRecipeTitle title={"My Recipes"} />

      <form onSubmit={UpdateRecipeHandler} className="recipe-form">
        <div className="img-info">
          <h4 htmlFor="recipeImg">Recipe Image</h4>
          <img src={image && previewImage ? 'http://localhost:5000/' + image : (previewImage==false ? URL.createObjectURL(image) : recipeImg)} alt="recipeImg" />
            <input id="file" type="file" style = {{visibility: "hidden"}} accept="image/*" onChange={(e) => { setImage(e.target.files[0]); setPreviewImage(false); setHasChanges(true)}} />
            <label for="file">UPLOAD IMAGE</label>
        </div>
        <div className="form-info">
          <div className="form-names">
            <label htmlFor="recipeTitle">Recipe Title</label>
            <input
              id="recipeTitle"
              placeholder="Title"
              name="recipeTitle"
              defaultValue={recipeData.title}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-inside">
            <div className="form-names">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                selected={recipeData.category}
                onChange={onChangeHandler}
              >
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
              </select>
            </div>
            <div className="form-names">
              <label htmlFor="prepTime">Preparation Time</label>
              <input
                id="prepTime"
                name="prepTime"
                placeholder="0"
                defaultValue={recipeData.preparationTime}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-names">
              <label htmlFor="numberOfPeople">No. People</label>
              <input
                id="numberOfPeople"
                name="numberOfPeople"
                placeholder="0"
                defaultValue={recipeData.numberOfPeople}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="form-names-shortDesp">
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              id="shortDesc"
              name="shortDesc"
              placeholder="Short description..."
              defaultValue={recipeData.shortDescription}
              onChange={onChangeHandler}
            />
          </div>
          <button type="submit" disabled={!hasChanges}>SAVE</button>
        </div>
        <div className="recipe-info">
          <h4 htmlFor="recipe">Recipe</h4>
          <textarea
            id="recipe"
            name="recipe"
            placeholder="Description..."
            defaultValue={recipeData.description}
            onChange={onChangeHandler}
          />
        </div>
      </form>
    </>
  );
};

export default EditRecipe;