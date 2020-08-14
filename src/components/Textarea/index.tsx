import React, {TextareaHTMLAttributes} from 'react';


import './styles.css';

/* 
O extends nos permite herdar todas os outros atributos do 
componente Textarea do HTML. Sem isso, teríamos que definir todos
estes atributos como propriedades na interface TextareaProps 
 */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label:string;
}

/* 
FC significa FunctionComponent 
...rest pega todos os atributos nativos do Textarea (spread operator
    do javascript)
*/
const Textarea: React.FC<TextareaProps> = ({label,name,...rest}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest}/>
        </div> 
    )
}

export default Textarea;