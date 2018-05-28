require 'rails_helper'

describe List do

  it "should belong to a user" do
    t = List.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it { should have_many(:questions).through :question_lists }

  it { should validate_presence_of(:name) }

end