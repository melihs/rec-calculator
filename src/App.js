import React from 'react';
import { useState } from 'react';
import Button from './components/Button/button';
import ClickVoice from './assets/audios/click.mp3';
import EnterVoice from './assets/audios/enter.mp3';

const App = () => {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');

    const playAudio = (audio) => new Audio(audio).play();

    const operators = ['/', '*', '+', '-', '.'];

    const updateCalc = (val) => {
        if (
            (operators.includes(val) && calc === '') ||
            (operators.includes(val) && operators.includes(calc.slice(-1)))
        ) {
            return;
        }

        playAudio(ClickVoice);

        setCalc(calc + val)

        if (!operators.includes(val)) {
            try {
                setResult(eval(calc + val).toString());
            }catch (e) {
                return;
            }
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

    const calculate = () => {
        if (calc === '') return setCalc('0');

        if(operators.includes(calc.slice(-1))) {
            setCalc('error');
            setResult('error');
        }

        playAudio(EnterVoice);

        try {
            setCalc(eval(calc).toString());
        }catch (e) {
            return;
        }
    }

    const clearAll = () => {
        if (calc === '') return;
        playAudio(EnterVoice);

        setCalc('');
        setResult('');
    }

    const clearLast = () => {
        if (calc === '') return;
        playAudio(EnterVoice);

        setCalc(calc.slice(0, -1));
        setResult(calc.slice(0, -1));
    }

    return (
        <div className="App">
            <div className="calculator">
                <div className="outher-edge"/>
                <div className="display">
                    { result ? <span>({ result })</span> : ''}
                    { calc || '0' }
                </div>
                <div className="operators">
                    <Button handleClick={ () => updateCalc('/')} value="/"/>
                    <Button handleClick={ () => updateCalc('*')} value="x"/>
                    <Button handleClick={ () => updateCalc('+')} value="+"/>
                    <Button handleClick={ () => updateCalc('-')} value="-"/>
                    <Button _class="clear-btn" handleClick={ clearLast } value="⬅"/>
                    <Button _class="clear-btn" handleClick={ clearAll } value="C"/>
                </div>
                <div className="digits">
                    {createDigits()}
                    <Button handleClick={ () => updateCalc('0') } value= "0"/>
                    <Button handleClick={ () => updateCalc('.') } value="."/>
                    <Button _class="enter-btn" handleClick={ () => calculate() } value="="/>
                </div>
                <div className="outher-edge"/>
            </div>
        </div>
    );
}

export default App;
