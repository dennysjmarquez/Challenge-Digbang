import React, {useRef, useState} from 'react';

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import InputMask from "./components/InputMask";
import {numberWithSeparator} from "../../utils/strings";

const SliderWithInput = React.memo(function SliderCurrency(
    {
        max = 0,
        min = 0,
        label = '',
        inputMask = {},
        onChange
    }) {
    const delayChange = useRef(null)
    const [sliderValue, setSliderValue] = useState(min)

    return (<>
        <div style={{display: 'flex'}}>
            <div>
                <div>
                    <div className="slider-label">{label}</div>
                    <div className="slider-input">
                        <InputMask
                            maskOptions={{
                                prefix: '',
                                thousandsSeparatorSymbol: '',
                                integerLimit: String(max).length,
                                ...inputMask
                            }}
                            value={sliderValue}
                            onBlur={() => {
                                if (sliderValue < min) setSliderValue(min);
                                if (sliderValue > max) setSliderValue(max);
                            }}
                            onChange={(event) => {
                                clearTimeout(delayChange.current)
                                let value = event.target.value.replace(/\D+/g, '');
                                setSliderValue(value);
                                if (Number(value) < min || Number(value) > max) return
                                delayChange.current = setTimeout(() => onChange?.(value), 500)
                            }}

                        />
                    </div>
                </div>
                <Slider value={sliderValue} onChange={(value) => {
                    setSliderValue(value);
                    onChange?.(value);
                }} min={min} max={max}/>
                <div>
                    <div>{inputMask?.prefix ? `${inputMask?.prefix} ` : ''}{numberWithSeparator(min, '.')}</div>
                    <div>{inputMask?.prefix ? `${inputMask?.prefix} ` : ''}{numberWithSeparator(max, '.')}</div>
                </div>
            </div>
        </div>
    </>);
});

export default SliderWithInput;
