import React from "react";
import { PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux"; 
import { getCategories, createCategory } from "../../redux/categorySlice";
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
        <div class="row" style={{marginTop: "20px"}}>
          <div class="col-lg-6">

            <div class="card">
              <div class="card-body">
                <h5 class="card-title"  style={{textAlign: "center"}}>Thu</h5>
                <ul className="list-group list-group-flush">
                  {categories.map((category) => (
                    <li className="list-group-item">
                      {category.nameVN}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          <div class="col-lg-6">

            <div class="card">
              <div class="card-body">
                <h5 class="card-title" style={{textAlign: "center"}}>Chi</h5>
                <ul className="list-group list-group-flush">
                  {categories.map((category) => (
                    <li className="list-group-item">
                      {category.nameVN}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
