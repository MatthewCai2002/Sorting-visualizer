export async function mergeSort(array, lower, upper) {
    if (lower < upper) {
        const mid = (lower + upper) / 2
        mergeSort(array, 0, mid)
        mergeSort(array, mid + 1, upper)
        merge(array, lower, mid, upper)
    }
}

async function merge(array, lower, mid, upper) {
    let i = lower
    let j = mid + 1
    let sortedArray = []
    while (i <= mid && j <= upper) {
        if (array[i] < array[j]) {
            sortedArray.push(array[i++])
        } else {
            sortedArray.push(array[j++])
        }
    }
    while (i <= mid) {
        sortedArray.push(array[i++])
    }

    while (j <= upper) {
        sortedArray.push(array[j++])
    }
}