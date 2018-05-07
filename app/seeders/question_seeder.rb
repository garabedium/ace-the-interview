class QuestionSeeder
  QUESTIONS = [
    { title: "What is a recent technical challenge you experienced and how did you solve it?", user: User.first},
    { title: "What is a closure in Javascript?", user: User.first}
  ]

  def self.seed!
    QUESTIONS.each do |item|
      question = Question.find_or_initialize_by(title: item[:title])
      question.user = item[:user]
      question.save!
    end
  end
end