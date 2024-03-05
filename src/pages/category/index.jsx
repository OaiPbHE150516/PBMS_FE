import React from "react";
import { PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux"; // import dispatch and selector from react-redux
import { getCategories, createCategory } from "../../redux/categorySlice"; // middleware to get categories

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
      {categories.map((item) => (
        <div key={item.categoryID}>{item.nameVN}</div>
      ))}
      <div className="Category">
        <PageTitle title="Category" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            onChange={(e)=> {
                setCategory({name: e.target.value, ...category})
            }}
          />
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter id"
            onChange={(e)=> {
                setCategory({id: e.target.value, ...category})
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Category;
