import React, { useEffect, useState } from "react";
import { PageTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import "../../css/Profile.css";
import dayjs from "dayjs";
import useAppSelector from "../../hooks/useAppSelector";
import Button from "../../components/Button";
import {
  getProfileInfor,
  updateBudgets,
  updateProfileInfo,
} from "../../redux/profileSlice";
import { coverImage } from "../../redux/coverImageSlice";

const Profile = () => {
  const user = useAppSelector((state) => state.authen.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileInfor());
  }, [user, dispatch]);

  return (
    <div className="Profile">
      <PageTitle title="Hồ sơ" />
      {user && (
        <section className="section">
          <div className="card">
            <div className="card-body">
              <div className="row informationUser">
                <div className="col-md-6">
                  <img src={user.pictureURL} alt="" />
                </div>
                <div className="col-md-8">
                  <h3 className="name">Thông tin chi tiết</h3>

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
