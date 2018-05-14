class TestSeeder

  QUESTIONS_CSS = []


  def self.parse_file!
    File.open('data/questions-css.txt', 'r') do |file|
      file.each do |line|
        line = line.strip
        QUESTIONS_CSS.push(line)
      end
    end
  end

  def self.seed!
    parse_file!

    QUESTIONS_CSS.each do |item|
      question = Question.find_or_initialize_by(title: item)
      question.user = User.first
      question.public = "public"
      # question = question.save!
      question_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: "CSS"))

      question_category.save!
    end

  end

end