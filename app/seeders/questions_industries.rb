class QuestionsIndustries

  QUESTIONS = {}

  def self.parse_file(type)
    QUESTIONS["#{type}"] = []

    File.open("app/seeders/data/industries/#{type}.txt", 'r') do |file|
      file.each do |line|
        line = line.squish
        QUESTIONS["#{type}"].push(line)
      end
    end
  end

  def self.seed!
    categories = [
      'Accounting',
      'Computer Hardware',
      'Computer Networking',
      'Human Resources',
      'Insurance',
      'Investment Banking',
      'Marketing and Advertising',
      'Real Estate'
    ]

    categories.each do |category|
      category = category.gsub(' ','-')
      parse_file("#{category}")
    end

    QUESTIONS.each do |key,value|
      category = key.gsub('-',' ')

      value.each do |item|
        question = Question.find_or_initialize_by(title: item)
        question.user = User.first
        question.public = "public"
        question_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: category))

        question_category.save!
      end

    end

  end


end