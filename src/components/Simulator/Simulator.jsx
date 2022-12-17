import React, {useCallback, useState} from 'react';

import styles from './css/simulator.module.css'
import SliderWithInput from "../SliderWithInput";
import classNames from "classnames";

const Simulator = React.memo(function Simulator() {
    const [amount, setAmount] = useState(5000);
    const [deadLine, setDeadline] = useState(3);
    const _onChangeSliderAmount = useCallback((value) => setAmount(value), [])
    const _onChangeSliderDeadline = useCallback((value) => setDeadline(value), [])

    return (<>
        <div className={styles.simulator}>
            <div className={styles.wrap}>
                <div className={styles.title}>Simulá tu crédito</div>
                <SliderWithInput onChange={_onChangeSliderAmount} inputMask={{
                    prefix: '$ ',
                    thousandsSeparatorSymbol: '.'
                }} min={5000} max={50000} label="Monto total"/>
                <SliderWithInput onChange={_onChangeSliderDeadline} min={3} max={24} label="Plazo"/>
                <div>
                    <div className={styles.deadline}>
                        <div className={styles.deadlineText1}>Cuota fija por mes</div>
                        <div className={styles.deadlineText2}>$ {(amount / deadLine).toLocaleString("en-US")}</div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={classNames(styles.btns, styles.btn1)}>Obtener crédito</button>
                        <button className={classNames(styles.btns, styles.btn2)}>ver detalle de cuotas</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
});

export default Simulator;
