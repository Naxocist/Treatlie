import dayjs from "dayjs"

export function calculateAge(birthdayString) {
  // const dateObj = dayjs(birthdayString)
  // const [year, month, day] = [dateObj.year(), dateObj.month(), dateObj.day()]

  
  const birthday = new Date(birthdayString)
  
  const today = new Date()

  // console.log(today, birthday)
  
  let age = today.getFullYear() - birthday.getFullYear()
  
  const monthDifference = today.getMonth() - birthday.getMonth()
  const dayDifference = today.getDate() - birthday.getDate()
  // console.log(monthDifference, dayDifference)
  
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--
  }
  
  return age
}

export function ISOtoString(dateIso) {
  const date = new Date(dateIso)

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function simplifyDate(dateObj) {
  const dt = dayjs(dateObj)

  return dt.format('d/M/YYYY')
}

export function convertDeadline(dateISO) {

  const day1 = dayjs().startOf('day')
  const day2 = dayjs(dateISO)



  // const yearDifference = day2.diff(day1, 'year')
  // const monthDifference = day2.diff(day1, 'month') 
  const dayDifference = day2.diff(day1, 'day') 
  // console.log(yearDifference, monthDifference, dayDifference)

  if(dayDifference === 0) {
    return "Today"
  }

  if(dayDifference === 1) {
    return "Tomorrow"
  }

  return `in ${dayDifference} days`
}