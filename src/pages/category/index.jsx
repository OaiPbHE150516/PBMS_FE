import React from "react";
import { PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux"; // import dispatch and selector from react-redux
import { getCategories, createCategory } from "../../redux/categorySlice"; // middleware to get categories
import Button from "../../components/Button";
const Category = () => {
  // get categories from redux
  const categories = useSelector((state) => state.category.values);
  console.log(categories);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategories());
  }, []);
  // use state categories to display
  const [category, setCategory] = React.useState({ name: "" , id: ""});
    // handle change input
    const handleSubmit = () => {
        dispatch(createCategory(category)); // dispatch create category
     };
  return (
    // display categories
    <div>
      <div className="Category">
        <PageTitle title="Category" />
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
