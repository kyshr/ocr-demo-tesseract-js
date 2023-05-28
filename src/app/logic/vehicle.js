import { api } from "../logic/axios";

export const FetchVehicles = async (token) => {
    try {
        const res = await api.get(`/vehicles?populate=["vehicle_owner"]`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return res.data.message;
    }
};

export const FetchVehicle = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.get(
            `/vehicles?where=${where}&populate=["vehicle_owner"]`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data.message;
    } catch (error) {
        return res.data.message;
    }
};

export const FetchVehicleByOwner = async (token, where) => {
    try {
        const res = await api.get(
            `/vehicles?where=${where}&populate=["vehicle_owner"]`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data.message;
    } catch (error) {
        return res.data.message;
    }
};

export const CreateVehicle = async (token, data) => {
    try {
        const res = await api.post(
            "/vehicles",
            { data: data },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};
export const UpdateVehicle = async (token, id, data) => {
    try {
        const res = await api.put(
            "/vehicles",
            {
                data: {
                    query: {
                        _id: id,
                    },
                    data: data,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const DeleteVehicle = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.delete(`/vehicles?where=${where}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};
