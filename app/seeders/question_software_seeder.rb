class QuestionSoftwareSeeder

  QUESTIONS = {}

  def self.parse_file(type)
    QUESTIONS["#{type}"] = []

    File.open("app/seeders/data/computer-software/questions-#{type}.txt", 'r') do |file|
      file.each do |line|
        line = line.squish
        QUESTIONS["#{type}"].push(line)
      end
    end
  end

  def self.seed!
    categories = ["CSS","HTML","Databases","Javascript","Ruby"]

    categories.each do |category|
      parse_file("#{category}")
    end

    QUESTIONS.each do |key,value|
      value.each do |item|
        question = Question.find_or_initialize_by(title: item)
        question.user = User.first
        question.public = "public"
        question_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: key))
        question_parent_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: "Computer Software"))

        question_category.save!
        question_parent_category.save!
      end
    end

  end


end