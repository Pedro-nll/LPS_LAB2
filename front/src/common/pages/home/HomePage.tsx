
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import { Automovel } from '../../helpers/types';
import api from '../../services/api';
import { AutomovelCard, AutomovelCardSkeleton } from './AutomovelCard';
import { RentCarModal } from './RentCardModal';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [rentCar, setRentCar] = useState<Automovel | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);

  const change = () => {
    setOpenModal(!openModal);

  }

  const [data, setData] = useState<Automovel[]>([{}, {}, {}, {}, {}, {}]);
  const [view, setView] = useState<'all' | 'rented'>('all');

  const handleViewChange = (newView: 'all' | 'rented') => {
    setView(newView);
  };


  useEffect(() => {
    fetchVehicles();
  }, []);
  useEffect(() => {
    if (rentCar) {
      change();
      console.log(rentCar);
    }
  }, [rentCar]);
  useEffect(() => {
    fetchVehicles();
  }, [view]);

  const fetchVehicles = () => {
    setLoading(true);
    if (view === 'all') {
      api.get('/veiculo/all').then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.error('Error fetching vehicles:', error);
        setData([]);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      const user = localStorage.getItem('user');
      if (user) {
        const { id } = JSON.parse(user);
        api.get(`/aluguel/findByClienteId/${id}`).then((response) => {
          setData(response.data);
          setLoading(false);
        });
      }
    }

  };

  const itemTemplate = (automovel: Automovel) => {
    if (!automovel) {
      return;
    }
    if (loading) {
      return AutomovelCardSkeleton(automovel);
    }
    return <AutomovelCard automovel={automovel} setAutomovel={setRentCar} />;
  };

  const listTemplate = (data: Automovel[]) => {
    return <div className="grid grid-nogutter">{data.map((automovel: Automovel) => itemTemplate(automovel))}</div>;
  };
  const listTemplateSkeleton = (data: Automovel[]) => {
    return <div className="grid grid-nogutter">{data.map((automovel: Automovel) => itemTemplate(automovel))}</div>;
  };
  return (
    <>
      <header className='flex flex-row-reverse flex-wrap gap-1' >
        <Button onClick={() => handleViewChange('rented')} className={view === 'rented' ? 'active' : ''}>Seus Carros Alugados</Button>
        <Button onClick={() => handleViewChange('all')} className={view === 'all' ? 'active' : ''}>Todos os Disponíveis</Button>

      </header>
      {loading ? (
        <DataView value={data} listTemplate={listTemplateSkeleton} layout="grid" />
      ) : (

        <DataView value={data} listTemplate={listTemplate} layout="grid" />
      )}
      <RentCarModal open={openModal} onClose={change} automovel={rentCar} setAutomovel={setRentCar} />
    </>
  );
};

export default HomePage;
