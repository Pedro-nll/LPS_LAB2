import { Button } from 'primereact/button';
import { AluguelDTO, Automovel, UserSlice } from '../../helpers/types';
import { Card, Colum, Image } from './style';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const AutomovelCard: React.FC<Automovel> = (automovel) => {

  const [open, setOpen] = useState(false);
  const {user} = useSelector<UserSlice>(state => state.userSlice)
  console.log(user)

  const openModalFunc = () => {
    setOpen(true);
  }

  const alugar = (value) => {
    let aluguel: AluguelDTO = {};

    aluguel.valorMensal = value;
    aluguel.clienteId = user.id
    
  }

  return (
    <>
    <Card>
      <Colum>
        <Image src={automovel.imageUrl} alt="Automóvel" />
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
        <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Dialog>

    </>

  );
};

export default AutomovelCard;
