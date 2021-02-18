"use strict";

const dateNumEl = document.querySelector(".js-number");
const dateNameEl = document.querySelector(".js-day");
const dateMonthYearEl = document.querySelector(".js-month-year");

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const date = new Date();
const dayNumber = date.getDate();
const day = days[date.getDay()];
const month = months[date.getMonth()];
const year = date.getFullYear();

const appDate = { date, dayNumber, day, month, year };

document.appDate = appDate;

dateNumEl.innerHTML = appDate.dayNumber;
dateNameEl.innerHTML = appDate.day;
dateMonthYearEl.innerHTML = `${appDate.month}, ${appDate.year}`;
