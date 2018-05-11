class QuestionCategorySeeder
  QUESTION_CATEGORIES = [
    {
      question: Question.find_by(title: "What is an event listener?"),
      category: Category.find_by(name: "Javascript")
    },
    {
      question: Question.find_by(title: "What is event delegation?"),
      category: Category.find_by(name: "Javascript")
    },
    {
      question: Question.find_by(title: "What is a callback?"),
      category: Category.find_by(name: "Javascript")
    },
    {
      question: Question.find_by(title: "What is Activerecord?"),
      category: Category.find_by(name: "Ruby")
    },
    {
      question: Question.find_by(title: "What did you learn yesterday/last week?"),
      category: Category.find_by(name: "Soft Skills")
    }
  ]

  def self.seed!
    QUESTION_CATEGORIES.each do |item|
      question_category = QuestionCategory.find_or_initialize_by(question: item[:question], category: item[:category])
      question_category.save!
    end
  end
end






