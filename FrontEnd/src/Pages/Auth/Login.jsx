import { useEffect, useRef, useState } from "react";
import Loading from "../../Components/Shared/Loading/Loading";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Featrures/authFeature/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const navigate = useNavigate();

  // Handel Foucs Input
  let foucs = useRef(null);
  useEffect(() => {
    foucs.current.focus();
  }, []);

  // Handel Form Change
  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handelSubmit(e) {
    e.preventDefault();
    const res = await dispath(userLogin(form));
    res.type && navigate(`/dashboard`);
  }

  return (
    <div className="container">
      <div className="row">
        <Form className="e-form" onSubmit={handelSubmit}>
          <div className="custom-form">
            <h1 className="head">Login Now</h1>
            <Form.Group className="form-gro" controlId="formBasicEmail">
              <Form.Control
                ref={foucs}
                name="email"
                value={form.email}
                required
                onChange={handelChange}
                type="email"
                placeholder="Enter Your Email"
              />
              <Form.Label>Email</Form.Label>
            </Form.Group>
            <Form.Group className="form-gro" controlId="formBasicPassword">
              <Form.Control
                // id="password"
                name="password"
                type="password"
                value={form.password}
                required
                minLength="6"
                onChange={handelChange}
                placeholder="Enter Your Password"
              />
              <Form.Label>Password</Form.Label>
            </Form.Group>
            <button className="btn0 btn-primary0">
              {isLoading ? <Loading /> : "Submit"}
            </button>
            <div className="google-btn">
              <a href={"http://127.0.0.1:8000/login-google"}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="image\R.jpeg"
                    alt="sign in with google"
                  />
                </div>
                <p className="btn-text">
                  <b>sign in with google</b>
                </p>
              </a>
            </div>
            {isError && <span className="err">{message}</span>}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
