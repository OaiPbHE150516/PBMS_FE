import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import { IoIosSend } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addActionNoTrans } from "../../redux/actionSlice";
import useAppSelector from "../../hooks/useAppSelector";

export const AddNewAction = ({ data, collabID }) => {

  const user = useAppSelector((state) => state.authen.user);

  const dispatch = useDispatch();
  const [actionText, setActionText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageValue, setImageValue] = useState(null);
  const [actionTextError, setActionTextError] = useState("");
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }

    const files = e.target.files;
    if (files && files.length) {
      const imageFile = files[0];
      setImageValue(imageFile);
    }
  };

  const handleAddAction = async () => {
    if (actionText.trim() === "") {
      setActionTextError("Vui lòng nhập nội dung");
      return;
    }
    if (actionText.trim() !== "") {
      await dispatch(
        addActionNoTrans({
          fieldValue: {
            collabID: collabID,
            accountID: user.accountID,
            note: actionText,
            imageFile: imageValue !== null ? imageValue : "",
          },
        })
      );
      setActionTextError("");
      setActionText("");
      setImagePreview(null);
      setImageValue(null);
    }
  };
  return (
    <div className="d-flex gap-2">
      <div className="d-flex gap-3" style={{"align-items": "center"}}>
        <img
          src={data.pictureURL}
          className="rounded-full border border-dark imgLogo"
          alt="..."
        ></img>
        <div style={{display: "flex", "align-items": "center"}}>
          <p className="mb-0 bold">{data.accountName}</p>
        </div>
      </div>
      <Form className="c-form d-flex align-items-center flex-grow-1">
        <div className="flex-grow-1">
          <Form.Control
            type="text"
            value={actionText}
            onChange={(e) => {
              setActionText(e.target.value);
              setActionTextError(""); 
            }}
          />
          {actionTextError && <div className="error-message" style={{color: "red"}}>{actionTextError}</div>}
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="imgLoad"
          />
        )}
        <label htmlFor="imageUpload" className="fs-5 px-1 imageLoad">
          <FaFileImage />
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
        <Button reset className="fs-4 px-1">
          <IoIosSend onClick={handleAddAction} />
        </Button>
      </Form>
    </div>
  );
};
