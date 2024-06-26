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
  console.log("DATA", data);
  //List Categories
  const categories = useAppSelector((state) => state.category.values);
  const categoryFilter = categories.filter(
    (item) => item.nameVN === "Chi tiêu"
  );
  const categoryOptions =
    categoryFilter[0]?.children.map((item) => ({
      label: item.nameVN,
      value: item.categoryID,
    })) ?? [];
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
      categories: data.categories.map((item) => ({
        label: item.nameVN,
        value: item.categoryID,
      })),
    },
  });

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
        <FormErrorMessage
          errors={errors}
          fieldName={"budgetName"}
          defaultMessage={"Không được để trống"}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Hạng mục</Form.Label>
        <div className="row">
          <div className="col-12">
            <Controller
              control={control}
              name="categories"
              render={({ field }) => (
                <MultipleSelect
                  isMulti
                  {...field}
                  options={categoryOptions}
                  isDisabled={true}
                />
              )}
            />
            <FormErrorMessage errors={errors} fieldName={"categories"} />
          </div>
        </div>
        <FormErrorMessage
          errors={errors}
          fieldName={"category"}
          defaultMessage={"Không được để trống"}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Ngưỡng chi tiêu</Form.Label>
        <Form.Control
          type="number"
          min="1000"
          {...register("targetAmount", { required: true })}
        ></Form.Control>
        <FormErrorMessage
          errors={errors}
          fieldName={"targetAmount"}
          defaultMessage={"Số tiền lớn hơn 1.000 đ"}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Ghi chú</Form.Label>
        <Form.Control as="textarea" {...register("note")}></Form.Control>
        <FormErrorMessage
          errors={errors}
          fieldName={"note"}
          defaultMessage={"Không được để trống"}
        />
      </Form.Group>
    </Popup>
  );
};

export default UpdateBudget;
