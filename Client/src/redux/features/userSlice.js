import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3001/user';

const initialState = {
    loading: false,
    allUsers: [],
    allUsersCopy: [],
    filteredUsers: [],
    error: '',
};

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
    },
});

export default userSlice.reducer;
