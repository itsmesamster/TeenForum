class AddGroupToTopics < ActiveRecord::Migration
  def change
    add_reference :topics, :group, index: true, foreign_key: true
  end
end
