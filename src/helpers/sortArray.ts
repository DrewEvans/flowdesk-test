export function sortArray<T>(type: unknown, data: T[], sortDirection: 'asc' | 'desc', compareFn?: (a: T, b: T) => number): T[] {
    if (!data) return [];
  
    if (!compareFn) {
      switch (type) {
        case 'price':
          compareFn = (a: any, b: any) => a - b;
          break;
        case 'time':
          compareFn = (a: any, b: any) => a - b;
          break;
        case 'qty':
          compareFn = (a: any, b: any) => a - b;
          break;
        case 'quoteQty':
          compareFn = (a: any, b: any) => a - b;
          break;
        // case 'qty':
        //   compareFn = (a, b) => {
        //     if (a < b) return -1;
        //     if (a > b) return 1;
        //     return 0;
        //   };
        //   break;
        default:
          return data;
      }
    }
  
    const sortedData = data.sort(compareFn);
  
    return sortDirection === 'desc' ? sortedData.reverse() : sortedData;
  }