class calculatorAdderObject {


    DISPLAY_ELEMENT;
    
    displayValue = null; //тут храниться текущее состояние на дисплее
    serviceName = "";    //Название Услуги или пакета
    PricesOfProducts = []; //складываем цены дял суммирования 
    totalServicesCounted = null; //Сколько получилось услуг и пакетов итоговая цена
    totalAdditionalCounted = null; //Сколько получилось дополнений  итоговая цена
    baseAdditionalPrice = 200; //Сколько стоит единица  дополнения 
    
    //Название услуг типо  Услуга 1
    ArrayOfServices = [];

    //Кол-во доп пакетов
    ArrayOfRangeNum = [];

    // методы класса
    constructor() { 
       
        this.ListeningEventsOnClick(this.Selector());
        this.displayValues();
    }

    //Тут вы вытягиваем все данные из дом элементов 
    Selector () {
    //Берем данные из полей по клику
    const display = document.querySelector('.calculator-screen');
    const keys =  document.querySelector('.calculator-keys');
    const range =  document.querySelector('.wrapperrange');
    const erase =  document.querySelector('.erase');

        return {
        display: display,
        keys: keys ,
        range: range,
        erase: erase 
        };
    }

    //тут мы слушаем события на наших селектарах
    ListeningEventsOnClick(ObjectWithSelectors){
        // Записываем дисплейв свойства
        this.DISPLAY_ELEMENT =  ObjectWithSelectors.display;

        ObjectWithSelectors.keys.addEventListener('click', (event) => {
            const { target } = event;
            if(target.value){
                this.AddInArrayHandlerService(target.value);
            }
        
        });
    
        ObjectWithSelectors.range.addEventListener('click', (event) => {
            const { target } = event;
            if(target.value){
                this.AddInArrayHandlerRangeNum(target.value);
            }
        
        });
        ObjectWithSelectors.erase.addEventListener('click', () => {
        
            this.displayClear();
            this.serviceName= "";
            this.PricesOfProducts= [];
            this.totalServicesCounted = null;
            this.totalAdditionalCounted = null;
        
        
        });
    }


    //Определяем у какой услуги какая цена 
    definePrice(type){
        //Будем перебирать всё и складывать сумму 
        const TempArrayOfPrices = [];
    
        switch (type) {
        case "Услуга 1":
            TempArrayOfPrices.push("1000 ")
            break;
        case "Услуга 2":
            TempArrayOfPrices.push("4000 ")
            break;
        case "Услуга 3":
            TempArrayOfPrices.push("2000")
        break;
        case "Услуга 4":
            TempArrayOfPrices.push("5000")
            break;
        case "Услуга 5":
            TempArrayOfPrices.push("14000")
            break;
        case "Услуга 6":
            TempArrayOfPrices.push("12000")
            break;
        case "Доп пакет 1":
            TempArrayOfPrices.push("4000")
            break;
        case "Доп пакет 2":
            TempArrayOfPrices.push("3000")
            break;
        case "Доп пакет 3":
            TempArrayOfPrices.push("1000")
            break;
        case "Доп пакет 4":
            TempArrayOfPrices.push("10000")
            break;
        case "Доп пакет 5":
            TempArrayOfPrices.push("14000")
            break;
        default:
            TempArrayOfPrices.push("0")
        }
        return TempArrayOfPrices;
    }



    //Чтобы очищять дисплей и Значение в обьекте
    displayClear(){
        //const  {displayValue} = calculatorAdderObject;
        this.DISPLAY_ELEMENT.value = "";
        this.displayValue = "";
    }
  
  
    //Чтобы бы выводить что либо на дисплей
    displayValues(){
        //const  {displayValue} = calculatorAdderObject;
        if(this.ArrayOfServices.length === 0 &&  this.ArrayOfRangeNum.length === 0){
            this.displayValue = "Давайте посчитаем";
        }
        this.DISPLAY_ELEMENT.value += this.displayValue;
    }
  
  
    //Чтобы бы выводить что либо на дисплей
    AddInArrayHandlerService(Value){
        this.ArrayOfServices.push(Value);
        var lastSum = this.ArrayOfServices.length-1;
        this.serviceName = this.ArrayOfServices[lastSum];
        this.PricesOfProducts.push(this.definePrice(this.serviceName)[0])
        this.totalServicesCounted = null;
        this.displayClear();
        this.displayValue = this.PackegesAdder() + this.totalAdditionalCounted;
        this.displayValues();
    
    
    }
  
  
    //Получаем значение с range лейбла и записываем в масив 
    AddInArrayHandlerRangeNum(Value){
        this.ArrayOfRangeNum.push(Value);
        var lastSum = this.ArrayOfRangeNum.length-1;
        this.displayClear();
        this.displayValue = this.RangeCalculate(parseFloat(this.ArrayOfRangeNum[lastSum])) + this.totalServicesCounted;
        this.totalAdditionalCounted = null;
        this.totalAdditionalCounted =  this.RangeCalculate(parseFloat(this.ArrayOfRangeNum[lastSum]));
        this.displayValues();
    
   
    }
  
  
  
    //Подсчет доп пакетов  по формуле 
    RangeCalculate(LastNumOfArray){
        return LastNumOfArray * this.baseAdditionalPrice;
    }
  
  
    //Подсчет всех услуг и доп услуг
    PackegesAdder(){
        //const sum = calculatorAdderObject.PricesOfProducts.reduce((partialSum, a) => partialSum + a, 0);
  
        for (let i = 0; i < this.PricesOfProducts.length; i++) {
            this.totalServicesCounted += parseFloat(this.PricesOfProducts[i]);
        
        }
        //посчитанные пакеты
        return this.totalServicesCounted;
  
    }
  
  
  
  
  
  
}




new calculatorAdderObject();