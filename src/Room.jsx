import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import HotelDetails from "./HotelDetails";
import axios from "axios";
import "./Room.css";

import {
  GetAllHotels,
  GetRoomDetails,
  GetHotelDetails,
  GetBookingDetails,
  GetCountryDetails,
  deleteBooking,
  addBooking,
} from "./API_Caller";
//Show all hotels summary
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RoomDet: [],
      bookingDetails: [],
      HotelDetails: [],
      CountryDetails: [],
      bookingSummary: [],
      room_Number: props.location.state.roomNumber,
      HotelID: props.location.state.hotelID,
      CountryID: props.location.state.countryID,
      RoomID: props.location.state.roomID,
      room_Number: props.location.state.roomNumber,
      P: props,
      MonthDifference: 0,
      YearDifference: 0,
      TotalDays: 0,
      initialBookings: [],
      todayDate: new Date().getDate(),
      imageClass:
        " " + props.location.state.hotelID == 1
          ? " pic1 "
          : props.location.state.hotelID == 2
          ? "pic2 "
          : props.location.state.hotelID == 3
          ? " pic3 "
          : props.location.state.hotelID == 4
          ? " pic4"
          : "",
    };
  }
  getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
  };
  render() {
    return (
      <div>
        <div class="Title">{this.state.HotelDetails.HotelName}</div>
        <hr />
        <div class="Address">
          {this.state.HotelDetails.Address},{" "}
          {this.state.CountryDetails.Country_Name}
        </div>
        <div class="Front">
          <div>
            <div class="container">
              <div class={" displayPIC " + this.state.imageClass}></div>
              <div class="overlay">
                <h1 class="RoomNumber">Room # {this.state.room_Number}</h1>
                <div>
                  <h3>{this.state.RoomDet.BookingPrice}$ / night</h3>
                  <div>
                    <p>Total Beds = {this.state.RoomDet.BedCount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="Hotel_Perks">
              {" "}
              <div class="eachFacility">
                {this.state.HotelDetails.FreeWifi && (
                  <p class="TickIcon">&#9989;</p>
                )}
                {!this.state.HotelDetails.FreeWifi && (
                  <p class="CrossIcon">&#10060;</p>
                )}
                <p>Free Wifi</p>
              </div>
              <div class="eachFacility">
                {this.state.RoomDet.AirConditioned && (
                  <p class="TickIcon">&#9989;</p>
                )}
                {!this.state.RoomDet.AirConditioned && (
                  <p class="CrossIcon">&#10060;</p>
                )}
                <p>Air Conditioned</p>
              </div>
              <div class="eachFacility">
                {this.state.RoomDet.Furnished && (
                  <p class="TickIcon">&#9989;</p>
                )}
                {!this.state.RoomDet.Furnished && (
                  <p class="CrossIcon">&#10060;</p>
                )}
                <p>Furnished</p>
              </div>
              <div class="eachFacility">
                {this.state.HotelDetails.Bar && <p class="TickIcon">&#9989;</p>}
                {!this.state.HotelDetails.Bar && (
                  <p class="CrossIcon">&#10060;</p>
                )}
                <p>Free Bar</p>
              </div>
              <div class="eachFacility">
                {this.state.HotelDetails.FitnessCenter && (
                  <p class="TickIcon">&#9989;</p>
                )}
                {!this.state.HotelDetails.FitnessCenter && (
                  <p class="CrossIcon">&#10060;</p>
                )}
                <p>FitnessCenter</p>
              </div>{" "}
              <div class="eachFacility">
                {this.state.RoomDet.SmokingAllow && (
                  <p class="TickIcon">&#9989;</p>
                )}
                {!this.state.RoomDet.SmokingAllow && (
                  <p class="CrossIcon">&#10060;</p>
                )}
                <p>Smoking Allowed</p>
              </div>
            </div>
          </div>
        </div>
        <div class="BoxList">
          <form>
            {this.state.bookingSummary.map((obj, id) => {
              return (
                <button
                  disabled
                  className={
                    "Box " +
                    (this.state.todayDate > id
                      ? " PastDays "
                      : " ComingDays ") +
                    (obj ? " Booked " : " unBooked ") +
                    (this.state.todayDate > id ? " PastDays" : " ComingDays") +
                    (obj ? "Booked" : "unBooked")
                  }
                >
                  {id + 1}

                  {this.state.todayDate <= id && obj == 0 && (
                    <input
                      onClick={() => {
                        this.setState({
                          bookingSummary: [
                            ...this.state.bookingSummary.slice(0, id),
                            this.state.bookingSummary[id] == 1 ? 0 : 1,
                            ...this.state.bookingSummary.slice(id + 1),
                          ],
                        });
                      }}
                      type="checkbox"
                    ></input>
                  )}
                  {this.state.todayDate <= id && obj == 1 && (
                    <input
                      onClick={() => {
                        this.setState({
                          bookingSummary: [
                            ...this.state.bookingSummary.slice(0, id),
                            this.state.bookingSummary[id] == 1 ? 0 : 1,
                            ...this.state.bookingSummary.slice(id + 1),
                          ],
                        });
                      }}
                      type="checkbox"
                      checked={obj}
                    ></input>
                  )}
                </button>
              );
            })}
            <br />
            <Link to="/">
              <button
                class="DoneButton"
                onClick={() => {
                  this.saveBookings();
                }}
              >
                DONE!
              </button>
            </Link>
          </form>
          {/* document.getElementById('idOfElement').classList.add('newClassName'); */}
        </div>
      </div>
    );
  }

  async saveBookings() {
    var tempArray = [this.state.TotalDays];
    this.state.initialBookings.map((obj, id) => {
      if (obj != this.state.bookingSummary[id]) {
        let startingDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          id + 2
        )
          .toJSON()
          .slice(0, 10);
        if (obj == 1) {
          deleteBooking(this.state.RoomDet.RoomID, startingDate);
        } else {
          let name = this.state.bookingDetails[0].PersonName;
          let cnic_ = this.state.bookingDetails[0].CNIC;
          let cNO = this.state.bookingDetails[0].ContactNo;

          addBooking(this.state.RoomDet.RoomID, startingDate, name, cnic_, cNO);
        }
      }
    });

    alert("Saved");

    //return <Route to="/"></Route>;
  }

  getBookingSummary(totalDays) {
    var tempArray = [];
    for (var i = 1; i <= totalDays; i++) {
      tempArray.push(0);
    }
    this.state.bookingDetails.map((obj, id) => {
      tempArray[new Date(obj.StartDate).getDate() - 1] = 1;
    });

    this.setState({ bookingSummary: tempArray, initialBookings: tempArray });
  }
  componentDidMount() {
    this.fetchAllDetails();
  }

  updateBookingSummary(reqMonth, reqYear) {
    let currDate = new Date();
    let daysInMoth = new Date(
      currDate.getFullYear() + reqYear,
      currDate.getMonth() + reqMonth + 1,
      0
    ).getDate();
    this.setState({
      TotalDays: daysInMoth,
      bookingSummary: new Array(daysInMoth),
    });
    return daysInMoth;
  }

  fetchAllDetails() {

    GetCountryDetails(this.state.CountryID).then((countryResponse) => {
      this.setState({ CountryDetails: countryResponse.data[0] });
      GetHotelDetails(this.state.HotelID, this.state.CountryID).then(
        (hotelResponse) => {
          this.setState({ HotelDetails: hotelResponse.data[0] });
          GetRoomDetails(this.state.RoomID, this.state.HotelID).then(
            (roomResponse) => {
              this.setState({ RoomDet: roomResponse.data[0] });
              GetBookingDetails(this.state.RoomID).then((bookingResponse) => {
                this.setState({ bookingDetails: bookingResponse.data });
                this.getBookingSummary(
                  this.updateBookingSummary(
                    this.state.MonthDifference,
                    this.state.YearDifference
                  )
                );
              });
            }
          );
        }
      );
    });
    return [];
  }
}

export default Room;
