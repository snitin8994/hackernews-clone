export function noOfPages(items) {
    if(items<=20) return 1;
    return Math.floor(items/20) + ((items %20) >0)? 1: 0;
}