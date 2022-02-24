import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../../responsive";
import { useStateValue } from "../../utils/StateProvider";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}/* position:sticky; */
  /* top: 0; */
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
`;
const Logo = styled.h1`
  font-weight: bold;
  color: gray;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
`;

const Navbar = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const handleAuth = (e) => {
    if (user) {
      e.preventDefault();
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("id");
      dispatch({
        type: "SET_USER",
        user: null,
      });
      navigate("/", true);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon
              style={{
                color: "gray",
                fontSize: 20,
              }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>Shopify.</Logo>
          </Link>
        </Center>
        <Right>
        {
          user&& <Link to="/profile" style={{ textDecoration: "none" }}>
            <MenuItem>Profile</MenuItem>
          </Link>
        }
          
          {user?.type ==='customer'&& (
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <MenuItem>Orders</MenuItem>
            </Link>
          )}
          <Link to={!user && "/login"} style={{ textDecoration: "none" }}>
            <MenuItem onClick={handleAuth}>
              {user ? "LOG OUT" : "SIGN IN"}
            </MenuItem>
          </Link>
          <Link
            to={!user && "/seller/login"}
            style={{ textDecoration: "none" }}
          >
            <MenuItem>{user ? user.email : "SELL ON SHOPIFY"}</MenuItem>
          </Link>

          {/* <Link
            to={!user && "/delivery/login"}
            style={{ textDecoration: "none" }}
          >
            <MenuItem>{!user&& "DELIVER"}</MenuItem>
          </Link> */}

          <Link to={!user && "/admin/login"} style={{ textDecoration: "none" }}>
            <MenuItem>{!user && "ADMIN"}</MenuItem>
          </Link>
          <MenuItem>
            <Badge badgeContent={basket?.length} color="primary">
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <ShoppingCartOutlinedIcon />
              </Link>
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
