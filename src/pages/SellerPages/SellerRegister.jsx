import React, { useState } from "react";
import styled from "styled-components";
import axios from "../../utils/axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static-blog.omniconvert.com/blog/wp-content/uploads/2020/09/21135804/How-to-do-Growth-of-eCommerce-Website-scaled.jpg")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const ErrorText = styled.h2`
  font-size: 12px;
  color: red;
  display: ${(props) => {
    if (props.visible) return "block";
    else return "none";
  }};
  transform: translateX(303px);
`;
const Aggrement = styled.span`
  font-size: 12px;
  padding: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  padding: 15px 20px;
`;
const SignInText = styled.h4`
  margin-top: 20px;
  color: gray;
`;

const SellerRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  //for seller register..the type will be seller register
  const [type, setType] = useState("seller");

  // for modal window
  const [open, setOpen] = React.useState(false);
  const [modalText, setModalText] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for error text
  const [errorTextVisible, setErrorTextVisible] = useState(false);

  //for storing data in Reducer
  const [{}, dispatch] = useStateValue();

  const register = (e) => {
    e.preventDefault();
    const user = {
      email,
      firstname,
      lastname,
      username,
      password,
      type,
    };
    const insertUser = async () => {
      axios({
        method: "POST",
        url: `/api/user/auth/register`,
        data: user,
      }).then(
        (res) => {
          // store the token and user in the reducer and localstorage

          sessionStorage.setItem("token", res.data.accessToken);
          sessionStorage.setItem("email", res.data.res_user.email);
          sessionStorage.setItem("type", res.data.res_user.type);
          sessionStorage.setItem("id", res.data.res_user.id);

          dispatch({
            type: "SET_USER",
            user: res.data.res_user,
          });
          navigate("/seller",{replace: true});
        },
        (err) => {
          setModalText(err.response.data);
          handleOpen();
        }
      );
    };
    if (
      email === "" ||
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setModalText("No field can be empty");
      handleOpen();
    } else if (confirmPassword != password) setErrorTextVisible(true);
    else insertUser();
  };
  const storeUsername = (event) => setUsername(event.target.value);
  const storeFirstname = (event) => setFirstname(event.target.value);
  const storeLastname = (event) => setLastname(event.target.value);
  const storeEmail = (event) => setEmail(event.target.value);
  const storePassword = (event) => setPassword(event.target.value);
  const storeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    setErrorTextVisible(false);
  };
  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ERROR!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalText}
          </Typography>
        </Box>
      </Modal>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form action="">
          <Input
            placeholder="first name"
            value={firstname}
            onChange={storeFirstname}
          />
          <Input
            placeholder="last name"
            value={lastname}
            onChange={storeLastname}
          />
          <Input placeholder="email" value={email} onChange={storeEmail} />
          <Input
            placeholder="username"
            value={username}
            onChange={storeUsername}
          />
          <Input
            placeholder="password"
            value={password}
            type="password"
            onChange={storePassword}
          />
          <Input
            placeholder="confirm password"
            value={confirmPassword}
            type="password"
            onChange={storeConfirmPassword}
          />
          <ErrorText visible={errorTextVisible}>
            Password doesn't match
          </ErrorText>
          <Aggrement>
            By using our website, you hereby consent to our{" "}
            <b>PRIVACY POLICY</b> and agree to its terms. For more info, visit
            https://www.privacypolicygenerator.info/live.php?token=VL6KWhW6YMj9RuzKbSGdImRQ72kWNP0o
          </Aggrement>
          {/* <Input type="submit" value="CREATE" /> */}
          <Button type="submit" onClick={register}>
            CREATE
          </Button>
        </Form>
        <SignInText>
          Already have an account?{" "}
          <Link to="/seller/login">
            <span>Sign In</span>
          </Link>{" "}
        </SignInText>
      </Wrapper>
    </Container>
  );
};

export default SellerRegister;
