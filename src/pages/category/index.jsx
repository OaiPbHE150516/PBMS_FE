import React, { useEffect, useState } from "react";
import { PageHelper, PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryByType , createCategory} from "../../redux/categorySlice";
import Button from "../../components/Button";
import "../../css/Category.css";
import CreateCategory from "../../components/CategoryForm/CreateCategory";

const Category = () => {
  const categories = useSelector((state) => state.category.values);
  const accountID = useSelector((state) => state.authen.user?.accountID);
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState([]);
  const user = useSelector((state) => state.authen.user);
  useEffect(() => {
    dispatch(getCategoryByType());
  }, []);
  const toggleExpand = (categoryID) => {
    if (expandedItems.includes(categoryID)) {
      setExpandedItems(expandedItems.filter((id) => id !== categoryID));
    } else {
      setExpandedItems([...expandedItems, categoryID]);
    }
  };

  const renderCategoryTree = (category) => {
    if (!category) return null;

    return (
      <ul className="tree-list">
        {category.map((item) => (
          <li key={item.categoryID}>
            <span className={expandedItems.includes(item.categoryID) ? 'expanded' : ''}>
              {item.nameVN}
            </span>
            <span className="toggle-icon" onClick={() => toggleExpand(item.categoryID)}>
              {item.children && item.children.length > 0 && (expandedItems.includes(item.categoryID) ? ' ▼' : ' ▶')}
            </span>
            {expandedItems.includes(item.categoryID) && item.children && item.children.length > 0 && renderCategoryTree(item.children)}
          </li>
        ))}
      </ul>
    );
  };
  const rootCategories = categories.filter((category) => category.isRoot === true);
  const incomeCategories = rootCategories.find(category => category.nameVN === 'Thu nhập');
  const expenseCategories = rootCategories.find(category => category.nameVN === 'Chi tiêu');
  const [show, showSet] = useState(false);

  return (
    <div>
      <div className="Category">
        {user ? (
          <>
            <PageTitle title="Hạng mục" />
            <Button
              size="btn-lg"
              className="active bold btn-light"
              onClick={() => showSet(!show)}>
              Hạng mục mới
            </Button>
            <CreateCategory
              show={show}
              showSet={showSet}
              onSubmit={(fieldValue) =>
                dispatch(createCategory({ accountID: accountID, fieldValue: fieldValue }))
                  .unwrap()
                  .then(() => showSet(false))
              }
            />
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Hạng mục thu</h5>
                    {renderCategoryTree(incomeCategories?.children)}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Hạng mục chi</h5>
                    {renderCategoryTree(expenseCategories?.children)}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <PageHelper />
          </>
        )}
      </div>
    </div>
  );
};

export default Category;