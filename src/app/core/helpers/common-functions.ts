export class CommonFunctions {
  constructor() {}

  /**
   * @description
   *
   * Recebe uma data no formato ddmmyyyyhhmm
   * e trasnforma para yyyy-mm-ddT00:00:00Z
   *
   * @publicApi
   */
  static StringToDateAPI(val: string) {
    let day = val.substring(0, 2);
    let month = val.substring(2, 4);
    let year = val.substring(4, 8);
    let hour = val.substring(8, 10);
    let minute = val.substring(10, 12);

    return `${year}-${month}-${day}T${hour}:${minute}:00`;
  }

  static DateToDateAPI(val: Date)
  {
    return `${val}T00:00:00`;
  }
}
