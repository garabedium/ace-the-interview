require 'rails_helper'

describe Answer do

  it "should belong to a user" do
    t = Answer.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should belong to a question" do
    t = Answer.reflect_on_association(:question)
    expect(t.macro).to eq(:belongs_to)
  end

   it { should validate_presence_of(:body) }

end