class UsersController < ApplicationController
  respond_to :html, :json, :js

  def index
    @users = User.all
    respond_to do |format|
      format.json { redirect_back(fallback_location: root_path) }
      format.html { redirect_back(fallback_location: root_path) }
      # format.js # index.js.erb
    end
  end

  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
    respond_to do |format|
      format.json { redirect_back(fallback_location: root_path) }
      format.html { redirect_back(fallback_location: root_path) }
      # format.js # index.js.erb
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :first_name,
      :last_name,
      :street_and_number,
      :postalcode,
      :city,
      :phonenumber,
      :lat,
      :lng
    )
  end

end
