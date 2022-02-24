import React, { useState } from "react";
import styled from "styled-components";

// Components
import Multiple from "../../components/multiple/Multiple";
import Title from "../../components/Title";
import Bottom from "../../components/Bottom";
import Valoration from "../../components/Valoration";

const Step6 = () => {
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
        question={25}
        options={[
          {
            label: "Si.",
            value: "1",
          },
          {
            label: "No.",
            value: "2",
          },
          {
            label: "No lo sé.",
            value: "3",
          },
        ]}
        title="¿Su pyme mantiene contacto con proveedores?"
      />

      <Valoration
        setReady={handleReady}
        question={26}
        title="¿El formato bajo el cual trabajan en su pyme es análogo(papel) o digital."
        start="Trabajamos mayoritariamente en papel."
        end="Trabajamos totalmente en digital."
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
        question={27}
        title="¿Cómo se almacena la información en su pyme?"
        start="En medios físicos, como papel, libros y/o archivadores"
        end="En la nube(Dropbox, Google Drive, Onedrive, ICloud, etc.)"
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />

      <Title text="Sección Procesamiento de datos" />

      <Valoration
        setReady={handleReady}
        question={28}
        title="En su pyme ¿ qué tan posible seria abrirse a los cambios que deberían realizar para transformarse digitalmente?"
        start="Sería dificil implementar los cambios necesarios para transformarnos digitalmente."
        end="Sería fácil implementar los cambios necesario para transformarnos digitalmente."
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
        question={29}
        title="¿Qué tanto interés tienen en su pyme por digitalizar su forma de trabajo?"
        start="No es actualmente de nuestro interés cambiar nuestra forma de trabajo."
        end="Nos interesa cambiar nuestra forma de trabajo."
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
        question={30}
        title="¿En qué grado las tecnologías digitales han flexibilizado la forma de trabajo de su negocio? Por ejemplo, mediante plataformas de trabajo colaborativo, la comunicación a distancia o las nubes de datos."
        start="No hemos alterado nuestra forma de hacer las cosas, ni planeamos hacerlo."
        end="Hemos cambiado la forma de hacer nuestro trabajo, al adaptarnos a las tecnologías digitales."
        options={[
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]}
      />

      <Bottom backTo='/step6' to="/step7" ready={ready.length === 6} />
    </Body>
  );
};

const Body = styled.div`
  text-align: center;
`;

export default Step6;
