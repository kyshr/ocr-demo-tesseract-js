import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    AdminLogin,
    CreateAdmin,
    DeleteAdmin,
    FetchAdmins,
    UpdateAdmin,
} from "../../logic/admin";
import {
    CreateGuard,
    DeleteGuard,
    FetchGuards,
    GuardLogin,
    UpdateGuard,
} from "../../logic/guard";
import {
    CreateOwner,
    DeleteOwner,
    FetchOwner,
    FetchOwners,
    UpdateOwner,
} from "../../logic/owner";
import {
    CreateVehicle,
    DeleteVehicle,
    FetchVehicles,
    UpdateVehicle,
} from "../../logic/vehicle";
import { FetchActivities, FetchActivitiesByOwner } from "../../logic/activity";
import { ValidateToken } from "../../logic/jwt";

const initialState = {
    appLoading: false,
    loginLoading: false,
    jwtLoading: true,
    fetchGuardLoading: false,
    guardLoading: false,
    fetchOwnerLoading: false,
    ownerLoading: false,
    fetchVehicleLoading: false,
    vechicleLoading: false,
    fetchActivityLoading: false,
    activityLoading: false,
    fetchAdminLoading: false,
    adminLoading: false,
    loginSuccess: false,
    loginError: true,
    successToast: {
        show: false,
        message: "",
    },
    errorToast: {
        show: false,
        message: "",
    },
    currentUser: {},
    guard: {
        guard_fname: "",
        guard_lname: "",
        guard_mail: "",
        guard_password: "",
        guard_contact: "",
        guard_id_num: "",
    },
    admin: {
        admin_fname: "",
        admin_lname: "",
        admin_mail: "",
        admin_password: "",
        admin_contact: "",
        admin_id_num: "",
        admin_permission: 1,
    },
    owner: {
        owner_fname: "",
        owner_lname: "",
        owner_mail: "",
        owner_address: "",
        owner_id_num: "",
        owner_contact: "",
    },
    vehicle: {
        vehicle_rfid: "",
        vehicle_plate_number: "",
        vehicle_description: "",
        vehicle_owner: "",
    },
    guardData: [],
    ownerData: [],
    vehicleData: [],
    activityData: [],
    activityDataReport: [],
    adminData: [],
    reportStartDate: "",
    reportEndDate: "",
};
export const adminLogin = createAsyncThunk("app/adminLogin", async (creds) => {
    const response = await AdminLogin(creds);
    return {
        success: response.access_token ? true : false,
    };
});

export const guardLogin = createAsyncThunk("app/guardLogin", async (creds) => {
    const response = await GuardLogin(creds);
    return {
        success: response.access_token ? true : false,
    };
});

export const validateToken = createAsyncThunk(
    "app/validateToken",
    async (type) => {
        let response;
        if (type === "admin") {
            response = await ValidateToken(
                localStorage.getItem("access_token")
            );
        } else if (type === "guard") {
            response = await ValidateToken(
                localStorage.getItem("guard_access_token")
            );
        }
        return response;
    }
);

//Guards
export const fetchGuards = createAsyncThunk("app/fetchGuards", async () => {
    const response = await FetchGuards(localStorage.getItem("access_token"));
    return response;
});

export const createGuard = createAsyncThunk("app/createGuard", async (data) => {
    const response = await CreateGuard(
        localStorage.getItem("access_token"),
        data
    );
    return response;
});

export const updateGuard = createAsyncThunk(
    "app/updateGuard",
    async (updatedData) => {
        const { id, data } = updatedData;
        const newPayload = validateNullValues(data);
        const response = await UpdateGuard(
            localStorage.getItem("access_token"),
            id,
            newPayload
        );
        return response;
    }
);

//Admins
export const fetchAdmins = createAsyncThunk("app/fetchAdmins", async () => {
    const response = await FetchAdmins(localStorage.getItem("access_token"));
    return response;
});

export const createAdmin = createAsyncThunk("app/createAdmin", async (data) => {
    const response = await CreateAdmin(
        localStorage.getItem("access_token"),
        data
    );
    return response;
});

