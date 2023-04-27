enum ContractType {
  PERPETUAL = 'PERPETUAL',
  FUTURES = 'FUTURES',
  COIN_MARGIN = 'COIN-MARGIN',
  USDT_MARGIN = 'USDT-MARGIN',
}

class Binance {
  static readonly SPOT_FEE_RATE = 0.001; // 现货手续费费率
  static readonly FUTURE_TAKER_FEE_RATE = 0.0004; // 合约吃单手续费费率
  static readonly FUTURE_MAKER_FEE_RATE = 0.0002; // 合约挂单手续费费率

  static calculateSpotFee(quantity: number, price: number): number {
    return quantity * price * this.SPOT_FEE_RATE;
  }

  static calculateFutureFee(
    contractType: ContractType,
    quantity: number,
    price: number,
    leverage: number,
    fundingRate: number,
  ): number {
    const notional = quantity * price;
    const takerFeeRate = this.FUTURE_TAKER_FEE_RATE * leverage;
    const makerFeeRate = this.FUTURE_MAKER_FEE_RATE * leverage;
    let feeRate = 0;

    switch (contractType) {
      case ContractType.PERPETUAL:
        feeRate =
          fundingRate > 0
            ? makerFeeRate - fundingRate
            : takerFeeRate + fundingRate;
        break;
      case ContractType.FUTURES:
        feeRate = takerFeeRate;
        break;
      case ContractType.COIN_MARGIN:
      case ContractType.USDT_MARGIN:
        feeRate = makerFeeRate;
        break;
      default:
        break;
    }

    return notional * feeRate;
  }

  static calculateFundingFee(
    contractType: ContractType,
    quantity: number,
    price: number,
    fundingRate: number,
  ): number {
    const notional = quantity * price;
    let feeRate = 0;

    switch (contractType) {
      case ContractType.PERPETUAL:
        feeRate = fundingRate;
        break;
      case ContractType.FUTURES:
        feeRate = 0;
        break;
      case ContractType.COIN_MARGIN:
      case ContractType.USDT_MARGIN:
        feeRate = 0;
        break;
      default:
        break;
    }

    return notional * feeRate;
  }
}

// 计算现货手续费
const spotQuantity = 100; // 现货数量
const spotPrice = 50; // 现货价格
const spotFee = Binance.calculateSpotFee(spotQuantity, spotPrice); // 现货手续费
console.log(`现货手续费为：${spotFee}`);

// 计算合约手续费和资金费用
const futureQuantity = 10; // 合约数量
const futurePrice = 50000; // 合约价格
const leverage = 10; // 合约杠杆倍数
const fundingRate = 0.001; // 资金费率
const contractType = ContractType.PERPETUAL; // 合约类型
const futureFee = Binance.calculateFutureFee(
  contractType,
  futureQuantity,
  futurePrice,
  leverage,
  fundingRate,
); // 合约手续费
const fundingFee = Binance.calculateFundingFee(
  contractType,
  futureQuantity,
  futurePrice,
  fundingRate,
); // 资金费用
// console.log(合约手续费为：${futureFee});
// console.log(资金费用为：${fundingFee});
