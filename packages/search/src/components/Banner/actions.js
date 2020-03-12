import queryString from "query-string";

const windowGlobal = typeof window !== "undefined" && window;

let geocoder = null;

export function submitForm(num) {
  return async (dispatch, getState) => {
    const {
      areaGuessResult,
      selectedLocationLatLng
    } = getState().dynamicSearch;

    let lat = null;
    let lng = null;

    if (selectedLocationLatLng) {
      lat = selectedLocationLatLng.lat;
      lng = selectedLocationLatLng.lng;
    } else {
      lat = areaGuessResult.lat;
      lng = areaGuessResult.lng;
    }

    let params = {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
    if (windowGlobal) {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: params }, function(results, status) {
        if (status === "OK") {
          if (results[0]) {
            const ff = {};
            ff.full_address = results[0].formatted_address;
            ff.phone_number = num;
            const fields = {
              records: [
                {
                  fields: ff
                }
              ]
            };

            fetch(
              "https://api.airtable.com/v0/appsMJIPVszhmbudT/alerts_requests",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer keyKgB4zVqZ1CQqe3`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(fields)
              }
            )
              .then(r => console.log("form sent"))
              .catch(error => console.log(error, "form error"));
          } else {
            console.log(e, "No results found in geocoding");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      });
    }
  };
}
