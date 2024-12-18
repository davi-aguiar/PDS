import axios from "axios";
import { useEffect, useState } from "react";
import { FaBullhorn, FaCar, FaUsers } from "react-icons/fa6";

interface Evento {
  protocolo: number;
  tipo_ocorrencia: string;
  data_evento: string;
  endereco_evento: string;
}
interface Associado {
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
}
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

export default function Filter() {
  const [veiculos, setveiculos] = useState<Veiculo[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]); // Inicializa com array vazio
  const [associados, setAssociados] = useState<Associado[]>([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/eventos/buscar"
        );
        await setEventos(response.data || []); // Confirma que é uma lista
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  useEffect(() => {
    const fetchAssociados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/associados/listar"
        );
        await setAssociados(response.data.associados);
      } catch (error) {
        console.error("Erro ao buscar associados:", error);
      }
    };

    fetchAssociados();
  }, []);
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
  return (
    <div className="filter">
      <div className="amount">
        <FaUsers size={18} color="black" />
        <p>{associados.length} Associados</p>
      </div>
      <div className="amount">
        <FaCar size={18} color="black" />
        <p>{veiculos.length} Veículos</p>
      </div>
      <div className="amount">
        <FaBullhorn size={18} color="black" />
        <p>{eventos.length} Sinistros</p>
      </div>
      <div className={"line"}></div>
    </div>
  );
}