export const updateAdmin = createAsyncThunk(
    "app/updateAdmin",
    async (updatedData) => {
        const { id, data } = updatedData;
        const newPayload = validateNullValues(data);
        const response = await UpdateAdmin(
            localStorage.getItem("access_token"),
            id,
            newPayload
        );
        return response;
    }
);

//Delete
export const deleteEntry = createAsyncThunk("app/deleteEntry", async (args) => {
    let response = null;
    if (args.type === "guard") {
        response = await DeleteGuard(
            localStorage.getItem("access_token"),
            args.id
        );
    } else if (args.type === "admin") {
        response = await DeleteAdmin(
            localStorage.getItem("access_token"),
            args.id
        );
    } else if (args.type === "vehicle") {
        response = await DeleteVehicle(
            localStorage.getItem("access_token"),
            args.id
        );
    } else if (args.type === "owner") {
        response = await DeleteOwner(
            localStorage.getItem("access_token"),
            args.id
        );
    } else {
        return {
            message: {
                acknowledged: false,
                deletedCount: 0,
            },
        };
    }

    return response;
});

//Owners
export const fetchOwners = createAsyncThunk("app/fetchOwners", async () => {
    const response = await FetchOwners(localStorage.getItem("access_token"));
    return response;
});

export const fetchOwner = createAsyncThunk("app/fetchOwner", async (id) => {
    const response = await FetchOwner(localStorage.getItem("access_token"), id);
    return response;
});

export const createOwner = createAsyncThunk("app/createOwner", async (data) => {
    const response = await CreateOwner(
        localStorage.getItem("access_token"),
        data
    );
    return response;
});

export const updateOwner = createAsyncThunk(
    "app/updateOwner",
    async (updatedData) => {
        const { id, data } = updatedData;
        const newPayload = validateNullValues(data);
        const response = await UpdateOwner(
            localStorage.getItem("access_token"),
            id,
            newPayload
        );
        return response;
    }
);

//Vehicles
export const fetchVehicles = createAsyncThunk("app/fetchVehicles", async () => {
    const response = await FetchVehicles(localStorage.getItem("access_token"));
    return response;
});

export const createVehicle = createAsyncThunk(
    "app/createVehicle",
    async (data) => {
        const response = await CreateVehicle(
            localStorage.getItem("access_token"),
            data
        );
        return response;
    }
);

export const updateVehicle = createAsyncThunk(
    "app/updateVehicle",
    async (updatedData) => {
        const { id, data } = updatedData;
        const newPayload = validateNullValues(data);
        const response = await UpdateVehicle(
            localStorage.getItem("access_token"),
            id,
            newPayload
        );
        return response;
    }
);

//Activities
export const fetchActivities = createAsyncThunk(
    "app/fetchActivities",
    async (where) => {
        const response = await FetchActivities(
            localStorage.getItem("access_token"),
            where
        );
        return response;
    }
);

export const fetchGuardActivities = createAsyncThunk(
    "app/fetchGuardActivities",
    async (where) => {
        const response = await FetchActivities(
            localStorage.getItem("guard_access_token"),
            where
        );
        return response;
    }
);

