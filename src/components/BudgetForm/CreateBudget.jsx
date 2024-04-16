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
  const categoryOptions = categories.map((item) => ({
    label: item.nameVN,
    value: item.categoryID,
  }));

  //List Wallet
  const wallets = useAppSelector((state) => state.wallet.values);
  const walletOptions = wallets.map((item) => ({
    label: item.name,
    value: item.walletID,
  }));

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

  return (
    <Popup
      title={"Tạo hạn mức chi mới"}
      show={show}
      onClose={() => showSet(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="c-form" noValidate validated={isValid}>
        <Form.Group className="mb-2">
          <Form.Label>
            Tên hạn mức<caption></caption>
          </Form.Label>
          <Form.Control
            type="text"
            {...register("budgetName", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"budgetName"} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Hạng mục</Form.Label>
          <div className="row">
            <div className="col-9">
              <Controller
                control={control}
                name="category"
                rules={{ validate: (value) => Boolean(value.length) }}
                render={({ field }) => (
                  <MultipleSelect
                    {...field}
                    isMulti
                    options={categoryOptions}
                  />
                )}
              />
            </div>
            <div className="col-3 d-flex align-items-center justify-content-center">
              <div className="force-center">
                <img src={logo} className="" width={70} height={70} alt="" />
              </div>
            </div>
          </div>
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
          <FormErrorMessage errors={errors} fieldName={"period"} />
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
          <FormErrorMessage errors={errors} fieldName={"note"} />
        </Form.Group>
      </Form>
    </Popup>
  );
};

export default CreateBudget;
