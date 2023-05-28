import { api } from "../logic/axios";

export const GuardLogin = async (creds) => {
    try {
        const res = await api.post("/guards/login", {
            data: {
                email: creds.guard_mail,
                password: creds.guard_password,
            },
        });
        if (res.data.message.success) {
            console.log(res.data.message.permission);
            localStorage.setItem(
                "guard_access_token",
                res.data.message.access_token
            );
            return { access_token: res.data.message.access_token };
        }
    } catch (error) {
        console.log(error.response.data.message);
        return { access_token: null };
    }
};

export const FetchGuards = async (token) => {
    try {
        const res = await api.get("/guards", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const FetchGuard = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.get(`/guards?where=${where}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const CreateGuard = async (token, data) => {
    try {
        const res = await api.post(
            "/guards",
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
export const UpdateGuard = async (token, id, data) => {
    try {
        const res = await api.put(
            "/guards",
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

export const DeleteGuard = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.delete(`/guards?where=${where}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};
