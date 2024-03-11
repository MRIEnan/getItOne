import type {
  RunInput,
  FunctionRunResult,
  ProductVariant
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

type Configuration = {};

export function run(input: RunInput): FunctionRunResult {
  // const configuration: Configuration = JSON.parse(
  //   input?.discountNode?.metafield?.value ?? "{}"
  // );
  // return EMPTY_DISCOUNT;
  // if(line.merchandise.__typename == "ProductVariant"){
  //   const isCollection = line.merchandise.product.inAnyCollection;
  //   return isCollection === false;
  // }

  const targets = input.cart.lines
  .filter((line) => line.merchandise.__typename == "ProductVariant" && line.merchandise.product.inAnyCollection).map(line =>{
      const variant = line.merchandise as ProductVariant
      return{
        productVariant: {
          id: variant.id
        }
      }
  })

  console.log(targets)

  if (!targets.length) {
    // You can use STDERR for debug logs in your function
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: [
      {
        // Apply the discount to the collected targets
        targets,
        // Define a percentage-based discount
        value: {
          percentage: {
            value: 40
          }
        },
        message:"40% OFF"
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First
  };
};