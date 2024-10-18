import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popup from "../remove/page";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";

interface Associado {
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
  onDelete: (matricula: string) => Promise<void>;
}

export default function DenseTable() {
  const [associados, setAssociados] = useState<Associado[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssociados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/associados/listar"
        );
        setAssociados(response.data.associados);
      } catch (error) {
        console.error("Erro ao buscar associados:", error);
      }
    };

    fetchAssociados();
  }, []);

  const handleClick = () => {
    navigate(`/editar-associado`);
  };

  const handleDelete = async (matricula: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/associados/deletar/${matricula}`
      );

      setAssociados(
        associados.filter((associado) => associado.matricula !== matricula)
      );
      alert("Associado excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir associado:", error);
      alert("Erro ao excluir associado. Tente novamente.");
    }
  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Table size="small" style={{ width: "60vw" }}>
        <TableHead>
          <TableRow
            className={styles.headRow}
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "#ebebeb"
            }}
          >
            <TableCell className={styles.abc} align="right"></TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Nome</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Telefone
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Matrícula
            </TableCell>
            <TableCell className={styles.abc} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.TableBody}>
          {associados.map((associado) => (
            <TableRow key={associado.matricula} className={styles.BodyRow}>
              <TableCell align="right">
                <input type="checkbox" name="" id="" />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={handleClick}
              >
                {associado.nome}
              </TableCell>
              <TableCell align="right">{associado.telefone}</TableCell>
              <TableCell align="right">{associado.matricula}</TableCell>
              <TableCell align="right">
                <Popup
                  type="icon"
                  matricula={associado.matricula}
                  onDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
