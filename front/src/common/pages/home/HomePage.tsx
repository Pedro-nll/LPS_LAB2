import { useRef } from 'react';
import { mockImageUrl } from '../../helpers/mocks';
import { Automovel } from '../../helpers/types';
import AutomovelCard from './AutomovelCard';
import { Container } from './style';


import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
        

const HomePage = () => {

  const mockAutomovel: Automovel = {
    matricula: "ABC1234",
    ano: 2020,
    marca: "Toyota",
    modelo: "Corolla",
    placa: "XYZ5678",
    alugado: false,
    imageUrl: mockImageUrl,
  };
  
  return (
    <TabView className="custom-tabview">
      <TabPanel header="Disponiveis para Alugar" className='a'>
        <Container>
          <AutomovelCard {...mockAutomovel} />
          <AutomovelCard {...mockAutomovel} />
          <AutomovelCard {...mockAutomovel} />
          <AutomovelCard {...mockAutomovel} />
          <AutomovelCard {...mockAutomovel} />
        </Container>

      </TabPanel>

      <TabPanel header="Alugados no momento">
      </TabPanel>

      {/* <TabPanel header="Dados de Usuario">
      
      </TabPanel> */}
    </TabView>



  )
}

export default HomePage