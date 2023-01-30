export function sortArray<T>(type: unknown, data: T[], sortDirection: 'asc' | 'desc', compareFn?: (a: T, b: T) => number): T[] {
/**
 * fix-bug:  qty & quoteQty
 */

    if (!data) return [];
  
    if (!compareFn) {
      switch (type) {
        case 'price':
          compareFn = (a: any, b: any) => parseInt(a) - parseInt(b);
          break;
        case 'time':
          compareFn = (a: any, b: any) => parseInt(a) - parseInt(b);
          break;
        case 'quoteQty':
          compareFn = (a: any, b: any) => parseFloat(a) - parseFloat(b);
          break;
        case 'qty':
          compareFn = (a: any, b: any) =>  parseFloat(a) - parseFloat(b);
          break;
        default:
          return data;
      }
    }
  
    const sortedData = data.sort(compareFn);
  
    return sortDirection === 'desc' ? sortedData.reverse() : sortedData;
  }