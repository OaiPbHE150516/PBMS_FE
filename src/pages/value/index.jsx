import React from "react";
import { PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getValues } from "../../redux/valueSlice";

const Value = () => {
  const values = useSelector((state) => state.value.values);

  const dispatch = useDispatch();

  const retrieveValues = () => {
    console.log("retrieveValues");
    dispatch(getValues());
  };

  return (
    <div className="Value">
      <PageTitle title="Value" />
      <section className="section"></section>
      <button onClick={() => retrieveValues()} >retrieveValues</button>
      <ul>
        {values?.map((value) => (
          <li key={value.id}>{value.name} - {value.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Value;
