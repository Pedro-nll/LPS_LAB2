import axios from 'axios';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexContainer, Space, Subtitle, TwoParts } from '../style.ts';
import JobRegister, { Emprego } from './JobRegister.tsx';

const ClientRegistration = () => {
    const [nameIntput, setNameIntput] = useState('')
    const [emailIntput, setEmailIntput] = useState('')
    const [passwordIntput, setPasswordIntput] = useState('')
    const [confirmPasswordIntput, setconfirmPasswordIntput] = useState('')
    const stepperRef = useRef(null);
    const [rgInput, setRgInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')

    const [logradouroInput, setLogradouroInput] = useState('');
    const [numeroInput, setNumeroInput] = useState(0);
    const [complementoInput, setComplementoInput] = useState('');
    const [bairroInput, setBairroInput] = useState('');
    const [cidadeInput, setCidadeInput] = useState('');
    const [estadoInput, setEstadoInput] = useState('');
    const [cepInput, setCepInput] = useState('');
    const [empregos, setEmpregos] = useState<Emprego[]>([])
    const autoFill = () => {
        const cepUrl = cepInput.replace('-', '')
        axios.get(`https://opencep.com/v1/${cepUrl}`).then((response) => {
            const { logradouro, bairro, localidade, uf, cep } = response.data
            setLogradouroInput(logradouro)
            setBairroInput(bairro)
            setCidadeInput(localidade)
            setEstadoInput(uf)
            setCepInput(cep)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        if (cepInput.length === 9) {
            autoFill()
        }
    }, [cepInput])
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
    const registerUser = () => {
        axios.post('http://localhost:8080/cliente/save', {
            name: nameIntput,
            email: emailIntput,
            password: passwordIntput,
            rg: rgInput,
            cpf: cpfInput,
            endereco: {
                logradouro: logradouroInput,
                numero: numeroInput,
                complemento: complementoInput,
                bairro: bairroInput,
                cidade: cidadeInput,
                estado: estadoInput,
                cep: cepInput,
            },
            empregos: empregos,
        }).then((response) => {

            console.log(response)
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <FlexContainer style={{ textAlign: 'center', height: "100vh" }}>
            <Stepper ref={stepperRef} style={{ flexBasis: '50rem', }}>
                <StepperPanel header="Dados de Usuario">
                    <div>
                        <Space value={15} />
                        <Subtitle style={{ textAlign: 'center' }}>
                            Dados de Usuario
                        </Subtitle>
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className='full-width-input' aria-errormessage={'ola'} value={nameIntput} onChange={(e) => setNameIntput(e.target.value)} />
                        <Space value={15} />
                        <label htmlFor="email">Email</label>
                        <InputText id="email" className='full-width-input' aria-errormessage={''} value={emailIntput} onChange={(e) => setEmailIntput(e.target.value)} />
                        <Space value={15} />
                        <label htmlFor="senha">Senha</label>
                        <InputText id="senha" className='full-width-input' value={passwordIntput} onChange={(e) => setPasswordIntput(e.target.value)} />
                        <Space value={15} />
                        <label htmlFor="senha-confirm">Cofirmar Senha</label>
                        <InputText id="senha-confirm" className='full-width-input' aria-errormessage={''} value={confirmPasswordIntput} onChange={(e) => setconfirmPasswordIntput(e.target.value)} />
                        <Space value={15} />
                    </div>
                    <div>
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Dados Pessoais">
                    <div >
                        <Space value={15} />
                        <Subtitle style={{ textAlign: 'center' }}>
                            Dados Pessoais
                        </Subtitle>
                        <label htmlFor="rg">RG</label>
                        <InputMask id="rg" className='full-width-input' aria-errormessage={''} value={rgInput} onChange={(e) => setRgInput(e.target.value || '')} mask="99.999.999-0" placeholder="99.999.999-0" />
                        <Space value={15} />
                        <label htmlFor="cpf">CPF</label>
                        <InputMask id="cpf" className='full-width-input' aria-errormessage={''} value={cpfInput} onChange={(e) => setCpfInput(e.target.value || '')} mask="999.999.999-99" placeholder="999.999.999-99" />
                        <Space value={15} />                </div>
                    <div>
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Endereço">
                    <div>
                        <Space value={15} />

                        <Subtitle style={{ textAlign: 'center' }}>
                            Endereço
                        </Subtitle>
                        <label htmlFor="cep">CEP</label>
                        <InputMask
                            id="cep"
                            mask="99999-999"
                            className='full-width-input'
                            value={cepInput}
                            onChange={(e) => setCepInput(e.target.value || '')}
                            placeholder="00000-000"
                        />
                        <Space value={15} />
                        <label htmlFor="logradouro">Logradouro</label>
                        <InputText
                            id="logradouro"
                            className='full-width-input'
                            value={logradouroInput}
                            onChange={(e) => setLogradouroInput(e.target.value)}
                            placeholder="Logradouro"
                        />
                        <Space value={15} />
                        <label htmlFor="numero">Número</label>
                        <InputNumber
                            id="numero"
                            className='full-width-input'
                            value={numeroInput}
                            onValueChange={(e) => setNumeroInput(e.value || 0)}
                            placeholder="Número"
                        />
                        <Space value={15} />
                        <label htmlFor="complemento">Complemento</label>
                        <InputText
                            id="complemento"
                            className='full-width-input'
                            value={complementoInput}
                            onChange={(e) => setComplementoInput(e.target.value)}
                            placeholder="Complemento"
                        />
                        <Space value={15} />
                        <label htmlFor="bairro">Bairro</label>
                        <InputText
                            id="bairro"
                            className='full-width-input'
                            value={bairroInput}
                            onChange={(e) => setBairroInput(e.target.value)}
                            placeholder="Bairro"
                        />
                        <Space value={15} />
                        <label htmlFor="cidade">Cidade</label>
                        <InputText
                            id="cidade"
                            className='full-width-input'
                            value={cidadeInput}
                            onChange={(e) => setCidadeInput(e.target.value)}
                            placeholder="Cidade"
                        />
                        <Space value={15} />
                        <label htmlFor="estado">Estado</label>
                        <InputText
                            id="estado"
                            className='full-width-input'
                            value={estadoInput}
                            onChange={(e) => setEstadoInput(e.target.value)}
                            placeholder="Estado"
                        />
                        <Space value={15} />

                    </div>
                    <div >
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Empregos">
                    <Space value={15} />
                    <Space value={15} />

                    <Subtitle style={{ textAlign: 'center' }}>
                        Empregos
                    </Subtitle>
                    <label htmlFor="select">Selecione a quantidade de empregos</label>
                    <Dropdown id='select' placeholder="" className='melhor-tamanho' value={numberOfJobs} options={options} optionLabel="name" onChange={(e) => setNumberOfJobs(e.value.code)} />
                    <Space value={15} />

                    <TwoParts>
                        {Array.from({ length: numberOfJobs }, (_, index) => (
                            <JobRegister index={index} setEmpregos={setEmpregos} empregos={empregos} />
                        ))}

                    </TwoParts>
                    <div>
                        <Space value={20} />
                        <Button label="Cadastrar" className='full-width-input' onClick={() => registerUser()} />
                        <Space value={5} />
                        <Button label="Já Tenho uma Conta" className='full-width-input' text onClick={() => navigate('/login')} />
                    </div>
                </StepperPanel>
            </Stepper>
        </FlexContainer>

    )
}

export default ClientRegistration