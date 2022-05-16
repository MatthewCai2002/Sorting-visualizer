import { useEffect, useState } from "react"
import "./SortingVisualizer.css"

function SortingVisualizer() {
    const [mainArray, setMainArray] = useState([])
    const [animationSpeed, setAnimationSpeed] = useState(10)

    // generate an array of random integer values
    const randomArray = (length, min, max) => {
        setMainArray([...new Array(length)].map(() => Math.floor(Math.random()*(max-min+1)+min)))
    }
    
    // sets state of component to random array
    const resetArray = () => {
        randomArray(100,3,80)
    }
    
    useEffect(() => {
        resetArray()
    }, [])

    const sleep = (milliSeconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliSeconds))
    }

    // testing method
    const isArrayEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false
            }

        }
        return true
    }

    // update the colour of bars i and j
    const updateBarColour = async (sortedArray, i, j) => {
        let bar1 = document.getElementById(i).style
        let bar2 = document.getElementById(j).style
        bar1.backgroundColor = "#ed1c24"
        bar2.backgroundColor = "#ed1c24"
        await sleep(animationSpeed)
        bar1.backgroundColor = "#415a77"
        bar2.backgroundColor = "#415a77"            
        setMainArray([...mainArray, sortedArray])
    }

    // change the colour of all bars in mainArray to be green
    // when sorting is done
    const updateSortedBarColour = async () => {
        for (let i = 0; i <= mainArray.length; i++) {
            let bar = document.getElementById(i).style
            bar.backgroundColor = "#007a6c"
            await sleep(animationSpeed)
        }
    }

    const resetBarColour = () => {
        for (let i = 0; i <= mainArray.length; i++) {
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
            await updateBarColour(sortedArray, i, j)
            
        }
        while (i <= mid) {
            sortedArray.push(array[i++])
            await updateBarColour(sortedArray, i, j)
        }
    
        while (j <= upper) {
            sortedArray.push(array[j++])
            await updateBarColour(sortedArray, i, j)
        }

        for (let i = lower; i <= upper; i++) {
            array[i] = sortedArray[i - lower]
            setMainArray([...mainArray, array])
        }        
    }
    


    // ********** insertion sort algorithm **********
    const insSort = () => {

    }

    // ********** selection sort algorithm **********
    const selSort = () => {

    }

    // ********** heap sort algorithm **********
    const heapSort = () => {

    }


    return (
        <div className="visualizer-container">
            <div className="btn-container">
                <button onClick={() => {resetArray(); resetBarColour()}} className="gen-array-btn"> Generate New Array</button>
                <button onClick={() => {mergeSort(); resetBarColour()}}>Merge Sort</button>
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