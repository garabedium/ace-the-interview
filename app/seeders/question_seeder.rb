class QuestionSeeder
  QUESTIONS = [
    {
      title: "What did you learn yesterday/last week?",
      user: User.first,
      public: true
    },
    {
      title: "What excites or interests you about coding?",
      user: User.first,
      public: true
    },
    {
      title: "What is a recent technical challenge you experienced and how did you solve it?",
      user: User.first,
      public: true
    },
    {
      title: "When building a new web site or maintaining one, can you explain some techniques you have used to increase performance?",
      user: User.first,
      public: true
    },
    {
      title: "Can you describe some SEO best practices or techniques you have used lately?",
      user: User.last,
      public: false
    },
    {
      title: "Can you explain any common techniques or recent issues solved in regards to front-end security?",
      user: User.last,
      public: true
    },
    {
      title: "What actions have you personally taken on recent projects to increase maintainability of your code?",
      user: User.last,
      public: false
    }
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