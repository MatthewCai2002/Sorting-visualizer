import "./SortingVisualizer.css"

function SortingVisualizer(props) {
    const randomArray = (length, max) => [...new Array(length)].map(() => Math.floor(Math.random() * max))
    let array = randomArray(100, 1000)

    return (
        <div>
            {array.map((value, idx) => (
                <div className="val-bar" key={idx}>
                    {value}
                </div>
            ))}
        </div>
    )
}

export default SortingVisualizer;