import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CircularProgress from "@material-ui/core/CircularProgress";
import { executeAnonymous } from "../../middleware/api";
import Boxes from "./components/Boxes";
import Scale from "./components/Scale";
import Names from "./components/Names";

const Result = () => {
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);
  const [dimensions, setDimensions] = useState([]);
  const [maturities, setMaturities] = useState([]);
  const [values, setValues] = useState();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");
  const email = query.get("email");
  useEffect(() => {
    executeAnonymous("/api/getResults", { id, email }).then((result) => {
      if (result.dimensions && result.results && result.maturities) {
        setMaturities(result.maturities);
        setData(result.results);
        setDimensions(result.dimensions);
      }
    });
  }, []);

  useEffect(() => {
    if (data.length > 0 && dimensions.length > 0) {
      let total = 0;
      let totalDimensionC = 0;
      let final = {};

      dimensions.forEach((dimension) => {
        const result = data.find((dat) => dat.dimension === dimension.id);
        let score = result.score * dimension.multiplicator;
        total += score;
        if (dimension.id === 2 || dimension.id === 3) {
          totalDimensionC += result.score;
          return;
        }

        if (score < dimension.rookie) {
          const maturity = maturities.find((maturity) => maturity.id === 1);
          Object.assign(final, {
            [`dimension${dimension.id}`]: maturity[`dimension${dimension.id}`],
            [`dimension${dimension.id}score`]: 1,
          });
        } else if (score < dimension.initial) {
          const maturity = maturities.find((maturity) => maturity.id === 2);
          Object.assign(final, {
            [`dimension${dimension.id}`]: maturity[`dimension${dimension.id}`],
            [`dimension${dimension.id}score`]: 2,
          });
        } else if (score < dimension.advanced) {
          const maturity = maturities.find((maturity) => maturity.id === 3);
          Object.assign(final, {
            [`dimension${dimension.id}`]: maturity[`dimension${dimension.id}`],
            [`dimension${dimension.id}score`]: 3,
          });
        } else {
          const maturity = maturities.find((maturity) => maturity.id === 4);
          Object.assign(final, {
            [`dimension${dimension.id}`]: maturity[`dimension${dimension.id}`],
            [`dimension${dimension.id}score`]: 4,
          });
        }
      });

      if (total < 168) {
        const maturity = maturities.find((maturity) => maturity.id === 1);
        Object.assign(final, {
          total: "Novato",
          general: maturity.general,
          result: maturity.result,
        });
      } else if (total < 336) {
        const maturity = maturities.find((maturity) => maturity.id === 2);
        Object.assign(final, {
          total: "Inicial",
          general: maturity.general,
          result: maturity.result,
        });
      } else if (total < 504) {
        const maturity = maturities.find((maturity) => maturity.id === 3);
        Object.assign(final, {
          total: "Avanzado",
          general: maturity.general,
          result: maturity.result,
        });
      } else {
        const maturity = maturities.find((maturity) => maturity.id === 4);
        Object.assign(final, {
          total: "Experto",
          general: maturity.general,
          result: maturity.result,
        });
      }

      if (dimensions.length > 0) {
        totalDimensionC = totalDimensionC * 1.58;
        const dimensionC = dimensions.find((dimension) => dimension.id === 2);
        if (totalDimensionC < dimensionC.rookie) {
          const maturity = maturities.find((maturity) => maturity.id === 1);
          Object.assign(final, {
            dimensionC: maturity.dimensionC,
            dimensionCscore: 1,
          });
        } else if (totalDimensionC < dimensionC.initial) {
          const maturity = maturities.find((maturity) => maturity.id === 2);
          Object.assign(final, {
            dimensionC: maturity.dimensionC,
            dimensionCscore: 2,
          });
        } else if (totalDimensionC < dimensionC.advanced) {
          const maturity = maturities.find((maturity) => maturity.id === 3);
          Object.assign(final, {
            dimensionC: maturity.dimensionC,
            dimensionCscore: 3,
          });
        } else {
          const maturity = maturities.find((maturity) => maturity.id === 4);
          Object.assign(final, {
            dimensionC: maturity.dimensionC,
            dimensionCscore: 4,
          });
        }
      }
      setValues(final);
      const timeout = setTimeout(() => {
        setReady(true);
        clearTimeout(timeout);
      }, 5000);
    }
  }, [data, dimensions, maturities]);

  const generatePdf = async () => {
    const canvas1 = await html2canvas(document.getElementById("Page1"), {
      height: 1900,
      width: 1500,
    });
    const canvas2 = await html2canvas(document.getElementById("Page2"), {
      height: 1900,
      width: 1500,
    });
    const canvas3 = await html2canvas(document.getElementById("Page3"), {
      height: 1900,
      width: 1500,
    });
    const canvas4 = await html2canvas(document.getElementById("Page4"), {
      height: 1900,
      width: 1500,
    });
    const canvas5 = await html2canvas(document.getElementById("Page5"), {
      height: 1460,
      width: 1500,
    });

    const doc = new jsPDF("p", "mm", "a4", true);
    doc.addImage(
      canvas1.toDataURL("image/png", 0.3),
      "JPEG",
      10,
      10,
      200,
      280,
      undefined,
      "FAST"
    );
    doc.setPage(1);
    doc.addPage("pdf", "p");
    doc.addImage(
      canvas2.toDataURL("image/png", 0.3),
      "JPEG",
      10,
      10,
      200,
      280,
      undefined,
      "FAST"
    );
    doc.setPage(2);
    doc.addPage("pdf", "p");
    doc.addImage(
      canvas3.toDataURL("image/png", 0.3),
      "JPEG",
      10,
      10,
      200,
      280,
      undefined,
      "FAST"
    );
    doc.setPage(3);
    doc.addPage("pdf", "p");
    doc.addImage(
      canvas4.toDataURL("image/png", 0.3),
      "JPEG",
      10,
      10,
      200,
      280,
      undefined,
      "FAST"
    );
    doc.setPage(4);
    doc.addPage("pdf", "p");
    doc.setFontSize(12);
    doc.text(
      `Si querés avanzar en la digitalización de tu empresa en Anmype podemos ayudarte.
Comunicate: comunicacion@anmype.org.uy - 096984052 - 099417191
      `,
      25,
      250
    );
    // doc.textWithLink(
    //   'Registrate en los talleres de "Formación para digitalización de empresas"',
    //   25,
    //   260,
    //   {
    //     url: "https://anmype.org.uy/formacion-para-digitalizacion-de-empresas/",
    //   }
    // );

    doc.addImage(
      canvas5.toDataURL("image/png", 0.3),
      "JPEG",
      10,
      10,
      200,
      200,
      undefined,
      "FAST"
    );
    doc.setPage(5);
    doc.save(`${id}-${email}.pdf`);

    // html2canvas(page, { height: 1700, width: 1500 }).then((canvas) => {
    //   const img = canvas.toDataURL("image/png");
    //   const doc = new jsPDF();
    //   doc.addImage(img, "JPEG", 10, 10, 200, 200);
    //   doc.setPage(1);
    //   doc.addPage("pdf", "p");
    //   doc.setPage(2);
    //   doc.addImage(img, "JPEG", 10, 10, 200, 200);
    // });
  };

  useEffect(() => {
    if (values) {
      generatePdf();
    }
  }, [values]);

  if (values) {
    return (
      <>
        <Form>
          <Container id="Page1">
            <Row>
              <Logo src="assets/images/logo.jpg" />
              <Logo src="assets/images/ande.png" />
            </Row>
            <Head>Resultado Autodiagnóstico Digital</Head>
            <Text>
              La pregunta general que intenta responder este auto diagnóstico
              es: ¿Está preparada tu empresa para el mundo digital? Las nuevas
              tecnologías nos plantean grandes oportunidades y desafíos. Mejorar
              la eficiencia y la productividad, contar con información de
              calidad para tomar decisiones y aprovechar Internet para el
              desarrollo comercial nacional e internacional, son factores
              imprescindibles para mejorar nuestra competitividad y
              desarrollarnos. Medir la madurez digital de tu empresa debe ser el
              comienzo para su digitalización. Un proceso que debe permitir
              incorporar herramientas tecnológicas que se adecúen a los
              requerimientos actuales del negocio y de la estrategia futura de
              desarrollo, según las tendencias del mercado. La madurez digital
              de una empresa refiere al conjunto de habilidades y herramientas
              tecnológicas que utiliza para desempeñar sus actividades
              cotidianas. En este informe te presentamos el resultado del
              cuestionario que respondiste, indicando el grado de madurez
              digital de tu empresa. En principio se describe el grado de
              madurez general para luego mostrar los resultados en relación con
              las áreas o dimensiones de gestión. Al final se realizan una serie
              de recomendaciones para continuar por el camino de la
              transformación digital.
            </Text>
            <Box border>
              <Title>Nivel de madurez general</Title>
              <Box>
                <Subtitle>
                  El nivel general de tu empresa es: <Span>{values.total}</Span>
                </Subtitle>
                <Text>{values.general}</Text>
              </Box>
            </Box>
            <Box>
              <Title>Nivel de madurez por dimensiones</Title>
              <ScaleRow>
                <Scale
                  type={values.dimension1score}
                  name="Dirección estratégica"
                />
                <Scale
                  type={values.dimensionCscore}
                  name="Infraestructura tecngológica"
                />
                <Scale
                  type={values.dimension4score}
                  name="Administración y contabilidad"
                />
                <Scale
                  type={values.dimension5score}
                  name="Proceso productivo"
                />
                <Scale
                  type={values.dimension6score}
                  name="Marketing y ventas"
                />
                <Scale type={values.dimension7score} name="Capital humano" />
              </ScaleRow>
              <Names />
            </Box>
          </Container>

          <Container id="Page2">
            <Row>
              <Logo src="assets/images/logo.jpg" />
              <Logo src="assets/images/ande.png" />
            </Row>
            <Box>
              <Title>Resultado por Dimensiones</Title>
              <Boxpart>
                <Image src="/assets/images/inteligence.png" />
                <TextContent>
                  <Line>
                    <Subtitle>
                      Dirección estratégica, liderazgo, cultura.
                    </Subtitle>
                    <Boxes type={values.dimension1score} />
                  </Line>
                  <Text>
                    En este apartado se visualiza cómo la Dirección de la
                    empresa se posiciona en general ante la incorporación de
                    tecnologías digitales. Es importante que quien/es dirigen la
                    empresa se informen y capaciten para liderar la
                    transformación digital de la misma, induciendo y motivando a
                    su equipo hacia un trabajo planificado, que articule los
                    recursos necesarios para lograr objetivos claros para la
                    mejora del desempeño de la empresa. Para beneficiarse de las
                    nuevas tecnologías es necesario incorporar esta línea de
                    trabajo a la planificación estratégica, y a la planificación
                    específica por área o procesos, adaptando el modelo de
                    gestión a los requerimientos del desarrollo tecnológico que
                    le permitirá mejorar su eficiencia.
                  </Text>
                  <Text>{values.dimension1}</Text>
                </TextContent>
              </Boxpart>
              <Space />
              <Boxpart>
                <Image src="/assets/images/module.png" />
                <TextContent>
                  <Line>
                    <Subtitle>Infraestructura tecnológica</Subtitle>
                    <Boxes type={values.dimensionCscore} />
                  </Line>
                  <Text>
                    El nivel de incorporación y uso de hardware y software en el
                    accionar diario de la empresa es parte fundamental y básica
                    de la transformación digital. El nivel de especificidad o
                    especialización de las herramientas utilizadas son
                    indicadores del grado de madurez digital de la empresa, ya
                    que a mayor especialización mayor es el impacto en la
                    eficiencia de los procesos y procedimientos.
                  </Text>
                  <Text>{values.dimensionC}</Text>
                </TextContent>
              </Boxpart>
            </Box>
          </Container>

          <Container id="Page3">
            <Row>
              <Logo src="assets/images/logo.jpg" />
              <Logo src="assets/images/ande.png" />
            </Row>
            <Box>
              <Title>Resultado por Dimensiones</Title>
              <Boxpart>
                <Image src="/assets/images/account.png" />
                <TextContent>
                  <Line>
                    <Subtitle>Administración, contabilidad, finanzas.</Subtitle>
                    <Boxes type={values.dimension4score} />
                  </Line>
                  <Text>
                    El nivel de madurez en esta área se determina por la
                    utilización de diferentes modalidades de pago digitales para
                    los clientes y la utilización de un software contable. El
                    uso de este conjunto de herramientas permite tener
                    digitalizados todos los procedimientos inherentes a la
                    documentación de las ventas, la gestión de las cobranzas, la
                    gestión de los medios de pago, caja, cuentas bancarias,
                    entre otros, otorgando gran eficiencia y control
                    administrativo sobre los aspectos económicos y financieros
                    fundamentales en el desempeño de la empresa. Las empresas
                    usan adecuadamente estas herramientas digitales, logran
                    avanzar en la contabilidad de gestión, obteniendo de su
                    sistema información crítica y en tiempo real, que le permite
                    evaluar la evolución del negocio y tomar decisiones bien
                    informadas en forma rápida.
                  </Text>
                  <Text>{values.dimension4}</Text>
                </TextContent>
              </Boxpart>
              <Space />
              <Boxpart>
                <Image src="/assets/images/workflow.png" />
                <TextContent>
                  <Line>
                    <Subtitle>Proceso productivo – Operaciones</Subtitle>
                    <Boxes type={values.dimension5score} />
                  </Line>
                  <Text>
                    Las tecnologías digitales tienen un impacto muy importante
                    en los procesos de producción y en la forma en que se
                    prestan y organizan los servicios, aumentando
                    significativamente la productividad. Debido a que las
                    soluciones tecnológicas varían mucho según el tipo de
                    empresa y producción que realice, este diagnóstico general
                    no aporta una información suficiente sobre el nivel de
                    madurez de la empresa en esta área. Si bien se considera la
                    utilización de software de gestión de stock y planificación
                    de la producción, se recomienda profundizar en esta área en
                    base a un análisis exhaustivo de los procesos productivos y
                    las tecnologías que aplican específicamente a la actividad
                    de la empresa.
                  </Text>
                  <Text>{values.dimension5}</Text>
                </TextContent>
              </Boxpart>
            </Box>
          </Container>

          <Container id="Page4">
            <Row>
              <Logo src="assets/images/logo.jpg" />
              <Logo src="assets/images/ande.png" />
            </Row>
            <Box>
              <Title>Resultado por Dimensiones</Title>
              <Boxpart>
                <Image src="/assets/images/comercial.png" />
                <TextContent>
                  <Line>
                    <Subtitle>Marketing y ventas</Subtitle>
                    <Boxes type={values.dimension6score} />
                  </Line>
                  <Text>
                    Para fortalecer el proceso de marketing y ventas de una
                    empresa existen muchas herramientas digitales de distinto
                    tipo. Este diagnóstico mide el nivel de madurez digital en
                    base a dos áreas de soluciones, la utilización de un módulo
                    específico de software llamado CRM (sigla en inglés:
                    Customer Relationship Managment), y de las herramientas que
                    nos brinda Internet para publicitar nuestros productos y
                    servicios, comunicarnos con nuestros clientes, inducir y
                    cerrar ventas online. El software CRM nos permite gestionar
                    en una sola base de datos toda la relación y el proceso de
                    ventas con nuestros prospectos y clientes. Basándose en la
                    metodología de embudo de ventas o de conversión, organiza
                    las acciones que la empresa debe realizar para atraer
                    potenciales clientes, interesarlos en nuestra propuesta de
                    valor, venderles y fidelizarlos. Internet nos brinda un
                    sinfín de posibilidades, que, mediante el uso de
                    herramientas de marketing digital, la empresa debe
                    implementar para lograr desarrollar sus ventas.
                    Principalmente; sitio web (nuestro local o tienda en la
                    web), funcionalidades de e commerce (carrito de compra),
                    redes sociales, publicidad en Internet, market places. Una
                    correcta estrategia de marketing y ventas apoyada en
                    herramientas digitales debe integrar la gestión en un CRM
                    con las herramientas de Internet más adecuadas a sus
                    objetivos. De esta forma se puede desarrollar todo el
                    potencial de la empresa.
                  </Text>
                  <Text>{values.dimension6}</Text>
                </TextContent>
              </Boxpart>
              <Space />
              <Boxpart>
                <Image src="/assets/images/groups.png" />
                <TextContent>
                  <Line>
                    <Subtitle>Capital humano</Subtitle>
                    <Boxes type={values.dimension7score} />
                  </Line>
                  <Text>
                    Los procesos de digitalización implican cambios en la forma
                    de realizar procedimientos y tareas, afectando a las
                    personas que integran la empresa. Por esto es muy importante
                    que la transformación digital sea acompañada con una
                    correcta gestión del proyecto y del cambio que implica en la
                    organización del trabajo de la empresa, y cómo las personas
                    transitan por este proceso de cambio. El nivel de madurez
                    digital en esta área se relaciona con la incorporación de
                    herramientas digitales para la gestión del capital humano,
                    pero también con los niveles de disposición, capacitación y
                    habilidades para el uso de tecnologías que muestra el
                    personal de la empresa, como aspecto fundamental para que la
                    misma avance en su transformación digital.
                  </Text>
                  <Text>{values.dimension7}</Text>
                </TextContent>
              </Boxpart>
            </Box>
          </Container>

          <Container id="Page5">
            <Row>
              <Logo src="assets/images/logo.jpg" />
              <Logo src="assets/images/ande.png" />
            </Row>
            <Box>
              <Box border>
                <Title>Recomendaciones</Title>
                <Box>
                  <Text>
                    Iniciar, continuar y mantener el proceso de transformación
                    digital de la empresa requiere de la gestión planificada de
                    acciones específicas en todas las áreas de gestión. Este
                    auto diagnóstico desarrolla la mirada de las dimensiones y
                    procesos, constituyendo una buena herramienta para
                    identificar las debilidades existentes, asignar prioridades
                    y comenzar a actuar ordenadamente. De esta forma podrás
                    diseñar el plan de digitalización, involucrando a todo el
                    equipo e identificando las mejores soluciones específicas
                    para la empresa. Siempre planificamos con recursos escasos,
                    pero esto no debe detenerte en el esfuerzo, son muchas las
                    posibilidades que brindan hoy las nuevas tecnologías y en
                    cualquier escenario podrás realizar avances significativos e
                    ir escalando paulatinamente a soluciones más complejas.
                  </Text>
                  <Text>{values.result}</Text>
                </Box>
              </Box>
            </Box>
          </Container>
        </Form>
        <Download>La descarga comenzará automáticamente...</Download>
        {!ready ? (
          <>
            <p>Cargando...</p>
            <CircularProgress color="secondary" />
          </>
        ) : (
          <Button onClick={generatePdf}>Descargar</Button>
        )}
      </>
    );
  }
  return null;
};

