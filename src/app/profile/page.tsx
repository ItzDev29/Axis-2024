"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Header from "../../components/Header";
import redirect from "next/navigation";
import styles from "./profilepage.module.css";
import Navbar from "../../components/Navbar";
import Editpbut from "../../components/Editpbut";
import CompleteProfile from "../../components/CompleteProfile";
import "./global.css";
import { NextApiRequest } from "next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import React, { useState, useEffect } from "react";
// import Router from "next/router";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Leader = ({ user }: any) => (
  <div>
    {/*<!-- Header -->*/}
    <div>
      {/* <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}> */}
      {/*<!-- Mask -->*/}
      <span className="mask bg-gradient-default opacity-8"></span>
      {/*<!-- Header container -->*/}
      <div className="container-fluid d-flex align-items-center">
        <div className="row">
          <div className="col-lg-7 col-md-10">
            <br />
            <br />
            <h1 className="display-2 text-white ">
              Hello {user && (user.fullName ? user.fullName : "User")}
            </h1>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PageContent = (props: any) => {
  const { user, check, email, events, loading, dbUser } = props;

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div className="card card-profile shadow">
              <div className="row justify-content-center">
                <div className="col-lg-3 order-lg-2">
                  <div className="card-profile-image">
                    <a href="#">
                      <Image
                        alt="."
                        src={user ? user.imageUrl : "/images/def.png"}
                        className="rounded-circle"
                        width={150}
                        height={150}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="row">
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3>
                    {user && (user.fullName != "" ? user.fullName : "User")}
                    <span className="font-weight-light"></span>
                  </h3>
                  {/* <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2"></i>
                </div> */}
                  {/* <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                </div> */}
                  <div>
                    <i className="ni education_hat mr-2"></i>
                  </div>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">My account</h3>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 text-md-right text-center mt-3 mt-md-0">
                  {email &&
                    (check == 1 ? (
                      <Editpbut email={email} user={dbUser} />
                    ) : (
                      <CompleteProfile email={email} user={dbUser} />
                    ))}
                </div>
              </div>
              <div className="card-body">
                <form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            className="form-control form-control-alternative"
                            placeholder="Phone"
                            value={dbUser && dbUser.phone}

                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="input-email"
                            className="form-control form-control-alternative"
                            value={user && user.emailAddresses}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            id="input-first-name"
                            className="form-control form-control-alternative"
                            placeholder="First name"
                            value={
                              dbUser &&
                              (dbUser.firstName ? dbUser.firstName : "")
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            id="input-last-name"
                            className="form-control form-control-alternative"
                            placeholder="Last name"
                            value={
                              dbUser && (dbUser.lastName ? dbUser.lastName : "")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/*<!-- Address -->*/}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <input
                            id="input-address"
                            className="form-control form-control-alternative"
                            placeholder=" Address"
                            value={dbUser && dbUser?.address}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="input-city"
                            className="form-control form-control-alternative"
                            placeholder="City"
                            value={dbUser && dbUser?.city}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            id="input-country"
                            className="form-control form-control-alternative"
                            placeholder="State"
                            value={dbUser && dbUser?.state}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Year of study
                          </label>
                          <input
                            type="number"
                            id="input-postal-code"
                            className="form-control form-control-alternative"
                            placeholder="Year of Study"
                            value={dbUser && dbUser?.yearOfStudy}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Registered Events
                  </h6>

                  <div className="pl-lg-4">
                    <div className="form-group focused">
                      {events && events.length > 0 ? (
                        <ul>
                          {events.map((event: string, index: number) => (
                            <li className="event" key={index}>
                              {event}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div>
                          <p>No registered events</p>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// function getuser(){
//   return user;
// }

export default function Profilepage() {
  // const [data, setData] = useState({});
  const user = useUser().user;
  const [completeProfile, setCompleteProfile] = useState(0);
  const [dbUser, setDbUser] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDataComplete = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !obj[key] && obj[key] !== 0) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await fetch("/api/getProfile", {
          method: "GET",
        });

        if (res.status === 201) {
          setCompleteProfile(1);
        } else if (res.status === 200) {
          const data = await res.json();
          const User = data.user;
          setDbUser(User);
          setEvents(User.events);
          if (isDataComplete(User)) {
            setCompleteProfile(1);
          } else {
            setCompleteProfile(2);
          }
        }
      } catch (error) {
        console.log("Error ", error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, []);

  // const router = useRouter(); // Use useRouter

  useEffect(() => {
    const interval = setInterval(() => {
      if (completeProfile == 2) {
        toast.warning("Please complete your profile", {
          position: "top-right",
          autoClose: 5000, // Close toast after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // router.reload(); // Use router.reload() instead of Router.reload()

      }
    }, 100000);
    // window.location.reload();

    return () => clearInterval(interval);
  }, [completeProfile]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  // const router = useRouter();
  // router.refresh;
  // Router.reload();

  return (
    <>
      <ToastContainer />
      <Header show={false} />
      <div>
        <div className="main-content">
          {/* <Navbar /> */}
          <Leader user={user} />
          <PageContent
            user={user}
            check={completeProfile}
            email={user && user?.emailAddresses[0].emailAddress}
            events={events}
            loading={loading}
            dbUser={dbUser}
          />
        </div>
      </div>
    </>
  );
}
