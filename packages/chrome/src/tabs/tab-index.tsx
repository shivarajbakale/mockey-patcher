import React, { useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "../style.css";
import { Header } from "@/components/atoms/header/header";
import { useRequestsStore } from "@/devtool-panels/api-tracker/store/requests";
import { MockedRequests } from "./components/MockedRequests";
import { Button } from "@/components/atoms/button/button";
import { EditMock } from "./components/EditMock";
import { Toaster } from "@/components/atoms/sonner/sonner";

function TabIndex() {
  const { getMockedRequests } = useRequestsStore();

  useEffect(() => {
    try {
      getMockedRequests();
    } catch (error) {
      console.error("Error fetching mocked requests:", error);
    }
  }, [getMockedRequests]);

  return (
    <HashRouter>
      <Toaster />
      <div className="flex flex-col h-full">
        <Header />
        <div className="container mt-4">
          <div className="flex gap-4 mb-4">
            <Link to="/">
              <Button variant="outline">Mocked Requests</Button>
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<MockedRequests />} />
            <Route path="/edit/:id" element={<EditMock />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default TabIndex;
