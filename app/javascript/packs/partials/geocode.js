
function getLatLng() {
  var address = document.getElementById("user_practice_street").value
    + ", "
    + document.getElementById("user_practice_city").value;
  var geocoder = new google.maps.Geocoder();
  console.log(address);
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      console.log(results[0].geometry.location.lat());
      document.getElementById("input-lat").value = results[0].geometry.location.lat();
      console.log(results[0].geometry.location.lng());
      document.getElementById("input-lng").value = results[0].geometry.location.lng();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getLatLngBatch() {
  const users = JSON.parse(document.getElementById('kaboom').dataset.users);
  users.forEach((user) => {
    var address = user.street_and_number + ", " + user.city;
    var id = user.id;
    console.log(address);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results) {
      var lat = (results[0].geometry.location.lat());
      var lng = (results[0].geometry.location.lng());
      console.log(lat + "," + lng);
      saveLatLng(lat, lng, id);
      });
  });
}

function saveLatLng(lat, lng, id) {
  var urll = '/users/' + id;
  // get session auth token: value of attribute "content" of element "meta", where name="csrf-token"
  // var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
  var AUTH_TOKEN = document.querySelector('meta[name="csrf-token"]').content
  console.log(AUTH_TOKEN)
  // update user (lat lng)
  // Rails.ajax({
  //   type: 'PATCH',
  //   url: urll,
  //   datatype: 'js',
  //   data: { user: { lat: lat, lng: lng}, authenticity_token: AUTH_TOKEN },
  //   complete: function() {},
  //   success: function() {
  //     alert('Ajax kampioen!')
  //   },
  //   error: function() {
  //     // alert('Ajax gedegradeerd!')
  //   }
  // });
  var request = new XMLHttpRequest();
  request.open('PATCH', urll, true);
  // request.setRequestHeader('X-CSRF-Token', AUTH_TOKEN);
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  const params = { user: { lat: lat, lng: lng}, authenticity_token: AUTH_TOKEN };
  request.send(JSON.stringify(params));
}


export { getLatLng };
export { getLatLngBatch };
