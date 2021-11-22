import React from 'react';
import { useState } from 'react';

const App = () => {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    const operators = ['/', '*', '+', '-', '.'];

    const updateCalc = (val) => {
        if (
            (operators.includes(val) && calc === '') || 
            (operators.includes(val) && operators.includes(calc.slice(-1)))
            ) {
               return;
            }
        
        setCalc(calc + val);

        if (!operators.includes(val)) {
            setResult(eval(calc + val).toString());
        }
    }

    const createDigits = () => {
        const digits = [];

        for (let i= 1; i < 10; i++) {
            digits.push(
                <button onClick={ () => updateCalc(i.toString()) } key={i}>{i}</button>
            );
        }

        return digits;
    }

    const calculate = () => setCalc(eval(calc).toString());

    const clear = () => {
        if (calc === '') return;
        
        setCalc('');
        setResult('');
    }

    return (
        <div className="App">
            <div className="calculator">
                <div className="display">
                    { result ? <span>({ result })</span> : ''}
                    { calc || '0' }
                </div>
                <div className="operators">
                    <button onClick= { () => updateCalc('/') }>/</button>
                    <button onClick= { () => updateCalc('*') }>*</button>
                    <button onClick= { () => updateCalc('+') }>+</button>
                    <button onClick= { () => updateCalc('-') }>-</button>

                    <button onClick={ () => clear() }>DEL</button>
                </div>
                <div className="digits">
                    {createDigits()}            
                    <button onClick={ () => updateCalc('0') }>0</button>
                    <button onClick={ () => updateCalc('.') }>.</button>
                    <button onClick={ () => calculate() }>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;