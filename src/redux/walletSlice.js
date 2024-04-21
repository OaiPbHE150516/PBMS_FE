import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWallets as walletServices } from "../services/walletService";
import { getTotalWallets as totalwalletServices } from "../services/walletService";
import { addWallet as addWalletServices } from "../services/walletService";
import { updateWallet as updateWalletServices } from "../services/walletService";
import { deleteWallet as deleteWalletServices } from "../services/walletService";
import { updateStateWallet as updateStateWalletServices } from "../services/walletService";
import { toast } from "react-toastify";

export const getWallets = createAsyncThunk(
  "get-wallets",
  async (_, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await walletServices(user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const getTotalWallets = createAsyncThunk(
  "get-totalwallets",
  async (_, { getState }) => {
    try {
      const user = getState().authen.user;
      const response = await totalwalletServices(user);
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const addWallet = createAsyncThunk(
  "add-wallet",
  async ({ accountID, fieldValue }, { dispatch }) => {
    try {
      const body = {
        accountID: accountID,
        balance: fieldValue.balance,
        currencyID: 2,
        name: fieldValue.name,
        note: fieldValue.note,
        isBanking: !!fieldValue.isBanking,
        qrCodeURL: "String",
        bankName: fieldValue.bankName,
        bankAccount: fieldValue.bankAccount,
        bankUsername: fieldValue.bankUsername,
      };
      const response = await addWalletServices(body);
      toast.success("Bạn tạo ví mới thành công");
      await dispatch(getWallets());
      await dispatch(getTotalWallets());
      await dispatch(
        updateStateWallet({
          accountID: accountID,
          walletID: response.walletID,
          activeStateID: 1,
        })
      );
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);
export const updateStateWallet = createAsyncThunk(
  "update-Statewallet",
  async ({ accountID, walletID, activeStateID }, { dispatch }) => {
    try {
      const body = {
        accountID: accountID,
        walletID: walletID,
        activeStateID: activeStateID,
      };
      const response = await updateStateWalletServices(body);
      // toast.success("Bạn đã chỉnh sửa thành công");
      await dispatch(getTotalWallets());
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const updateWallet = createAsyncThunk(
  "update-wallet",
  async ({ accountID, walletID, fieldValue }, { dispatch }) => {
    try {
      const body = {
        accountID: accountID,
        walletID: walletID,
        name: fieldValue.name,
        note: fieldValue.note,
        isBanking: !!fieldValue.isBanking,
        qrCodeURL: "fieldValue.qrCodeURL",
        bankName: fieldValue.bankName,
        bankAccount: fieldValue.bankAccount,
        bankUsername: fieldValue.bankUsername,
      };
      const response = await updateWalletServices(body);
      toast.success("Bạn đã chỉnh sửa thành công");
      await dispatch(getWallets());
      await dispatch(getTotalWallets());
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const deleteWallet = createAsyncThunk(
  "delete-wallet",
  async ({ accountID, walletID }, { dispatch }) => {
    try {
      const response = await deleteWalletServices(walletID, accountID);
      toast.success("Bạn đã xoá thành công");
      await dispatch(getWallets());
      await dispatch(getTotalWallets());
      return response;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const totalwalletSlice = createSlice({
  name: "total-wallet",
  initialState: {
    values: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalWallets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getTotalWallets.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    values: [],
  },
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWallets.fulfilled, (state, action) => {
        state.values = action.payload;
      })
      .addCase(getWallets.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export default walletSlice;
