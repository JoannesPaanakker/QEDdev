class PagesController < ApplicationController
  def home

  end

  def google_maps_api
    @users = User.all
    @users_json = @users.to_json
    get_markers
    render layout: 'googlemaps'
  end

  def get_markers # get markers for googlemaps
    @markers = @users.map do |u|
      {
        lng: u.lng,
        lat: u.lat,
        title: "#{u.first_name} #{u.last_name}\n #{u.email}",
        id: u.id
      }
    end
    @markers = @markers.to_json
  end
end
