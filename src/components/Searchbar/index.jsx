import { BsSearch } from "react-icons/bs";

const Searchbar = () => {
  return (
    <>
      {" "}
      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <BsSearch />
          </button>
        </form>
      </div>
    </>
  );
};

export default Searchbar;
