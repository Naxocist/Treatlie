
export function calculateAge(birthdayString) {
  const [year, month, day] = birthdayString.split('-').map(Number)

  
  const birthday = new Date(year, month - 1, day)
  
  const today = new Date()
  
  let age = today.getFullYear() - birthday.getFullYear()
  
  const monthDifference = today.getMonth() - birthday.getMonth()
  const dayDifference = today.getDate() - birthday.getDate()
  
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