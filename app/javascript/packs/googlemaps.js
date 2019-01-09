import { startMap } from "./partials/googlemaps.js.erb"
import { getLatLng, getLatLngBatch } from "./partials/geocode"
import { clearPage } from "./partials/development"

const dev001 = document.getElementById("kaboom").addEventListener("click", getLatLngBatch);
startMap();

console.log("hello from googlemaps.js")
clearPage();
