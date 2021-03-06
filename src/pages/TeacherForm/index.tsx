import React, { useState, FormEvent } from 'react';
import { useHistory} from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import removeIcon from '../../assets/images/icons/trash.svg';

import './styles.css';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [name,setName] = useState('');
    const [avatar,setAvatar] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [bio,setBio] = useState('');

    const [subject,setSubject] = useState('');
    const [cost,setCost] = useState('');

    const emptyScheduleItem = {week_day: 0, from: '', to: ''};

    // useState retorna um array. Abaixo usamos desconstrução deste array
    const [scheduleItems,setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''},
    ]);

    function removeScheduleItem(position:number) {
        // Não é permitido remover o único item
        if (scheduleItems.length===1) {
            return;
        }

        const newScheduleItems = scheduleItems.filter((item, index, array) => {
            return (index!==position);
        });
        setScheduleItems(newScheduleItems);
    }

    // Um objeto sendo observado por state não pode ser alterado diretamente
    // para garantir imutabilidade. Por isso, chamamos a função definida
    // no useState passando um novo array.
    function addNewScheduleItem() {
        if (!canAddNewScheduleItem()) {
            return;
        }

        const updatedScheduleItems = [
            ...scheduleItems,
            {week_day: 0, from: '', to: ''}
        ];
        
        setScheduleItems(updatedScheduleItems);
    }

    function canAddNewScheduleItem() {
        const exists = scheduleItems.find((item)=>
            JSON.stringify(item) === JSON.stringify(emptyScheduleItem)
        );
        return !exists;
    }

    function setScheduleItemValue(position:number,field:string,value:string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem,index)=>{
            if(index===position) {
                /*
                sobrescreve o campo/valor do novo objeto com os parametros 
                que vieram como parametro [field]:value
                */
                return {...scheduleItem,[field]:value};
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e:FormEvent) {
        e.preventDefault();

        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }).then(()=>{
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(()=>{
            alert('Erro no envio do cadastro!');
        });

    }

    return (
        <div id="page-teacher-form" className="container">
           <PageHeader 
           title="Que incrível que você quer dar aulas."
           description="O primeiro passo, é preencher este formulário de inscrição">
           </PageHeader>

            <main>
                <form onSubmit={handleCreateClass}>

                <fieldset>
                    <legend>Seus dados</legend>

                    <Input 
                    name="name" 
                    label="Nome completo" 
                    value={name}
                    onChange={(e) => {setName(e.target.value);}}
                    />

                    <Input 
                    name="avatar" 
                    label="Avatar"
                    value={avatar}
                    onChange={(e) => {setAvatar(e.target.value);}}
                    />

                    <Input 
                    name="whatsapp" 
                    label="Whatsapp"
                    value={whatsapp}
                    onChange={(e) => {setWhatsapp(e.target.value);}}
                    />

                    <Textarea 
                    name="bio" 
                    label="Biografia"
                    value={bio}
                    onChange={(e) => {setBio(e.target.value);}}
                    />
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={(e)=>{setSubject(e.target.value);}}
                    options={[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'Ciências', label: 'Ciências'},
                        {value: 'Educação física', label: 'Artes'},
                        {value: 'Física', label: 'Física'},
                        {value: 'Geografia', label: 'Geografia'},
                        {value: 'História', label: 'História'}, 
                        {value: 'Matemática', label: 'Matemática'}, 
                        {value: 'Português', label: 'Português'}, 
                        {value: 'Química', label: 'Química'}, 
                    ]}
                    />
                    
                    <Input 
                    name="cost" 
                    label="Custo da sua aula por hora"
                    value={cost}
                    onChange={(e)=>{setCost(e.target.value);}}
                    />
                </fieldset>

                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>
                    </legend>

                    {scheduleItems.map((scheduleItem,index) =>{
                        return(
                            <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                    name="week_day" 
                                    label="Dia da Semana"
                                    value={scheduleItem.week_day}
                                    onChange={e=> setScheduleItemValue(index,'week_day',e.target.value)}
                                    options={[
                                        {value: '0', label: 'Domingo'}, 
                                        {value: '1', label: 'Segunda-feira'},
                                        {value: '2', label: 'Terça-feira'},
                                        {value: '3', label: 'Quarta-feira'},
                                        {value: '4', label: 'Quinta-feira'},
                                        {value: '5', label: 'Sexta-feira'},
                                        {value: '6', label: 'Sábado'},
                                    ]}
                                    />

                                    <Input 
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={e=> setScheduleItemValue(index,'from',e.target.value)}
                                    />

                                    <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={e=> setScheduleItemValue(index,'to',e.target.value)}
                                    />
                                
                                    <button type="button" onClick={()=>removeScheduleItem(index)}>
                                      <img src={removeIcon} alt="Remover"></img>
                                    </button>
                                </div>
                        );
                    })}
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar cadastro
                    </button>
                </footer>

                </form>

            </main>

        </div>
    );
}

export default TeacherForm;