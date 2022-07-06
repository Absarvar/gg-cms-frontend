export const ProductStatus = {
    IN_STOCK: 1,

    ON_SALE: 5,

    FROZEN_STOCK: 7,

    IN_CART: 10,

    ORDERED: 13,

    PAYED: 15,

    OUT_STOCK: 20,

    BILLED: 30,

    INVALID: -1
}

export const ProductStatusMap = {
    1: {
      status: 'default',
      text: '已入库'
    },
    13: {
      status: 'processing',
      text: '已下单'
    },
    15: {
      status: 'processing',
      text: '已支付'
    },
    20: {
      status: 'success',
      text: '已出库'
    }
  }

export const OrderStatus = {
    //    状态，0-未支付，5-支付中，10-已支付，-5-订单关闭  -10 -退货
    NOT_PAY: 0,
    PAYING: 5,
    PAYED: 10,
    OUT_STOCK: 15,
    CANCELED: -5,
    APPLYING_WITHDRAW: -8,
    WITHDRAW: -10
}
