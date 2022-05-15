import { Component } from "react"
import * as sortingAlgorithms from "../SortingAlgorithms/SortingAlgorithms"
import "./SortingVisualizer.css"

class SortingVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray()
    }

    randomArray(length, min, max) {
        return [...new Array(length)].map(() => Math.floor(Math.random()*(max-min+1)+min))
    }
    
    resetArray() {
        let array = this.randomArray(100,3,80)
        this.setState({array})
    }

    isArrayEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false
            }

        }
        return true
    }

    mergeSort() {
        let jsSortedArray = this.state.array.slice().sort((a,b) => a - b)
        let sortedArray = sortingAlgorithms.mergeSort(this.state.array)
        console.log(this.isArrayEqual(sortedArray, jsSortedArray))
    }

    insSort() {

    }

    selSort() {

    }

    heapSort() {

    }
    
    render() {
        const {array} = this.state
        return (
            <div className="visualizer-container">
                <div className="btn-container">
                    <button onClick={() => this.resetArray()} className="gen-array-btn"> Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.insSort()}>Insertion Sort</button>
                    <button onClick={() => this.selSort()}>Selection Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="val-bar" key={idx} style={{height: `${value}vh`}}>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SortingVisualizer;