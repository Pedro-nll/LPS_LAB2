import { Button } from 'primereact/button';
import { Card, Colum, Image } from './style';

const AutomovelCard = (data) => {
  const automovel = data.automovel
  return (
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
        <Button label="Alugar"></Button>
      </Colum>
    </Card>
  );
};

export default AutomovelCard;
