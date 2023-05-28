import { api } from "../logic/axios";

export const FetchOwners = async (token) => {
    try {
        const res = await api.get("/owners", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const FetchOwner = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.get(`/owners?where=${where}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const CreateOwner = async (token, data) => {
    try {
        const res = await api.post(
            "/owners",
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
export const UpdateOwner = async (token, id, data) => {
    try {
        const res = await api.put(
            "/owners",
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

export const DeleteOwner = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.delete(`/owners?where=${where}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};
