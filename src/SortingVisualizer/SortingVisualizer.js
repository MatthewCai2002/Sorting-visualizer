import { useEffect, useState } from "react"
import "./SortingVisualizer.css"

function SortingVisualizer() {
    const [mainArray, setMainArray] = useState([])
    const [animationSpeed, setAnimationSpeed] = useState(10)

    // generate an array of random integer values
    const randomArray = (length, min, max) => {
        let array = ([...new Array(length)].map(() => randomIntInInterval(min,max)))
        return array
    }

    // creates new random array
    const shuffle = async (array, min, max) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            array[currentIndex] = randomIntInInterval(min, max)
            array[randomIndex] = randomIntInInterval(min, max)

            let bar1 = document.getElementById(currentIndex).style
            let bar2 = document.getElementById(randomIndex).style
            bar1.backgroundColor = "#415a77"
            bar2.backgroundColor = "#415a77"
            await sleep(animationSpeed)
            setMainArray([...array])
        }
        let elems = document.getElementsByClassName("button");
        for(var i = 0; i < elems.length; i++) {
            elems[i].disabled = false;
        }
      }
    
    // sets state of component to random array
    const resetArray = () => {
        let array = randomArray(100,3,80)
        setMainArray(array)
    }
    
    useEffect(() => {
        resetArray()
    },[])

    const sleep = (milliSeconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliSeconds))
    }

    // update color of bars i and j to red then back to original colour
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

    // equivalent to updateBarColour except for updating main array
    const updateColourMergeSort = async (sortedArray, i, j) => {
        if (document.getElementById(mainArray.length) != null) {
            let elem = document.getElementById(mainArray.length).style
            elem.backgroundColor = "#010101"
        }
        if (document.getElementById(i) != null && document.getElementById(j) != null) {
            let bar1 = document.getElementById(i).style
            let bar2 = document.getElementById(j - 1).style
            bar1.backgroundColor = "#ed1c24"
            bar2.backgroundColor = "#ed1c24"
            await sleep(animationSpeed)
            bar1.backgroundColor = "#415a77"
            bar2.backgroundColor = "#415a77"            
            setMainArray([...mainArray, sortedArray])
        }
    }

    // change the colour of all bars in mainArray to green
    const updateSortedBarColour = async () => {
        for (let i = 0; i < mainArray.length; i++) {
            if (document.getElementById(i) != null) {
                let bar = document.getElementById(i).style
                bar.backgroundColor = "#007a6c"
            }
        await sleep(animationSpeed)
        }
    }

    // ********** merge sort **********
    const mergeSort = async () => {
        await mSort(mainArray, 0, mainArray.length - 1)
        await updateSortedBarColour()
        enableGenArrBtn()
    }

    // merge sort algorithm
    const mSort = async (array, lower, upper) => {
        if (lower < upper) {
            const mid = Math.floor((lower + upper) / 2)
            await mSort(array, lower, mid)
            await mSort(array, mid + 1, upper)
            await merge(array, lower, mid, upper)
        }
    }
    
    // merges 2 sub arrays into 1 array in sorted order
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
    
    
    
    // ********** insertion sort **********
    const insSort = async () => {
        await iSort(mainArray)
        await updateSortedBarColour()
        enableGenArrBtn()
    }

    // insertion sort algorithm
    const iSort = async (array) => {
        for (let i = 1; i < array.length; i++) {
            await slide(array,i)
        }
    }
    
    // moves value at index i in array into sorted position
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

    // ********** selection sort **********
    const selSort = async () => {
        await sSort(mainArray)    
        await updateSortedBarColour()    
        enableGenArrBtn()
    }

    // selection sort algorithm
    const sSort = async (array) => {
        for (let i = 0; i < array.length; i++) {
            let minIdx = await findMin(array, i, array.length)
            let min = array[minIdx]
            let temp = array[i]
            array[i] = min
            array[minIdx] = temp
        }
    }

    // finds minimum value in array[lower..upper)
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

    // ********** heap sort **********
    const heapSort = async () => {
        await hSort(mainArray)
        await updateSortedBarColour()      
        enableGenArrBtn()
    }

    // heap sort algorithm
    const hSort = async (array) => {
        await buildHeap(array)
        await sortHeap(array)
    }

    // reorders max heap into increasing sorted order
    const sortHeap = async (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            heapifyDown(array, 0, i);
            await updateBarColour(array,0,i)
        }
    }

    // creates a heap from an unsorted array
    const buildHeap = async (array) => {
        let startIdx = Math.floor(array.length / 2 - 1)
        for (let i = startIdx; i >= 0; i--) {
            await heapifyDown(array, i, array.length)
        }
    }

    // restores heap invariant for node i and all its children
    const heapifyDown = async (array, i, length) => {
        let max = i
        let leftChild = 2 * i + 1
        let rightChild = 2 * i + 2

        if (leftChild < length && array[leftChild] > array[max]) {
            max = leftChild
        }

        if (rightChild < length && array[rightChild] > array[max]) {
            max = rightChild

        }

        if (max !== i) {
            let temp = array[i]
            array[i] = array[max]
            array[max] = temp
            heapifyDown(array, max, length)
        }
        await updateBarColour(array, max - 1, i)
    }

    // disables all buttons
    const disableButtons = () => {
        let elems = document.getElementsByClassName("button");
        for(var i = 0; i < elems.length; i++) {
            elems[i].disabled = true;
        }
    }

    // only enables generate array button
    const enableGenArrBtn = () => {
        let genArrBtn = document.getElementById("gen-arr-btn")
        genArrBtn.disabled = false;
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
                <button onClick={() => {shuffle(mainArray, 3, 80); disableButtons()}} class="button" id="gen-arr-btn"> Generate New Array</button>
                <div className="algo-btn-container">
                    <button onClick={() => {mergeSort(); disableButtons()}} class="button">Merge Sort</button>
                    <button onClick={() => {heapSort(); disableButtons()}} class="button">Heap Sort</button>
                    <button onClick={() => {insSort(); disableButtons()}} class="button">Insertion Sort</button>
                    <button onClick={() => {selSort(); disableButtons()}} class="button">Selection Sort</button>
                </div>
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