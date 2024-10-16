import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./page.module.css";
import Paper from "@mui/material/Paper";
<<<<<<< HEAD
import Popup from "../remove/page";
=======
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
>>>>>>> 553ed980378d7f56eec4532d9b497b772fb57370

function createData(name: string, number: string, email: string, id: number) {
  return { name, number, email, id };
}

const rows = [
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
  createData(
    "Gustavo Meira",
    "(77)98833-2794",
    "gustavo.meira@teste.com",
    8763663212
  ),
  createData(
    "Davi Aguiar",
    "(77)98847-2794",
    "gatin.santos@teste.com",
    324234234
  ),
  createData(
    "Felipe Silva",
    "(77)98833-2124",
    "lipe.reidelas@teste.com",
    1241742671
  ),
];

export default function DenseTable() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/editar-associado")
  }

  return (
    <TableContainer component={Paper} style={{ maxHeight: '60vh', overflowY: 'auto'}}>
      <Table size="small" style={{width:"60vw"}}>
        <TableHead>
          <TableRow className={styles.headRow} style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#ebebeb' }}>
            <TableCell className={styles.abc} align="right"></TableCell>
            <TableCell style={{fontWeight:"bold"}}>Nome</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Telefone</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">E-mail</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="right">Matrícula</TableCell>
            <TableCell className={styles.abc} align="right">
              <Popup/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.TableBody}>
          {rows.map((row) => (
            <TableRow key={row.id} className={styles.BodyRow}>
              <TableCell align="right">
                <input type="checkbox" name="" id="" />
              </TableCell>
              <TableCell component="th" scope="row" onClick={handleClick}>
                {row.name}
              </TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">
              <Popup/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
