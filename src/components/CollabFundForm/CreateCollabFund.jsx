import React from "react";
import Popup from "../Popup";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import MultipleSelect from "../MultipleSelect";
import { FormErrorMessage } from "../BudgetForm/FormErrorMessage";

const CreateCollabFund = ({ show, showSet, onSubmit = () => {} }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      imageURL: "",
      totalAmount: 0,
    },
  });

  const handleImageSelect = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const imageURL = URL.createObjectURL(files[0]);
      setValue("imageURL", imageURL);
    }
  };

  return (
    <Popup
      title={"Thêm quỹ chung mới"}
      show={show}
      onClose={() => showSet(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="c-form" noValidate validated={isValid}>
        <Form.Group className="mb-2">
          <Form.Label>Tên ngân sách</Form.Label>
          <Form.Control
            type="text"
            {...register("name", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"name"} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Lượng ngân sách</Form.Label>
          <Form.Control
            type="number"
            {...register("totalAmount", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"totalAmount"} />
        </Form.Group>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                {...register("description")}
                style={{ height: "300px" }}
              ></Form.Control>
              <FormErrorMessage errors={errors} fieldName={"description"} />
            </Form.Group>
          </div>{" "}
          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Chọn ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
              />
            </Form.Group>
            {watch("imageURL") && ( 
              <div>
                <img
                  src={watch("imageURL")} 
                  alt={`Image`}
                  className="img-fluid"
                />
              </div>
            )}
          </div>
        </div>
      </Form>
    </Popup>
  );
};

export default CreateCollabFund;
