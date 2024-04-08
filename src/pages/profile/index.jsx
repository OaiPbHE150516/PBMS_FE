import React, { useEffect, useState } from "react";
import { PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import "../../css/Profile.css";
import dayjs from "dayjs";
import useAppSelector from "../../hooks/useAppSelector";
import Button from "../../components/Button";
import { getProfileInfor, updateBudgets, updateProfileInfo } from "../../redux/profileSlice";
import { coverImage } from "../../redux/coverImageSlice";

const Profile = () => {
  const user = useAppSelector((state) => state.profile.values);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [coverImageName, setCoverImageName] = useState(null);

  useEffect(() => {
    dispatch(getProfileInfor());
  }, [dispatch]);

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedUser(user); 

    try{
      const coverImageName = await dispatch(coverImage()); 
      setCoverImageName(coverImageName);
    } catch (error) {
      console.error("Error while coverImage:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    setIsEditing(false);

    const updatedUserData = {
      ...editedUser,
      pictureURL: coverImageName  
    };

    try {
      const response = await updateProfileInfo(updatedUserData);
      console.log("Profile updated successfully:", response);
      dispatch(getProfileInfor());
      // await dispatch(updateProfileInfo(updatedUserData));
    } catch (error) {
      console.error("Error while updating profile:", error);
    }
  };

  return (
    <div className="Profile">
      <PageTitle title="Hồ sơ" />
      {user && (
        <section className="section">
          <div className="card">
            <div className="card-body">
              <div className="row informationUser">
                {isEditing ? (
                  <div className="col-md-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imageUrl && <img src={imageUrl} alt="Chosen" />}
                  </div>
                ) : (
                  <div className="col-md-4">
                    <img src={user.pictureURL} alt="" />
                  </div>
                )}

                <div className="col-md-8">
                  <h3 className="name">Thông tin chi tiết</h3>
                  {isEditing ? (
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="col">Họ tên</th>
                          <td scope="col">
                            <input
                              type="text"
                              name="accountName"
                              value={editedUser.accountName}
                              onChange={handleInputChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">Email</th>
                          <td scope="col">
                            <input
                              type="email"
                              name="emailAddress"
                              value={editedUser.emailAddress}
                              onChange={handleInputChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">Ngày tạo</th>
                          <td scope="col">
                            <input
                              type="datetime"
                              value={dayjs(user.createTime).format(
                                "DD/MM/YYYY"
                              )}
                              readOnly
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="col">Họ tên</th>
                          <td scope="col">{user.accountName}</td>
                        </tr>
                        <tr>
                          <th scope="col">Email</th>
                          <td scope="col">{user.emailAddress}</td>
                        </tr>
                        <tr>
                          <th scope="col">Ngày tạo</th>
                          <td scope="col">
                            {dayjs(user.createTime).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  {isEditing ? (
                    <Button
                      size="btn-lg"
                      className="active bold btn-light"
                      onClick={saveChanges}
                    >
                      Lưu
                    </Button>
                  ) : (
                    <Button
                      size="btn-lg"
                      className="active bold btn-light"
                      onClick={handleEdit}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;
