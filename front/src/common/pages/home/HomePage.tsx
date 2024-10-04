import { useEffect, useState } from 'react';
import { Automovel } from '../../helpers/types';
import { Container } from './style';


import { TabPanel, TabView } from 'primereact/tabview';
import api from '../../components/HomeAgencia/Api';
import AutomovelCard from './AutomovelCard';


const HomePage = () => {


  const [data, setData] = useState<Automovel[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = () => {
    api.get('/veiculo/all').then((response) => {
      setData(response.data)
      console.log(response.data)
      setLoading(false)
    }).catch((error) => {
      console.error('Error fetching vehicles:', error);
      setData([])
      setLoading(false)
    })
  }

  return (
    <TabView className="custom-tabview">
      <TabPanel header="Disponiveis para Alugar" className='a'>
        <Container>
          {loading ? <p>Carregando...</p> : data.map((a:Automovel) => {
            console.log(a)
            return (
              <AutomovelCard {...a} />)
          })}
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