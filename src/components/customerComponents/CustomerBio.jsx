import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  height: 90%;
`;
const CustomerImageContainer = styled.div`
  height: 100%;
  width: 60%;
`;
const CustomerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const CustomerInfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CustomerShowTop = styled.div`
  padding-left: 40px;
`;
const CustomerName = styled.h1`
  font-size: 40px;
  margin: auto;
`;
const CustomerShowBottom = styled.div`
  margin-top: 20px;
`;
const CustomerShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;
const CustomerShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;
const CustomerShowInfoTitle = styled.span`
  margin-left: 10px;
`;
const CustomerShowIcon = styled.div`
  font-size: 16px !important;
`;
const CustomerBio = ({
  email,
  fullname,
  username,
  image_url,
  phone_number,
  join_date,
}) => {
  return (
    <Container>
      <InnerContainer>
        <CustomerImageContainer>
          <CustomerImage src={image_url}></CustomerImage>
        </CustomerImageContainer>
        <CustomerInfoContainer>
          <CustomerShowTop>
            <CustomerName>{fullname}</CustomerName>
          </CustomerShowTop>
          <CustomerShowBottom>
            <CustomerShowTitle>Account Details</CustomerShowTitle>
            <CustomerShowInfo>
              <CustomerShowIcon>
                <PermIdentity />
              </CustomerShowIcon>
              <CustomerShowInfoTitle>{username}</CustomerShowInfoTitle>
            </CustomerShowInfo>
            <CustomerShowInfo>
              <CustomerShowIcon>
                <CalendarToday />
              </CustomerShowIcon>
              <CustomerShowInfoTitle>{join_date}</CustomerShowInfoTitle>
            </CustomerShowInfo>
            <CustomerShowTitle>Contact Details</CustomerShowTitle>

            <CustomerShowInfo>
              <CustomerShowIcon>
                <PhoneAndroid />
              </CustomerShowIcon>
              <CustomerShowInfoTitle>+88 {phone_number}</CustomerShowInfoTitle>
            </CustomerShowInfo>
            <CustomerShowInfo>
              <CustomerShowIcon>
                <MailOutline />
              </CustomerShowIcon>
              <CustomerShowInfoTitle>{email}</CustomerShowInfoTitle>
            </CustomerShowInfo>
            {/* <CustomerShowInfo>
                <CustomerShowIcon>
                  <LocationSearching />
                </CustomerShowIcon>
                <CustomerShowInfoTitle>New York | USA</CustomerShowInfoTitle>
              </CustomerShowInfo> */}
          </CustomerShowBottom>
        </CustomerInfoContainer>
      </InnerContainer>
    </Container>
  );
};

export default CustomerBio;
