# class SoftSkillsSeeder

#   QUESTIONS_SOFTSKILLS = []

#   def self.parse_file
#     File.open("app/seeders/data/soft-skills.txt", 'r') do |file|
#       file.each do |line|
#         line = line.squish
#         QUESTIONS_SOFTSKILLS.push(line)
#       end
#     end
#   end


#   def self.seed!
#     parse_file

#     QUESTIONS_SOFTSKILLS.each do |item|
#       question = Question.find_or_initialize_by(title: item)
#       question.user = User.first
#       question.public = "public"
#       question_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: key))
#       question_parent_category = QuestionCategory.find_or_initialize_by(question: question, category: Category.find_by(name: "Computer Software"))

#       question_category.save!
#       question_parent_category.save!
#       question.save!
#     end
#   end


# end