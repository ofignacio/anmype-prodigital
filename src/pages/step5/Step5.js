import React, { useState } from "react";
import styled from "styled-components";

// Components
import Multiple from "../../components/multiple/Multiple";
import Title from "../../components/Title";
import Bottom from "../../components/Bottom";
import Valoration from "../../components/Valoration";

const Step5 = () => {
  const [ready, setReady] = useState([]);

  const handleReady = (value) => {
    if (!ready.includes(value)) {
      setReady([...ready, value]);
    }
  };
  return (
    <Body>
      <Title text="Sección Canales de comunicación" />

      <Valoration
        setReady={handleReady}
        question={19}
        title="¿Su pyme cuenta con presencia en linea? Esto significa que sus clientes puedan conocer su pyme, su ubicación e informarse de sus productos o servicios a través de Internet."
        start="No tenemos presencia en linea."
        end="Tenemos presencia en linea en mas de una red social y sitio web."
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
        question={20}
        options={[
          {
            label: "No nos comunicamos digitalmente con nuestros clientes.",
            value: "1",
          },
          {
            label:
              "Manejamos un único canal digital de comunicación con nuestros clientes.",
            value: "2",
          },
          {
            label:
              "Manejamos múltiples canales digitales de comunicación con nuestros clientes, pero no están relacionados entre ellos y no entregan la misma información.",
            value: "3",
          },
        ]}
        title="¿Se comunica digitalmente con sus clientes?"
      />

      <Valoration
        setReady={handleReady}
        question={21}
        title="¿En su pyme se han tomado decisiones para mejorar la comunicación digital con sus clientes?"
        start="Hasta el momento no se han tomado decisiones para mejorar los canales digitales de comunicación con nuestros clientes."
        end="Hemos tomado decisiones para mejorar los canales digitales de comunicación y ya se encuentran implementadas."
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
        question={22}
        title="¿Utilizan herramientas o medios digitales para captar nuevos clientes y fidelizar a los existentes? Por ejemplo, usar publicidad en redes sociales, ofrecer descuentos, etc."
        start="No utilizamos herramientas o medios digitales para captar nuevos clientes ni fidelizarlos."
        end="Utilizamos medios digitales para captar nuevos clientes y fidelizar a los existentes."
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
        question={23}
        title="¿Sus trabajadores se comunican entre ellos a través de medios digitales? Por ejemplo: correo electrónico, Whatsapp, Slack, etc."
        start="No se comunican por medios digitales."
        end="Siempre se comunican por medios digitales."
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
        question={24}
        title="¿Cómo gestionan los contactos sus clientes"
        start="No manejamos registro de nuestros clientes."
        end="Mantenemos contacto por medios digitales especializados (software CRM, redes sociales como Linkedin, etc.)."
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />

      <Bottom backTo='/step5' to="/step6" ready={ready.length === 6} />
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

export default Step5;
