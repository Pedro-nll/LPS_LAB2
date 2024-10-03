import { Button } from 'primereact/button';
import { Title, Container, Space, TwoParts } from '../style';
import { useNavigate } from 'react-router-dom';

const WitchRegistration = () => {
    const navigate = useNavigate();

    return (
        <Container size={25}>
            <Title>O que deseja cadastrar?</Title>

            <Space value={25}></Space>

            <TwoParts>
                <Button
                    label="Cadastrar Cliente"
                    onClick={() => navigate('client')}
                />
                <Button label="Cadastrar Agência" onClick={() => navigate('agenci')} />
            </TwoParts>

            <Space value={10}></Space>

            <Button
                label="Voltar a tela de login"
                className="full-width-input"
                text
                onClick={() => navigate('/login')}
            />
        </Container>
    );
};

export default WitchRegistration;
