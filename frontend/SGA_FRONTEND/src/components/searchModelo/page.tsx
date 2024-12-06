import { useEffect, useState, SetStateAction } from "react";
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

interface Modelo {
  codModelo: number;
  nomeModelo: string;
  tipo: string;
  codMarca: number;
  marca: {
    codMarca: number;
    nomeMarca: string;
  };
}

export default function SearchModelo() {
  const [modelos, setModelos] = useState<Modelo[]>([]); // Inicializa com array vazio
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/modelo/buscar"
        );
        console.log("Dados recebidos:", response.data);
        setModelos(response.data || []); // Confirma que é uma lista
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    };

    fetchModelos();
  }, []);

  const handleClick = (modelo: Modelo) => {
    navigate(`/editar-modelo`, { state: { modelo } });
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
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
            placeholder="Pesquisar Por Modelos de Veículos"
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
                  <TableCell style={{ fontWeight: "bold" }}>Modelo</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Código
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Marca
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={styles.TableBody}>
                {modelos
                  .filter((modelo) =>
                    modelo.nomeModelo
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                  .map((modelo) => (
                    <TableRow
                      key={modelo.codModelo}
                      className={styles.BodyRow}
                      onClick={() => handleClick(modelo)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {modelo.nomeModelo}
                      </TableCell>
                      <TableCell align="right">
                        {modelo.codModelo}
                      </TableCell>
                      <TableCell align="right">
                        {modelo.marca.nomeMarca}
                      </TableCell>
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
