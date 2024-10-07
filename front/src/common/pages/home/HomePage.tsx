
import { DataView } from 'primereact/dataview';
import { SelectButton } from 'primereact/selectbutton';
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
  const [view, setView] = useState<"Disponiveis" | "Alugados">('Disponiveis');
  const options = ["all", "rented"];
  const handleViewChange = (newView: "Disponiveis" | "Alugados") => {
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
    if (view === 'Disponiveis') {
      api.get('/veiculo/allDisponivel').then((response) => {
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
    return <div className="grid grid-nogutter" style={{ minHeight: "100vh" }}>{data.map((automovel: Automovel) => itemTemplate(automovel))}</div>;
  };

  return (
    <>
      <header className='flex flex-row-reverse flex-wrap gap-1' >

        <SelectButton value={view} onChange={(e) => handleViewChange(e.value)} options={["Disponiveis", "Alugados"]} />
      </header>
      <DataView value={data} listTemplate={listTemplate} layout="grid" style={{ minHeight: "100vh" }} />

      <RentCarModal open={openModal} onClose={change} automovel={rentCar} setAutomovel={setRentCar} />
    </>
  );
};

export default HomePage;
