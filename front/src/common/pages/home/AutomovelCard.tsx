import { Button } from 'primereact/button';
import { Automovel } from '../../helpers/types';

import { Tag } from 'primereact/tag';

const AutomovelCard = (automovel: Automovel) => {
  const getSeverity = () => {
    switch (automovel.alugado) {
      case false:
        return 'success';

      case true:
        return 'warning';


      default:
        return null;
    }
  };
  return (
    <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 h" key={automovel.matricula}>
      <div className="p-4 border-1 surface-border surface-card border-round">
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="flex align-items-center gap-2">
          </div>
          <Tag value={automovel.alugado ? "Indisponivel" : "Disponivel"} style={{ padding: "4px" }} severity={getSeverity()} />
        </div>
        <div className="flex flex-column align-items-center gap-3 py-5">
          <img className="w-9 shadow-2 border-round" src={`${automovel.imageUrl}`} alt={automovel.modelo} />
          <div className="text-2xl font-bold">{automovel.modelo} - {automovel.ano}</div>
        </div>
        <div className="flex align-items-center justify-content-between">
          <span className="text-2xl font-semibold">${automovel.ano}</span>
          <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={automovel.alugado === true}></Button>
        </div>
      </div>
    </div >
  );

};

export default AutomovelCard;