const Form = styled.div`
  position: absolute;
  top: -2000%;
  width: 1430px;
`;

const Container = styled.div`
  /* background-color: #000; */
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;

const ScaleRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 350px;
`;

const Head = styled.p`
  font-size: 4em;
  max-width: 80%;
  margin: 100px auto;
  font-weight: bold;
`;

const Title = styled.p`
  font-size: 3em;
  font-weight: bold;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin: 0;
  margin-top: 10px;
  text-align: left;
`;

const Text = styled.p`
  margin: 15px 0;
  font-size: 1.5em;
  text-align: left;
`;

const Download = styled.p`
  margin: 5px 0;
  font-size: 1.5em;
`;

const Box = styled.div`
  margin: 80px 0;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  border: ${({ border }) => (border ? "1px solid rgba(0,0,0,0.2)" : "unset")};
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const Boxpart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 50px 0;
`;

const Space = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #000;
  opacity: 0.1;
`;

const TextContent = styled.div`
  flex: 1;
  margin: 0 20px;
  box-sizing: border-box;
`;

const Span = styled.span``;

const Button = styled.button`
  margin: 20px auto;
  outline: none;
  border-radius: 5px;
  border: none;
  background-color: green;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
`;

const Image = styled.img`
  height: 250px;
  width: 250px;
`;

export default Result;
