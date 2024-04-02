import React from "react";
import { PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux"; // import dispatch and selector from react-redux
import { getCategories, createCategory } from "../../redux/categorySlice"; // middleware to get categories
import Button from "../../components/Button";
const Category = () => {
  const categories = useSelector((state) => state.category.values);
  console.log(categories);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategories());
  }, []);
  const [category, setCategory] = React.useState({ name: "", id: "" });
  const handleSubmit = () => {
    dispatch(createCategory(category));
  };
  return (
    <div>
      <div className="Category">
        <PageTitle title="Hạng mục" />
        <Button
          size="btn-lg"
          // onClick={() => showSet(!show)}
          className="active bold btn-light"
        >
          Hạng mục mới
        </Button>
      </div>
    </div>
  );
};

export default Category;
