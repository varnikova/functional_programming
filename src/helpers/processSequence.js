/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import Api from '../tools/api';

 const api = new Api();

const isValidNumber = (value) => {
    const number = Number(value);
    return value.length > 2 &&
        value.length < 10 &&
        number > 0 &&
        !isNaN(number);
};

const validate = (value) => {
    if (!isValidNumber(value)) {
        throw new Error('ValidationError');
    }
    return value;
};

const roundNumber = (value) => Math.round(Number(value));
const toBinary = (number) => api.get('https://api.tech/numbers/base')({ from: 10, to: 2, number });
const getLength = (string) => string.length;
const square = (number) => number ** 2;
const modulo3 = (number) => number % 3;
const fetchAnimal = (id) => api.get(`https://animals.tech/${id}`)({});


const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    const logAndPass = (msg) => (result) => {
        writeLog(msg);
        return result;
    };

    const handleValidationError = (error) => {
        handleError(error.message);
    };
    const executeSequence = (value) => {
        return Promise.resolve(value)
            .then(logAndPass(value))
            .then(validate)
            .then((validValue) => {
                const rounded = roundNumber(validValue);
                writeLog(rounded);
                return rounded;
            })
            .then((number) => toBinary(number)
                .then(({ result }) => {
                    writeLog(result);
                    return result;
                })
            )
            .then((binary) => {
                const length = getLength(binary);
                writeLog(length);
                return length;
            })
            .then((length) => {
                const squared = square(length);
                writeLog(squared);
                return squared;
            })
            .then((squared) => {
                const mod = modulo3(squared);
                writeLog(mod);
                return mod;
            })
            .then((id) => fetchAnimal(id)
                .then(({ result }) => {
                    handleSuccess(result);
                })
            )
            .catch(handleValidationError);
    };

    executeSequence(value);
};

export default processSequence;


