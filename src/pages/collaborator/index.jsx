import React, { useState } from "react";
import { PageTitle } from "../../components";
import "../../css/Collaborator.css";
import logo from "../../assets/Logo.png";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";

const CollaItemCard = () => {
  const [repeat, repeatSet] = useState(true);
  const buttonStyle = {
    // backgroundImage: `url(${logo})`,
    backgroundColor: "#EFEDE4",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div class="card mb-3 cardItem">
      <div class="row g-0">
        <div class="col-md-7 collCard-Detail">
          <div class="card-body">
            <h5 class="card-title">Collaborator 1</h5>
            <p class="card-text">Member 1, Member 2</p>
            <p class="card-text">Note: Note 1</p>
            <p class="card-text">
              <div style={{ width: "min-content" }}>
                <Form.Check
                  className="mb-0"
                  type="switch"
                  reverse
                  label="Repeat"
                  size={"lg"}
                  checked={repeat}
                  onChange={({ target: { checked } }) => repeatSet(checked)}
                ></Form.Check>
              </div>
            </p>
          </div>
        </div>
        <div class="col-md-5 collCard-Button" style={buttonStyle}>
          <h5 class="card-title totalMoney">60.000.000 đ</h5>
          <div className="listButton">
            <Button size="btn-sm" className="btn btn-outline-secondary">
              <span>New Transaction</span>
            </Button>
            <Button className="btn btn-outline-secondary" size="btn-sm">
              <span>Divide Money</span>
            </Button>
            <Button className="btn btn-outline-secondary" size="btn-sm">
              <span>Edit</span>
            </Button>
          </div>
        </div>
        {/* <div class="col-md-1"></div> */}
      </div>
    </div>
  );
};

const ActionTable = () => {
  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
          <li class="nav-item flex-fill" role="presentation">
            <button
              class="nav-link w-100 active"
              id="action-tab"
              data-bs-toggle="tab"
              data-bs-target="#action-justified"
              type="button"
              role="tab"
              aria-selected="true"
            >
              Action
            </button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button
              class="nav-link w-100"
              id="member-tab"
              data-bs-toggle="tab"
              data-bs-target="#member-justified"
              type="button"
              role="tab"
              aria-selected="false"
            >
              Member
            </button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button
              class="nav-link w-100"
              id="history-tab"
              data-bs-toggle="tab"
              data-bs-target="#history-justified"
              type="button"
              role="tab"
              aria-selected="false"
            >
              History
            </button>
          </li>
        </ul>
        <div class="tab-content pt-2" id="myTabjustifiedContent">
          <div
            class="tab-pane fade show active"
            id="action-justified"
            role="tabpanel"
            aria-labelledby="action-tab"
          >
            <ActionCard />
            <ActionCard />
            <ActionCard />
          </div>
          <div
            class="tab-pane fade"
            id="member-justified"
            role="tabpanel"
            aria-labelledby="member-tab"
          >
            <h5 class="card-title text-center">Action</h5>
            <MemberCard />
            <MemberCard />
            <h5 class="card-title text-center">Inactive</h5>
            <MemberCard />
            <MemberCard />
            <h5 class="card-title text-center">Waiting for confirmation</h5>
            <MemberCard />
            <MemberCard />
          </div>
          <div
            class="tab-pane fade"
            id="history-justified"
            role="tabpanel"
            aria-labelledby="history-tab"
          ></div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = () => {
  return (
    <div class="card mb-3 cardActionItem">
      <div class="row g-0">
        <div class="col-md-4 c-card-member-comment">
          <img src={logo} class="img-fluid rounded-start" alt="..." />
          <div class="card-body">
            <p class="card-text c-card-member">Member 1</p>
            <p class="card-text">Comment</p>
          </div>
        </div>
        <div class="col-md-8 c-card-time-money">
          <div class="card-body">
            <p class="card-text">10:02, 20/12/2023</p>
            <p class="card-text c-card-money">-100.000 đ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberCard = () => {
  return (
    <div class="card mb-3 cardActionItem">
      <div class="row g-0">
        <div class="col-md-4 c-card-member-comment">
          <img src={logo} class="img-fluid rounded-start" alt="..." />
          <div class="card-body">
            <p class="card-text c-card-member">Member 1</p>
            <p class="card-text">Trustee</p>
          </div>
        </div>
        <div class="col-md-8 c-card-time-money">
          <div class="card-body">
            <p class="card-text">10:02, 20/12/2023</p>
            <p class="card-text c-card-money">. . .</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Callaborator = () => {
  return (
    <div className="Callaborator">
      <PageTitle title="Callaborator" />
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-4 listColla">
            <CollaItemCard />
            <CollaItemCard />
            <CollaItemCard />
            <CollaItemCard />
          </div>
          <div className="col-lg-8 actionTable">
            <ActionTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Callaborator;
