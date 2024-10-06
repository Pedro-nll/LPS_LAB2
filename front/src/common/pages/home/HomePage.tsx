
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import { Automovel } from '../../helpers/types';
import api from '../../services/api';
import AutomovelCard from './AutomovelCard';
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState('grid');
  const [data, setData] = useState<Automovel[]>([])
  useEffect(() => {
    fetchVehicles()
  }, []);
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




  const itemTemplate = (automovel: Automovel, index: number) => {
    if (!automovel) {
      return;
    }
    return AutomovelCard(automovel);
  };

  const listTemplate = (data: Automovel[]) => {
    return <div className="grid grid-nogutter">{data.map((automovel: Automovel, index: number) => itemTemplate(automovel, index))}</div>;
  };



  return (
    <div className="card">
      <DataView value={data} listTemplate={listTemplate} layout="grid" />
    </div>
  )
}

export default HomePage;
