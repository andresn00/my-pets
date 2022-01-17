import * as moment from 'moment';


export const getPetSex = (n: number) => {
  return n === 0 ? 'Hembra' : 'Macho'
}

export const convertDateFormat = (date: any, inputFormat: string, outputFormat?: string) => {
  if (outputFormat) {
    return moment(date, inputFormat).format(outputFormat)
  }
  return moment(date, inputFormat).format()
}

export const getAge = (birthday: any) => {
  if(!birthday) return null
  const birthdayMoment = moment(birthday)
  const years = moment().diff(birthdayMoment, 'years')
  birthdayMoment.add(years, 'years')
  const months = moment().diff(birthdayMoment, 'months')
  return {years, months}
}

export const getAgeToString = (age: any) => {
  if (!age) return null
  return `${age.years} años, ${age.months} meses`
}
