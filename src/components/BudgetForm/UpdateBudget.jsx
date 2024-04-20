import React, { useEffect, useState } from "react";
import MultipleSelect from "../MultipleSelect";
import Popup from "../Popup";
import Form from "react-bootstrap/Form";
import { categoryListData } from "../../contexts/category";
import { walletListData } from "../../contexts/wallet";
import { Controller, useForm } from "react-hook-form";
import useAppSelector from "../../hooks/useAppSelector";
import { FormErrorMessage } from "./FormErrorMessage";
import logo from "../../assets/Logo.png";
import { useDispatch } from "react-redux";
import { getCategoryByType } from "../../redux/categorySlice";

const UpdateBudget = ({
  show,
  showSet,
  onClose,
  data,
  onSubmit = () => {},
}) => {
  const user = useAppSelector((state) => state.authen.user);

  //List Categories
  const categories = useAppSelector((state) => state.category.values);

  console.log("CATE", categories)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryByType());
  }, [user]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      accountID: user.accountID,
      budgetID: data.budgetID,
      budgetName: data.budgetName,
      targetAmount: data.targetAmount,
      note: data.note,
      category: data.categories?.[0].categoryID,
    },
  });

  console.log("DATA BUDGET", data)

  return (
    <Popup
      title={"Chỉnh sửa hạn mức"}
      show={show}
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group className="mb-2">
        <Form.Label>Tên hạn mức</Form.Label>
        <Form.Control
          type="text"
          {...register("budgetName", { required: true })}
        ></Form.Control>
        <FormErrorMessage errors={errors} fieldName={"budgetName"} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Hạng mục</Form.Label>
        {/* <div className="row">
          <div className="col-9">
            <Controller
              rules={{ validate: (value) => Boolean(value.length) }}
              control={control}
              name="categories"
              render={({ field }) => (
                <MultipleSelect isMulti {...field} options={categoryOptions} />
              )}
            />
            <FormErrorMessage errors={errors} fieldName={"categories"} />
          </div>
          <div className="col-3 d-flex align-items-center justify-content-center">
            <div className="force-center">
              <img src={logo} className="" width={70} height={70} alt="" />
            </div>
          </div>
        </div> */}
           <select
            className="form-control"
            style={{
              border: "var(--bs-border-width) solid var(--bs-border-color)",
              borderRadius: "unset",
              height: "38px",
            }}
            {...register("category", { required: true })}
          >
            {categories.map((cate) => (
              <optgroup key={cate.value} label={cate.nameVN}>
                {cate.children.map((child) => (
                  <option key={child.categoryID} value={child.categoryID}>
                    {child.nameVN}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <FormErrorMessage errors={errors} fieldName={"category"} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Ngưỡng chi tiêu</Form.Label>
        <Form.Control
          type="number"
          {...register("targetAmount", { required: true })}
        ></Form.Control>
        <FormErrorMessage errors={errors} fieldName={"targetAmount"} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Ghi chú</Form.Label>
        <Form.Control as="textarea" {...register("note")}></Form.Control>
        <FormErrorMessage errors={errors} fieldName={"note"} />
      </Form.Group>
    </Popup>
  );
};

export default UpdateBudget;
