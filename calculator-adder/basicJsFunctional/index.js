const calculatorAdderObject = {
  displayValue: null, //тут храниться текущее состояние на дисплее
  serviceName:"",     //Название Услуги или пакета
  PricesOfProducts: [], //складываем цены дял суммирования 
  totalServicesCounted:null, //Сколько получилось услуг и пакетов итоговая цена
  totalAdditionalCounted:null,//Сколько получилось дополнений  итоговая цена
  baseAdditionalPrice: 200 //Сколько стоит единица  дополнения 
  
}

//Берем данные из полей по клику
const display = document.querySelector('.calculator-screen');
const keys =  document.querySelector('.calculator-keys');
const range =  document.querySelector('.wrapperrange');
const erase =  document.querySelector('.erase');




keys.addEventListener('click', (event) => {
  const { target } = event;
  if(target.value){
    AddInArrayHandlerService(target.value)
  }
 
});

range.addEventListener('click', (event) => {
  const { target } = event;
  if(target.value){
    AddInArrayHandlerRangeNum(target.value)
  }
 
});
erase.addEventListener('click', () => {

  displayClear();
  calculatorAdderObject.serviceName= "";
  calculatorAdderObject.PricesOfProducts= [];
  calculatorAdderObject.totalServicesCounted = null;
  calculatorAdderObject.totalAdditionalCounted = null;

 
});




//Название услуг типо  Услуга 1
const ArrayOfServices = [];

//Кол-во доп пакетов
const ArrayOfRangeNum = [];


function definePrice(type){
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
function displayClear(){
  //const  {displayValue} = calculatorAdderObject;
  display.value = "";
  calculatorAdderObject.displayValue = "";
}



//Чтобы бы выводить что либо на дисплей
function displayValues(){
  //const  {displayValue} = calculatorAdderObject;
  if(ArrayOfServices.length === 0 &&  ArrayOfRangeNum.length === 0){
    calculatorAdderObject.displayValue = "Давайте посчитаем";
  }
  display.value += calculatorAdderObject.displayValue;
}






//Чтобы бы выводить что либо на дисплей
function AddInArrayHandlerService(Value){
  ArrayOfServices.push(Value);
  var lastSum = ArrayOfServices.length-1;
 
  calculatorAdderObject.serviceName = ArrayOfServices[lastSum];
  calculatorAdderObject.PricesOfProducts.push(definePrice(calculatorAdderObject.serviceName)[0])
  calculatorAdderObject.totalServicesCounted = null;
  displayClear();
  calculatorAdderObject.displayValue = PackegesAdder() + calculatorAdderObject.totalAdditionalCounted;
  displayValues();
  
  
}


//Получаем значение с range лейбла и записываем в масив 
function AddInArrayHandlerRangeNum(Value){
  
  ArrayOfRangeNum.push(Value);
  var lastSum = ArrayOfRangeNum.length-1;
 
  
  displayClear();
  calculatorAdderObject.displayValue = RangeCalculate(parseFloat(ArrayOfRangeNum[lastSum])) + calculatorAdderObject.totalServicesCounted;
  calculatorAdderObject.totalAdditionalCounted = null;
  calculatorAdderObject.totalAdditionalCounted =  RangeCalculate(parseFloat(ArrayOfRangeNum[lastSum]));
  displayValues();
  
 
}



//Подсчет доп пакетов  по формуле 
function RangeCalculate(LastNumOfArray){
 return LastNumOfArray * calculatorAdderObject.baseAdditionalPrice;
}




//Подсчет всех услуг и доп услуг
function PackegesAdder(){
 //const sum = calculatorAdderObject.PricesOfProducts.reduce((partialSum, a) => partialSum + a, 0);

  for (let i = 0; i < calculatorAdderObject.PricesOfProducts.length; i++) {
    calculatorAdderObject.totalServicesCounted += parseFloat(calculatorAdderObject.PricesOfProducts[i]);
    
  }
  //посчитанные пакеты
  return calculatorAdderObject.totalServicesCounted;

}






displayValues();
