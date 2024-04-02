"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";

import Icon from "/public/icon.png";
import Date from "@/components/Date";
export default function Home() {
  const [pray, setPray] = useState([]);
  const [day, setDay] = useState([]);
  const [weekday, setWeekday] = useState([]);
  const [month, setMonth] = useState([]);
  const [yearH, setYearH] = useState([]);
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const success = (pos) => {
      const coords = pos.coords;
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    const axios = require("axios");
    axios
      .get("http://api.aladhan.com/v1/timings", {
        params: {
          latitude: position.latitude,
          longitude: position.longitude,
          method: 8,
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data.data.timings;
        const day = response.data.data.date.hijri.day;
        const weekday = response.data.data.date.hijri.weekday;
        const month = response.data.data.date.hijri.month;
        const yearH = response.data.data.date.hijri.year;
        return (
          setPray(data),
          setDay(day),
          setWeekday(weekday),
          setMonth(month),
          setYearH(yearH)
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [position]);
  return (
    <div className="container mx-auto flex justify-center items-center h-svh flex-col">
      <Image src={Icon} alt="icon" width="100" height="100" />
      <h1 className="text-white text-4xl mt-2">مواقيت الصلاه</h1>
      <div className="flex justify-between flex-row gap-2">
        <Card name="الفجر" time={pray.Fajr} />
        <Card name="الشروق" time={pray.Sunrise} />
        <Card name="الظهر" time={pray.Dhuhr} />
        <Card name="العصر" time={pray.Asr} />
        <Card name="المغرب" time={pray.Maghrib} />
        <Card name="العشاء" time={pray.Isha} />
      </div>
      <div>
        <span className="text-white text-2xl flex justify-center gap-2 mt-2">
          <span>{weekday.ar}</span>
          <span>{day}</span>
          <span>{month.ar}</span>
          <span>{yearH}</span>
        </span>
      </div>
    </div>
  );
}
