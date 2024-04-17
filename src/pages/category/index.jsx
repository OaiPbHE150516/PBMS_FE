import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryByType, createCategory, updateCategory,deleteCategory } from "../../redux/categorySlice";
import Button from "../../components/Button";
import "../../css/Category.css";
import CreateCategory from "../../components/CategoryForm/CreateCategory";
import UpdateAndDeleteCategory from "../../components/CategoryForm/UpdateAndDeleteCategory";
import PageTitle from "../../components/PageTitle";
import { PageHelper } from "../../components";
import { HiChevronRight } from "react-icons/hi";

const Category = () => {
  const categories = useSelector((state) => state.category.values);
  const accountID = useSelector((state) => state.authen.user?.accountID);
  const user = useSelector((state) => state.authen.user);
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState([]);
  const [show, showSet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showUD, showUDSet] = useState(false);

  useEffect(() => {
    dispatch(getCategoryByType());
  }, [dispatch]);

  const toggleExpand = (categoryID) => {
    if (expandedItems.includes(categoryID)) {
      setExpandedItems(expandedItems.filter((id) => id !== categoryID));
    } else {
      setExpandedItems([...expandedItems, categoryID]);
    }
  };

  const handleCategoryClick = (categoryID) => {
    const category = findCategoryByID(categories, categoryID);
    console.log("select", category);
    setSelectedCategory(category);
    showUDSet(true);
  };
  const findCategoryByID = (categories, categoryID) => {
    for (let category of categories) {
      if (category.categoryID === categoryID) {
        return category;
      }
      if (category.children) {
        const result = findCategoryByID(category.children, categoryID);
        if (result) return result;
      }
    }
    return null;
  };

  const renderCategoryTree = (category) => {
    if (!category) return null;
    return (
      <ul className="tree-list">
        {category.map((item) => (
          <li key={item.categoryID}>
            <div className="category-box" onClick={() => handleCategoryClick(item.categoryID)}>
              <HiChevronRight /> {/* Icon */}
              <span
                className="category-name"

              >
                {item.nameVN}
              </span>
            </div>
            {item.children && item.children.length > 0 && renderCategoryTree(item.children)}
          </li>
        ))}
      </ul>
    );
  };



  const handleCloseUpdateDelete = () => {
    showUDSet(false);
    setSelectedCategory(null);
  };

  const rootCategories = categories.filter((category) => category.isRoot === true);
  const incomeCategories = rootCategories.find(category => category.nameVN === 'Thu nhập');
  const expenseCategories = rootCategories.find(category => category.nameVN === 'Chi tiêu');

  return (
    <div className="Category">
      {user ? (
        <>
          <PageTitle title="Hạng mục" />
          <Button size="btn-lg" className="active bold btn-light" onClick={() => showSet(!show)}>
            Hạng mục mới
          </Button>
          {show && (
            <CreateCategory
              show={show}
              showSet={showSet}
              onClose={() => showSet(false)}
              onSubmit={(fieldValue) => dispatch(createCategory({ accountID, fieldValue })).unwrap().then(() => showSet(false))}
            />
          )}
          {selectedCategory && showUD && (
            <UpdateAndDeleteCategory
              showUD={showUD}
              data={selectedCategory}
              onClose={handleCloseUpdateDelete}
              onDelete={() => dispatch(deleteCategory({ categoryID: selectedCategory.categoryID,accountID  })).unwrap().then(handleCloseUpdateDelete)}
              onSubmit={(fieldValue) => dispatch(updateCategory({
                accountID,
                categoryID: selectedCategory.categoryID,
                fieldValue
              })).unwrap().then(handleCloseUpdateDelete)} 
            />
          )}
          <div className="row justify-content-center mt-5">
            <div className="col-lg-5">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Hạng mục thu</h5>
                  {renderCategoryTree(incomeCategories?.children)}
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>Hạng mục chi</h5>
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

  );
};

export default Category;
