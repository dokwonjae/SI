import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IUser from "../../types/auth/IUser";
import authService from "../../services/auth/authService";
import IAuth from "../../types/auth/IAuth";

// 로컬스토리지에서 user 라는 키이름으로 값 가져오기 : 결과 (문자열) -> 객체로 변환
// user : 웹토큰 있음
// 사용법 : JSON.parse(문자열객체) => 문자열객체 -> 실제객체로 변환
const user = JSON.parse(localStorage.getItem("user")||"null");

// 회원가입 공유함수 (비동기함수) 
//  : createAsyncThunk(함수명, (변수,thunkAPI)=>{실행문}) - 리덕스 비동기 함수 적용
//  thunkAPI 역할 : 에러메세지 처리 -> thunkAPI.rejectWithValue(에러메세지)
// async () => { await 함수명 }; 
// 1) 비동기함수 처리    : promise -> 함수실행.then().catch()
// 2) 비동기함수 처리    :  async () => { await 함수실행}
export const register = createAsyncThunk(
  "auth/register",
  async (user:IUser, thunkAPI) => {
    try {
      const response = await authService.register(user); // 회원가입함수 실행
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user:IUser, thunkAPI) => {
    try {
      const data = await authService.login(user);
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const initialState: IAuth = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},                  // 동기로 실행 시
  extraReducers: (builder) => {  // 비동기로 함수 실행 시 : register, login, logout 은 모두 비동기 함수임 
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;