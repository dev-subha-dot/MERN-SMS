// Components/Layout/MainLayout.jsx
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-lg-auto bg-light">
                        <div className="sidebar">
                            <Sidebar />
                        </div>
                    </div>
                    <main className="col-md-9 col-lg px-4">
                        <div className="content">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default MainLayout;
