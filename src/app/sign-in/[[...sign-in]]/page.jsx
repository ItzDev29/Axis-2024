"use client";

import { SignIn, SignedOut, RedirectToSignUp } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import "./global.css";
import styled from "styled-components";
import { dark } from "@clerk/themes";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const StyledDiv = styled.div`
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default function Page() {
  return (
    <>
      <section>
        {" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>
      </section>

      <div className="signin">
        <div className="content">
          <div className="flex justify-center py-24">
            <ClerkLoading>
              <div>Clerk is loading</div>
            </ClerkLoading>
            <ClerkLoaded>
              <StyledDiv>
                <SignIn appearance={dark} />
              </StyledDiv>
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </>
  );
}
