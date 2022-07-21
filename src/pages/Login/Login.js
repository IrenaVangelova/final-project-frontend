import SectionTitle from "../../components/sectionTitle";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();

    let email = event.target[0].value;
    let password = event.target[1].value;

    axios
      .post("http://localhost:5000/users/login", { email, password })
      .then((response) => {
        let data = {
          token: response.data.token,
          email: email,
          userId: response.data.userId,
        };
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      })
      .catch((error) => alert('Invalid username or password'));
  };

  return (
    <>
      <SectionTitle title={"Log In"} />
      <div className="login-container">
        <div className="login-text-box">
          <h1>
            Welcome to <span style={{ color: "#626262" }}>Baby's</span>
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
            velit fugiat vero tenetur reprehenderit quibusdam consequuntur saepe
            ipsum soluta rem praesentium modi obcaecati nemo, rerum nisi impedit
            voluptas? Ad, doloribus? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Quam, incidunt nobis maxime, provident inventore
            harum repellat repudiandae aliquam quod expedita iste minus dolore
            dolorem quae eos et? Corrupti, dicta impedit!
          </p>
        </div>
        <form className="login-form" onSubmit={loginHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="user@domain.com"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*******"
          />
          <button type="submit">LOG IN</button>
        </form>
      </div>
    </>
  );
};

export default Login;