import React from "react";
import { PageTitle } from "../../components";
import "../../css/Collaborator.css";
import {CollaItemCard} from "./CollaItemCard";
import {ActionTable} from "./ActionTable";
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
