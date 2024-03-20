import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import { IoIosSend } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addActionNoTrans } from "../../redux/actionSlice";

export const AddNewAction = ({ data, collabID }) => {
  const dispatch = useDispatch();
  const [actionText, setActionText] = useState(""); 

  const handleAddAction = async () => {
    if (actionText.trim() !== "") {
      await dispatch(
        addActionNoTrans({
          accountID: data.accountID,
          fieldValue: {
            collabID: collabID,
            note: actionText,
          },
        })
      );
      setActionText("");
    }
  };
  return (
    <div className="d-flex gap-2">
      <div className="d-flex gap-3">
        <img
          src={data.pictureURL}
          className="img-fluid rounded-full border border-dark"
          alt="..."
          width={50}
          height={50}
        ></img>
        <div className="">
          <p className="mb-0 bold">{data.accountName}</p>
          <p className="mb-0 small">{data.roleID}</p>
        </div>
      </div>
      <Form className="c-form d-flex align-items-center flex-grow-1">
        <div className="flex-grow-1">
          <Form.Control
            type="text"
            value={actionText}
            onChange={(e) => setActionText(e.target.value)}
          />
        </div>

        <Button reset className="fs-4 px-1" >
          <IoIosSend />
        </Button>
        <Button reset className="fs-5 px-1">
          <FaFileImage />
        </Button>
        <Button onClick={handleAddAction}> Tạo mới</Button>
      </Form>
    </div>
  );
};
