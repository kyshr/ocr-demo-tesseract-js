import { api } from "../logic/axios";

export const ValidateToken = async (token) => {
    try {
        const res = await api.get("/jwt", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};
