import React, { useState } from "react";
import styled from "styled-components";

// Components
import Bottom from "../../components/Bottom";
import Valoration from "../../components/Valoration";
import Multiple from "../../components/multiple/Multiple";
import Write from "../../components/Write";

const Step3 = () => {
  const [ready, setReady] = useState([]);

  const handleReady = (value) => {
    if (!ready.includes(value)) {
      setReady([...ready, value]);
    }
  };

  return (
    <Body>
      <Multiple
        setReady={handleReady}
        question={9}
        options={[
          { label: "Si", value: "1" },
          { label: "No", value: "2" },
        ]}
        title="En su empresa ¿Usan tablets, computadoras portátiles o de escritorio?"
      />

      <Multiple
        setReady={handleReady}
        question={10}
        options={[
          { label: "Si", value: "1" },
          { label: "No", value: "2" },
        ]}
        title="En su empresa ¿Usan Internet?"
      />

      <Multiple
        setReady={handleReady}
        question={11}
        options={[
          { label: "Pagan con efectivo y/o cheque.", value: "1" },
          {
            label:
              "Pagan con efectivo, cheque y/o tarjetas (crédito o débito).",
            value: "2",
          },
          {
            label:
              "Pagan con efectivo, cheque, tarjetas (crédito o débito) y/o pago por Internet o transferencias bancarias.",
            value: "3",
          },
        ]}
        title="Sus clientes ¿Cómo pagan sus productos o servicios?"
      />

      <Valoration
        setReady={handleReady}
        question={12}
        title="¿Su empresa cuenta con equipamiento suficiente para realizar su trabajo de forma digital?"
        start="No son suficientes"
        end="Son suficientes"
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />

      <Multiple
        setReady={handleReady}
        question={13}
        options={[
          { label: "Si", value: "1" },
          {
            label: "No",
            value: "2",
          },
        ]}
        title="¿Utiliza algún programa o aplicación para facilitar las tareas en su empresa?"
      />

      <Multiple
        setReady={handleReady}
        question={14}
        options={[
          {
            label: "Programas o aplicaciones de oficina (como Word y Excel).",
            value: "1",
          },
          {
            label: "Programas o aplicaciones de oficina (como Word y Excel).",
            value: "2",
          },
          {
            label:
              "Programas o aplicaciones de oficina y varios programas o aplicaciones especializados, en varias áreas de la empresa.",
            value: "3",
          },
        ]}
        title="¿Qué tipo de programas o aplicaciones usan en su empresa?"
      />

      <Write
        question={15}
        placeholder="Tu respuesta"
        title="¿Cuál es el nombre de los software que utiliza?"
      />

      <Bottom backTo="/step3" to="/step4" ready={ready.length === 5} />
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

export default Step3;
