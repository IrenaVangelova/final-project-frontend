import SectionTitle from "../../components/sectionTitle";
import "./MyProfile.css";
import avatar from "../../components/UI/images/avatar.jpg";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../Helpers/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const [currentUser, getUser] = useCurrentUser();
  const [profile, setProfile] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [previewImage, setPreviewImage] = useState(true);
  const [image, setImage] = useState('');

  const navigation = useNavigate();

  const getProfileData = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${currentUser.token}`,
    };
    axios
      .get(`http://localhost:5000/users/${currentUser.userId}`)
      .then((response) => {
        setProfile(response.data.users);
        setImage(response.data.users.image);
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
      navigation("/login");
    } else {
      getProfileData();
    }
  }, []);

  const onChangeHandler = () => {
    setHasChanges(true);
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('id', currentUser.userId);
    formData.append('firstName', event.target[1].value);
    formData.append('lastName', event.target[5].value);
    formData.append('password', event.target[3].value);
    formData.append('email', event.target[2].value);
    formData.append('birthdate', event.target[6].value);
    formData.append('image', image);

    let id = currentUser.userId;

    axios
      .post(`http://localhost:5000/users/${id}/update`, formData)
      .then((response) => {
        alert("Profile successfully updated"); 
        navigation("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <SectionTitle title={"My Profile"} />
      <form className="profile-form" onSubmit={updateProfileHandler}>
        <div className="profile-textbox">
          <img src={image && previewImage ? 'http://localhost:5000/' + image : (previewImage==false ? URL.createObjectURL(image) : avatar)} alt="Avatar" />
            <input id="file" type="file" style = {{visibility: "hidden"}} accept="image/*" onChange={(e) => { setImage(e.target.files[0]); setPreviewImage(false); setHasChanges(true)}} />
            <label for="file">CHANGE AVATAR</label>
        </div>
        <div className="profile-info">
          <div className="first-three">
            <div className="profile-form-names">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                placeholder="John"
                name="firstName"
                defaultValue={profile.firstName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="profile-form-names">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                placeholder="john@smith.com"
                defaultValue={profile.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="profile-form-names">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                onChange={onChangeHandler}
              />
            </div>
            <button type="submit" disabled={!hasChanges}>
              SAVE
            </button>
          </div>
          <div className="last-three">
            <div className="profile-form-names">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Smith"
                defaultValue={profile.lastName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="profile-form-names">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                onChange={() => console.log(profile)}
              />
            </div>
            <div className="profile-form-names">
              <label htmlFor="passwordRepeat">Repeat Password</label>
              <input
                type="password"
                id="passwordRepeat"
                placeholder="******"
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default MyProfile;