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
import {
  GetAllHotels,
  GetRoomDetails,
  GetHotelDetails,
  GetAllRooms,
} from "./API_Caller";
import "./HomePage.css";
//Show all hotels summary
class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllRooms: [],
      Hotel_Details: [],
      HotelID: props.location.state.hotelID,
      CountryID: props.location.state.ncountryID,
    };
  }

  render() {

    return (
      <div>
        {" "}
        <div class="Title">{this.state.Hotel_Details.HotelName}</div>
        <hr />
        <div>
          <ul>
            {this.state.AllRooms.map((obj, id) => {
              let hID = this.state.HotelID;
              let cID = this.state.CountryID;
              let currID = id;
              return (
                <Link
                  to={{
                    pathname: "/Room",
                    state: {
                      hotelID: this.state.Hotel_Details.HotelID,
                      countryID: this.state.Hotel_Details.Country_ID_id,
                      roomNumber: currID + 1,
                      roomID: obj.RoomID,
                    },
                  }}
                >
                  <li key={id} class="eachHotel">
                    <h1 class="RoomNumber">Room # {id + 1}</h1>
                    <h3>{obj.BookingPrice}$ / night</h3>
                    <div class="HotelPerks">
                      {" "}
                      <div class="eachFacility">
                        <p>Total Beds = {obj.BedCount}</p>
                      </div>
                      <div class="eachFacility">
                        {this.state.Hotel_Details.FreeWifi && (
                          <p class="TickIcon">&#9989;</p>
                        )}
                        {!this.state.Hotel_Details.FreeWifi && (
                          <p class="CrossIcon">&#10060;</p>
                        )}
                        <p>Free Wifi</p>
                      </div>
                      <div class="eachFacility">
                        {obj.AirConditioned && <p class="TickIcon">&#9989;</p>}
                        {!obj.AirConditioned && (
                          <p class="CrossIcon">&#10060;</p>
                        )}
                        <p>Air Conditioned</p>
                      </div>
                      <div class="eachFacility">
                        {obj.Furnished && <p class="TickIcon">&#9989;</p>}
                        {!obj.Furnished && <p class="CrossIcon">&#10060;</p>}
                        <p>Furnished</p>
                      </div>
                      <div class="eachFacility">
                        {this.state.Hotel_Details.Bar && (
                          <p class="TickIcon">&#9989;</p>
                        )}
                        {!this.state.Hotel_Details.Bar && (
                          <p class="CrossIcon">&#10060;</p>
                        )}
                        <p>Free Bar</p>
                      </div>
                      <div class="eachFacility">
                        {this.state.Hotel_Details.FitnessCenter && (
                          <p class="TickIcon">&#9989;</p>
                        )}
                        {!this.state.Hotel_Details.FitnessCenter && (
                          <p class="CrossIcon">&#10060;</p>
                        )}
                        <p>FitnessCenter</p>
                      </div>{" "}
                      <div class="eachFacility">
                        {obj.SmokingAllow && <p class="TickIcon">&#9989;</p>}
                        {!obj.SmokingAllow && <p class="CrossIcon">&#10060;</p>}
                        <p>Smoking Allowed</p>
                      </div>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchAllRooms();
  }

  fetchAllRooms() {
    GetAllRooms(this.state.HotelID).then((response) => {
      this.setState({ AllRooms: response.data });
    });

    GetHotelDetails(this.state.HotelID, this.state.CountryID).then(
      (response) => {

        this.setState({ Hotel_Details: response.data[0] });
      }
    );

    return [];
  }
}

export default Hotel;
