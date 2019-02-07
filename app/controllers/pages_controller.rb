class PagesController < ApplicationController
  def home

  end

  def json
    @users = User.all
    @number = @users.count
    @textblock_ids = []
    @users.each do |u|
      tcount = u.textblocks.count
      i = 0
      tcount.times do |c|
        @textblock_ids << [u.id, i]
        i += 1
      end
    end
    render layout: 'json'
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
