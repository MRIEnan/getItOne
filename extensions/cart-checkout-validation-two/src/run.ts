import type {
  RunInput,
  FunctionRunResult,
  FunctionError,
  BuyerJourneyStep,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  const targetedValue = 100;
  const targetedCurrency  = "USD";
  const subTotalValue = input.cart.cost.totalAmount.amount;

  const buyerStep:BuyerJourneyStep = input.buyerJourney.step!;
  
  const errorMessage = {
    localizedMessage: "Not possible to order more than one of each",
    target: "cart",
  }
  const errors:FunctionError[] = []
  
  if(buyerStep == 'CHECKOUT_INTERACTION'){
    if(subTotalValue < 100){
      const myError = {
        localizedMessage: `minimum value is ${targetedValue} ${targetedCurrency}`,
        target: "cart",
      }
      errors.push(myError)
      return {
        errors
      }
    }
    
  }
  
  return {
    errors:[]
  } 
};


