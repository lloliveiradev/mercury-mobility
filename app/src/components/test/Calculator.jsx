import {
    useState,
    useRef
} from "react";
import "./App.css";

function App() {
    const inputRef = useRef(null);
    const resultRef = useRef(null);
    const [result, setResult] = useState(0);

    function resetInput(e) {
        e.preventDefault();
        inputRef.current.value = 0;
    };

    function resetResult(e) {
        e.preventDefault();
        setResult(0);
    };

    const calculate = (e) => {
        const operation = e.target.id;
        const value = Number(inputRef.current.value);
        if (!isNaN(value)) {
            setResult((current) => {
                let result = 0;
                switch (operation) {
                    case 'plus': result = current + value; break;
                    case 'minus': result = current - value; break;
                    case 'times': result = current * value; break;
                    case 'divide': result = value !== 0 ? current / value : current; break;
                    default: result = current; break;
                }
                return result;
            });
        };
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-lg w-96 text-center border border-gray-200 rounded-sm shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-4 text-large">Calculator</h1>
            <p className="text-3xl font-semibold text-gray-800 mb-4">
                Result: <span ref={resultRef}>{result}</span>
            </p>
            <input id="input" type="number" placeholder="Type a number" className="w-full p-2 border rounded-lg mb-4 text-center" ref={inputRef} />
            <div className="grid grid-cols-2 gap-3">
                <button onClick={calculate} id="plus" className="bg-blue-500 text-white py-2 rounded-lg cursor-pointer">add</button>
                <button onClick={calculate} id="minus" className="bg-red-500 text-white py-2 rounded-lg cursor-pointer">subtract</button>
                <button onClick={calculate} id="times" className="bg-green-500 text-white py-2 rounded-lg cursor-pointer">multiply</button>
                <button onClick={calculate} id="divide" className="bg-yellow-500 text-white py-2 rounded-lg cursor-pointer">divide</button>
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={resetInput} className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-pointer">Reset Input</button>
                <button onClick={resetResult} className="bg-gray-600 text-white py-2 px-4 rounded-lg cursor-pointer">Reset Result</button>
            </div>
        </div>
    );
}

export default App;