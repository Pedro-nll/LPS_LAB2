import { Dispatch, SetStateAction, useEffect } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input
} from "@mui/material";
import React from "react";
import { useNotification } from "../../hooks/useNotification";
import axiosInstance from '../../services/api';
interface ICreateCourseModalProps {
  openModal: boolean;
  editId?: number;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<boolean>>;
  setEditId: Dispatch<SetStateAction<number | undefined>>;
}

const CreateCourseModal = (props: ICreateCourseModalProps) => {
  const [name, setName] = React.useState<string>();

  useEffect(() => {
    setName("");
  }, [props.openModal]);

  const { showNotification } = useNotification();

  const makeRegistration = () => {
    if (name) {
      if(props.editId){
        axiosInstance
        .put(`/course/${props.editId}`, {"name": name})
        .then((response) => {
          showNotification({
            message: response.data.message,
            type: "success",
            title: response.data.title,
          });
          props.setReload(true);
          props.setOpenModal(false);
          props.setEditId(undefined);
        })
        .catch((e) => {
          showNotification({
            message: e.response.data.message,
            type: "error",
            title: e.response.data.title,
          });
        });
      } else {
        axiosInstance
        .post(`/course`, {"name": name})
        .then((response) => {
          showNotification({
            message: response.data.message,
            type: "success",
            title: response.data.title,
          });
          props.setReload(true);
          props.setOpenModal(false);
        })
        .catch((e) => {
          showNotification({
            message: e.response.data.message,
            type: "error",
            title: e.response.data.title,
          });
        });
        
    }
      }
    }
 

  const handleClose = () => {
    props.setOpenModal(false);
  };


  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.openModal}
      onClose={handleClose}
    >
      <DialogTitle>Cadastrar curso</DialogTitle>
      <DialogContent>
        <Box display={"grid"} className="my-5">
            <label>Informe o nome do curso</label>
            <Input type="text" value={name} onChange={(e) => {setName(e.target.value as string)}}  />

         
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={makeRegistration} variant="outlined">
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateCourseModal;
