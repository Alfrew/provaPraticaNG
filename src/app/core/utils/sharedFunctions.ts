export abstract class Sharedfunctions {
  static getRandomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static returnNumberListFromStringArray(stringArray: string): number[] {
    return stringArray.split(",").map((el) => Number(el));
  }
}
