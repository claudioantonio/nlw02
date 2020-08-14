import React, {InputHTMLAttributes} from 'react';


import './styles.css';

/* 
O extends nos permite herdar todas os outros atributos do 
componente Input do HTML. Sem isso, teríamos que definir todos
estes atributos como propriedades na interface InputProps 
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label:string;
}

/* 
FC significa FunctionComponent 
...rest pega todos os atributos nativos do Input (spread operator
    do javascript)
*/
const Input: React.FC<InputProps> = ({label,name,...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest}/>
        </div> 
    )
}

export default Input;