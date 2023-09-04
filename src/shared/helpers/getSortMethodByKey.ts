export function getSortMethodByKey(key: number) {
  switch (key) {
    case 0:
      return {code: 'name.en asc', value: 'Name ↑'}
    case 1:
      return {code: 'lastModifiedAt asc', value: 'Added ↑'}
    case 2:
      return {code: 'price asc', value: 'Price ↑'}
    case 3:
      return {code: 'price desc', value: 'Price ↓'}
    default:
      return {code: 'name.en asc', value: 'Name ↑'}
  }
}