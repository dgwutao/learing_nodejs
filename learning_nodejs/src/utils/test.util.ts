// src/example.ts

interface User {
  id: number;
  name: string;
  email?: string;
}

// 问题 1：@typescript-eslint/no-explicit-any —— 使用了 any
function parseUser(data: any): User {
  return {
    id: data.id,
    name: data.name,
  };
}

// 问题 2：@typescript-eslint/no-unused-vars —— unusedVar 声明后从未使用
const unusedVar = 42;

// 问题 3：@typescript-eslint/no-unused-vars —— 参数 prefix 未使用
function formatName(name: string, prefix: string): string {
  return name.trim();
}

// 问题 4：@typescript-eslint/ban-ts-comment —— 使用了 @ts-ignore
// @ts-ignore
const userId: number = "not-a-number";

// 问题 5：@typescript-eslint/no-empty-object-type —— 空接口
interface Empty {}

// 问题 6：@typescript-eslint/no-explicit-any
export function logData(value: any): void {
  console.log(value);
}

// ✅ 正常代码，不应报错
export function greet(user: User): string {
  return `Hello, ${user.name}`;
}