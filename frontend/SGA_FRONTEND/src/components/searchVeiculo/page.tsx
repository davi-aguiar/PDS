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

interface Veiculo {
  chassi: string;
  placa: string;
  esp_renavam: string;
  esp_cor: string;
  esp_numero_motor: string;
  cod_fipe: string;
  codModelo: string;
  mensalidade: string;
}
interface ModeloVeiculo {
  codModelo: string;
  nomeModelo: string;
  tipo: string;
  marca: {
    codMarca: number;
    nomeMarca: string;
  };
}

export default function SearchVeiculo() {
  const [veiculos, setveiculos] = useState<Veiculo[]>([]);
  const [modelos, setModelos] = useState<ModeloVeiculo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchveiculos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/veiculos/listar"
        );
        setveiculos(response.data.veiculos);
      } catch (error) {
        console.error("Erro ao buscar veiculos:", error);
      }
    };

    fetchveiculos();
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

  const handleClick = (chassi: string) => {
    navigate(`/editar-veiculo`, { state: { chassi } });
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
            placeholder="Pesquisar Por veiculos"
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
                  <TableCell style={{ fontWeight: "bold" }}>Placa</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Modelo
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={styles.TableBody}>
                {veiculos
                  .filter((veiculo) =>
                    veiculo.placa
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                  .map((veiculo) => (
                    <TableRow
                      key={veiculo.chassi}
                      className={styles.BodyRow}
                      onClick={() => handleClick(veiculo.chassi)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => handleClick(veiculo.chassi)}
                      >
                        {veiculo.placa}
                      </TableCell>
                      <TableCell align="right">
                        {modelos.find(
                          (modelo) => modelo.codModelo === veiculo.codModelo
                        )?.nomeModelo || "Modelo não encontrado"}
                      </TableCell>
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
