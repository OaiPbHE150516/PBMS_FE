import React, { useState } from "react";
import Popup from "../Popup";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const UpdateWallet = ({ show, onClose, data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const [isChecked, setIsChecked] = useState(data.isBanking);
  const isBanking = watch("isBanking");
  const [duplicateNameError, setDuplicateNameError] = useState('');

  React.useEffect(() => {
    setValue("isBanking", isChecked);
  }, [isChecked, setValue]);

  const handleRadioClick = () => {
    setIsChecked(!isChecked);
  };

  React.useEffect(() => {
    if (!isChecked) {
      reset({
        bankName: "",
        bankAccount: "",
        bankUsername: ""
      });
    }
  }, [isChecked, reset]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    const isDuplicate = data.wallet && data.wallet.some(walletItem => walletItem.name === newName);
    if (isDuplicate) {
      setDuplicateNameError('Tên ví đã tồn tại, vui lòng chọn tên khác.');
    } else {
      setDuplicateNameError('');
    }
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
            onChange={handleNameChange}
          />
          {duplicateNameError && <span className="text-danger">{duplicateNameError}</span>}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control
            type="text"
            {...register("note")}
          />
        </Form.Group>
        <Form.Group className="mb-2" style={{marginTop:'20px'}}>
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
        {isBanking && (
          <>
            {/* <Form.Group className="mb-2">
              <Form.Label>URL mã QR</Form.Label>
              <Form.Control
                type="text"
                {...register("qrCodeURL")}
              />
            </Form.Group> */}
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
          </>
        )}
      </Form>
    </Popup>
  );
};

export default UpdateWallet;
