import { InstrumentNames } from "../constants";


export const Radios = (props) => {

    return (
        <div>
            {Object.values(InstrumentNames).map(item => {
                return (<div key={item}>
                    <input id={item} type='radio' checked={item === props.radioValue} onChange={props.onChange} />
                    <label htmlFor={item}>{item}</label>
                </div>);
            })}
        </div >
    );

}
