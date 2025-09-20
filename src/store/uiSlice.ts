import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastState = {
  visible: boolean;
  message: string;
};

type UIState = {
  toast: ToastState;
};

const initialState: UIState = {
  toast: { visible: false, message: "" },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.toast.visible = true;
      state.toast.message = action.payload;
    },
    hideToast: (state) => {
      state.toast.visible = false;
      state.toast.message = "";
    },
  },
});

export const { showToast, hideToast } = uiSlice.actions;

// Selectores
export const selectToast = (s: { ui: UIState }) => s.ui.toast;

export default uiSlice.reducer;
