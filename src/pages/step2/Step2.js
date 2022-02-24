import React, { useState } from "react";
import styled from "styled-components";

// Components
import Multiple from "../../components/multiple/Multiple";
import Title from "../../components/Title";
import Bottom from "../../components/Bottom";
import Valoration from "../../components/Valoration";

const Step2 = () => {
  const [ready, setReady] = useState([]);

  const handleReady = (value) => {
    if (!ready.includes(value)) {
      setReady([...ready, value]);
    }
  };

  return (
    <Body>
      <Title text="Lea la pregunta y seleccione la alternativa en una escala de 1 al 5 que mejor represente su pyme." />

      <Valoration
        setReady={handleReady}
        question={6}
        title="¿Cuánto interés tiene por las tecnologías digitales?"
        start="No me interesan"
        end="Son muy importantes."
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />

      <Valoration
        setReady={handleReady}
        question={7}
        title="¿Conoce los beneficios que pueden ofrecer las tecnologías digitales a su empresa?"
        start="No los conoce en absoluto"
        end="Los conoce perfectamente"
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />

      <Title text="Uso de tecnologías digitales" />

      <Multiple
        setReady={handleReady}
        question={8}
        options={[
          {
            label: "Si",
            value: "1",
          },
          {
            label: "No",
            value: "2",
          },
        ]}
        title="En su empresa ¿Usan celulares?"
      />

      <Bottom backTo="/step2" to="/step3" ready={ready.length === 3} />
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

export default Step2;
