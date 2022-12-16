import React, {useCallback, useState} from 'react';

import styles from './css/simulator.module.css'
import SliderWithInput from "../SliderWithInput";

const Simulator = React.memo(function Simulator() {
    const [amount, setAmount] = useState(5000);
    const [deadLine, setDeadline] = useState(3);
    const _onChangeSliderAmount = useCallback((value) => setAmount(value), [])
    const _onChangeSliderDeadline = useCallback((value) => setDeadline(value), [])

    return (<>
        <div className={styles.simulator}>
            <div>
                <p>Simula tu crédito</p>
                <SliderWithInput onChange={_onChangeSliderAmount} inputMask={{
                    prefix: '$ ',
                    thousandsSeparatorSymbol: '.'
                }} min={5000} max={50000} label="Monto total"/>
                <SliderWithInput onChange={_onChangeSliderDeadline} min={3} max={24} label="Plazo"/>
                <div>
                    <div>
                        Cuota fija por mes $ {(amount / deadLine).toLocaleString("en-US")}
                    </div>
                    <div>
                        <button>Obtener crédito</button>
                        <button>ver detalle de cuotas</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
});

export default Simulator;
