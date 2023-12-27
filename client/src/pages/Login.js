import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const handlesubmit = async (value) => {
    try {
      /*dispatch({
      type: "SHOW_LOADING",
    });*/
      const res = await axios.post("/api/users/login", value);
      /* dispatch({ type: "HIDE_LOADING" });*/
      message.success("User Logged-In Successfully");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      message.error("Something Went Wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register ">
        <div className="register-form">
          <h1>POS SYSTEM</h1>
          <h3>Login Page</h3>
          <Form layout="vertical" onFinish={handlesubmit}>
            <Form.Item name="userId" label="User Id">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p>
                {" "}
                Not a User Please <Link to="/register">Register Here</Link>
              </p>

              <Button type="primary" htmlType="submit">
                {" "}
                Login{" "}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
