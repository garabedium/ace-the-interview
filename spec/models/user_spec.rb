require 'rails_helper'

describe User do

  it "should have many questions" do
    t = User.reflect_on_association(:questions)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many answers" do
    t = User.reflect_on_association(:answers)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many lists" do
    t = User.reflect_on_association(:lists)
    expect(t.macro).to eq(:has_many)
  end

  it "should have an industry" do
    t = User.reflect_on_association(:industry)
    expect(t.macro).to eq(:belongs_to)
  end

end