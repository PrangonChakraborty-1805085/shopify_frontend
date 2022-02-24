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
    url("https://static1.bigstockphoto.com/0/9/1/large1500/190844629.jpg")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  padding: 15px 20px;
`;
const HyperLink = styled.a`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //for seller login..the type will be sellertype
  const [type, setType] = useState("seller");

  // for modal window
  const [open, setOpen] = React.useState(false);
  const [modalText, setModalText] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for storing token in reducer state
  const [{}, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();
    const user = { email, password, type };
    const signIn = async () => {
      axios({
        method: "POST",
        url: `/api/user/auth/login`,
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
    if (email === "" || password === "") {
      setModalText("No field can be empty");
      handleOpen();
    } else signIn();
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
        <Title>SIGN IN</Title>
        {/* i will add the functionality of login with username or email */}
        <Form>
          <Input
            placeholder="email/username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={login}>
            LOG IN
          </Button>
          {/* <HyperLink>Forgot Password?</HyperLink> */}
          <Link to="/seller/register">
            <HyperLink>Create a New Account</HyperLink>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SellerLogin;
