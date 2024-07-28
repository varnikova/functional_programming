/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { all, any, compose, filter, equals, prop, values, not, length, reduce } from 'ramda';

const allPass = (predicates) => (value) => all(pred => pred(value), predicates);
const anyPass = (predicates) => (value) => any(pred => pred(value), predicates);

//helper functions
const isColor = (color) => (propName) => compose(equals(color), prop(propName));
const isRed = isColor('red');
const isGreen = isColor('green');
const isWhite = isColor('white');
const isOrange = isColor('orange');
const isBlue = isColor('blue');
const isNotColor = (color) => compose(not, equals(color));

const countColor = (color) => compose(length, filter(equals(color)));
const gte = (a) => (b) => b >= a;
const isEqualTo = (a) => (b) => a === b;


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRed('star'),
    isGreen('square'),
    isWhite('triangle'),
    isWhite('circle')
]);



// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
    const colors = values(shapes);
    return gte(2)(countColor('green')(colors));
};



// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
    const colors = values(shapes);
    const redCount = countColor('red')(colors);
    const blueCount = countColor('blue')(colors);
    return isEqualTo(redCount)(blueCount);
};



// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    isRed('star'),
    isOrange('square'),
    isBlue('circle')
]);



// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
    const colors = values(shapes);
    const colorCounts = reduce((acc, color) => {
        if (color !== 'white') {
            acc[color] = (acc[color] || 0) + 1;
        }
        return acc;
    }, {}, colors);
    return any(gte(3), values(colorCounts));
};


// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
    const colors = values(shapes);
    const greenCount = countColor('green')(colors);
    const redCount = countColor('red')(colors);
    return greenCount === 2 && prop('triangle', shapes) === 'green' && redCount === 1;
};



// 7. Все фигуры оранжевые.
export const validateFieldN7 = allPass([
    isOrange('star'),
    isOrange('square'),
    isOrange('triangle'),
    isOrange('circle')
]);



// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (shapes) => {
    return allPass([
        isNotColor('red'),
        isNotColor('white')
    ])(prop('star')(shapes));
};


// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([
    isGreen('star'),
    isGreen('square'),
    isGreen('triangle'),
    isGreen('circle')
]);



// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (shapes) => {
    const triangleColor = prop('triangle', shapes);
    const squareColor = prop('square', shapes);
    return triangleColor !== 'white' && squareColor !== 'white' && isEqualTo(triangleColor)(squareColor);
};


