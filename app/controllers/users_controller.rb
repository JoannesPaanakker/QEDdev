class UsersController < ApplicationController
  respond_to :html, :json, :js

  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.js { render json: @users }
    end
  end

  def list
    @list = User.all
    respond_to do |format|
      format.html
      format.json { render json: @list }
    end
  end

  def update
    @user = User.find(params[:id])
    @user.textblocks[params[:index]] = params[:newtext]
    @user.update!(user_params)
    respond_to do |format|
      format.json
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
      :lng,
      :textblocks,
      :id
    )
  end

end
