//performs a simple binary search on a given item ID
function binarySearch(arr, x, start, end) { 
    
    // Base Condition 
    if (start > end) return false; 
   
    // Find the middle index 
    let mid = Math.floor((start + end) / 2); 

    // Compare mid with given key x 
    if (arr[mid]===x) return mid; 
          
    // If element at mid is greater than x, 
    // search in the left half of mid 
    if(arr[mid] > x)  
        return binarySearch(arr, x, start, mid-1); 
    else
  
        // If element at mid is smaller than x, 
        // search in the right half of mid 
        return binarySearch(arr, x, mid+1, end); 
} 

export default binarySearch;