import { Button } from 'primereact/button';
import { Automovel } from '../../helpers/types';

import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Dispatch, SetStateAction } from 'react';


export interface AutomovelCardProps {
  automovel: Automovel;
  setAutomovel: Dispatch<SetStateAction<Automovel | undefined>>;

}
export const AutomovelCard = ({ automovel, setAutomovel }: AutomovelCardProps) => {
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
          <img className="w-9 shadow-2 border-round" style={{ height: "200px" }} src={`${automovel.imageUrl}`} alt={automovel?.modelo || ""} />
          <div className="text-2xl font-bold">{automovel.modelo} - {automovel.ano}</div>
        </div>
        <div className="flex align-items-center justify-content-between">
          <span className="text-2xl font-semibold"></span>
          <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={automovel.alugado === true} onClick={() => {
            setAutomovel(automovel);
          }}></Button>
        </div>
      </div>
    </div >
  );

};

export const AutomovelCardSkeleton = (automovel: Automovel) => {
  return (
    <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={automovel.matricula}>
      <div className="p-4 border-1 surface-border surface-card border-round">
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="flex align-items-center gap-2">
          </div>
          <Skeleton className="w-3rem border-round h-1rem" />
        </div>
        <div className="flex flex-column align-items-center gap-3 py-5">
          <Skeleton className="w-9 shadow-2 border-round h-10rem" />
          <Skeleton className="w-8rem border-round h-2rem" />
        </div>
        <div className="flex align-items-center justify-content-between">
          <Skeleton className="w-4rem border-round h-2rem" />
          <Skeleton shape="circle" className="w-3rem h-3rem" />
        </div>
      </div>
    </div>
  );
};;
