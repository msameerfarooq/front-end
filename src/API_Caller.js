import axios from "axios";

function GetAllHotels() {
  return axios({ method: "GET", url: "http://msameerfarooq.pythonanywhere.com/myapp/Hotel/" });
}

function GetCountries() {
  return axios({ method: "GET", url: "http://msameerfarooq.pythonanywhere.com/myapp/Country/" });
}

function GetCountryDetails(cID) {
  return axios({
    method: "POST",
    url: "http://msameerfarooq.pythonanywhere.com/myapp/Country/",
    data: { countID: cID },
  });
}

function GetHotelDetails(hotelID, countryID) {
  return axios({
    method: "POST",
    url: "http://msameerfarooq.pythonanywhere.com/myapp/Hotel/",
    data: { countID: countryID, HotelID: hotelID },
  });
}

function GetAllRooms(HotelID_) {
  return axios({
    method: "POST",
    url: "http://msameerfarooq.pythonanywhere.com/myapp/Room/",
    data: { HotelID: HotelID_ },
  });
}

function GetRoomDetails(Room_ID, Hotel_ID) {
  return axios({
    method: "POST",
    url: "http://msameerfarooq.pythonanywhere.com/myapp/Room/",
    data: { RoomID: Room_ID, HotelID: Hotel_ID },
  });
}

function GetBookingDetails(roomID) {
  return axios({
    method: "POST",
    url: "http://msameerfarooq.pythonanywhere.com/myapp/Booking/",
    data: { RoomID: roomID, flag: 1 },
  });
}

async function addBooking(roomID, sDate, name, CNIC, ContactNo) {
  let d1 = {
    RoomID: roomID,
    SDate: sDate,
    pName: name,
    Cnic: CNIC,
    C_No: ContactNo,
    flag: 1,
  };
  return axios({
    method: "PUT",
    url: "http://msameerfarooq.pythonanywhere.com/myapp/Booking/",
    data: d1,
  });
}

function deleteBooking(roomID, sDate) {
  let d1 = {
    RoomID: roomID,
    SDate: sDate,
    flag: 0,
  };
  return axios({
    method: "PUT",
    url: "http://msameerfarooq.pythonanywhere.com/myapp/Booking/",
    data: d1,
  });
}

export {
  GetAllHotels,
  GetRoomDetails,
  GetCountries,
  GetHotelDetails,
  GetBookingDetails,
  GetAllRooms,
  GetCountryDetails,
  addBooking,
  deleteBooking,
};
