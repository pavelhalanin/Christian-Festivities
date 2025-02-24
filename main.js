function main() {
  const ARRAY = [];

  for (let i = 2001; i <= 2049; i++) {
    const YEAR = i;

    const KATOLICHESKAYA_DATE_INSTANCE =
      ChristianFestivitiesHelper.calculateEasterDate(YEAR);

    const PRAVOSLAVNAYA_DATE_INSTANCE =
      ChristianFestivitiesHelper.calculateOrthodoxEasterDate(YEAR);

    const KATOLICHESKAYA_DATE_STRING = ChristianFestivitiesHelper.getFormatDate(
      KATOLICHESKAYA_DATE_INSTANCE
    );

    const PRAVOSLAVNAYA_DATE_STRING = ChristianFestivitiesHelper.getFormatDate(
      PRAVOSLAVNAYA_DATE_INSTANCE
    );

    ARRAY.push({
      Год: YEAR,
      "Католическая Пасха": KATOLICHESKAYA_DATE_STRING,
      "Православная Пасха": PRAVOSLAVNAYA_DATE_STRING,
    });
  }

  console.table(ARRAY);
}

class ChristianFestivitiesHelper {
  static calculateEasterDate(year) {
    // Алгоритм Гаусса для вычисления даты Пасхи
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
  }

  static calculateOrthodoxEasterDate(year) {
    // Алгоритм для вычисления даты Пасхи по юлианскому календарю
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day = ((d + e + 114) % 31) + 1;

    // Преобразуем юлианскую дату в григорианскую (добавляем 13 дней)
    const julianDate = new Date(year, month - 1, day);
    julianDate.setDate(julianDate.getDate() + 13);

    return julianDate;
  }

  static getFormatDate(d = new Date()) {
    const YYYY = d.getFullYear();
    const MM = `${d.getMonth() + 1}`.padStart(2, "0");
    const DD = `${d.getDate()}`.padStart(2, "0");
    return `${DD}.${MM}.${YYYY}`;
  }
}

main();
