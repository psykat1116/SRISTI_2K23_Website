"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import stick from "/public/Images/toppng.com-elder-wand1-harry-potter-wand-draw-transparent-635x50.png";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { EventList } from "@/app/assets/EventDetails";
// import ruleBg from "/public/Images/Untitled-2.png";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
export type eventCoordinatorSchema = {
  name: String;
  imgSrc: string;
  position: String;
  phone: String;
  dept: String;
  year: String;
  email: String;
  isReverse: boolean;
};
export type EventData = {
  id: number;
  category: String;
  rules: String[];
  name: String;
  eventCoordinators: eventCoordinatorSchema[];
  videoSrc: string;
  venue: String;
  time: String;
  register: String;
  leaderboard: string;
  prizes: number[];
};

const Page = () => {
  const router = useRouter();
  const { eventname } = useParams();
  const [eventData, setEventData] = useState<EventData | undefined>(undefined);
  const findEvent = () => {
    const event = EventList.find((items) => items.category === eventname);
    if (event !== undefined) {
      setEventData(event);
    }
  };

  useEffect(() => {
    findEvent();
  }, []);
  const eventStartTime = new Date("Oct 3, 2023 12:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  setInterval(() => {
    let now = new Date().getTime();
    let timeLeft = eventStartTime - now;
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    setTimeLeft({ days, hours, minutes, seconds });
  }, 1000);

  function handleSubmit() {
    router.push("/registration");
  }

  return (
    <>
      <Image
        alt="bg"
        priority
        src="/Images/events-bg.jpg"
        width={1000}
        height={1000}
        className="-z-10 fixed inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="min-h-screen">
        <div className="relative min-h-screen p-3 sm:p-10 flex justify-start items-center flex-col bg-center bg-cover bg-no-repeat">
          <div className=" flex flex-col items-center mb-4">
            <div className="font-griffy capitalize text-4xl sm:text-6xl text-white mt-20  sm:mt-12 pb-2">
              {eventData?.category}
            </div>
            <Image
              src={stick}
              alt="stick"
              className="max-sm:w-[15rem] w-[24rem] my-[-8px]"
              draggable={false}
            />
          </div>
          <div className="relative my-[2rem] flex justify-between items-center p-[2rem] sm:bg-[rgba(0,0,0,0.4)] sm:backdrop-blur-[5px] rounded-[7px] w-[90%] max-[640px]:flex-col max-[640px]:w-[100%] max-[640px]:p-1 max-[640px]:justify-start">
            <div className="relative flex items-center max-[640px]:h-[10rem] max-[640px]:mb-[30px]">
              <video controls className="w-[30rem] relative">
                <source src={"/Video/video.mp4"} type="video/mp4" />
              </video>
            </div>
            <div className="relative min-h-[25rem] bg-rule-bg bg-no-repeat bg-cover bg-center w-[55%] min-w-[45%] flex flex-col items-center justify-start max-[640px]:w-[100%] max-[640px]:min-h-[20rem] py-2">
              <div className="font-griffy text-[2.4rem] text-white tracking-widest max-[640px]:text-[1.5rem] ">
                Rules
              </div>
              <Image
                src={stick}
                alt="stick"
                className="w-[5rem] my-[-7px] pb-2"
                draggable={false}
              />
              <ol className="w-[95%] text-[#d4d4d4] text-sm ">
                {eventData?.rules.map((items, i) => {
                  return (
                    <li className="py-1 text-sm sm:text-lg" key={i}>
                      {i + 1}) {items}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
        <div className=" min-h-screen p-4 sm:p-10 flex justify-center items-center flex-col bg-center bg-cover bg-no-repeat">
          <div className=" flex flex-col items-center">
            <div className="font-griffy capitalize text-4xl sm:text-5xl text-white  pb-2">
              Event Leaders
            </div>
            <Image
              src={stick}
              alt="stick"
              className="max-sm:w-[18rem] w-[24rem] my-[-8px] object-cover"
              draggable={false}
            />
          </div>
          <div className="my-[2rem] flex flex-col justify-center items-center w-[80%] max-[640px]:w-[90%]">
            {eventData?.eventCoordinators.map((items, i) => {
              return (
                <>
                  <div
                    className={`flex justify-between items-center w-[100%] ${
                      items.isReverse ? "flex-row-reverse" : ""
                    } mb-5 max-[640px]:flex-col`}
                    key={i}
                  >
                    <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden flex justify-center items-center  max-[640px]:w-[100px] max-[640px]:h-[100px] max-[640px]:mb-[1.2rem]">
                      <Image
                        src={items.imgSrc}
                        alt="leader"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="leader-details bg-[rgba(0,0,0,0.4)] w-[80%] ml-[10px] min-h-[120px] rounded-[10px] backdrop-blur-[10px] p-3 max-[640px]:w-full">
                      <div className="text-white font-poppins px-4 sm:mx-24 py-2 sm:w-[60%]">
                        <h1 className="capitalize text-lg sm:text-2xl  ">
                          {items.name}
                        </h1>
                        <h1 className=" capitalize text-end sm:text-center text-sm md:text-[16px]">
                          ~ {items.year} Year, {items.dept} dept.
                        </h1>
                        <h1 className=" capitalize text-start">
                          {items.position}
                        </h1>
                        <h1> {items.phone}</h1>
                        <h1>{items.email}</h1>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="event-timing min-h-[60vh] flex flex-col items-center justify-start w-full text-white p-4 sm:p-10 bg-center bg-cover bg-no-repeat">
          <h2 className="text-[3rem] font-griffy max-[640px]:text-2xl max-[280px]:text-[1rem] py-4 capitalize">
            Venue: {eventData?.venue}
          </h2>

          <div className="timer flex w-[50rem] justify-between sm:my-[3rem] items-center font-griffy max-[640px]:w-[90%]">
            <div className="days bg-[rgba(0,0,0,0.4)] w-16 sm:w-36 sm:h-32 flex flex-col h-16 p-2 items-center backdrop-blur-[10px]">
              <p className="text-7xl max-[640px]:text-xl">{timeLeft.days}</p>
              <span className="text-[24px] max-[640px]:text-[12px]">Days</span>
            </div>
            <div className="days bg-[rgba(0,0,0,0.4)] w-16 sm:w-36 sm:h-32 flex flex-col h-16 p-2 items-center backdrop-blur-[10px]">
              <p className="text-7xl max-[640px]:text-xl"> {timeLeft.hours}</p>
              <span className="text-[24px] max-[640px]:text-[12px]">Hours</span>
            </div>
            <div className="days bg-[rgba(0,0,0,0.4)] w-16 sm:w-36 sm:h-32 flex flex-col h-16 p-2 items-center backdrop-blur-[10px]">
              <p className="text-7xl max-[640px]:text-xl">{timeLeft.minutes}</p>
              <span className="text-[24px] max-[640px]:text-[12px]">
                Minutes
              </span>
            </div>
            <div className="days bg-[rgba(0,0,0,0.4)] w-16 sm:w-36 sm:h-32 flex flex-col h-16 p-2 items-center backdrop-blur-[10px]">
              <p className="text-7xl max-[640px]:text-xl">{timeLeft.seconds}</p>
              <span className="text-[24px] max-[640px]:text-[12px]">
                Seconds
              </span>
            </div>
          </div>
          <div className="actions flex justify-between w-[30rem] max-[640px]:w-[20rem] max-[280px]:w-[15rem]">
            <button
              className="py-[7px] px-[15px] max-[640px]:py-[4px] max-[640px]:px-[8px] max-[640px]:text-[1rem] bg-rule-bg bg-center bg-cover bg-no-repeat text-white font-griffy text-[1.5rem] tracking-wider"
              onClick={handleSubmit}
            >
              Register Now
            </button>
            <Link href={eventData ? eventData.leaderboard : "/"}>
              <button className="py-[7px] px-[15px] max-[640px]:py-[4px] max-[640px]:px-[8px] max-[640px]:text-[1rem] bg-rule-bg bg-center bg-cover bg-no-repeat text-white font-griffy text-[1.5rem] tracking-wider">
                Leader Board
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
