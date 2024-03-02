import React, { useEffect, useState } from "react";
import { PageTitle } from "../../components";
import "../../css/Collaborator.css";
import { CollaItemCard } from "./CollaItemCard";
import { ActionTable } from "./ActionTable";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import useAppSelector from "../../hooks/useAppSelector";
import { getCollaborator } from "../../redux/collaboratorSlice";

const Callaborator = () => {
  const [show, showSet] = useState(false);

  // Get List Collab
  const dispatch = useDispatch();
  const collaborators = useAppSelector((state) => state.collaborator.values);
  useEffect(() => {
    dispatch(getCollaborator());
  }, []);

  const [selectedCollab, setSelectedCollab] = useState(null);

  const handleCollabItemClick = (collabId) => {
    setSelectedCollab(collabId);
  };

  return (
    <div className="Callaborator">
      <PageTitle title="Callaborator" />
      <Button
        size="btn-lg"
        onClick={() => showSet(!show)}
        className="active bold btn-light"
      >
        Create new Collaborator
      </Button>

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
                {selectedCollab && <ActionTable collabID={selectedCollab} />}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Callaborator;
