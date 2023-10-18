import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import base_url from "../../utils/development";

const URL = `${base_url}/user`;

const initialState = {
    loading: false,
    allUsers: [],
    allUsersCopy: [],
    filteredUsers: [],
    error: '',
    logState: false,
    user: null,
    pending: false,

};

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${URL}/register`, user);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${URL}/login`, user);
            return data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
            return rejectWithValue('');
    }
);

export const logUserByLocalStorage = createAsyncThunk(
    'user/logUserByLocalStorage',
    async (data, ) => {
        return data;
    }
);




export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(URL);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const searchUsersByName = createAsyncThunk(
    'user/searchUsersByName',
    async (name, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}?name=${name}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const toggleUserActiveStatus = createAsyncThunk(
    'user/toggleUserActiveStatus', async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${URL}/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/user/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {



    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
            state.allUsersCopy = action.payload;
            state.filteredUsers = action.payload;
            state.allUsers = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });


        builder.addCase(searchUsersByName.pending, (state) => {
            state.pending = true;
            state.error = '';
        });
        builder.addCase(searchUsersByName.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
            state.error = '';
        });
        builder.addCase(searchUsersByName.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });


        builder.addCase(toggleUserActiveStatus.pending, (state) => {
            state.loading = false;
            state.error = '';
        });

        builder.addCase(toggleUserActiveStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
            state.error = '';
        });
        builder.addCase(toggleUserActiveStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        }
        );
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.logState = true;
            state.user = action.payload;
            state.error = '';
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.logState = true;
            state.user = action.payload;
            state.error = '';
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.logState = false;
            state.user = null;
            state.error = '';
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        builder.addCase(logUserByLocalStorage.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(logUserByLocalStorage.fulfilled, (state, action) => {
            state.loading = false;
            state.logState = true;
            state.user = action.payload;
            state.error = '';
        });
        builder.addCase(logUserByLocalStorage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });


    },
});

export default userSlice.reducer;