export const fetchActivitiesByOwner = createAsyncThunk(
    "app/fetchActivitiesByOwner",
    async (data) => {
        const response = await FetchActivitiesByOwner(
            localStorage.getItem("access_token"),
            data.id,
            data.dateOfEntry
        );
        return response;
    }
);

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        onChangeState: (state, action) => {
            const { payload } = action;
            return { ...state, [payload.name]: payload.value };
        },
        onSubmitGuard: (state, action) => {
            const { payload } = action;
            const prevState = validateNullValues(payload);
            state.guard = { ...state.guard, ...prevState };
        },
        onSubmitOwner: (state, action) => {
            const { payload } = action;
            const prevState = validateNullValues(payload);
            state.owner = { ...state.owner, ...prevState };
        },
        onSubmitVehicle: (state, action) => {
            const { payload } = action;
            const prevState = validateNullValues(payload);
            state.vehicle = { ...state.vehicle, ...prevState };
        },
        onSubmitAdmin: (state, action) => {
            const { payload } = action;
            const prevState = validateNullValues(payload);
            state.admin = { ...state.admin, ...prevState };
        },
        onResetAllState: (state) => {
            return initialState;
        },
        onResetAdminState: (state) => {
            return {
                ...state,
                admin: {
                    admin_fname: "",
                    admin_lname: "",
                    admin_mail: "",
                    admin_password: "",
                    admin_contact: "",
                },
            };
        },
        onResetGuardState: (state) => {
            return {
                ...state,
                guard: {
                    guard_fname: "",
                    guard_lname: "",
                    guard_mail: "",
                    guard_password: "",
                    guard_contact: "",
                },
            };
        },
        onResetOwnerState: (state) => {
            return {
                ...state,
                owner: {
                    owner_fname: "",
                    owner_lname: "",
                    owner_mail: "",
                    owner_address: "",
                    owner_contact: "",
                },
            };
        },
        onResetVehicleState: (state) => {
            return {
                ...state,
                vehicle: {
                    vehicle_rfid: "",
                    vehicle_plate_number: "",
                    vehicle_description: "",
                    vehicle_owner: "",
                },
            };
        },
        onSetReportDate: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                reportStartDate: payload.startDate,
                reportEndDate: payload.endDate,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            //Admin Login
            .addCase(adminLogin.pending, (state) => {
                return { ...state, loginLoading: true };
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    loginLoading: false,
                    loginSuccess: payload.success,
                    loginError: payload.success,
                    errorToast: {
                        show: payload.success ? false : true,
                        message: payload.success
                            ? ""
                            : "Invalid email or password",
                    },
                };
            })
            .addCase(adminLogin.rejected, (state) => {
                return { ...state, loginLoading: false };
            })

            //Guard Login
            .addCase(guardLogin.pending, (state) => {
                return { ...state, loginLoading: true };
            })
            .addCase(guardLogin.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    loginLoading: false,
                    loginSuccess: payload.success,
                    loginError: payload.success,
                    errorToast: {
                        show: payload.success ? false : true,
                        message: payload.success
                            ? ""
                            : "Invalid email or password",
                    },
                };
            })
            .addCase(guardLogin.rejected, (state) => {
                return { ...state, loginLoading: false };
            })

            //Validate JWT
            .addCase(validateToken.pending, (state) => {
                return { ...state, jwtLoading: true };
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                return {
                    ...state,
                    jwtLoading: false,
                    currentUser: action.payload,
                };
            })
            .addCase(validateToken.rejected, (state) => {
                return { ...state, jwtLoading: false };
            })

            //Fetch Admins
            .addCase(fetchAdmins.pending, (state) => {
                return { ...state, fetchAdminLoading: true };
            })
            .addCase(fetchAdmins.fulfilled, (state, action) => {
                return {
                    ...state,
                    fetchAdminLoading: false,
                    adminData: action.payload,
                };
            })
            .addCase(fetchAdmins.rejected, (state) => {
                return { ...state, fetchAdminLoading: false };
            })

            //Create Admin
            .addCase(createAdmin.pending, (state) => {
                return { ...state, adminLoading: true };
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    adminLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show: payload.success ? false : true,
                        message: payload.success ? "" : payload.message,
                    },
                    successToast: {
                        show: payload.success ? true : false,
                        message: payload.success ? payload.message : "",
                    },
                };
            })
            .addCase(createAdmin.rejected, (state, action) => {
                return {
                    ...state,
                    adminLoading: false,
                };
            })

            //Update Admin
            .addCase(updateAdmin.pending, (state) => {
                return { ...state, adminLoading: true };
            })
            .addCase(updateAdmin.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    adminLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show:
                            payload.acknowledged && payload.matchedCount === 1
                                ? false
                                : true,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? ""
                                : "Admin does not exists",
                    },
                    successToast: {
                        show:
                            payload.acknowledged && payload.matchedCount
                                ? true
                                : false,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? "Admin updated"
                                : "",
                    },
                };
            })
            .addCase(updateAdmin.rejected, (state) => {
                return {
                    ...state,
                    adminLoading: false,
                };
            })

            //Fetch Guards
            .addCase(fetchGuards.pending, (state) => {
                return { ...state, fetchGuardLoading: true };
            })
            .addCase(fetchGuards.fulfilled, (state, action) => {
                return {
                    ...state,
                    fetchGuardLoading: false,
                    guardData: action.payload,
                };
            })
            .addCase(fetchGuards.rejected, (state) => {
                return { ...state, fetchGuardLoading: false };
            })

            //Create Guard
            .addCase(createGuard.pending, (state) => {
                return { ...state, guardLoading: true };
            })
            .addCase(createGuard.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    guardLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show: payload.success ? false : true,
                        message: payload.success ? "" : payload.message,
                    },
                    successToast: {
                        show: payload.success ? true : false,
                        message: payload.success ? payload.message : "",
                    },
                };
            })
            .addCase(createGuard.rejected, (state, action) => {
                return {
                    ...state,
                    guardLoading: false,
                };
            })

            //Update Guard
            .addCase(updateGuard.pending, (state) => {
                return { ...state, guardLoading: true };
            })
            .addCase(updateGuard.fulfilled, (state, action) => {
                const { payload } = action;
                console.log(payload);
                return {
                    ...state,
                    guardLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show:
                            payload.acknowledged && payload.matchedCount === 1
                                ? false
                                : true,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? ""
                                : "Guard does not exists",
                    },
                    successToast: {
                        show:
                            payload.acknowledged && payload.matchedCount
                                ? true
                                : false,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? "Guard updated"
                                : "",
                    },
                };
            })
            .addCase(updateGuard.rejected, (state) => {
                return {
                    ...state,
                    guardLoading: false,
                };
            })

            //Fetch Owner
            .addCase(fetchOwners.pending, (state) => {
                return { ...state, fetchOwnerLoading: true };
            })
            .addCase(fetchOwners.fulfilled, (state, action) => {
                return {
                    ...state,
                    fetchOwnerLoading: false,
                    ownerData: action.payload,
                };
            })
            .addCase(fetchOwners.rejected, (state) => {
                return { ...state, fetchOwnerLoading: false };
            })

            //Create Owner
            .addCase(createOwner.pending, (state) => {
                return { ...state, ownerLoading: true };
            })
            .addCase(createOwner.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    ownerLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show: payload.success ? false : true,
                        message: payload.success ? "" : payload.message,
                    },
                    successToast: {
                        show: payload.success ? true : false,
                        message: payload.success ? payload.message : "",
                    },
                };
            })
            .addCase(createOwner.rejected, (state, action) => {
                return {
                    ...state,
                    ownerLoading: false,
                };
            })

            //Update Owner
            .addCase(updateOwner.pending, (state) => {
                return { ...state, ownerLoading: true };
            })
            .addCase(updateOwner.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    ownerLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show:
                            payload.acknowledged && payload.matchedCount === 1
                                ? false
                                : true,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? ""
                                : "Owner does not exists",
                    },
                    successToast: {
                        show:
                            payload.acknowledged && payload.matchedCount
                                ? true
                                : false,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? "Owner updated"
                                : "",
                    },
                };
            })
            .addCase(updateOwner.rejected, (state, action) => {
                return {
                    ...state,
                    ownerLoading: false,
                };
            })

            //Fetch Vehicles
            .addCase(fetchVehicles.pending, (state) => {
                return { ...state, fetchVehicleLoading: true };
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                return {
                    ...state,
                    fetchVehicleLoading: false,
                    vehicleData: action.payload,
                };
            })
            .addCase(fetchVehicles.rejected, (state) => {
                return { ...state, fetchVehicleLoading: false };
            })

            //Create Vehicle
            .addCase(createVehicle.pending, (state) => {
                return { ...state, vechicleLoading: true };
            })
            .addCase(createVehicle.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    vechicleLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show: payload.success ? false : true,
                        message: payload.success ? "" : payload.message,
                    },
                    successToast: {
                        show: payload.success ? true : false,
                        message: payload.success ? payload.message : "",
                    },
                };
            })
            .addCase(createVehicle.rejected, (state, action) => {
                return {
                    ...state,
                    vechicleLoading: false,
                };
            })

            //Update Vehicle
            .addCase(updateVehicle.pending, (state) => {
                return { ...state, vechicleLoading: true };
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    vechicleLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show:
                            payload.acknowledged && payload.matchedCount === 1
                                ? false
                                : true,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? ""
                                : "Vehicle does not exists",
                    },
                    successToast: {
                        show:
                            payload.acknowledged && payload.matchedCount
                                ? true
                                : false,
                        message:
                            payload.acknowledged && payload.matchedCount === 1
                                ? "Vehicle updated"
                                : "",
                    },
                };
            })
            .addCase(updateVehicle.rejected, (state, action) => {
                return {
                    ...state,
                    vechicleLoading: false,
                };
            })

            //Fetch Activities
            .addCase(fetchActivities.pending, (state) => {
                return { ...state, fetchActivityLoading: true };
            })
            .addCase(fetchActivities.fulfilled, (state, action) => {
                return {
                    ...state,
                    fetchActivityLoading: false,
                    activityData: action.payload,
                };
            })
            .addCase(fetchActivities.rejected, (state) => {
                return { ...state, fetchActivityLoading: false };
            })

            //Fetch Guard Activities
            .addCase(fetchGuardActivities.pending, (state) => {
                return { ...state, fetchActivityLoading: true };
            })
            .addCase(fetchGuardActivities.fulfilled, (state, action) => {
                return {
                    ...state,
                    fetchActivityLoading: false,
                    activityData: action.payload,
                };
            })
            .addCase(fetchGuardActivities.rejected, (state) => {
                return { ...state, fetchActivityLoading: false };
            })

            //Fetch Activities By Owner
            .addCase(fetchActivitiesByOwner.pending, (state) => {
                return { ...state, fetchActivityLoading: true };
            })
            .addCase(fetchActivitiesByOwner.fulfilled, (state, action) => {
                return {
                    ...state,
                    fetchActivityLoading: false,
                    activityData: action.payload,
                };
            })
            .addCase(fetchActivitiesByOwner.rejected, (state) => {
                return { ...state, fetchActivityLoading: false };
            })

            //Delete Entry
            .addCase(deleteEntry.pending, (state) => {
                return { ...state, appLoading: true };
            })
            .addCase(deleteEntry.fulfilled, (state, action) => {
                const { payload } = action;
                return {
                    ...state,
                    appLoading: false,
                    errorToast: {
                        ...state.errorToast,
                        show:
                            payload.acknowledged && payload.deletedCount === 1
                                ? false
                                : true,
                        message:
                            payload.acknowledged && payload.deletedCount === 1
                                ? ""
                                : "Delete unsuccessful",
                    },
                    successToast: {
                        show:
                            payload.acknowledged && payload.deletedCount
                                ? true
                                : false,
                        message:
                            payload.acknowledged && payload.deletedCount === 1
                                ? "Delete successful"
                                : "",
                    },
                };
            })
            .addCase(deleteEntry.rejected, (state, action) => {
                return {
                    ...state,
                    appLoading: false,
                };
            });
    },
});

//Helpers
const validateNullValues = (payload) => {
    const newState = {};
    for (const key in payload) {
        if (payload[key]) {
            newState[key] = payload[key];
        }
    }
    return newState;
};

export const {
    onChangeState,
    onSubmitAdmin,
    onResetAllState,
    onSubmitGuard,
    onSubmitOwner,
    onSubmitVehicle,
    onResetAdminState,
    onResetGuardState,
    onResetOwnerState,
    onResetVehicleState,
    onSetReportDate,
} = appSlice.actions;

export default appSlice.reducer;
