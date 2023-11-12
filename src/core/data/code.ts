// 代码表达式
export type Expression = {
  __isCodeExpression: true
  content: string
}

// 定义代码表达式
export function defineExpression(content: string): Expression {
  return {
    __isCodeExpression: true,
    content
  }
}

// 获取代码表达式的返回值
export function getReturnValue<T>(express: Expression): T {
  console.log(express)
  return '' as T
}

// 判断是否是代码表达式
export function isExpression(s: unknown): s is Expression {
  return !!(s && (s as any).__isCodeExpression)
}
