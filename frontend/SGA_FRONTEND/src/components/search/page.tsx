import { SetStateAction, useEffect, useState } from "react";
import styles from "./page.module.css";
import { FaCar, FaMagnifyingGlass, FaGear } from "react-icons/fa6";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Associado {
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
  onDelete: (matricula: string) => Promise<void>;
}

export default function Search() {
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [inputValue, setInputValue] = useState("");
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

  const handleClick = (associado: Associado) => {
    navigate(`/editar-associado`, { state: { associado } });
  };

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={styles.searchDiv}>
        <FaCar size={18} color="white" />
        <div className={styles.searchBar}>
          <FaMagnifyingGlass size={18} color="#7f7f7f" />
          <input
            type="text"
            placeholder="Pesquisar Por Associados"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <FaGear size={18} color="#7f7f7f" />
      </div>
      {inputValue && (
        <div className={styles.suggestionBox}>
          <TableContainer
            component={Paper}
            style={{ maxHeight: "60vh", overflowY: "auto" }}
          >
            <Table size="small">
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
                  <TableCell style={{ fontWeight: "bold" }}>Nome</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Matrícula
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={styles.TableBody}>
                {associados.map((associado) => (
                  <TableRow
                    key={associado.matricula}
                    className={styles.BodyRow}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => handleClick(associado)}
                    >
                      {associado.nome}
                    </TableCell>
                    <TableCell align="right">{associado.matricula}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
