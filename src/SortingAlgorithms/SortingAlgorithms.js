 export const mergeSort = array => {
    if (array.length > 1) {
        // split array in half and make 2 sub arrays
        let middleIdx = Math.floor(array.length / 2) 
        let firstHalf = mergeSort(array.slice(0, middleIdx))
        let secondHalf = mergeSort(array.slice(middleIdx))
        let sortedArr = []
        let i = 0, j = 0
        // merge 2 sub arrays together in sorted order
        //  done by: if arr1[i] < arr2[j] 
        //              sortedArr[k] = arr1[i]
        //              i++
        //           else
        //              sortedArr[k] = arr2[i]
        //              j++
        //           k++
        while (i < firstHalf.length && j < secondHalf.length) {
            if (firstHalf[i] < secondHalf[j]) {
                sortedArr.push(firstHalf[i])
                i++
            } else {
                sortedArr.push(secondHalf[j])
                j++
            }
        }

        // if one of the arrays is smaller than the other
        // copy over all contents of larger array
        while (i < firstHalf.length) {
            sortedArr.push(firstHalf[i])
            i++
        }

        while (j < secondHalf.length) {
            sortedArr.push(secondHalf[j])
            j++
        }
        return sortedArr
    }
    return array
}