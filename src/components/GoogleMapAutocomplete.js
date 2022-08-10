// import "./styles.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";

export default function GoogleMapAutocomplete() {
    const [address, setAddress] = useState();
    const [addressObj, setAddressObj] = useState();
    console.log(addressObj);
    const getAddressObject = (address_components) => {
        console.log(address_components);
        const ShouldBeComponent = {
        street_number: ["street_number"],
        postal_code: ["postal_code"],
        street: ["street_address", "route"],
        province: ["administrative_area_level_1"],
        city: ["locality"],
        // city:['political'],
        country: ["country"]
        };

        let address = {
        street_number: "",
        postal_code: "",
        street: "",
        province: "",
        city: "",
        country: ""
        };

        address_components.forEach((component) => {
        for (var shouldBe in ShouldBeComponent) {
            if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
            if (shouldBe === "country") {
                address[shouldBe] = component.short_name;
            } else {
                address[shouldBe] = component.long_name;
            }
            }
        }
        });

        // Fix the shape to match our schema
        address.address = address.street_number + " " + address.street;
        delete address.street_number;
        delete address.street;
        if (address.country === "US") {
        address.state = address.province;
        delete address.province;
        }
        return address;
    };

    useEffect(() => {
        const func = async () => {
        const geocodeObj =
            address &&
            address.value &&
            (await geocodeByPlaceId(address.value.place_id));
        const addressObject =
            geocodeObj && getAddressObject(geocodeObj[0].address_components);
        console.log("addressObject", addressObject);
        setAddressObj(addressObject);
        };
        func();
    }, [address]);

    return (
        <div className="App">
        <h1>Google Places - Address Autocomplete</h1>
        <GooglePlacesAutocomplete
            apiKey="AIzaSyChTcMUCY9Zw3j00st0uKkqTz0RGlOpea8"
            selectProps={{
            isClearable: true,
            value: address,
            onChange: (val) => {
                setAddress(val);
            },
            styles: {
                input: (provided) => ({
                ...provided,
                boxShadow: 0,
                "&:hover": {
                    border: "1px solid purple"
                }
                }),
                singleValue: (provided) => ({
                ...provided,
                boxShadow: 0,
                "&:hover": {
                    border: "1px solid purple"
                }
                })
            }
            }}
        />
        <pre style={{ textAlign: "left", background: "#f0f0f0", padding: 20 }}>
            {JSON.stringify(addressObj, 0, 2)}
        </pre>
        </div>
    );
}
