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
    admin: false,
    pending: false,

};
export const googleAuth = createAsyncThunk(
    'user/googleAuth',
    async (response, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${URL}/auth`, response);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${URL}/register`, user);
            return data;
        } catch (error) {
            return rejectWithValue(
                (error.response && error.response.data.message) || error.message
            );
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
    async () => {
        return null;
    }
);

export const logUserByLocalStorage = createAsyncThunk(
    'user/logUserByLocalStorage',
    async (data, { rejectWithValue }) => {
        if (data.role === 'user') { // si el local storage dice user, devolver data 
            return data;
        }
        try{
            const res = await axios.post(`${URL}/login`, data); // si no, loguear con los datos del local storage
            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
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
            await axios.put(`${URL}/toggle/${userId}`);
            return userId;
        } catch (error) {
            return rejectWithValue(error.response.data);

        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data, { rejectWithValue }) => {
        try {
            const { res } = await axios.put(`${URL}/${data.userId}`, data.data);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteAccount = createAsyncThunk(
    'user/deleteAccount',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/user/${userId}/delete`);
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
        resetSearchUser: (state) => {
            state.allUsers = state.allUsersCopy;
        },
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
            state.error = '';
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
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
            state.error = (action.payload && action.payload.error) || action.error.message;
        });


        builder.addCase(toggleUserActiveStatus.pending, (state) => {
            state.loading = false;
            state.error = '';
        });

        builder.addCase(toggleUserActiveStatus.fulfilled, (state, action) => {
            state.loading = false;
            const userId = action.payload;
			const user = state.allUsers.find((u) => u.id === userId);

			if (user) {
				user.active = !user.active;
			}
            state.error = '';
        });
        builder.addCase(toggleUserActiveStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
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
            if (action.payload.role === 'admin') {
                state.admin = true;
            } else {
                state.admin = false;
            }
            state.error = '';
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
        });

        builder.addCase(googleAuth.pending, (state) => {
            state.loading = true;
            state.error = '';
        }
        );
        builder.addCase(googleAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.logState = true;
            state.user = action.payload;
            if (action.payload.role === 'admin') {
                state.admin = true;
            } else {
                state.admin = false;
            }
            state.error = '';
        });
        builder.addCase(googleAuth.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
        });



        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.logState = true;
            state.user = action.payload.user;
            if (action.payload.role === 'admin') {
                state.admin = true;
            } else {
                state.admin = false;
            }
            state.error = '';
            state.logState = true;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && (action.payload.error || action.payload)) || action.error.message;
        });

        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.logState = false;
            state.user = null;
            state.admin = false;
            state.error = '';
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
        });

        builder.addCase(logUserByLocalStorage.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(logUserByLocalStorage.fulfilled, (state, action) => {
            state.loading = false;
            state.logState = true;
            state.user = action.payload;
            if (action.payload.role === 'admin') {
                state.admin = true;
            } else {
                state.admin = false;
            }
            state.error = '';
        });
        builder.addCase(logUserByLocalStorage.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
        });

        builder.addCase(deleteAccount.pending, (state) => {
            state.loading = true;
            state.error = '';
        });

        builder.addCase(deleteAccount.fulfilled, (state) => {
            state.loading = false;
            state.user = null; 
            state.error = '';
        });

        builder.addCase(deleteAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
        });


        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.error) || action.error.message;
        });
    },
});

export const { resetSearchUser } = userSlice.actions;
export default userSlice.reducer;
