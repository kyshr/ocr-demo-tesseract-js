import { api } from "../logic/axios";
import { FetchVehicleByOwner } from "./vehicle";

export const FetchActivities = async (token, where) => {
    try {
        const filter = JSON.stringify(where);
        const res = await api.get(`/activities?where=${filter}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};

export const FetchActivitiesByOwner = async (token, ownerId, dateOfEntry) => {
    try {
        const whereVehicle = JSON.stringify({ vehicle_owner: ownerId });
        const vehicles = await FetchVehicleByOwner(token, whereVehicle);

        if (vehicles.length) {
            let vehicleIds = [];
            vehicles.forEach((vehicle, index) => {
                vehicleIds.push(vehicle._id);
            });

            const whereActivities = JSON.stringify({
                vehicle_id: vehicleIds,
                date_of_entry: dateOfEntry,
            });
            const activities = await api.get(
                `/activities?where=${whereActivities}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return activities.data.message;
        }
        return vehicles.data.message;
    } catch (error) {
        return error.response.data.message;
    }
};
