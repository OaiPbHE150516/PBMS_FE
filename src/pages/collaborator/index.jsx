import React, { useEffect, useState } from "react";
import { PageHelper, PageTitle } from "../../components";
import "../../css/Collaborator.css";
import { CollaItemCard } from "./CollaItemCard";
import { ActionTable } from "./ActionTable";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import useAppSelector from "../../hooks/useAppSelector";
import {
  addCollaborator,
  getCollaborator,
} from "../../redux/collaboratorSlice";
import CreateCollabFund from "../../components/CollabFundForm/CreateCollabFund";

const Callaborator = () => {
  const [show, showSet] = useState(false);
  const user = useAppSelector((state) => state.authen.user);
  const dispatch = useDispatch();
  const collaborators = useAppSelector((state) => state.collaborator.values);
  useEffect(() => {
    dispatch(getCollaborator());
  }, [user]);

  const [selectedCollab, setSelectedCollab] = useState(null);

  const handleCollabItemClick = (collabId) => {
    setSelectedCollab(collabId);
  };

  return (
    <div className="Callaborator">
      {user ? (
        <>
          <PageTitle title="Chi tiêu chung" />
          <Button
            size="btn-lg"
            onClick={() => showSet(!show)}
            className="active bold btn-light"
          >
            Tạo khoản chi tiêu chung
          </Button>

          <CreateCollabFund
            show={show}
            showSet={showSet}
            onSubmit={(fieldValue) =>
              // dispatch(
              //   addCollaborator({
              //     fieldValue: fieldValue,
              //   })
              // )
              //   .unwrap()
              //   .then(() => showSet(false))
              console.log("fieldValue", {fieldValue})
            }
          />

          <section className="section dashboard">
            <div className="row">
              {collaborators.length > 0 && (
                <>
                  <div className="col-lg-4 listColla">
                    {collaborators.map((item) => (
                      <CollaItemCard
                        key={item.collabFundID}
                        data={item}
                        onItemClick={handleCollabItemClick}
                      />
                    ))}
                  </div>
                  <div className="col-lg-8 actionTable">
                    {selectedCollab && (
                      <ActionTable collabID={selectedCollab} />
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          <PageHelper/>
        </>
      )}
    </div>
  );
};

export default Callaborator;
