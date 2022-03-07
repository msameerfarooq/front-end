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
import { GetAllHotels, GetCountries } from "./API_Caller";
import "./HomePage.css";
import "./Room.css";
import "@progress/kendo-theme-default/dist/all.css";

import { useMemo, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allHotels: [],
      countryID: 0,
      CountryList: [],
      IdentityData: { CountryID: 0, Country_Name: "All Countries" },
    };
  }

  render() {
    return (
      <div>
        {" "}
        <div class="Title">HOTEL APPLICATION</div>
        <hr />
        <div className="col-xs-12 col-sm-7 example-col">
          <DropDownList
            style={{
              width: "300px",
            }}
            data={this.state.CountryList}
            onChange={this.onChange}
            placeholder="search..."
            textField={"Country_Name"}
            label="Country Filter"
          />
        </div>
        <div>
          <ul>
            {this.state.allHotels.map((obj, id) => {

              if (
                obj.Country_ID == this.state.countryID ||
                this.state.countryID == 0
              ) {
                return (
                  <Link
                    to={{
                      pathname: "/Hotel",
                      state: {
                        hotelID: obj.HotelID,
                        ncountryID: obj.Country_ID,
                      },
                    }}
                  >
                    <li key={id} class="eachHotel">
                      <h2 class="HotelName">{obj.HotelName}</h2>
                      <h4 class="AreaName">{obj.Address}</h4>
                      <div class="HotelPerks">
                        {" "}
                        <div class="eachFacility">
                          {obj.FreeWifi && <p class="TickIcon">&#9989;</p>}
                          {!obj.FreeWifi && <p class="CrossIcon">&#10060;</p>}
                          <p>Free Wifi</p>
                        </div>
                        <div class="eachFacility">
                          {obj.Bar && <p class="TickIcon">&#9989;</p>}
                          {!obj.Bar && <p class="CrossIcon">&#10060;</p>}
                          <p>Free Bar</p>
                        </div>
                        <div class="eachFacility">
                          {obj.FitnessCenter && <p class="TickIcon">&#9989;</p>}
                          {!obj.FitnessCenter && (
                            <p class="CrossIcon">&#10060;</p>
                          )}
                          <p>FitnessCenter</p>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }

  onChange = (obj) => {
    this.setState({
      countryID: obj.value.CountryID,
      filter: null,
    });
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails() {
    GetAllHotels().then((response) => {
      this.setState({ allHotels: response.data });
    });
    GetCountries().then((response) => {
      this.setState({
        CountryList: [this.state.IdentityData, ...response.data],
      });
    });
    return [];
  }
}
export default HomePage;
