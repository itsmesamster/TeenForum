class AddIsQuestionToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :is_question, :integer, default: 0, null: false
  end
end
