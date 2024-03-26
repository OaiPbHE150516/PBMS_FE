import React from "react";
import Popup from "../Popup";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import MultipleSelect from "../MultipleSelect";
import { FormErrorMessage } from "../BudgetForm/FormErrorMessage";
import logo from "../../assets/Logo.png";

function ItemMember() {
  return (
    <div className="d-flex align-items-center gap-2 p-2">
      <div>
        <img
          src={logo}
          alt=""
          className="rounded-full border border-dark"
          width={50}
          height={50}
        />
      </div>
      <div className="flex-grow-1">
        <p className="mb-0 bold">Member 1</p>
        <p className="mb-0 small">Member 1</p>
      </div>
    </div>
  );
}

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
        <Form className="c-form">
          <Form.Group className="mb-3 d-flex gap-3 align-items-center">
            <Form.Control type="text" className="flex-grow-1" />
            <Button>Search</Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <MultipleSelect
              // value={[{ value: "member1", label: "member 1" }]}
              options={[
                // { value: "member1", label: "member 1" },
                // { value: "member2", label: "member 2" },
              ]}
            ></MultipleSelect>
          </Form.Group>
        </Form>
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
