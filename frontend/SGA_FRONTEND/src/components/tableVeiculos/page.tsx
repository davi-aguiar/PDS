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

interface Veiculo {
  chassi: string;
  placa: string;
  cor: string;
  modelo: number;
}

interface Associado {
  matricula: string;
  nome: string;
  veiculos: Veiculo[];
}

interface ModeloVeiculo {
  codModelo: number;
  nomeModelo: string;
  tipo: string;
  marca: {
    codMarca: number;
    nomeMarca: string;
  };
}

export default function TableVeic() {
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [modelos, setModelos] = useState<ModeloVeiculo[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssociados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/veiculos/associados-veiculos"
        );

        const associadosComVeiculos = response.data.associados
          .filter(
            (associado: { veiculos: any[] }) => associado.veiculos.length > 0
          )
          .sort((a: { nome: string }, b: { nome: string }) =>
            a.nome.localeCompare(b.nome)
          );

        setAssociados(associadosComVeiculos);
      } catch (error) {
        console.error("Erro ao buscar associados:", error);
      }
    };

    fetchAssociados();
  }, []);

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/modelo/buscar");
        const modelosData = response.data;

        const sortedModelos = modelosData.sort(
          (a: ModeloVeiculo, b: ModeloVeiculo) =>
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
              <span>Associado {sortOrder === "asc" ? "▼" : "▲"}</span>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Modelo
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Placa
            </TableCell>
            <TableCell className={styles.abc} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.TableBody}>
          {associados.map((associado) =>
            associado.veiculos.map((veiculo, index) => (
              <TableRow
                key={`${associado.matricula}-${index}`}
                className={styles.BodyRow}
              >
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
                <TableCell align="right">
                  {modelos.find((modelo) => modelo.codModelo === veiculo.modelo)
                    ?.nomeModelo || "Modelo não encontrado"}
                </TableCell>
                <TableCell align="right">{veiculo.placa}</TableCell>
                <TableCell align="right">
                  <Popup
                    type="icon"
                    matricula={associado.matricula}
                    name={associado.nome}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
