import React, { useState } from "react";
import { PageTitle } from "../../components";
import "../../css/Wallet.css";
import { BsToggleOn } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
const Wallet = () => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const handleActionItemClick = (action) => {
        setSelectedAction(action);
        setIsFormVisible(true);
    };
    const renderFormCreateNewWallet = () => {
        if (selectedAction === "CreateWallet") {
            return (
                <div className="formCreateContainer">
                    <div className="formCreate">{renderCreateWalletForm()}</div>
                </div>
            );
        }
        return null;
    };

    const renderCreateWalletForm = () => {
        return (
            <div class="formcreate">
                <div class="formcreate-body">
                    <h5 class="formcreate-title">Create new wallet</h5>
                    <form class="row g-3">
                        <div class="col-md-12">
                            <label class="form-label">Wallet Name</label>
                            <input type="text" class="form-control" id="walletName" />
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Currency unit</label>
                            <select id="inputState" class="form-select">
                                <option selected>USD - $</option>
                                <option>VND - đ</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <label for="inputAddress5" class="form-label">Initial amount</label>
                            <input type="text" class="form-control" id="inputAddres5s" />
                        </div>
                        <div class="col-12">
                            <label for="inputAddress5" class="form-label">Note</label>
                            <textarea class="form-control" placeholder="Optional" id="floatingTextarea" style={{height: 100}}></textarea>
                        </div>
                        <div class="col-12 text-end">
                            <button type="submit" class="btn btn-primary me-3" onClick={() => setIsFormVisible(false)}>Cancel</button>
                            <button type="submit" class="btn btn-secondary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    return (
        <div className="Wallet">
            <PageTitle title="Wallet" />
            <div className="addWallet" onClick={() => handleActionItemClick("CreateWallet")}>
                <button>Create New Wallet</button>
                <span>
                    Total: <p>1.000.000.0000 đ</p>
                </span>
            </div>
            {renderFormCreateNewWallet()}
            <div class="wallet-container">
                <div class="wallet">
                    <div class="wallet-body">
                        <h5 class="wallet-title">Cash<span>1.000.000.0000 đ</span></h5>
                        <h6 class="wallet-sub">Created date: 31/2/2024</h6>
                        <h6 class="wallet-sub">Currency unit: VND - đ</h6>
                        <h6 class="wallet-sub">Initial amount: 1.000.000 đ</h6>
                        <div class="active1"><BsToggleOn /> <span>Active</span></div>
                        <div class="active2"><IoReload />   <BsPencilSquare /></div>
                    </div>
                </div>
                <div class="wallet">
                    <div class="wallet-body">
                        <h5 class="wallet-title">TP Bank<span>1.000.000.0000 đ</span></h5>
                        <h6 class="wallet-sub">Created date: 31/2/2024</h6>
                        <h6 class="wallet-sub">Currency unit: VND - đ</h6>
                        <h6 class="wallet-sub">Initial amount: 1.000.000 đ</h6>
                        <div class="active1"><BsToggleOn /> <span>Active</span></div>
                        <div class="active2"><IoReload />   <BsPencilSquare /></div>
                    </div>
                </div>
                <div class="wallet">
                    <div class="wallet-body">
                        <h5 class="wallet-title">Techcombank<span>1.000.000.0000 đ</span></h5>
                        <h6 class="wallet-sub">Created date: 31/2/2024</h6>
                        <h6 class="wallet-sub">Currency unit: VND - đ</h6>
                        <h6 class="wallet-sub">Initial amount: 1.000.000 đ</h6>
                        <div class="active1"><BsToggleOn /> <span>Active</span></div>
                        <div class="active2"><IoReload />   <BsPencilSquare /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;