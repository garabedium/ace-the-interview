class IndustrySeeder
  INDUSTRIES = [
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
    INDUSTRIES.each do |item|
      industry = Industry.find_or_initialize_by(name: item)
      industry.save!
    end
  end
end