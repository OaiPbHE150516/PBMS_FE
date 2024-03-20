import React from "react";
import { Form } from "react-bootstrap";
import { FormErrorMessage } from "../BudgetForm/FormErrorMessage";
import { useForm } from "react-hook-form";
import Popup from "../Popup";
import logo from "../../assets/Logo.png";
import { FaLongArrowAltRight } from "react-icons/fa";
const DevideMoney = ({ show, showSet, onSubmit = () => {} }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      imageURL: "",
      totalAmount: 0,
    },
  });

  const handleImageSelect = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const imageURL = URL.createObjectURL(files[0]);
      setValue("imageURL", imageURL);
    }
  };

  return (
    <Popup
      title={"Chia tiền cho các bên"}
      show={show}
      onClose={() => showSet(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div class=" tableListItem">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Người tham gia</th>
              <th scope="col">Số tiền đã đóng (Ta)</th>
              <th scope="col">Tổng số lần giao dịch</th>
              <th scope="col">
                Số tiền cần đóng thêm / nhận lại (Ta - Ti = S)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bá Oai</td>
              <td>150.000 đ</td>
              <td>5</td>
              <td>150.000 - 113.000 = 37.000 đ</td>
            </tr>
            <tr>
              <td>Thành Long</td>
              <td>150.000 đ</td>
              <td>5</td>
              <td>150.000 - 113.000 = 37.000 đ</td>
            </tr>
            <tr>
              <td>Đình Việt</td>
              <td>150.000 đ</td>
              <td>5</td>
              <td>150.000 - 113.000 = 37.000 đ</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" detailDivideMoney">
        <div className="row">
          <div className="col-md-6 summaryTotal">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th style={{ textAlign: "right" }}>Tổng số giao dịch:</th>
                  <td>16</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>Tổng số tiền (T):</th>
                  <td>150.000 đ</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>Số người tham gia (N):</th>
                  <td>5</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>
                    Tiền trung bình cộng (Ti):
                  </th>
                  <td>113.000 đ</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>Số dư (S):</th>
                  <td>3.000 đ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6 listDivideMoney">
            <div className="row divideItem">
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
              <div className="col-lg-2">
                <div>37.000 đ</div>
                <div>
                  <FaLongArrowAltRight />
                </div>
              </div>
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
            </div>
            <div className="row divideItem">
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
              <div className="col-lg-2">
                <div>37.000 đ</div>
                <div>
                  <FaLongArrowAltRight />
                </div>
              </div>
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
            </div>
            <div className="row divideItem">
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
              <div className="col-lg-2">
                <div>37.000 đ</div>
                <div>
                  <FaLongArrowAltRight />
                </div>
              </div>
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
            </div>
            <div className="row divideItem">
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
              <div className="col-lg-2">
                <div>37.000 đ</div>
                <div>
                  <FaLongArrowAltRight />
                </div>
              </div>
              <div className="col-lg-5">
                <input type="checkbox"/>
                <img src={logo} />
                <span>Công Chức</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default DevideMoney;
