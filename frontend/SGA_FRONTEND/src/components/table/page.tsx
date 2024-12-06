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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssociados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/associados/listar"
        );

        const sortedAssociados = response.data.associados.sort(
          (a: Associado, b: Associado) => a.nome.localeCompare(b.nome)
        );

        setAssociados(sortedAssociados);
      } catch (error) {
        console.error("Erro ao buscar associados:", error);
      }
    };

    fetchAssociados();
  }, [associados]);

  const handleSort = () => {
    const sorted = [...associados].sort((a, b) =>
      sortOrder === "desc"
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome)
    );
    setAssociados(sorted);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleClick = (associado: Associado) => {
    navigate(`/editar-associado`, { state: { associado } });
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
              backgroundColor: "#ebebeb",
            }}
          >
            <TableCell className={styles.abc} align="right"></TableCell>
            <TableCell
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={handleSort}
            >
              <span>Nome {sortOrder === "asc" ? "▼" : "▲"}</span>
            </TableCell>
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
                onClick={() => handleClick(associado)}
              >
                {associado.nome}
              </TableCell>
              <TableCell align="right">{associado.telefone}</TableCell>
              <TableCell align="right">{associado.matricula}</TableCell>
              <TableCell align="right">
                <Popup
                  type="icon"
                  matricula={associado.matricula}
                  name={associado.nome}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
