import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading.jsx";
import { getStudents, getAssistancesOfTheDay } from "../db/controller.js";
import AssistancesTable from "../components/AssistancesTable.jsx";

const AssistanceContainer = styled.div`
  position: absolute;
  max-height: 50vh;
  bottom: 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 10px;
  font-family: "Open Sans", sans-serif !important;
`;

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [assistances, setAssistances] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => initializeStates, []);
  const initializeStates = async () => {
    const today = new Date().toISOString().substring(0, 10);
    console.log(today);
    const assistances = await getAssistancesOfTheDay(today);
    setAssistances(assistances);
    const students = await getStudents();
    setStudents(students);
    setLoading(false);
    console.log(assistances, students);
  };
  const setCurrentDate = async (date) => {
    const assistances = await getAssistancesOfTheDay(date);
    setAssistances(assistances);
  };
  if (loading) return <Loading />;
  return (
    <AssistanceContainer className="home">
      <AssistancesTable
        students={students}
        assistances={assistances}
        setCurrentDateAssistances={setCurrentDate}
      />
    </AssistanceContainer>
  );
}
