import {dashboardPath} from "../tsx/pages/Dashboard";
import {purchasesPath} from "../tsx/pages/AddPurchases";
import {ticketPath} from "../tsx/pages/AddTicket";
import {categoriesPath} from "../tsx/pages/Categories";
import {calendarPath} from "../tsx/pages/Calendar/Calendar";
import {calendarUserPath} from "../tsx/pages/CalendarUser";

const headerLinks = [{
    name: "Dashboard",
    url: dashboardPath,
    isAuth: true
}, {
    name: "Calendar",
    url: calendarPath,
    isAuth: true
}, {
    name: "Add purchase",
    url: purchasesPath,
    isAuth: true
}, {
    name: "Add ticket",
    url: ticketPath,
    isAuth: true
}, {
    name: "Categories",
    url: categoriesPath,
    isAuth: true
}, {
    name: "Calendar Users",
    url: calendarUserPath,
    isAuth: true
},]
export default headerLinks;