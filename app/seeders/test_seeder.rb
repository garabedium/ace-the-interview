require 'pry'

class TestSeeder

  QUESTIONS = {}

  def self.parse_file(type)
    QUESTIONS["#{type}"] = []

    File.open("app/seeders/data/questions-#{type}.txt", 'r') do |file|
      file.each do |line|
        line = line.squish
        QUESTIONS["#{type}"].push(line)
      end
    end
  end

  # def self.create_questions

  # end

  def self.seed!
    categories = ["CSS","HTML"]

    categories.each do |category|
      parse_file("#{category.downcase}")
    end

binding.pry
    # parse_file("css")
    # parse_file("html")

    # QUESTIONS.each_with_index do |item,index|
    #   question = Question.find_or_initialize_by(title: item)
    #   question.user = User.first
    #   question.public = "public"
    #   # question_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: "CSS"))
    #   question_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: categories["index"]))
    #   question_category.save!
    # end

  end

end