
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { useState } from 'react';
import { FlexContainer, Sized, Space, Subtitle, Title, TwoParts, FlexColum } from '../style.ts';
import JobRegister from './JobRegister.tsx'
        

        
import { InputMask } from 'primereact/inputmask';
import { useNavigate } from 'react-router-dom';
        

const ClientRegistration = () => {
    const [nameIntput, setNameIntput] = useState('')
    const [emailIntput, setEmailIntput] = useState('')
    const [passwordIntput, setPasswordIntput] = useState('')
    const [confirmPasswordIntput, setconfirmPasswordIntput] = useState('')

    const [rgInput, setRgInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')

    const [logradouroInput, setLogradouroInput] = useState('');
    const [numeroInput, setNumeroInput] = useState(0);
    const [complementoInput, setComplementoInput] = useState('');
    const [bairroInput, setBairroInput] = useState('');
    const [cidadeInput, setCidadeInput] = useState('');
    const [estadoInput, setEstadoInput] = useState('');
    const [cepInput, setCepInput] = useState('');

    const [numberOfJobs, setNumberOfJobs] = useState(1)

    const navigate = useNavigate();

    const options = [
        {
            name: '1',
            code: 1,
        },
        {
            name: '2',
            code: 2,
        },
        {
            name: '3',
            code: 3,
        }
    ]


    return (
        <FlexContainer>
            <Title>Cadastro</Title>
            <Space value={20}/>

            <TwoParts>
                <div>
                    <div>
                        <Subtitle>
                            Dados de Usuario
                        </Subtitle>
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className='full-width-input' aria-errormessage={'ola'} value={nameIntput} onChange={(e) => setNameIntput(e.target.value)} />
                        <Space value={15}/>
                        <label htmlFor="email">Email</label>
                        <InputText id="email" className='full-width-input' aria-errormessage={''} value={emailIntput} onChange={(e) => setEmailIntput(e.target.value)} />
                        <Space value={15}/>
                        <label htmlFor="senha">Senha</label>
                        <InputText id="senha" className='full-width-input' value={passwordIntput} onChange={(e) => setPasswordIntput(e.target.value)} />
                        <Space value={15}/>
                        <label htmlFor="senha-confirm">Cofirmar Senha</label>
                        <InputText id="senha-confirm" className='full-width-input' aria-errormessage={''} value={confirmPasswordIntput} onChange={(e) => setconfirmPasswordIntput(e.target.value)} />
                        <Space value={15}/>
                    </div>
                    <Space value={60}/>
                    <div>
                        <Subtitle>
                            Dados de Pessoais
                        </Subtitle>
                        <label htmlFor="rg">RG</label>
                        <InputMask id="rg" className='full-width-input' aria-errormessage={''} value={rgInput} onChange={(e) => setRgInput(e.target.value || '')} mask="99.999.999-0" placeholder="99.999.999-0" />
                        <Space value={15}/>
                        <label htmlFor="cpf">CPF</label>
                        <InputMask id="cpf" className='full-width-input' aria-errormessage={''} value={cpfInput} onChange={(e) => setCpfInput(e.target.value || '')} mask="999.999.999-99" placeholder="999.999.999-99" />
                        <Space value={15}/>
                    </div>
                </div>
                
                <div>
                    <Subtitle>
                        Endereço
                    </Subtitle>
                    <label htmlFor="logradouro">Logradouro</label>
                    <InputText
                    id="logradouro"
                    className='full-width-input'
                    value={logradouroInput}
                    onChange={(e) => setLogradouroInput(e.target.value)}
                    placeholder="Logradouro"
                    />
                    <Space value={15}/>
                    <label htmlFor="numero">Número</label>
                    <InputNumber
                    id="numero"
                    className='full-width-input'
                    value={numeroInput}
                    onValueChange={(e) => setNumeroInput(e.value || 0)}
                    placeholder="Número"
                    />
                    <Space value={15}/>
                    <label htmlFor="complemento">Complemento</label>
                    <InputText
                    id="complemento"
                    className='full-width-input'
                    value={complementoInput}
                    onChange={(e) => setComplementoInput(e.target.value)}
                    placeholder="Complemento"
                    />
                    <Space value={15}/>
                    <label htmlFor="bairro">Bairro</label>
                    <InputText
                    id="bairro"
                    className='full-width-input'
                    value={bairroInput}
                    onChange={(e) => setBairroInput(e.target.value)}
                    placeholder="Bairro"
                    />
                    <Space value={15}/>
                    <label htmlFor="cidade">Cidade</label>
                    <InputText
                    id="cidade"
                    className='full-width-input'
                    value={cidadeInput}
                    onChange={(e) => setCidadeInput(e.target.value)}
                    placeholder="Cidade"
                    />
                    <Space value={15}/>
                    <label htmlFor="estado">Estado</label>
                    <InputText
                    id="estado"
                    className='full-width-input'
                    value={estadoInput}
                    onChange={(e) => setEstadoInput(e.target.value)}
                    placeholder="Estado"
                    />
                    <Space value={15}/>
                    <label htmlFor="cep">CEP</label>
                    <InputMask
                    id="cep"
                    mask="99999-999"
                    className='full-width-input'
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value || '')}
                    placeholder="00000-000"
                    />
                    <Space value={15}/>
                </div>
            </TwoParts>

            <Space value={15}/>
            <FlexColum>
                <label htmlFor="select">Selecione uma opção</label>
                <Dropdown id='select' placeholder="Select a City" className='melhor-tamanho' value={numberOfJobs} options={options} optionLabel="name" onChange={(e) => setNumberOfJobs(e.value.code)} />
            </FlexColum>
            <Space value={15}/>

            <TwoParts>
                {Array.from({ length: numberOfJobs }, (_, index) => (
                    <JobRegister index={index+1}/>
                ))}
                
            </TwoParts>
            
            
            <Sized width={'650px'}>
                <Space value={20}/>
                <Button label="Cadastrar" className='full-width-input'/>
                <Space value={5}/>
                <Button label="Já Tenho uma Conta" className='full-width-input' text onClick={() => navigate('/login')}/>
            </Sized>
        
        </FlexContainer>
            

    )
}

export default ClientRegistration