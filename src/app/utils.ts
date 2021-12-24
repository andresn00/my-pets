import { MatSnackBar } from "@angular/material/snack-bar"
// import * as moment from 'moment';

export const openNotificacionSnackBar = (snackBar: MatSnackBar, message: string, color: string, time: number = 3000) => {
  snackBar.open(message, '', {
    duration: time,
    panelClass: ['mat-toolbar', `mat-${color}`]
  })

}

// export const convertDateFormat = (date: any, inputFormat: string, outputFormat?: string) => {
//   if (outputFormat) {
//     return moment(date, inputFormat).format(outputFormat)
//   }
//   return moment(date, inputFormat).format()
// }