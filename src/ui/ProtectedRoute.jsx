import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  //1.load the authnticated user
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  //2. if there is no authenticated user , re-direct to the /login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  //3.While loading , show a spinner
  if (isLoading)
    return (
      <FullPage>
        {" "}
        <Spinner />{" "}
      </FullPage>
    );
  //4.if there is a user render the app
  if (isAuthenticated) return children;
}
