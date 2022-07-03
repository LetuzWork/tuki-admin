import { useState } from "react";
import styled from "styled-components";
import CommonTable from "../common/CommonTable";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { deleteRegister } from "../db/controller";

const TableContainer = styled.div`
  box-shadow: 0 0 20px #0002;
  border-collapse: collapse;
  margin: 15px auto;
  width: fit-content;

  * {
    font-family: "Open Sans", sans-serif !important;
  }
  .material-icons {
    font-family: "Material Icons" !important;
    transition: 0.3s;
    &:hover {
      color: #c07;
      cursor: pointer;
    }
    &:target {
      color: #f07;
    }
  }

  Table {
    min-width: 500px;
  }
  thead th {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }
  th,
  td {
    padding: 12px 15px;
  }
  tbody tr {
    border-bottom: 1px solid #dddddd;
  }
  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
`;

const Title = styled.div`
  font-size: 30px;
  color: #009879;
  text-align: center;
  margin-bottom: 30px;
`;

const AssistanceCard = styled.div`
  border-radius: 5px;
  box-shadow: 2px 2px 3px 5px #3333;
  padding: 40px 20px;
  margin: 20px auto;
  width: fit-content;
`;
export default function AssistancesTable({
  students,
  assistances,
  setCurrentDateAssistances,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const assistancesHeaders = [
    { text: "Ingreso", path: (x) => x.time },
    {
      text: "Alumno",
      path: (x) => {
        const student = students.find((user) => user.id === x.user);
        return student.name + student.surname;
      },
    },
    {
      text: "Curso",
      path: (x) => students.find((user) => user.id === x.user).course,
    },
  ];
  const getFormatedData = (date) => date && date.toISOString().substring(0, 10);
  return (
    <>
      <Title>Panel de Asistencias</Title>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Cambiar Dia"
          onChange={(newDate) => {
            console.log(newDate);
            setCurrentDate(newDate);
            setCurrentDateAssistances(getFormatedData(newDate));
          }}
          value={currentDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {!assistances.error ? (
        <TableContainer>
          <CommonTable
            headers={assistancesHeaders}
            list={assistances}
            actions={[
              {
                icon: "delete",
                event: async (x) => {
                  const dateFormated = currentDate
                    .toISOString()
                    .substring(0, 10);
                  const response = await deleteRegister(dateFormated, x.user);
                  if (response.succeed) setCurrentDateAssistances(dateFormated);
                },
              },
            ]}
          />
        </TableContainer>
      ) : (
        <AssistanceCard>Nadie presente este dia</AssistanceCard>
      )}
    </>
  );
}
