import React from "react";
import MaterialContainer from "@material-ui/core/Container";
import styled from "styled-components";

const Container = ({ maxWidth = "md", withoutMargin, children, className }) => {
  return (
    <Content
      maxWidth={maxWidth}
      withoutMargin={withoutMargin}
      className={className}
    >
      {children}
    </Content>
  );
};

const Content = styled(MaterialContainer)`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: ${({ maxWidth }) => (maxWidth === "xl" ? "0px" : "8px")};
  text-align: left;
  margin: ${({ withoutMargin }) => (withoutMargin ? "0 0 20px 0" : "20px")};
`;

export default Container;
