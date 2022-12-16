import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import MaskedInput from "react-text-mask/dist/reactTextMask";

const InputMask = React.memo(function InputMask({maskOptions = {}, ...props}) {
    return (<><MaskedInput mask={createNumberMask(maskOptions)} {...props}  /></>);
});

export default InputMask;
