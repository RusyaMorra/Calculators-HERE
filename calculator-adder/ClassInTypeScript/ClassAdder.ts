//ПОКА ВСЕ ПОНЯЛ ПУБЛИЧНЫЕ, НО  МОЖНО ПРОСТАВИТЬ МОДИФИКАТОРЫ ДОСТУПА, И ВЫДЕЛИТЬ МЕТОДЫ ИМЕННО ДЛЯ ИНТЕРФЕЙСА

interface SelectorInterface{
    display: HTMLInputElement|null;
    keys: HTMLInputElement|null;
    range: HTMLInputElement|null;
    erase: HTMLInputElement|null;
}
interface calculatorAdderInterface{
    DISPLAY_ELEMENT;
    displayValue: string | number |  null | undefined; //тут храниться текущее состояние на дисплее
    serviceName: string ;    //Название Услуги или пакета
    PricesOfProducts: Array<string>; //складываем цены дял суммирования 
    totalServicesCounted:  number | null | undefined | any; //Сколько получилось услуг и пакетов итоговая цена
    totalAdditionalCounted:  number | null | undefined | any; //Сколько получилось дополнений  итоговая цена
    baseAdditionalPrice:  number; //Сколько стоит единица  дополнения 
    //Название услуг типо  Услуга 1
    ArrayOfServices: Array<string>;
    //Кол-во доп пакетов
    ArrayOfRangeNum: Array<string>;

    Selector (): SelectorInterface;
    ListeningEventsOnClick<T extends SelectorInterface>(ObjectWithSelectors: T | any ): void;
    definePrice (type:string): Array<string>;
    displayClear(): void;
    displayValues(): void;
    AddInArrayHandlerService(Value: string): void;
    AddInArrayHandlerRangeNum(Value: string): void;
    RangeCalculate(LastNumOfArray: number): number;
    PackegesAdder(): void;
    

}

class calculatorAdderClass implements calculatorAdderInterface {


    public DISPLAY_ELEMENT;
    
    public displayValue: string | number |  null | undefined  = null; //тут храниться текущее состояние на дисплее
    public serviceName: string = "";    //Название Услуги или пакета
    public PricesOfProducts: Array<string> = []; //складываем цены дял суммирования 
    public totalServicesCounted:  number | null | undefined | any  = null; //Сколько получилось услуг и пакетов итоговая цена
    public totalAdditionalCounted:  number | null | undefined | any  = null; //Сколько получилось дополнений  итоговая цена
    readonly baseAdditionalPrice:  number  = 200; //Сколько стоит единица  дополнения 
    
    //Название услуг типо  Услуга 1
    public ArrayOfServices: Array<string> = [];

    //Кол-во доп пакетов
    public ArrayOfRangeNum: Array<string> = [];

    // методы класса
    public  constructor() { 
        this.ListeningEventsOnClick(this.Selector());
        this.displayValues();
    }

    //Тут вы вытягиваем все данные из дом элементов 
    public  Selector ():  SelectorInterface  {
        //Берем данные из полей по клику
        const display = document.querySelector<HTMLInputElement>('.calculator-screen');
        const keys =  document.querySelector<HTMLInputElement>('.calculator-keys');
        const range =  document.querySelector<HTMLInputElement>('.wrapperrange');
        const erase =  document.querySelector<HTMLInputElement>('.erase');

            return {
            display: display,
            keys: keys ,
            range: range,
            erase: erase 
            };
    }

    //тут мы слушаем события на наших селектарах
    public  ListeningEventsOnClick<T extends SelectorInterface>(ObjectWithSelectors: T | any ): void{
        // Записываем дисплейв свойства
        this.DISPLAY_ELEMENT =  ObjectWithSelectors.display;

        ObjectWithSelectors.keys.addEventListener('click', (event: MouseEvent): void => {
            const { target } = <any|null|undefined>event;
            if(target.value){
                this.AddInArrayHandlerService(target.value);
            }
        
        });
    
        ObjectWithSelectors.range.addEventListener('click', (event: MouseEvent): void => {
            const { target } = <any|null|undefined>event;
            if(target.value){
                this.AddInArrayHandlerRangeNum(target.value);
            }
        
        });
        ObjectWithSelectors.erase.addEventListener('click', (): void => {
        
            this.displayClear();
            this.serviceName= "";
            this.PricesOfProducts= [];
            this.totalServicesCounted = null;
            this.totalAdditionalCounted = null;
        
        
        });
    }


    //Определяем у какой услуги какая цена 
    public definePrice (type:string): Array<string>{
        //Будем перебирать всё и складывать сумму 
        const TempArrayOfPrices: Array<string>  = [];
    
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
    public displayClear(): void{
        //const  {displayValue} = calculatorAdderObject;
        this.DISPLAY_ELEMENT.value = "";
        this.displayValue = "";
    }
  
  
    //Чтобы бы выводить что либо на дисплей
    public displayValues(): void{
        //const  {displayValue} = calculatorAdderObject;
        if(this.ArrayOfServices.length === 0 &&  this.ArrayOfRangeNum.length === 0){
            this.displayValue = "Давайте посчитаем";
        }
        this.DISPLAY_ELEMENT.value += this.displayValue;
    }
  
  
    //Чтобы бы выводить что либо на дисплей
    public AddInArrayHandlerService(Value: string): void{
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
    public AddInArrayHandlerRangeNum(Value: string): void{
        this.ArrayOfRangeNum.push(Value);
        var lastSum = this.ArrayOfRangeNum.length-1;
        this.displayClear();
        this.displayValue = this.RangeCalculate(parseFloat(this.ArrayOfRangeNum[lastSum])) + this.totalServicesCounted;
        this.totalAdditionalCounted = null;
        this.totalAdditionalCounted =  this.RangeCalculate(parseFloat(this.ArrayOfRangeNum[lastSum]));
        this.displayValues();
    
   
    }
  
  
  
    //Подсчет доп пакетов  по формуле 
    public  RangeCalculate(LastNumOfArray: number): number{
        return LastNumOfArray * this.baseAdditionalPrice;
    }
  
  
    //Подсчет всех услуг и доп услуг
    public PackegesAdder(): void{
        //const sum = calculatorAdderObject.PricesOfProducts.reduce((partialSum, a) => partialSum + a, 0);
  
        for (let i = 0; i < this.PricesOfProducts.length; i++) {
            this.totalServicesCounted += parseFloat(this.PricesOfProducts[i]);
        
        }
        //посчитанные пакеты
        return this.totalServicesCounted;
  
    }
  
  
  
}

new calculatorAdderClass();