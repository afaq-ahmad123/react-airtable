import { ActionCreator, AnyAction, createSlice, Dispatch, Slice } from "@reduxjs/toolkit";
import getClasses from "../../api/ClassesAPI";

export type initState = {
  data: [],
  isError: Boolean,
  isSuccess: Boolean,
  isLoading: Boolean,
  isLoggedIn: Boolean,
  message: String,
}

const initialState: initState = {
    data: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isLoggedIn: false,
}

const classSlice: Slice = createSlice({
  name: 'class',
  initialState: initialState,
  reducers: {
    initiateRequest(state: initState, _) {
      state.isError = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.message = '';
    },
    setClasses (state: initState, action: AnyAction) {
      state.data = action.payload;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
    },
    login(state: initState, _) {
        state.isLoggedIn = true;
    },
    logout(state: initState, _) {
        state.isLoggedIn = false;
    },
    requestFail(state: initState, action) {
      state.message = action.payload;
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
    },
    reset(state, action) {
      state.data = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  }
});

const classActions: any = classSlice.actions;

export const getAllClasses: ActionCreator<any> = (studentName = '') => {
    return async (dispatch: Dispatch, getState: initState) => {
      dispatch(classActions.initiateRequest());
      try {
        const response = await getClasses(studentName);
        dispatch(classActions.setClasses(response));
      } catch (error: any) {
        dispatch(classActions.requestFail(error.response.data?.error.message));
      }
    }
  };

export const login: ActionCreator<any> = () => {
    return async (dispatch: Dispatch, _: any) => {
        return dispatch(classActions.login());
    };
}

export const logout: ActionCreator<any> = () => {
    return async (dispatch: Dispatch, _: any) => {
        return dispatch(classActions.logout());
    };
}
export default classSlice.reducer;