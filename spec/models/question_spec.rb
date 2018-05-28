require 'rails_helper'

describe Question do

  it "should belong to a user" do
    t = Question.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should have many answers" do
    t = Question.reflect_on_association(:answers)
    expect(t.macro).to eq(:has_many)
  end

  it { should have_many(:categories).through :question_categories }
  it { should have_many(:lists).through :question_lists }

end