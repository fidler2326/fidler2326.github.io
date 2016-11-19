require 'sass/plugin/rack'
require './app'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack
use Rack::Deflater

set :static_cache_control, [:public, max_age: 60 * 60 * 24 * 365]

run Sinatra::Application
