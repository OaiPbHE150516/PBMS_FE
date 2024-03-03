import React, { useState, useEffect } from "react";
import { PageTitle } from "../../components";
import "../../css/Wallet.css";
import { BsToggleOn } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getValues,getTotalValues } from "../../redux/walletSlice";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import CreateWallet from "../../components/WalletForm/CreateWallet";
import UpdateWallet from "../../components/WalletForm/UpdateWallet";
const Wallet = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.wallet.values);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const retrieveValues = () => {
        console.log("retrieveValues");
        dispatch(getValues());
        dispatch(getTotalValues());
    };

    const [show, showSet] = useState(false);
    const [editModal, editModalSet] = useState(false);
    // Use useEffect to trigger retrieveValues when the component mounts
    useEffect(() => {
        retrieveValues();
    }, []);
    const [selectedAction, setSelectedAction] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const handleActionItemClick = (action) => {
        setSelectedAction(action);
        setIsFormVisible(true);
    };
    return (
        <div className="Wallet">
            <PageTitle title="Wallet" />
            <div className="addWallet">
                <Button
                    size="btn-lg"
                    onClick={() => showSet(!show)}
                    className="active bold btn-light"
                >
                    Create new Wallet
                </Button>
                <CreateWallet show={show} showSet={showSet} />
                <span>
                    Total: <p>totalBalance</p>
                </span>
            </div>
            <div className="wallet-list-container">
                <div className="wallet-list row">
                    {wallet?.map((wallet) => (
                        <div class="wallet-container col-md-4">
                            <div class="wallet">
                                <div class="wallet-body">
                                    <h5 class="wallet-title">{capitalizeFirstLetter(wallet.name)}<span>{wallet.balance}</span></h5>
                                    <h6 class="wallet-sub">Created date: 31/2/2024</h6>
                                    <h6 class="wallet-sub">Currency unit: VND - đ</h6>
                                    <h6 class="wallet-sub">Note:</h6>
                                    <div class="active-container">
                                        <div class="active1">
                                            <div>
                                                <Form.Check
                                                    className="mb-0"
                                                    type="switch"
                                                    reverse
                                                    label="Active"
                                                    size={"lg"}
                                                ></Form.Check>
                                            </div>
                                        </div>
                                        <div class="active2"><button className="icon-button">
                                            <IoReload />
                                        </button>
                                            <button className="icon-button">
                                                <BsPencilSquare />
                                            </button>
                                        </div>
                                        
                                    </div>  
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallet;