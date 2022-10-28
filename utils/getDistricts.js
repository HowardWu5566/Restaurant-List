function getDistricts(restaurants) {
  const districts = []
  restaurants.forEach((restaurant) => {
    const address = restaurant.location
    const district = address.slice(
      address.indexOf('市') + 1,
      address.indexOf('區') + 1
    )
    if (district && !districts.includes(district)) districts.push(district)
  })
  return districts
}

module.exports = getDistricts
