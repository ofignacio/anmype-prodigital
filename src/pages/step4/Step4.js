import React, { useState } from "react";
import styled from "styled-components";

// Components
import Multiple from "../../components/multiple/Multiple";
import Bottom from "../../components/Bottom";
import Valoration from "../../components/Valoration";
import Title from "../../components/Title";

const Step4 = () => {
  const [ready, setReady] = useState([]);

  const handleReady = (value) => {
    if (!ready.includes(value)) {
      setReady([...ready, value]);
    }
  };

  return (
    <Body>
      <Title text="El grupo de preguntas que sigue refiere al conjunto de los programas y aplicaciones que utiliza en su empresa." />

      <Multiple
        setReady={handleReady}
        question={16}
        options={[
          {
            label: "Residentes en las computadoras de la empresa",
            value: "1",
          },
          {
            label: "Algunos residentes y otros en la nube",
            value: "2",
          },
          {
            label: 'En la "nube"',
            value: "3",
          },
          {
            label: "No sabe",
            value: "4",
          },
        ]}
        title="Los programas y aplicaciones que utiliza son:"
      />

      <Multiple
        setReady={handleReady}
        question={17}
        options={[
          { label: "No tiene", value: "1" },
          { label: "Tiene pero no lo utiliza", value: "2" },
          { label: "Tiene y lo utiliza parcialmente", value: "3" },
          { label: "Tiene y lo utiliza completamente", value: "4" },
        ]}
        title="¿Entre los programas que utiliza, cuenta con un módulo para contabilidad? ¿En qué medida lo utiliza?"
      />

      <Multiple
        setReady={handleReady}
        question={15}
        options={[
          {
            label:
              "Programas o aplicaciones de oficina (como Word y Excel) para apoyar las funciones de nuestra pyme.",
            value: "1",
          },
          {
            label:
              "Programas o aplicaciones de oficina y al menos un programa especializado, que apoye un aspecto de nuestra pyme o que resulte necesario para ofrecer un producto o servicio.",
            value: "2",
          },
          {
            label:
              "Programas o aplicaciones de oficina y varios programas o aplicaciones especializados, en varios aspecto de nuestra pyme.",
            value: "3",
          },
        ]}
        title="¿Qué tipo de programas o aplicaciones usan en su pyme?"
      />

      <Valoration
        setReady={handleReady}
        question={16}
        title="En su pyme, ¿se han educado o capacitado en temas digitales?"
        start="No lo hemos hecho. En caso de necesitarlo, cada quien aprende individualmente para suplir falencias."
        end="Hemos tenido instancias formales de educación y/o facilitamos recursos o contactos para la formación de los trabajadores (cursos, capacitaciones, workshops, etc)."
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
        question={17}
        options={[
          {
            label:
              "Solo presencialmente (local comercial u oficina)y/o por vía telefónica.",
            value: "1",
          },
          {
            label: "Solo por Ineternet.",
            value: "2",
          },
          {
            label:
              "Presencialmente (local comercial u oficina) y por medio de Internet.",
            value: "3",
          },
        ]}
        title="¿Qué canales usa para vender su producto o servicio?"
      />

      <Multiple
        setReady={handleReady}
        question={18}
        options={[
          {
            label: "Pagan con efectivo y/o cheque.",
            value: "1",
          },
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

      <Bottom backTo="/step4" to="/step5" ready={ready.length === 6} />
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

export default Step4;
