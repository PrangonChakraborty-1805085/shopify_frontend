import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../../components/customerComponents/Navbar";
import axios from "../../utils/axios";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Container = styled.div``;
const User = styled.div`
  flex: 4;
  padding: 20px;
  width: 80%;
  margin: auto;
`;
const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserTitle = styled.h1``;
const UserAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;
const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;
const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const UserShowUsername = styled.span`
  font-weight: 600;
`;
const UserShowUserTitle = styled.span`
  font-weight: 300;
`;
const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;
const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;
const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;
const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;
const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const UserUpdateLeft = styled.div``;
const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const UserUpdateItemLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;
const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;
const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
`;
const UserUpdateImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;
const ErrorText = styled.h2`
  font-size: 12px;
  color: red;
  display: ${(props) => {
    if (props.visible) return "block";
    else return "none";
  }};
  /* transform: translateX(303px); */
`;
const UserUpdateButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;

const CustomerProfile = () => {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");

  //for fetching info
  const [user_obj, setUser_obj] = useState({});

  //for updating info
  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [phone_number, setphone_number] = useState(null);
  const [wallet, setwallet] = useState(null);
  const [image_url, setimage_url] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState(null);

  //for error text
  const [errorTextVisible, setErrorTextVisible] = useState(false);

  //setting refresh variable
  const [refresh, setRefresh] = useState(false);

  ///user requesting info section

  const fetchUser = async () => {
    axios({
      method: "GET",
      url: `/api/user/email/${email}`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setUser_obj(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchUser();
    setRefresh(false);
  }, [refresh]);
  const handleUpdate = (e) => {
    e.preventDefault();
    //user sending updateinfo section
    const sendUpdateInfo = async () => {
      axios({
        method: "PUT",
        url: `/api/user/${email}`,
        headers: { token: `Bearer ${token}` },
        data: {
          firstname: firstname,
          lastname: lastname,
          phone_number: phone_number,
          wallet: wallet,
          password: password,
          image_url: image_url,
        },
      }).then((res) => {
        setRefresh(true);
      });
    };
    if (confirmpassword != password) setErrorTextVisible(true);
    else if(String(image_url).length>400)
    {

    }
    else {
      sendUpdateInfo();
    }
  };

  return (
    <Container>
      <Navbar />
      <User>
        <UserTitleContainer>
          <UserTitle>Profile</UserTitle>
          {/* <Link to={"/admin/newUser"}>
            <UserAddButton>Create</UserAddButton>
          </Link> */}
        </UserTitleContainer>
        <UserContainer>
          <UserShow>
            <UserShowTop>
              <UserShowImg src={user_obj.image_url} alt="" />
              <UserShowTopTitle>
                <UserShowUsername>{user_obj.fullname}</UserShowUsername>
                {/* <UserShowUserTitle>Software Engineer</UserShowUserTitle> */}
              </UserShowTopTitle>
            </UserShowTop>
            <UserShowBottom>
              <UserShowTitle>Account Details</UserShowTitle>
              <UserShowInfo>
                <PermIdentity style={{ fontSize: "16px !important" }} />
                <UserShowInfoTitle className="userShowInfoTitle">
                  {user_obj.username}
                </UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo className="userShowInfo">
                <CalendarToday style={{ fontSize: "16px !important" }} />
                <UserShowInfoTitle className="userShowInfoTitle">
                  {user_obj.join_date}
                </UserShowInfoTitle>
              </UserShowInfo>
              <UserShowTitle>Contact Details</UserShowTitle>
              <UserShowInfo>
                <PhoneAndroid style={{ fontSize: "16px !important" }} />
                <UserShowInfoTitle>
                  +88{user_obj.phone_number}
                </UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <MailOutline style={{ fontSize: "16px !important" }} />
                <UserShowInfoTitle>{user_obj.email}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                {/* <LocationSearching style={{ fontSize: "16px !important" }} />
                <UserShowInfoTitle>New York | USA</UserShowInfoTitle> */}
              </UserShowInfo>
            </UserShowBottom>
          </UserShow>

          <UserUpdate>
            <UserUpdateTitle>Edit</UserUpdateTitle>
            <UserUpdateForm>
              <UserUpdateLeft>
                <UserUpdateItem>
                  <UserUpdateItemLabel>First Name</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="text"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    placeholder="annabec"
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Last Name</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="text"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    placeholder="Anna Becker"
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Phone Number</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="text"
                    value={phone_number}
                    onChange={(e) => setphone_number(e.target.value)}
                    placeholder="0195034XXXX"
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Wallet Balance</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="text"
                    value={wallet}
                    onChange={(e) => setwallet(e.target.value)}
                    placeholder="$12000"
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Password</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="saert45$#8"
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Confirm Password</UserUpdateItemLabel>
                  <UserUpdateInput
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => {
                      setconfirmpassword(e.target.value);
                      setErrorTextVisible(false);
                    }}
                    placeholder="saert45$#8"
                  />
                </UserUpdateItem>
                <ErrorText visible={errorTextVisible}>
                  Password doesn't match
                </ErrorText>
              </UserUpdateLeft>
              <UserUpdateRight>
                <UserUpdateUpload>
                  {/* <UserUpdateImg
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish style={{ cursor: "pointer" }} />
                  </label> */}
                  <UserUpdateItem>
                    <UserUpdateItemLabel>Upload Image Url</UserUpdateItemLabel>
                    <UserUpdateInput
                      type="text"
                      value={image_url}
                      onChange={(e) => setimage_url(e.target.value)}
                      placeholder="https://...."
                    />
                  </UserUpdateItem>
                  {/* <input
                    type="file"
                    value={image_url}
                    onChange={(e) => setimage_url(e.target.value)}
                    id="file"
                    style={{ display: "none" }}
                  /> */}
                </UserUpdateUpload>
                <UserUpdateButton onClick={handleUpdate}>
                  Update
                </UserUpdateButton>
              </UserUpdateRight>
            </UserUpdateForm>
          </UserUpdate>
        </UserContainer>
      </User>
    </Container>
  );
};

export default CustomerProfile;
