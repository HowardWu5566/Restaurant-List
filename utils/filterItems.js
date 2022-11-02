const filterItems = {
  getDistricts: restaurants => {
    const districts = []
    restaurants.forEach(restaurant => {
      const address = restaurant.location
      const district = address.slice(
        address.indexOf('市') + 1,
        address.indexOf('區') + 1
      )
      if (district && !districts.includes(district))
        districts.push(district)
    })
    return districts
  },
  getCategories: restaurants => {
    const categories = []
    restaurants.forEach(restaurant => {
      const category = restaurant.category
      if (category && !categories.includes(category))
        categories.push(category)
    })
    return categories
  }
}

module.exports = filterItems
