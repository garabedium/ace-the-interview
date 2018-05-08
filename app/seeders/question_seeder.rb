class QuestionSeeder
  QUESTIONS = [
    { title: "What is a recent technical challenge you experienced and how did you solve it?", user: User.first, public: true },
    { title: "What is a closure in Javascript?", user: User.first, public: true },
    { title: "What is a private question?", user: User.first, public: false }
  ]

  def self.seed!
    QUESTIONS.each do |item|
      question = Question.find_or_initialize_by(title: item[:title])
      question.user = item[:user]
      question.public = item[:public]
      question.save!
    end
  end
end