require 'rubygems'
require 'sinatra'

get '/' do
  @title = 'Adam Fidler - Front End Developer'
  @body_id = 'home'
  erb :index, :layout => :'layout'
end
