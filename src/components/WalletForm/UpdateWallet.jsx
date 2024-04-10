import React, { useState } from "react";
import Popup from "../Popup";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const UpdateWallet = ({ show, onClose, data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue 
  } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const [isChecked, setIsChecked] = useState(data.isBanking);
  console.log("1",data.isBanking);
  const handleRadioClick = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    setValue("isBanking", isChecked);
  };
  return (
    <Popup
      title={"Chỉnh sửa ví"}
      show={show}
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="c-form">
        <Form.Group className="mb-2">
          <Form.Label>Tên ví</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            type="text"
            {...register("note")}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <div>
            <Form.Check
              type="radio"
              label="Ví ngân hàng"
              {...register("isBanking")}
              checked={isChecked}
              onClick={handleRadioClick}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>URL mã QR</Form.Label>
          <Form.Control
            type="text"
            {...register("qrCodeURL")}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tên ngân hàng</Form.Label>
          <Form.Control
            type="text"
            {...register("bankName")}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tài khoản ngân hàng</Form.Label>
          <Form.Control
            type="text"
            {...register("bankAccount")}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            {...register("bankUsername")}
          />
        </Form.Group>
      </Form>
    </Popup>
  );
};

export default UpdateWallet;