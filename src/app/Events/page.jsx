"use client"

import React, { useState, useRef } from "react";
import "./D.css";
import { useEffect } from "react";
import Form from "../RegiForms/Form";
import Header from '../../components/Header'
import { useAuth } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToTopButton from "../../components/GoToTop/Go";

const CustomButton = ({ onClick, buttonText, form }) => (
  <button onClick={() => onClick(form)} className="button-wrapper">
    <div className="back">
      <div className="button_base b03_skewed_slide_in rounded-md">
        <div>{buttonText}</div>
        <div></div>
        <div>{buttonText}</div>
      </div>
    </div>
  </button>
);

const GoogleDocButton = ({ googleDocLink }) => (
  <a href={googleDocLink} target="_blank" rel="noopener noreferrer">
    <button className="button-wrapper mt-2 pr-14">
      <div className="back">
        <div className="button_base b03_skewed_slide_in rounded-md">
          <div>Event Brochure</div>
          <div></div>
          <div>Event Brochure</div>
        </div>
      </div>
    </button>
  </a>
);

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState({});
  const [selectedHeading, setSelectedHeading] = useState("Management & Analytics");
  const [events, setEvents] = useState([]);
  const { userId } = useAuth();
  const [eventsByHeadings,setEventbyHeading] =useState({
    "Management & Analytics":[],
    "Igniting Minds": [],
    "Software & Electronics": [],
    "Construction & Design": [],
    "School Events":[],
    "E-Sports & Gaming":[],
    "Robotics & Automation": [],
  })

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }
  };

  const openForm = (form) => {
    if (userId) {
      setSelectedForm(form);
      setShowForm(true);
      document.body.style.overflow = "hidden";
    } else {
      toast.error("Please sign-in first!!");
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedForm(null);
    document.body.style.overflow = "auto";
  };

  const renderForm = () => {
    return selectedForm;
  };



  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/getEvents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'event-type': 1,
          'category': actualHeadings[selectedHeading]
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const eventsData = await response.json();
      console.log(eventsData);
      setEvents(eventsData);
      setEventbyHeading(prevState => ({
        ...prevState,
        [selectedHeading]: eventsData.events
      }));
      setLoading(false); // Set loading to false after events are fetched
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  }

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await fetch("/api/getProfile", {
          method: "GET",
        });

        if (res.status === 200) {
          const data = await res.json();
          const User = data.user;
          setDbUser(User);
        }
      } catch (error) {
        console.log("Error ", error);
      }
    };

    checkProfile();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [selectedHeading]); // Fetch events whenever the selected heading changes




  const actualHeadings = {
    "Management & Analytics": "MA",
    "Igniting Minds": "IM",
    "Software & Electronics": "SE",
    "Construction & Design": "CD",
    "School Events": "School",
    "E-Sports & Gaming": "Gaming",
    "Robotics & Automation": "AR",
  }

  const headings = [
    "Management & Analytics",
    "Igniting Minds",
    "Software & Electronics",
    "Construction & Design",
    "School Events",
    "E-Sports & Gaming",
    "Robotics & Automation",
  ];

  const handleHeadingClick = (heading) => {
    setLoading(true); // Set loading to true when a new heading is clicked
    setSelectedHeading(heading);
  };

  return (
    <div className="" >
      <ToastContainer />
      <Header show={true} />
      <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-lg relative">
        {showForm && (
          <div className="fixed top-0 left-0 pt-20 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-95 z-50 overflow-y-auto">
            <div className="max-w-md w-full bg-transparent p-8 rounded-md shadow-lg">
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-white hover:text-gray-800"
              >
                <svg
                  className="w-8 h-8 mr-6 mt-8 backdrop:blur-md"
                  fill="black"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              {renderForm()}
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-black font-medium pt-3 pb-3">
        <h1 className="mt-4 mb-3 text-4xl">Events</h1>
        <section className="bg-transparent">
          <div className="container px-6 py-6 mx-auto relative">
            <button
              className="text-lg text-gray-600 dark:text-gray-400 focus:outline-none absolute left-0 top-1/2 transform -translate-y-1/2"
              onClick={scrollLeft}
            >
              <svg
                className="w-10 h-10 pr-4 pt-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="text-lg text-gray-600 dark:text-gray-400 focus:outline-none absolute right-0 top-1/2 transform -translate-y-1/2"
              onClick={scrollRight}
            >
              <svg
                className="w-10 h-10 pl-4 pt-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="py-4 mt-4 overflow-hidden md:justify-center dark:border-gray-700">
              <div className="flex items-center justify-center relative">
                <div
                  className="overflow-hidden"
                  style={{ scrollbarWidth: "none" }}
                  ref={sliderRef}
                >
                  <div className="flex space-x-4">
                    {headings.map((heading, index) => (
                      <button
                        className={`relative ${
                          selectedHeading === heading
                            ? "border-b-2 gap-1 text-lg border-blue-500"
                            : ""
                        }`}
                        key={index}
                        onClick={() => handleHeadingClick(heading)}
                      >
                        {heading}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <h2 className="mt-10 mb-6 text-3xl">{selectedHeading}</h2>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid mt-24 mb-10 p-2 ml-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
            {eventsByHeadings[selectedHeading] &&
              eventsByHeadings[selectedHeading].map((card, index) => (
                <div key={index} className="">
                  <div className="yoda">
                    <img
                      className="front-image"
                      src={card.img2}
                      alt="Front Image"
                    />
                    <img
                      className="bg-image"
                      src={card.img3}
                      alt="Background Image"
                    />
                  </div>
                  <p className="text-black text-center mr-4 font-semibold text-3xl mt-5 mb-2">
                    {card.evename}
                  </p>
                  <p className="text-black text-center text-sm mr-10 mt-5 mb-4">
                    {card.desp}
                  </p>
                  <p className="text-black text-center font-semibold text-lg mt-5 mb-4">
                    {card.date}
                  </p>
                  <div className="flex flex-row justify-between">
                    <CustomButton
                      onClick={openForm}
                      buttonText="Register"
                      form={
                        <Form
                          eventname={card.evename}
                          user={dbUser}
                          participantcount={card.participantcount}
                          category={card.category}
                          id={card._id}
                        />
                      }
                    />
                    <GoogleDocButton googleDocLink={card.pdf} />
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>
      <footer className="bg-white bg-opacity-50">
        <div className="container flex flex-col items-center justify-between px-6 py-2 mx-auto lg:flex-row">
          <a href="/">
            <img className="w-28 h-18 md:w-32 md:h-22" src="/images/axislogo.png" alt="" />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 lg:gap-6 lg:mt-0">
            <a href="/" className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
              Overview
            </a>
            <a href="/" className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
              Features
            </a>
            <a href="/" className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
              Pricing
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500 lg:mt-0 dark:text-gray-400">© Copyright 2024. All Rights Reserved.</p>
        </div>
        <GoToTopButton />
      </footer>
    </div>
  );
};

export default Home;
