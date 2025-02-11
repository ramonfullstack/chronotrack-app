export interface ExtraHours {
  id: number;
  idUser: number;
  hoursWorked?: number;
  baseRateDay?: number;
  valueHourBase?: number;
  totalValueEarnedDay?: number;
  dayOfWeek?: string;
  created: Date;
  updated: Date;
}