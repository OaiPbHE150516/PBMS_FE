import React, { useState } from "react";
import MultipleSelect from "../MultipleSelect";
import Popup from "../Popup";
import Form from "react-bootstrap/Form";
import { categoryListData } from "../../contexts/category";
import { walletListData } from "../../contexts/wallet";
import { Controller, useForm } from "react-hook-form";
import useAppSelector from "../../hooks/useAppSelector";
import { FormErrorMessage } from "./FormErrorMessage";

const UpdateBudget = ({ show, onClose, data, onSubmit }) => {
  //List Categories
  const categories = useAppSelector((state) => state.category.values);
  const categoryOptions = categories.map((item) => ({
    label: item.nameVN,
    value: item.categoryID,
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      ...data,
      categories: data.categories.map((item) => ({
        label: item.nameVN,
        value: item.categoryID,
      })),
    },
  });

  // console.log({isDirty})

  return (
    <Popup
      title={"Update Budget"}
      show={show}
      onClose={() => onClose()}
      onSubmit={isDirty ? handleSubmit(onSubmit) : onClose}
    >
      <Form noValidate validated={isValid} className="c-form">
        <Form.Group className="mb-2">
          <Form.Label>Budget Name</Form.Label>
          <Form.Control
            type="text"
            {...register("budgetName", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"budgetName"} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <div className="row">
            <div className="col-9">
              <Controller
                rules={{ validate: (value) => Boolean(value.length) }}
                control={control}
                name="categories"
                render={({ field }) => (
                  <MultipleSelect
                    isMulti
                    {...field}
                    options={categoryOptions}
                  />
                )}
              />
              <FormErrorMessage errors={errors} fieldName={"categories"} />
            </div>
            <div className="col-3 d-flex align-items-center justify-content-center">
              <div className="force-center">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMjUiIGZpbGw9IiNEOUQ5RDkiLz4KPC9zdmc+Cg=="
                  className=""
                  width={70}
                  height={70}
                  alt=""
                />
              </div>
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Initial amount</Form.Label>
          <Form.Control
            type="number"
            {...register("targetAmount", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"targetAmount"} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" {...register("note")}></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"note"} />
        </Form.Group>
      </Form>
    </Popup>
  );
};

export default UpdateBudget;
