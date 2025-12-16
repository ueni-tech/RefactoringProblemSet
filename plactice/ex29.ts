// ex29: 複雑なネストと早期リターンの欠如
// 問題点:
// - ネストが深すぎる
// - 早期リターンがない
// - 正常系と異常系が混在
// - 読みづらい
// 期待する練習:
// - ガード節の導入
// - 早期リターンの導入
// - 条件記述の単純化

function processPayment(order: any, paymentMethod: any, user: any): any {
  if (order !== null) {
    if (order.items !== undefined && order.items.length > 0) {
      if (order.total > 0) {
        if (paymentMethod !== null) {
          if (paymentMethod.type === 'credit' || paymentMethod.type === 'debit') {
            if (user !== null) {
              if (user.verified === true) {
                if (user.balance >= order.total) {
                  const result = {
                    success: true,
                    orderId: order.id,
                    amount: order.total,
                    method: paymentMethod.type
                  };
                  return result;
                } else {
                  return { success: false, error: 'Insufficient balance' };
                }
              } else {
                return { success: false, error: 'User not verified' };
              }
            } else {
              return { success: false, error: 'User not found' };
            }
          } else {
            return { success: false, error: 'Invalid payment method' };
          }
        } else {
          return { success: false, error: 'Payment method required' };
        }
      } else {
        return { success: false, error: 'Invalid order total' };
      }
    } else {
      return { success: false, error: 'Order has no items' };
    }
  } else {
    return { success: false, error: 'Order not found' };
  }
}

function validateAndProcess(data: any): any {
  if (data !== null) {
    if (data.email !== undefined) {
      if (data.email.includes('@')) {
        if (data.name !== undefined) {
          if (data.name.length > 0) {
            if (data.age !== undefined) {
              if (data.age >= 18) {
                return { valid: true, data };
              } else {
                return { valid: false, error: 'Age must be 18 or older' };
              }
            } else {
              return { valid: false, error: 'Age is required' };
            }
          } else {
            return { valid: false, error: 'Name cannot be empty' };
          }
        } else {
          return { valid: false, error: 'Name is required' };
        }
      } else {
        return { valid: false, error: 'Invalid email format' };
      }
    } else {
      return { valid: false, error: 'Email is required' };
    }
  } else {
    return { valid: false, error: 'Data is required' };
  }
}

const order = { id: 1, items: [{ price: 1000 }], total: 1000 };
const payment = { type: 'credit' };
const user = { verified: true, balance: 5000 };
const result = processPayment(order, payment, user);
const validated = validateAndProcess({ email: 'test@example.com', name: 'John', age: 25 });

export { processPayment, validateAndProcess };

