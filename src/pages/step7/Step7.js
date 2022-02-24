import React, { useState } from "react";
import styled from "styled-components";

// Components
import Multiple from "../../components/multiple/Multiple";
import Title from "../../components/Title";
import Bottom from "../../components/Bottom";
import Valoration from "../../components/Valoration";

const Step7 = () => {
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
        question={31}
        options={[
          {
            label: "Trabajamos de manera presencial en un lugar determinado.",
            value: "1",
          },
          {
            label:
              "Se permiten en algunas instancias las jornadas de teletrabajo.",
            value: "2",
          },
          {
            label:
              "Está establecido el uso regular de jornadas de teletrabajo.",
            value: "3",
          },
        ]}
        title='¿Se permite en su pyme el trabajo remoto o "teletrabajo"?'
      />

      <Multiple
        setReady={handleReady}
        question={32}
        options={[
          {
            label: "No son prioridad o no son necesarias.",
            value: "1",
          },
          {
            label: "Se prefieren, pero no son excluyentes.",
            value: "2",
          },
          {
            label: "Se buscan activamente las habilidades digitales.",
            value: "3",
          },
        ]}
        title="Al momento de contratar personal para su pyme, ¿ se consideran las habilidades digitales como un factor clave?"
      />

      <Title text="Sección Adopción tecnológica" />

      <Valoration
        setReady={handleReady}
        question={33}
        title="¿Qué tanto depende su pyme de las tecnologías digitales?"
        start="Nuestra pyme no depende de las tecnologías digitales."
        end="Nuestra pyme depende del uso de las tecnologías digitales."
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
        question={34}
        title="¿Su pyme cuenta con equipos tecnologías suficientes para realizar su trabajo de manera digital? Por ejemplo, computadoras, celulares, routers WiFi, etc."
        start="Los equipos tecnológicos que tenemos son insuficientes para nuestro quehacer diario en la pyme."
        end="Tenemos una cantidad apropiada de equipos tecnológicos para trabajar diariamente de manera digital."
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
        question={35}
        title="¿Cree que su pyme cuenta con infraestructura tecnológica apropiada para la implementación de nuevas tecnologías digitales"
        start="Nuestra infraestructura aun no es compatible con los requerimientos de las nuevas tecnologías."
        end="Nuestra pyme posee la infraestructura digital apropiada para implementar nuevas tecnologías."
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />

      <Bottom backTo="/step6" isEnd to="/finish" ready={ready.length === 5} />
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

export default Step7;
