# class AnswerSeeder
#   ANSWERS = [
#     {
#       body: "I learned Node last week.",
#       user: User.first,
#       question: Question.first,
#     },
#     {
#       body: "I taught myself Redux.",
#       user: User.last,
#       question: Question.first
#     },
#   ]

#   def self.seed!
#     ANSWERS.each do |item|
#       answer = Answer.find_or_initialize_by(user: item[:user],question: item[:question])
#       answer.body = item[:body]
#       answer.save!
#     end
#   end
# end