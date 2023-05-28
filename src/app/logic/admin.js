import { api } from "../logic/axios";

export const AdminLogin = async (creds) => {
    try {
        const res = await api.post("/admins/login", {
            data: {
                email: creds.admin_mail,
                password: creds.admin_password,
            },
        });
        if (res.data.message.success) {
            console.log(res.data.message.permission);
            localStorage.setItem("access_token", res.data.message.access_token);
            localStorage.setItem(
                "admin_permission",
                res.data.message.permission
            );
            return { access_token: res.data.message.access_token };
        }
    } catch (error) {
        console.log(error.response.data.message);
        return { access_token: null };
    }
};

export const FetchAdmins = async (token) => {
    try {
        const res = await api.get("/admins", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const FetchAdmin = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.get(`/admins?where=${where}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const DeleteAdmin = async (token, id) => {
    try {
        const where = JSON.stringify({ _id: id });
        const res = await api.delete(`/admins?where=${where}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const CreateAdmin = async (token, data) => {
    try {
        const res = await api.post(
            "/admins",
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

export const UpdateAdmin = async (token, id, data) => {
    try {
        const res = await api.put(
            "/admins",
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
