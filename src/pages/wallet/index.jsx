import React from 'react';
import { PageTitle } from "../../components";
import "../../css/Wallet.css";
import { BsToggleOn } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
const Wallet = () => {
    return (
        <div className="Wallet">
            <PageTitle title="Wallet" />
            <div className="addWallet" /*onClick={() => handleActionItemClick("AddWallet")}*/>
                <button>Create New Wallet</button>
                <span>
                    Total: <p>1.000.000.0000 đ</p>
                </span>
            </div>
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