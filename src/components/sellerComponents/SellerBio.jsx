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
const SellerImageContainer = styled.div`
  height: 100%;
  width: 60%;
`;
const SellerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
const SellerInfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SellerShowTop = styled.div`
  padding-left: 40px;
`;
const SellerName = styled.h1`
  font-size: 40px;
  margin: auto;
`;
const SellerShowBottom = styled.div`
  margin-top: 20px;
`;
const SellerShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;
const SellerShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;
const SellerShowInfoTitle = styled.span`
  margin-left: 10px;
`;
const SellerShowIcon = styled.div`
  font-size: 16px !important;
`;
const SellerBio = ({email,fullname,username,image_url,phone_number,join_date}) => {
  return (
    <Container>
      <InnerContainer>
        <SellerImageContainer>
          <SellerImage src={image_url}></SellerImage>
        </SellerImageContainer>
        <SellerInfoContainer>
          <SellerShowTop>
            <SellerName>{fullname}</SellerName>
          </SellerShowTop>
          <SellerShowBottom>
            <SellerShowTitle>Account Details</SellerShowTitle>
            <SellerShowInfo>
              <SellerShowIcon>
                <PermIdentity />
              </SellerShowIcon>
              <SellerShowInfoTitle>{username}</SellerShowInfoTitle>
            </SellerShowInfo>
            <SellerShowInfo>
              <SellerShowIcon>
                <CalendarToday />
              </SellerShowIcon>
              <SellerShowInfoTitle>{join_date}</SellerShowInfoTitle>
            </SellerShowInfo>
            <SellerShowTitle>Contact Details</SellerShowTitle>

            <SellerShowInfo>
              <SellerShowIcon>
                <PhoneAndroid />
              </SellerShowIcon>
              <SellerShowInfoTitle>
                +88 {phone_number}
              </SellerShowInfoTitle>
            </SellerShowInfo>
            <SellerShowInfo>
              <SellerShowIcon>
                <MailOutline />
              </SellerShowIcon>
              <SellerShowInfoTitle>{email}</SellerShowInfoTitle>
            </SellerShowInfo>
            {/* <SellerShowInfo>
              <SellerShowIcon>
                <LocationSearching />
              </SellerShowIcon>
              <SellerShowInfoTitle>New York | USA</SellerShowInfoTitle>
            </SellerShowInfo> */}
          </SellerShowBottom>
        </SellerInfoContainer>
      </InnerContainer>
    </Container>
  );
};

export default SellerBio;
