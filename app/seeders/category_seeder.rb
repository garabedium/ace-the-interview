class CategorySeeder
  CATEGORIES = [
    'CSS',
    'Databases',
    'HTML',
    'Javascript',
    'Performance',
    'Python',
    'Ruby',
    'Security',
    'Soft Skills',
    'Testing',
    'Fun',
    'Unit Testing',
    'HTTP',
    'Accounting',
    'Computer Hardware',
    'Computer Networking',
    'Computer Software',
    'Human Resources',
    'Insurance',
    'Investment Banking',
    'Marketing and Advertising',
    'Real Estate'
  ]

  def self.seed!
    CATEGORIES.each do |item|
      category = Category.find_or_initialize_by(name: item)
      category.save!
    end
  end
end