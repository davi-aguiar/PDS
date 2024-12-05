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

interface ModeloVeiculo {
  codModelo: number;
  nomeModelo: string;
  tipo: string;
  marca: {
    codMarca: number;
    nomeMarca: string;
  };
  onDelete: (codModelo: number) => Promise<void>;
}

export default function DenseTable() {
  const [modelos, setModelos] = useState<ModeloVeiculo[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/modelo/buscar");
        const modelosData = response.data;

        // Ordena os modelos por nome em ordem ascendente
        const sortedModelos = modelosData.sort((a: ModeloVeiculo, b: ModeloVeiculo) =>
          a.nomeModelo.localeCompare(b.nomeModelo)
        );

        setModelos(sortedModelos);
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    };

    fetchModelos();
  }, []);

  const handleSort = () => {
    const sorted = [...modelos].sort((a, b) =>
      sortOrder === "desc"
        ? a.nomeModelo.localeCompare(b.nomeModelo)
        : b.nomeModelo.localeCompare(a.nomeModelo)
    );
    setModelos(sorted);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleClick = (modelo: ModeloVeiculo) => {
    navigate(`/editar-modelo`, { state: { modelo } });
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
              <span>Modelo {sortOrder === "asc" ? "▼" : "▲"}</span>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Tipo
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Marca
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Código do Modelo
            </TableCell>
            <TableCell className={styles.abc} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.TableBody}>
          {modelos.map((modelo) => (
            <TableRow key={modelo.codModelo} className={styles.BodyRow}>
              <TableCell align="right">
                <input type="checkbox" name="" id="" />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() => handleClick(modelo)}
              >
                {modelo.nomeModelo}
              </TableCell>
              <TableCell align="right">{modelo.tipo}</TableCell>
              <TableCell align="right">{modelo.marca.nomeMarca}</TableCell>
              <TableCell align="right">{modelo.codModelo}</TableCell>
              <TableCell align="right">
                <Popup
                  type="icon"
                  codModelo={modelo.codModelo}
                  nomeModelo={modelo.nomeModelo}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
