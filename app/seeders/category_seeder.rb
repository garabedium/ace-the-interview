class CategorySeeder
  CATEGORIES = [
    'CSS',
    'Databases',
    'General',
    'HTML',
    'Javascript',
    'Performance',
    'Python',
    'Ruby',
    'Security',
    'Soft Skills',
    'Testing',
    'Unit Testing'
  ]

  def self.seed!
    CATEGORIES.each do |item|
      category = Category.find_or_initialize_by(name: item)
      category.save!
    end
  end
end