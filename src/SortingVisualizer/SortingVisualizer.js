import "./SortingVisualizer.css"

function SortingVisualizer(props) {
    const randomArray = (length, min, max) => [...new Array(length)].map(() => Math.floor(Math.random()*(max-min+1)+min))
    let array = randomArray(100, 2, 80)

    return (
        <div className="array-container">
            {array.map((value, idx) => (
                <div className="val-bar" key={idx} style={{height: `${value}vh`}}>
                </div>
            ))}
        </div>
    )
}

export default SortingVisualizer;