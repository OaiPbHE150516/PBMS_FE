import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "../Button";
import MultipleSelect from "../MultipleSelect";
import Popup from "../Popup";
import useAppSelector from "../../hooks/useAppSelector";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { FormErrorMessage } from "./FormErrorMessage";
import logo from "../../assets/Logo.png";
import { useDispatch } from "react-redux";
import { getCategoryByType } from "../../redux/categorySlice";

/**
 *
 * @param {Date} date
 */
function getMonthAndDay(date) {
  const monthName = date.toLocaleString("default", { month: "2-digit" });
  const dayName = date.toLocaleString("default", { day: "2-digit" });
  return `${dayName}/${monthName}/${date.getFullYear()}`;
}

/**
 *
 * @param {Date} date
 */
const getInputDateFormat = (date) => {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return `${year}-${month}-${day}`;
};

const CreateBudget = ({ show, showSet, onSubmit = () => {} }) => {
  const user = useAppSelector((state) => state.authen.user);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      accountID: user.accountID,
      budgetName: "",
      targetAmount: 0,
      fromPeriod: getInputDateFormat(new Date()),
      toPeriod: getInputDateFormat(new Date()),
      repeat: false,
      period: /** @type {'week' | 'month' | 'other'} */ ("other"),
      numberIterations: 1,
      note: "",
      category: [],
    },
  });

  const period = watch("period");
  const fromPeriod = watch("fromPeriod");
  const toPeriod = watch("toPeriod");
  const repeat = watch("repeat");

  //List Categories
  const categories = useAppSelector((state) => state.category.values);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryByType());
  }, [user]);

  useEffect(() => {
    const subscription = watch((fields, { name, type }) => {
      if (name === "period") {
        const now = new Date();
        const value = fields.period;
        switch (value) {
          case "other": {
            setValue("fromPeriod", dayjs(now).format("YYYY-MM-DD"));
            setValue("toPeriod", dayjs(now).add(1, "day").format("YYYY-MM-DD"));
            break;
          }
          case "week": {
            setValue("fromPeriod", dayjs(now).format("YYYY-MM-DD"));
            setValue(
              "toPeriod",
              dayjs(now).add(1, "week").format("YYYY-MM-DD")
            );
            break;
          }
          case "month": {
            setValue("fromPeriod", dayjs(now).format("YYYY-MM-DD"));
            setValue(
              "toPeriod",
              dayjs(now).add(1, "month").format("YYYY-MM-DD")
            );
            break;
          }
          default: {
            break;
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (show) return;
    reset();
  }, [show]);

  return (
    <Popup
      title={"Tạo hạn mức chi mới"}
      show={show}
      onClose={() => showSet(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="c-form" noValidate validated={isValid}>
        <Form.Group className="mb-2">
          <Form.Label>Tên hạn mức</Form.Label>
          <Form.Control
            type="text"
            {...register("budgetName", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"budgetName"} defaultMessage={"Không được để trống"} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Hạng mục</Form.Label>
          <select
            className="form-control"
            style={{
              border: "var(--bs-border-width) solid var(--bs-border-color)",
              borderRadius: "unset",
              height: "38px",
            }}
            {...register("category", { required: true })}
          >
            {categories.filter((item) => item.nameVN === "Chi tiêu").map((cate) => (
              <optgroup key={cate.value} label={cate.nameVN}>
                {cate.children.map((child) => (
                  <option key={child.categoryID} value={child.categoryID}>
                    {child.nameVN}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <FormErrorMessage errors={errors} fieldName={"category"} defaultMessage={"Không được để trống"}/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Ngưỡng chi tiêu</Form.Label>
          <Form.Control
            type="number"
            min="1000"
            {...register("targetAmount", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"targetAmount"} defaultMessage={"Số tiền lớn hơn 1.000 đ"}/>
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label>Khoảng thời gian</Form.Label>
          <Controller
            name="period"
            control={control}
            render={({ field }) => (
              <div className="d-flex gap-2">
                <Button
                  onClick={() => field.onChange("week")}
                  className={clsx("btn-light", {
                    active: field.value === "week",
                  })}
                  size="btn-sm"
                >
                  Tuần
                </Button>
                <Button
                  onClick={() => field.onChange("month")}
                  className={clsx("btn-light", {
                    active: field.value === "month",
                  })}
                  size="btn-sm"
                >
                  Tháng
                </Button>
                <Button
                  onClick={() => field.onChange("other")}
                  className={clsx("btn-light", {
                    active: field.value === "other",
                  })}
                  size="btn-sm"
                >
                  Khác
                </Button>
              </div>
            )}
          />
          <FormErrorMessage errors={errors} fieldName={"period"} defaultMessage={"Không được để trống"}/>
        </Form.Group>
        <Form.Group className="mb-4">
          {period === "other" && (
            <div className="row mb-3">
              <div className="col-6 d-flex align-items-center gap-2">
                <label class="form-label mb-0">Từ</label>
                <input
                  type="date"
                  {...register("fromPeriod")}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <label class="form-label  mb-0">Đến</label>
                <input
                  type="date"
                  {...register("toPeriod")}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          )}
          <p className="mb-0">
            Bắt đầu <b>{getMonthAndDay(new Date(fromPeriod))}</b> đến{" "}
            <b>{getMonthAndDay(new Date(toPeriod))}</b>{" "}
          </p>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control as="textarea" {...register("note")}></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"note"}  defaultMessage={"Không được để trống"}/>
        </Form.Group>
      </Form>
    </Popup>
  );
};

export default CreateBudget;
