import Modal from "react-bootstrap/Modal";
import Button from "../Button";
const PopupCollabTransaction = ({
    title,
    onClose,
    onSubmit,
    show,
    children,
    closeName = "Hủy",
    submitName = "Lưu",
}) => {
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
            show={show}
            onExit={onClose}
            onHide={onClose}
        >
            <div className="popup-content">
                <h3 className="bold">{title}</h3>
                <div>{children}</div>
                <div className="d-flex justify-content-end">
                    <div className="d-flex gap-2 mt-2">
                        {onClose && (
                            <Button
                                className="btn-light bold"
                                variant="secondary"
                                onClick={onClose}
                            >
                                {closeName}
                            </Button>
                        )}
                        {onSubmit && (
                            <Button
                                className="btn-success bold"
                                variant="primary"
                                onClick={onSubmit}
                                type="submit"
                            >
                                {submitName}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PopupCollabTransaction;
