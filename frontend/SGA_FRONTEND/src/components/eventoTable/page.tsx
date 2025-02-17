import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { TableContainer } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";
import PopupEvento from "../removeEvento/page";

interface Veiculo {
  chassi: string;
  veiculo: {
    placa: string;
  };
}

interface Evento {
  protocolo: number;
  data_evento: string;
  endereco_evento: string;
  tipo_ocorrencia: string;
  matriculaAssociado: string;
  matriculaFuncionario: number;
  veiculos: Veiculo[];
  associado: {
    nome: string;
  };
}

export default function DenseTableEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  const formatDateToDDMMYYYY = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/eventos/buscar");
        const eventosData = response.data;
        console.log(eventosData);

        // Ordenar eventos por data
        const sortedEventos = eventosData.sort((a: Evento, b: Evento) =>
          a.data_evento.localeCompare(b.data_evento)
        );
        setEventos(sortedEventos);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };
    fetchEventos();
  }, [eventos]);

  const handleSort = () => {
    const sorted = [...eventos].sort((a, b) =>
      sortOrder === "desc"
        ? a.data_evento.localeCompare(b.data_evento)
        : b.data_evento.localeCompare(a.data_evento)
    );
    setEventos(sorted);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const handleClick = (evento: Evento) => {
    navigate(`/editar-evento`, { state: { evento } });
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
              <span>Data do Evento {sortOrder === "asc" ? "▼" : "▲"}</span>
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Endereço
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Tipo de Ocorrência
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Placa do Veículo
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="right">
              Associado
            </TableCell>
            <TableCell className={styles.abc} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.TableBody}>
          {eventos.map((evento) => (
            <TableRow key={evento.protocolo} className={styles.BodyRow}>
              <TableCell align="right">
                <input type="checkbox" name="" id="" />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                onClick={() => handleClick(evento)}
              >
                {formatDateToDDMMYYYY(evento.data_evento)}
              </TableCell>
              <TableCell align="right">{evento.endereco_evento}</TableCell>
              <TableCell align="right">{evento.tipo_ocorrencia}</TableCell>
              <TableCell align="right">
                {evento.veiculos.length > 0
                  ? evento.veiculos[0].veiculo.placa
                  : "N/A"}
              </TableCell>
              <TableCell align="right">{evento.associado.nome}</TableCell>
              <TableCell align="right">
                <PopupEvento type="icon" protocolo={evento.protocolo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}