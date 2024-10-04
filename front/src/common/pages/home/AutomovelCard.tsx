import { Button } from 'primereact/button';
import { AluguelDTO, Automovel, UserSlice } from '../../helpers/types';
import { Card, Colum, Image } from './style';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../components/HomeAgencia/Api';

import { InputNumber } from 'primereact/inputnumber';
        

const AutomovelCard: React.FC<Automovel> = (automovel) => {

  const [open, setOpen] = useState(false);
  const[value, setValue] = useState(0);
  //const {user} = useSelector<UserSlice>(state => state.userReducer)

  let user;
  api.get('/client').then(resp => user = resp.data)
  console.log(5, user)

  const openModalFunc = () => {
    setOpen(true);
  }

  const alugar = (value) => {
    let aluguel: AluguelDTO = {};

    aluguel.valorMensal = value;
    //aluguel.clienteId = user.id
    
  }

  return (
    <>
    <Card>
      <Colum>
        {automovel.imageUrl ? <Image src={automovel.imageUrl} alt="Automóvel" /> : ""}
      </Colum>

      <Colum>
        <p>Ano: {automovel.ano}</p>
      </Colum>

      <Colum>
        <p>Marca: {automovel.marca}</p>
      </Colum>

      <Colum>
        <p>Modelo: {automovel.modelo}</p>
      </Colum>

      <Colum>
        <Button label="Alugar" onClick={openModalFunc}></Button>
      </Colum>
    </Card>

    <Dialog header="Header" visible={open} style={{ width: '50vw' }} onHide={() => {if (!open) return; setOpen(false); }}>
      <InputNumber value={value} onValueChange={(e) => setValue(e.value || 0)} />
      <Button label='Confirmar' onClick={() => {alugar(value)}} />
    </Dialog>

    </>

  );
};

export default AutomovelCard;
