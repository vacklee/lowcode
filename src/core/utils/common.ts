import ShortUniqueId from 'short-unique-id'

// 生成唯一ID
export function genId() {
  return new ShortUniqueId({ length: 10 }).rnd()
}
