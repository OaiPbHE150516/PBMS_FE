import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "../BudgetForm/FormErrorMessage";
import logo from "../../assets/Logo.png";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { searchMembersByKey } from "../../services/searchMemberSlice";
import { BsX } from "react-icons/bs";
import { coverImage } from "../../redux/coverImageSlice";

function ItemMember({ member, onAddMember }) {
  if (!member) return;
  return (
    <Form.Group className="mb-3 border border-dark">
      <div className="d-flex align-items-center gap-2 p-2">
        <div>
          <img
            src={member.pictureURL}
            alt=""
            className="rounded-full border border-dark"
            width={50}
            height={50}
          />
        </div>
        <div className="flex-grow-1">
          <p className="mb-0 bold">{member.accountName}</p>
        </div>
        <Button onClick={() => onAddMember(member)} className="btn-search">
          <span>Mời</span>
        </Button>
      </div>
    </Form.Group>
  );
}

function ItemMemberAdd({ selectedMembers, onRemoveMember }) {
  if (selectedMembers.length === 0) return;
  return (
    <>
      <Form.Label>Thành viên mới</Form.Label>
      <Form.Group
        className="mb-3 border border-dark"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {selectedMembers.map((member, index) => (
          <>
            <div className="d-flex align-items-center gap-2 p-2 item_member">
              <div>
                <div className="item_member_card">
                  <img
                    src={member.pictureURL}
                    alt=""
                    className="rounded-full border border-dark"
                    width={50}
                    height={50}
                  />
                  <div className="flex-grow-1 item_member_title">
                    <p className="mb-0 bold">{member.accountName}</p>
                  </div>
                </div>
              </div>
              <div className="icon_remove">
                <BsX onClick={() => onRemoveMember(index)} />
              </div>
            </div>
          </>
        ))}
      </Form.Group>
    </>
  );
}

const CreateCollabFund = ({ show, showSet, onSubmit = () => {} }) => {
  const user = useAppSelector((state) => state.authen.user);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      accountID: user.accountID,
      name: "",
      description: "",
    },
  });

  const dispatch = useDispatch();

  const listMemberSearch = useAppSelector((state) => state.searchMember.values);

  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const listMemberSearched = listMemberSearch.filter(
    (item) =>
      !selectedMembers.filter((member) => member.accountID === item.accountID)
        .length
  );

  //Handle Members
  const handleSearch = async () => {
    await dispatch(searchMembersByKey(searchKey));
  };

  const handleAddMember = (member) => {
    setSelectedMembers([...selectedMembers, member]);
    const updatedSearchResults = listMemberSearched.filter(
      (item) => item.accountID !== member.accountID
    );
  };

  const handleRemoveItemMemberAdd = (index) => {
    const removedMember = selectedMembers[index];
    const newSelectedMembers = [...selectedMembers];
    newSelectedMembers.splice(index, 1);
    setSelectedMembers(newSelectedMembers);
  };

  //Handle Image
  const handleShowImageSelect = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const imageLink = URL.createObjectURL(files[0]);
      setValue("imageLink", imageLink);

      const imageFile = files[0];
      setValue("imageFile", imageFile);
    }
  };

  useEffect(() => {
    if (show) return;
    setSearchKey("");
    setSearchResults([]);
    setSelectedMembers([]);

    reset();
  }, [show]);

  return (
    <Popup
      title={"Thêm khoản chi tiêu chung"}
      show={show}
      onClose={() => showSet(false)}
      onSubmit={handleSubmit(function (data) {
        onSubmit({ ...data, account: selectedMembers });
      })}
    >
      <Form className="c-form" noValidate validated={isValid}>
        <Form.Group className="mb-2">
          <Form.Label>Tên khoản chi tiêu</Form.Label>
          <Form.Control
            type="text"
            {...register("name", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"name"} />
        </Form.Group>
        <Form className="c-form"></Form>
        <Form.Label>Tìm kiếm thành viên</Form.Label>
        <Form.Group className="mb-3 d-flex gap-3 align-items-center">
          <Form.Control
            type="text"
            className="flex-grow-1"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button onClick={handleSearch} className="btn-search">
            <span>Tìm</span>
          </Button>
        </Form.Group>
        <div className="member_search_card">
          {listMemberSearched.map((member, index) => (
            <ItemMember member={member} onAddMember={handleAddMember} />
          ))}
        </div>
        <ItemMemberAdd
          selectedMembers={selectedMembers}
          onRemoveMember={handleRemoveItemMemberAdd}
        />
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                {...register("description")}
                style={{ height: "300px" }}
              ></Form.Control>
              <FormErrorMessage errors={errors} fieldName={"description"} />
            </Form.Group>
          </div>{" "}
          <div className="col-md-6">
            <Form.Group className="mb-2">
              <Form.Label>Ảnh bìa</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleShowImageSelect}
              />
            </Form.Group>
            {watch("imageLink") ? (
              <div>
                <img
                  src={watch("imageLink")}
                  alt={`Image`}
                  className="img-fluid"
                />
              </div>
            ) : null}
          </div>
        </div>
      </Form>
    </Popup>
  );
};

export default CreateCollabFund;
