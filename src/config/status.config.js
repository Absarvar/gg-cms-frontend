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

export const OrderStatusMap = {
  0: {
    status: 'default',
    text: '未支付'
  },
  2: {
    status: 'default',
    text: '历史单'
  },
  3: {
    status: 'default',
    text: '历史单'
  },
  5: {
    status: 'processing',
    text: '未支付'
  },
  10: {
    status: 'processing',
    text: '已支付'
  },
  15: {
    status: 'success',
    text: '已出库'
  }
}

export const PreorderStatus = {
  DISABLED: -1,
  NOT_CONFIRMED: 1,
  BALANCE_NOT_ENOUGH: 2,
  CONFIRMED: 4,
  GOODS_SENT: 5
}

export const PreorderStatusMap = {
  1: {
    status: 'default',
    text: '未确认'
  },
  2: {
    status: 'processing',
    text: '余额不足'
  },
  4: {
    status: 'processing',
    text: '已确认'
  },
  5: {
    status: 'success',
    text: '已配货'
  }
}

export const MEMBER_TYPE = {
  SUPPLIER: 1,
  MERCHANT: 2,
  OUTSIDE_MERCHANT: 3,
  SOURCE: 4,
  TERMINAL: 5
}

export const MemberTypeMap = {
  1: {
    status: 'processing',
    text: '供应商'
  },
  2: {
    status: 'processing',
    text: '商户'
  },
  3: {
    status: 'processing',
    text: '挂靠商户'
  },
  4: {
    status: 'processing',
    text: '源头'
  },
  5: {
    status: 'processing',
    text: '终端'
  }
}

export const MainTypeMap = {
  1: {
    status: 'processing',
    text: '交'
  },
  2: {
    status: 'processing',
    text: '普'
  }
}
