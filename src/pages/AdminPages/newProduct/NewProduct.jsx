import { useState } from "react";
import "./newProduct.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";

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
  justify-content: center;
  width: 100%;
  /* background-color:red; */
  height: 40px;
  margin-top: 30px;
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
  padding: 10px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  height: 100%;
  width: 30%;
`;

export default function NewProduct() {
  //token and email
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  //for updating info
  const [name, setname] = useState(null);
  const [category, setcategory] = useState(null);
  const [price, setprice] = useState(null);
  const [stock, setstock] = useState(null);
  const [description, setdescription] = useState(null);
  const [offer, setoffer] = useState(null);
  const [image_url, setimage_url] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const product = {
      email,
      name,
      category,
      price,
      stock,
      description,
      offer,
      image_url,
    };
    const SendAddProductRequest = async () => {
      axios({
        method: "POST",
        url: `/api/product/add/`,
        headers: { token: `Bearer ${token}` },
        data: product,
      }).then(
        (res) => {
          // store the token and user in the reducer and localstorage
          navigate("/seller", true);
        },
        (err) => {
          // setModalText(err.response.data);
          // handleOpen();
        }
      );
    };
    if (name === null || name ==="") alert("product must have a name");
    else if (category === null || category==="") alert("product must have a category");
    else if (price === null || price === "" || price<=0) alert("product must have a valid price");
    else if (stock === null || stock==="" || stock<=0) alert("product must have a valid stock");
    else if (description === null || description === "") alert("product must have a description");
    else if (image_url === null || image_url=="") alert("product must have a image");
    else if(offer<0) alert('please insert a valid offer');
    else SendAddProductRequest();
  };
  return (
    <div className="newProduct">
      <UserUpdate>
        <UserUpdateTitle>ADD PRODUCT</UserUpdateTitle>
        <UserUpdateForm>
          <UserUpdateLeft>
            <UserUpdateItem>
              <UserUpdateItemLabel>Product Name</UserUpdateItemLabel>
              <UserUpdateInput
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="annabec"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateItemLabel>Category</UserUpdateItemLabel>
              <UserUpdateInput
                type="text"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                placeholder="Anna Becker"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateItemLabel>Price</UserUpdateItemLabel>
              <UserUpdateInput
                type="number"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                placeholder="$12"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateItemLabel>Stock</UserUpdateItemLabel>
              <UserUpdateInput
                type="number"
                value={stock}
                onChange={(e) => setstock(e.target.value)}
                placeholder="2"
              />
            </UserUpdateItem>
            {/* <ErrorText visible={errorTextVisible}>
                  Password doesn't match
                </ErrorText> */}
          </UserUpdateLeft>
          <UserUpdateRight>
            <UserUpdateItem>
              <UserUpdateItemLabel>Description</UserUpdateItemLabel>
              <UserUpdateInput
                type="text"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="unique description"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateItemLabel>Offer</UserUpdateItemLabel>
              <UserUpdateInput
                type="number"
                value={offer}
                onChange={(e) => setoffer(e.target.value)}
                placeholder="33.33"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateItemLabel>Upload Image Url</UserUpdateItemLabel>
              <UserUpdateInput
                type="text"
                value={image_url}
                onChange={(e) => setimage_url(e.target.value)}
                placeholder="https://"
              />
            </UserUpdateItem>
          </UserUpdateRight>
        </UserUpdateForm>
        <UserUpdateUpload>
          <UserUpdateButton onClick={handleAdd}>ADD PRODUCT</UserUpdateButton>
        </UserUpdateUpload>
      </UserUpdate>
    </div>
  );
}
