import { Component, createElement } from "react";
import { IMaskInput } from "react-imask";
export default props => {
    return (
        <IMaskInput
            mask={props.mask}
            definitions={props.definitions}
            blocks={props.blocks}
            value={props.value}
            overwrite={props.overwrite}
            lazy={props.lazy}
            placeholderChar={props.placeholderChar}
            unmask={props.unmask} // true|false|'typed'
            onAccept={props.onAccept}
            onComplete={props.onComplete}
            placeholder={props.placeholder}
            className={props.className}
            disabled={props.disabled}
            tabIndex={props.tabIndex}
        />
    );
};
