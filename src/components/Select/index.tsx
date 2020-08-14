import React, {SelectHTMLAttributes} from 'react';


import './styles.css';

/* 
O extends nos permite herdar todas os outros atributos do 
componente Select do HTML. Sem isso, teríamos que definir todos
estes atributos como propriedades na interface SelectProps 
 */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label:string;
    options: Array<{
        value:string;
        label:string;
    }>;
}

/* 
FC significa FunctionComponent 
...rest pega todos os atributos nativos do Select (spread operator
    do javascript)
*/
const Select: React.FC<SelectProps> = ({label,name,options,...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                {/* opção padrão, mas que não aparece quando a lista é expandida(hidden)*/}
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div> 
    )
}

export default Select;