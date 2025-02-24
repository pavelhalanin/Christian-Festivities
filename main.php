<?php

function main() {
    $array = [];

    for ($i = 2001; $i <= 2049; $i++) {
        $year = $i;

        $katolicheskayaDateInstance = ChristianFestivitiesHelper::calculateEasterDate($year);
        $pravoslavnayaDateInstance = ChristianFestivitiesHelper::calculateOrthodoxEasterDate($year);

        $katolicheskayaDateString = ChristianFestivitiesHelper::getFormatDate($katolicheskayaDateInstance);
        $pravoslavnayaDateString = ChristianFestivitiesHelper::getFormatDate($pravoslavnayaDateInstance);

        $array[] = [
            'Год' => $year,
            'Католическая Пасха' => $katolicheskayaDateString,
            'Православная Пасха' => $pravoslavnayaDateString,
        ];
    }

    // Вывод таблицы
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

class ChristianFestivitiesHelper {
    public static function calculateEasterDate($year) {
        // Алгоритм Гаусса для вычисления даты Пасхи
        $a = $year % 19;
        $b = intdiv($year, 100);
        $c = $year % 100;
        $d = intdiv($b, 4);
        $e = $b % 4;
        $f = intdiv(($b + 8), 25);
        $g = intdiv(($b - $f + 1), 3);
        $h = (19 * $a + $b - $d - $g + 15) % 30;
        $i = intdiv($c, 4);
        $k = $c % 4;
        $l = (32 + 2 * $e + 2 * $i - $h - $k) % 7;
        $m = intdiv(($a + 11 * $h + 22 * $l), 451);
        $month = intdiv(($h + $l - 7 * $m + 114), 31);
        $day = (($h + $l - 7 * $m + 114) % 31) + 1;

        return new DateTime("$year-$month-$day");
    }

    public static function calculateOrthodoxEasterDate($year) {
        // Алгоритм для вычисления даты Пасхи по юлианскому календарю
        $a = $year % 4;
        $b = $year % 7;
        $c = $year % 19;
        $d = (19 * $c + 15) % 30;
        $e = (2 * $a + 4 * $b - $d + 34) % 7;
        $month = intdiv(($d + $e + 114), 31);
        $day = (($d + $e + 114) % 31) + 1;

        // Преобразуем юлианскую дату в григорианскую (добавляем 13 дней)
        $julianDate = new DateTime("$year-$month-$day");
        $julianDate->modify('+13 days');

        return $julianDate;
    }

    public static function getFormatDate($date = null) {
        if ($date === null) {
            $date = new DateTime();
        }
        return $date->format('d.m.Y');
    }
}

main();
