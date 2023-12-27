import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handlesubmit = async (value) => {
    try {
      /*dispatch({
      type: "SHOW_LOADING",
    });*/
      await axios.post("/api/users/register", value);
      /* dispatch({ type: "HIDE_LOADING" });*/
      message.success("User Registerd Successfully");
      navigate("/login");
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
          <h3>Register Page</h3>
          <Form layout="vertical" onFinish={handlesubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User Id">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p>
                {" "}
                Already Register Please <Link to="/login">Login Here</Link>
              </p>

              <Button type="primary" htmlType="submit">
                {" "}
                Register{" "}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
