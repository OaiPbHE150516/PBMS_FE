import React from "react";
import { useForm } from "react-hook-form";
import Popup from "../Popup";
import { Form } from "react-bootstrap";
import { FormErrorMessage } from "../BudgetForm/FormErrorMessage";
import useAppSelector from "../../hooks/useAppSelector";

const UpdateCollabFund = ({
  data,
  onClose,
  show,
  showSet,
  onSubmit = () => {},
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      collabFundID: data.collabFundID,
      name: data.name,
      description: data.description,
      // imageFile: data.imageURL,
    },
  });

  // const handleShowImageSelect = (event) => {
  //   const files = event.target.files;
  //   if (files && files.length) {
  //     const imageLink = URL.createObjectURL(files[0]);
  //     setValue("imageLink", imageLink);

  //     const imageFile = files[0];
  //     setValue("imageFile", imageFile);
  //   }
  // };

  return (
    <Popup
      title={"Chỉnh sửa quỹ chung mới"}
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="c-form" noValidate validated={isValid}>
        <Form.Group className="mb-2">
          <Form.Label>Tên khoản</Form.Label>
          <Form.Control
            type="text"
            {...register("name", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"name"} defaultMessage={"Vui lòng không được để trống"}/>
        </Form.Group>
        <div className="row">
          <div className="col-md-12">
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
        </div>
      </Form>
    </Popup>
  );
};

export default UpdateCollabFund;
