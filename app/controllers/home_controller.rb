class HomeController < ApplicationController
 layout 'app'
 skip_before_filter :preload_json, :only => [:index]
 skip_before_filter :check_xhr, :only => [:index]
 skip_before_filter :add_readonly_header, :only => [:index]

 def index
   @topics_count = Topic.count
   @views_count = TopicViewItem.count
   render :layout => 'app'
 end
end