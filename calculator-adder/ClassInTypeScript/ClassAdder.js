//ПОКА ВСЕ ПОНЯЛ ПУБЛИЧНЫЕ, НО  МОЖНО ПРОСТАВИТЬ МОДИФИКАТОРЫ ДОСТУПА, И ВЫДЕЛИТЬ МЕТОДЫ ИМЕННО ДЛЯ ИНТЕРФЕЙСА
var calculatorAdderClass = /** @class */ (function () {
    // методы класса
    function calculatorAdderClass() {
        this.displayValue = null; //тут храниться текущее состояние на дисплее
        this.serviceName = ""; //Название Услуги или пакета
        this.PricesOfProducts = []; //складываем цены дял суммирования 
        this.totalServicesCounted = null; //Сколько получилось услуг и пакетов итоговая цена
        this.totalAdditionalCounted = null; //Сколько получилось дополнений  итоговая цена
        this.baseAdditionalPrice = 200; //Сколько стоит единица  дополнения 
        //Название услуг типо  Услуга 1
        this.ArrayOfServices = [];
        //Кол-во доп пакетов
        this.ArrayOfRangeNum = [];
        this.ListeningEventsOnClick(this.Selector());
        this.displayValues();
    }
    //Тут вы вытягиваем все данные из дом элементов 
    calculatorAdderClass.prototype.Selector = function () {
        //Берем данные из полей по клику
        var display = document.querySelector('.calculator-screen');
        var keys = document.querySelector('.calculator-keys');
        var range = document.querySelector('.wrapperrange');
        var erase = document.querySelector('.erase');
        return {
            display: display,
            keys: keys,
            range: range,
            erase: erase
        };
    };
    //тут мы слушаем события на наших селектарах
    calculatorAdderClass.prototype.ListeningEventsOnClick = function (ObjectWithSelectors) {
        var _this = this;
        // Записываем дисплейв свойства
        this.DISPLAY_ELEMENT = ObjectWithSelectors.display;
        ObjectWithSelectors.keys.addEventListener('click', function (event) {
            var target = event.target;
            if (target.value) {
                _this.AddInArrayHandlerService(target.value);
            }
        });
        ObjectWithSelectors.range.addEventListener('click', function (event) {
            var target = event.target;
            if (target.value) {
                _this.AddInArrayHandlerRangeNum(target.value);
            }
        });
        ObjectWithSelectors.erase.addEventListener('click', function () {
            _this.displayClear();
            _this.serviceName = "";
            _this.PricesOfProducts = [];
            _this.totalServicesCounted = null;
            _this.totalAdditionalCounted = null;
        });
    };
    //Определяем у какой услуги какая цена 
    calculatorAdderClass.prototype.definePrice = function (type) {
        //Будем перебирать всё и складывать сумму 
        var TempArrayOfPrices = [];
        switch (type) {
            case "Услуга 1":
                TempArrayOfPrices.push("1000 ");
                break;
            case "Услуга 2":
                TempArrayOfPrices.push("4000 ");
                break;
            case "Услуга 3":
                TempArrayOfPrices.push("2000");
                break;
            case "Услуга 4":
                TempArrayOfPrices.push("5000");
                break;
            case "Услуга 5":
                TempArrayOfPrices.push("14000");
                break;
            case "Услуга 6":
                TempArrayOfPrices.push("12000");
                break;
            case "Доп пакет 1":
                TempArrayOfPrices.push("4000");
                break;
            case "Доп пакет 2":
                TempArrayOfPrices.push("3000");
                break;
            case "Доп пакет 3":
                TempArrayOfPrices.push("1000");
                break;
            case "Доп пакет 4":
                TempArrayOfPrices.push("10000");
                break;
            case "Доп пакет 5":
                TempArrayOfPrices.push("14000");
                break;
            default:
                TempArrayOfPrices.push("0");
        }
        return TempArrayOfPrices;
    };
    //Чтобы очищять дисплей и Значение в обьекте
    calculatorAdderClass.prototype.displayClear = function () {
        //const  {displayValue} = calculatorAdderObject;
        this.DISPLAY_ELEMENT.value = "";
        this.displayValue = "";
    };
    //Чтобы бы выводить что либо на дисплей
    calculatorAdderClass.prototype.displayValues = function () {
        //const  {displayValue} = calculatorAdderObject;
        if (this.ArrayOfServices.length === 0 && this.ArrayOfRangeNum.length === 0) {
            this.displayValue = "Давайте посчитаем";
        }
        this.DISPLAY_ELEMENT.value += this.displayValue;
    };
    //Чтобы бы выводить что либо на дисплей
    calculatorAdderClass.prototype.AddInArrayHandlerService = function (Value) {
        this.ArrayOfServices.push(Value);
        var lastSum = this.ArrayOfServices.length - 1;
        this.serviceName = this.ArrayOfServices[lastSum];
        this.PricesOfProducts.push(this.definePrice(this.serviceName)[0]);
        this.totalServicesCounted = null;
        this.displayClear();
        this.displayValue = this.PackegesAdder() + this.totalAdditionalCounted;
        this.displayValues();
    };
    //Получаем значение с range лейбла и записываем в масив 
    calculatorAdderClass.prototype.AddInArrayHandlerRangeNum = function (Value) {
        this.ArrayOfRangeNum.push(Value);
        var lastSum = this.ArrayOfRangeNum.length - 1;
        this.displayClear();
        this.displayValue = this.RangeCalculate(parseFloat(this.ArrayOfRangeNum[lastSum])) + this.totalServicesCounted;
        this.totalAdditionalCounted = null;
        this.totalAdditionalCounted = this.RangeCalculate(parseFloat(this.ArrayOfRangeNum[lastSum]));
        this.displayValues();
    };
    //Подсчет доп пакетов  по формуле 
    calculatorAdderClass.prototype.RangeCalculate = function (LastNumOfArray) {
        return LastNumOfArray * this.baseAdditionalPrice;
    };
    //Подсчет всех услуг и доп услуг
    calculatorAdderClass.prototype.PackegesAdder = function () {
        //const sum = calculatorAdderObject.PricesOfProducts.reduce((partialSum, a) => partialSum + a, 0);
        for (var i = 0; i < this.PricesOfProducts.length; i++) {
            this.totalServicesCounted += parseFloat(this.PricesOfProducts[i]);
        }
        //посчитанные пакеты
        return this.totalServicesCounted;
    };
    return calculatorAdderClass;
}());
new calculatorAdderClass();
