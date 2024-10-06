import axios from 'axios';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from "../../../hooks/useNotification.ts";
import { Space, Subtitle, TwoParts } from '../style.ts';
import JobRegister, { Emprego } from './JobRegister.tsx';
const ClientRegistration = () => {
    const [nameIntput, setNameIntput] = useState('')
    const [emailIntput, setEmailIntput] = useState('')
    const [passwordIntput, setPasswordIntput] = useState('')
    const stepperRef = useRef(null);
    const [rgInput, setRgInput] = useState('')
    const [cpfInput, setCpfInput] = useState('')
    const { showNotification } = useNotification();
    const [logradouroInput, setLogradouroInput] = useState('');
    const [numeroInput, setNumeroInput] = useState(0);
    const [complementoInput, setComplementoInput] = useState('');
    const [bairroInput, setBairroInput] = useState('');
    const [cidadeInput, setCidadeInput] = useState('');
    const [estadoInput, setEstadoInput] = useState('');
    const [cepInput, setCepInput] = useState('');

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
    const [empregos, setEmpregos] = useState<Emprego[]>(() =>
        Array(numberOfJobs).fill({ cargo: '', empresa: '', rendimento: '' })
    );
    useEffect(() => {
        setEmpregos(Array(numberOfJobs.code).fill({ cargo: '', empresa: '', rendimento: '' }));
        console.log(numberOfJobs)
    }, [numberOfJobs]);

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
        console.log(empregos)
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
            empregos: empregos.map(job => ({
                cargo: job.cargo,
                empresa: job.empresa,
                rendimento: job.rendimento
            })),
        }).then((response) => {
            console.log(response)
            showNotification({ message: response.data.message, type: 'success', autoHideDuration: 4000, title: response.data.title });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }).catch((error) => {
            console.log(error.response.data)
            showNotification({ message: error.response.data.message, type: 'error', autoHideDuration: 4000, title: error.response.data.tittle });
        })
    }

    return (
        <>
            <img src="/cars/clientRegisterImage.png" alt="Left Background" style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%", zIndex: 0 }} />
            <div className="card flex flex-row justify-content-center" style={{ paddingTop: "20vh", position: "relative" }}>
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem', backdropFilter: "blur(10px)", padding: "10vh", borderRadius: "16px", border: "2px solid", zIndex: 1 }}>
                    <StepperPanel header="Dados de Usuario">
                        <div className="flex flex-column h-20rem">
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
                            <Password id="senha" inputClassName="w-full"
                                className=" w-full"
                                pt={{ iconField: { root: { className: 'w-full' } } }}
                                value={passwordIntput} onChange={(e) => setPasswordIntput(e.target.value)} toggleMask />
                            <Space value={15} />
                        </div>
                        <div className="flex pt-4 justify-content-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => { navigate('/login') }} />

                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Dados Pessoais">
                        <div className="flex flex-column h-20rem ">
                            <Space value={15} />
                            <Subtitle style={{ textAlign: 'center' }}>
                                Dados Pessoais
                            </Subtitle>
                            <label htmlFor="rg">RG</label>
                            <InputMask id="rg" className='full-width-input' aria-errormessage={''} value={rgInput} onChange={(e) => setRgInput(e.target.value || '')} mask="99.999.999-0" placeholder="99.999.999-0" />
                            <Space value={15} />
                            <label htmlFor="cpf">CPF</label>
                            <InputMask id="cpf" className='full-width-input' aria-errormessage={''} value={cpfInput} onChange={(e) => setCpfInput(e.target.value || '')} mask="999.999.999-99" placeholder="999.999.999-99" />
                            <Space value={15} />
                        </div>
                        <div className="flex pt-4 justify-content-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Endereço">
                        <div className="flex flex-column h-20rem ">
                            <ScrollPanel style={{ width: '100%', height: '100%' }}>
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
                            </ScrollPanel>

                        </div>
                        <div className="flex pt-4 justify-content-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Empregos">
                        <div className="flex flex-column h-20rem ">
                            <ScrollPanel style={{ width: '100%', height: '100%' }}>
                                <Space value={15} />

                                <Subtitle style={{ textAlign: 'center' }}>
                                    Empregos
                                </Subtitle>
                                <label htmlFor="select">Selecione a quantidade de empregos</label>
                                <Dropdown
                                    id='select'
                                    placeholder=""
                                    className='melhor-tamanho'
                                    value={numberOfJobs}
                                    options={options}
                                    optionLabel="name"
                                    onChange={(e) => setNumberOfJobs(e.value)}
                                />
                                <Space value={15} />

                                <TwoParts>
                                    {Array.from({ length: numberOfJobs.code }, (_, index) => (
                                        <JobRegister index={index} setEmpregos={setEmpregos} empregos={empregos} />
                                    ))}

                                </TwoParts>
                            </ScrollPanel>
                        </div>
                        <div className="flex pt-4 justify-content-end">
                            <Button label="  Register" icon="pi pi-check" iconPos="left " onClick={registerUser} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </div>

        </>

    )
}

export default ClientRegistration