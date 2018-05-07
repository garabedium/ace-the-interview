class IndustrySeeder
  INDUSTRIES = [
    'Accounting',
    'Architecture',
    'Automotive',
    'Aviation',
    'Banking',
    'Computer Hardware',
    'Computer Networking',
    'Computer Software',
    'Financial Services',
    'Human Resources',
    'Insurance',
    'Investment Banking',
    'Law',
    'Marketing and Advertising',
    'Real Estate'
  ]

  def self.seed!
    INDUSTRIES.each do |item|
      industry = Industry.find_or_initialize_by(name: item)
      industry.save!
    end
  end
end