import { useEffect, useState, SetStateAction } from "react";
import styles from "./page.module.css";
import { FaCalendar, FaMagnifyingGlass, FaGear } from "react-icons/fa6";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Evento {
  protocolo: number;
  tipo_ocorrencia: string;
  data_evento: string;
  endereco_evento: string;
}

export default function SearchEvento() {
  const [eventos, setEventos] = useState<Evento[]>([]); // Inicializa com array vazio
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/eventos/buscar");
        console.log("Dados recebidos:", response.data);
        setEventos(response.data || []); // Confirma que é uma lista
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const handleClick = (evento: Evento) => {
    navigate(`/editar-evento`, { state: { evento } });
  };

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={styles.searchDiv}>
        <FaCalendar size={18} color="white" />
        <div className={styles.searchBar}>
          <FaMagnifyingGlass size={18} color="#7f7f7f" />
          <input
            type="text"
            placeholder="Pesquisar Por Eventos"
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
            style={{ maxHeight: "40vh", overflowY: "auto", width: "550px" }}
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
                  <TableCell style={{ fontWeight: "bold" }}>Ocorrência</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Protocolo
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Data
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={styles.TableBody}>
                {eventos
                  .filter((evento) =>
                    evento.tipo_ocorrencia
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                  .map((evento) => (
                    <TableRow
                      key={evento.protocolo}
                      className={styles.BodyRow}
                      onClick={() => handleClick(evento)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {evento.tipo_ocorrencia}
                      </TableCell>
                      <TableCell align="right">{evento.protocolo}</TableCell>
                      <TableCell align="right">{evento.data_evento}</TableCell>
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
