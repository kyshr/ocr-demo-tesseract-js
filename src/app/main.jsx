import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import { useSelector } from "react-redux";
import Sample from "./pages/sample/sample";

const Main = () => {
    const { successToast, errorToast } = useSelector((state) => state.appState);

    return (
        <div className="font-poppins relative">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/sample" element={<Sample />} />
                {/* <Route
                    exact
                    path="/admin/generate-report"
                    element={
                        <PrivateRoute redirect={"/admin"}>
                            <ActivitiesDoc />
                        </PrivateRoute>
                    }
                /> */}
            </Routes>
        </div>
    );
};

export default Main;
