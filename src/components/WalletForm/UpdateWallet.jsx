import React, { useState } from "react";
import MultipleSelect from "../MultipleSelect";
import Popup from "../Popup";
import Form from "react-bootstrap/Form";
import { categoryListData } from "../../contexts/category";
import { walletListData } from "../../contexts/wallet";
import { Controller, useForm } from "react-hook-form";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch, useSelector } from "react-redux";

const UpdateWallet = ({ show, onClose, data, onSubmit }) => {
  const wallet = useAppSelector((state) => state.wallet.values);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      ...data,
    },
  });
  console.log({ isDirty })
  return (
    <Popup
      title={"Chỉnh sửa ví"}
      show={show}
      onClose={() => onClose()}
      onSubmit={isDirty ? handleSubmit(onSubmit) : onClose}
    >
      <Form className="c-form">
        <Form.Group className="mb-2">
          <Form.Label>Tên ví</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            type="text"
            {...register("note")}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Ví ngân hàng</Form.Label>
          <Form.Control
            type="text"
            {...register("isBanking")}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>URL mã QR</Form.Label>
          <Form.Control
            type="text"
            {...register("qrCodeURL")}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tên ngân hàng</Form.Label>
          <Form.Control
            type="text"
            {...register("bankName")}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tài khoản ngân hàng</Form.Label>
          <Form.Control
            type="text"
            {...register("bankAccount")}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            {...register("bankUsername")}
          ></Form.Control>
        </Form.Group>
      </Form>
    </Popup>
  );
};

export default UpdateWallet;
