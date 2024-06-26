import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import {RejectedAction} from "../../utils/types/redux";
import { IAccountStateRole, IUserRole} from "../../interfaces/account";
import {addLocalStorage, deleteLocalStorage} from "../../utils/storage/localStorageUtils.ts";
import {Status} from "../../utils/enums";
import {login, register} from "./accounts.actions.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}
const updateUserState = (state: IAccountStateRole, token: string): void => {
    const { name, email, image , roles  } = jwtDecode<IUserRole>(token);
    state.user = {
        name,
        email,
        image,
        roles,
    };
    state.token = token;
    state.isLogin = true;
    addLocalStorage('authToken', token);
    addLocalStorage('roles', roles.toLocaleString());
};

//state - нашого редюсера
const initialState: IAccountStateRole = {
    user: null,
    token: null,
    isLogin: false,
    status: Status.IDLE,
};

export const accountsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        register: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        //Залогінити користувача
        autoLogin: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        //провести вихід із системи
        logout: (state) => {
            deleteLocalStorage('authToken');
            deleteLocalStorage('roles');
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //команда завершена - логінимо користувача
            .addCase(login.fulfilled, (state, action) => {
                const {token} = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            //режим очікування
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
                console.log(state.isLogin);
            })
            //реєстрація успішна - завершена
            .addCase(register.fulfilled, (state, action) => {
                const {token} = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            //реєстрація іде
            .addCase(register.pending, (state) => {
                state.status = Status.LOADING;
            })
            //якщо щось пішло не так
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { autoLogin, logout } = accountsSlice.actions;
export default accountsSlice.reducer;