import { useEffect, useState } from "react"
import "./SortingVisualizer.css"

function SortingVisualizer() {
    const [mainArray, setMainArray] = useState([])
    const [animationSpeed, setAnimationSpeed] = useState(10)

    // generate an array of random integer values
    const randomArray = (length, min, max) => {
        let array = ([...new Array(length)].map(() => Math.floor(Math.random()*(max-min+1)+min)))
        return array
    }
    
    // sets state of component to random array
    const resetArray = () => {
        let array = randomArray(100,3,80)
        resetBarColour()
        setMainArray(array)
    }
    
    useEffect(() => {
        resetArray()
    },[])

    const sleep = (milliSeconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliSeconds))
    }

    // update the colour of bars i and j
    
    const updateColourMergeSort = async (sortedArray, i, j) => {
        setMainArray([...mainArray, sortedArray])
        let bar1 = document.getElementById(i).style
        let bar2 = document.getElementById(j).style
        bar1.backgroundColor = "#ed1c24"
        bar2.backgroundColor = "#ed1c24"
        await sleep(animationSpeed)
        bar1.backgroundColor = "#415a77"
        bar2.backgroundColor = "#415a77"            
    }

    const updateBarColour = async (sortedArray, i, j) => {
        setMainArray([...sortedArray])
        let bar1 = document.getElementById(i).style
        let bar2 = document.getElementById(j).style
        bar1.backgroundColor = "#ed1c24"
        bar2.backgroundColor = "#ed1c24"
        await sleep(animationSpeed)
        bar1.backgroundColor = "#415a77"
        bar2.backgroundColor = "#415a77"            
    }

    // change the colour of all bars in mainArray to be green
    // when sorting is done
    const updateSortedBarColour = async () => {
        for (let i = 0; i < mainArray.length; i++) {
            let bar = document.getElementById(i).style
            bar.backgroundColor = "#007a6c"
            await sleep(animationSpeed)
        }
    }

    const resetBarColour = () => {
        for (let i = 0; i < mainArray.length; i++) {
            let bar = document.getElementById(i).style
            bar.backgroundColor = "#415a77"
        }
    }
    
    // ********** merge sort algorithm **********
    const mergeSort = async () => {
        await mSort(mainArray, 0, mainArray.length - 1)
        updateSortedBarColour()
    }

    // mergeSort algorithm helper: splits array into
    // 2 subarrays and merges them together
    const mSort = async (array, lower, upper) => {
        if (lower < upper) {
            const mid = Math.floor((lower + upper) / 2)
            await mSort(array, lower, mid)
            await mSort(array, mid + 1, upper)
            await merge(array, lower, mid, upper)
        }
    }
    
    // mergeSort algorithm helper: merges 2 sub arrays
    // into 1 sorted array
    const merge = async (array, lower, mid, upper) => {
        let i = lower
        let j = mid + 1
        let sortedArray = []
        while (i <= mid && j <= upper) {
            if (array[i] < array[j]) {
                sortedArray.push(array[i++])
            } else {
                sortedArray.push(array[j++])
            }
            await updateColourMergeSort(sortedArray, i, j)
            
        }
        while (i <= mid) {
            sortedArray.push(array[i++])
            await updateColourMergeSort(sortedArray, i, j)
        }
        
        while (j <= upper) {
            sortedArray.push(array[j++])
            await updateColourMergeSort(sortedArray, i, j)
        }
        
        for (let i = lower; i <= upper; i++) {
            array[i] = sortedArray[i - lower]
            setMainArray([...mainArray, array])
        }        
    }
    
    
    
    // ********** insertion sort algorithm **********
    const insSort = async () => {
        await iSort(mainArray)
        updateSortedBarColour()
    }

    const iSort = async (array) => {
        for (let i = 1; i < array.length; i++) {
            await slide(array,i)
        }
    }
    
    const slide = async (array, i) => {
        let j = i - 1
        // swap position of ints if out of position
        while (j >=0 && array[j] > array[i]) {
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
            await updateBarColour(array,i,j)
            j--
            i-- 
        }
    }

    // ********** selection sort algorithm **********
    const selSort = async () => {
        await sSort(mainArray)        
        updateSortedBarColour()        
    }

    const sSort = async (array) => {
        for (let i = 0; i < array.length; i++) {
            let minIdx = await findMin(array, i, array.length)
            let min = array[minIdx]
            let temp = array[i]
            array[i] = min
            array[minIdx] = temp
        }
    }

    const findMin = async (array, lower, upper) => {
        let minIdx = lower;
        for (let i = lower; i < upper; i++) {
            if (array[i] < array[minIdx]) {
                minIdx = i
            }
            await updateBarColour(array,lower, i)
        }
        return minIdx
    }

    // ********** heap sort algorithm **********
    const heapSort = () => {

    }

    // ********** testing methods **********
    const isArrayEqual = (actual, expected) => {
        if (actual.length !== expected.length) {
            console.log("expected Length: ", expected.length, "actual Length", actual.length)
            return false
        }
        for (let i = 0; i < actual.length; i++) {
            if (actual[i] !== expected[i]) {
                console.log("expected Value: ", expected[i], "actual Value: ", actual[i])
                console.log(actual)
                console.log(expected)
                return false
            }
        }
        return true
    }

    const randomIntInInterval = (min, max) => {
        return Math.floor(Math.random()*(max-min+1)+min)
    }

    const testSortingAlgos = async (sortingAlgo) => {
        for (let i = 0; i < 100; i++) {
            let tempArray = []
            for (let i = 0; i < randomIntInInterval(1, 1000); i++) {
                tempArray.push(randomIntInInterval(-1000, 1000))
            }
            let testArray = [...tempArray]
            await sortingAlgo(testArray)
            let jsSortedArray = [...tempArray].sort((a, b) => a - b)
            console.log(isArrayEqual(testArray, jsSortedArray))
        }
    }

    return (
        <div className="visualizer-container">
            <div className="btn-container">
                <button onClick={() => {resetArray()}} className="gen-array-btn"> Generate New Array</button>
                <button onClick={() => {mergeSort()}}>Merge Sort</button>
                <button onClick={() => {insSort()}}>Insertion Sort</button>
                <button onClick={() => {selSort()}}>Selection Sort</button>
                <button onClick={() => {heapSort()}}>Heap Sort</button>
            </div>
            <div className="array-container">
                {mainArray && mainArray.map((value, idx) => (
                    <div className="val-bar" id={idx} key={idx} style={{height: `${value}vh`}}>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SortingVisualizer;