import React, {useRef, useState} from 'react';

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import InputMask from "./components/InputMask";
import {numberWithSeparator} from "../../utils/strings";
import styles from './css/sliderWithInput.module.css'
import classNames from "classnames";

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
        <div className={styles.sliderWithInput}>
            <div className={classNames(styles.row, styles.row1)}>
                <div className={styles.sliderLabel}>{label}</div>
                <div className={classNames(styles.sliderInput, styles.input)}>
                    <InputMask
                        maskOptions={{
                            prefix: '',
                            thousandsSeparatorSymbol: '',
                            integerLimit: String(max).length,
                            ...inputMask
                        }}
                        value={sliderValue}
                        onChange={(event) => {
                            clearTimeout(delayChange.current)
                            let value = event.target.value.replace(/\D+/g, '');
                            if (Number(value) < min || Number(value) > max) return
                            setSliderValue(value);
                            delayChange.current = setTimeout(() => onChange?.(value), 500)
                        }}

                    />
                </div>
            </div>
            <Slider value={sliderValue} onChange={(value) => {
                setSliderValue(value);
                onChange?.(value);
            }} min={min} max={max}/>
            <div className={classNames(styles.row, styles.row2)}>
                <div>{inputMask?.prefix ? `${inputMask?.prefix} ` : ''}{numberWithSeparator(min, '.')}</div>
                <div>{inputMask?.prefix ? `${inputMask?.prefix} ` : ''}{numberWithSeparator(max, '.')}</div>
            </div>
        </div>

    </>);
});

export default SliderWithInput;
