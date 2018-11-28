import React from "react";
import Switch from "react-switch";
import styled from "styled-components";
import { H1, H2, P } from "../../components/Styleguide";
import { Label } from "./Identify.Components";

const MainContainer = styled.section`
  padding: 0 2rem 1rem;
  color: rgba(43, 27, 11, 1);
  box-sizing: border-box;
  width: calc(100% - 384px);
`;

const IdentifyDescription = ({ interactions, setInteractions }) => {
  const {
    displayBlocks,
    displayBlockLabels,
    displayComponents,
    displayComponentLabels
  } = interactions;
  const toggleDisplayBlocks = () =>
    setInteractions({ ...interactions, displayBlocks: !displayBlocks });
  const toggleDisplayBlockLabels = () =>
    setInteractions({
      ...interactions,
      displayBlockLabels: !displayBlockLabels
    });
  const toggleDisplayComponents = () =>
    setInteractions({ ...interactions, displayComponents: !displayComponents });
  const toggleDisplayComponentLabels = () =>
    setInteractions({
      ...interactions,
      displayComponentLabels: !displayComponentLabels
    });
  return (
    <MainContainer>
      <H1>Identify Layouts and Components on a Mockup</H1>
      <P>
        Make sure that you have all the information about the design: size,
        position, alignment, appearance.
      </P>
      <H2>Identify blocs</H2>
      <P>Can you outline the different blocks on the mockup to the right?</P>
      <Label htmlFor="blocks-toggle">
        <Switch
          onChange={toggleDisplayBlocks}
          checkedIcon={false}
          uncheckedIcon={false}
          checked={displayBlocks}
          id="blocks-toggle"
        />
        <span>Reveal blocks</span>
      </Label>
      <P>
        Now how would you name them and what html tag would you use for each?
      </P>
      <Label htmlFor="block-labels-toggle">
        <Switch
          onChange={toggleDisplayBlockLabels}
          checkedIcon={false}
          uncheckedIcon={false}
          checked={displayBlockLabels}
          id="block-labels-toggle"
          disabled={!displayBlocks}
        />
        <span>Reveal blocks tags</span>
      </Label>
      <H2>Identify components</H2>
      <P>
        Can you outline the different components on the mockup to the right?
      </P>
      <Label htmlFor="component-toggle">
        <Switch
          onChange={toggleDisplayComponents}
          checkedIcon={false}
          uncheckedIcon={false}
          checked={displayComponents}
          id="component-toggle"
        />
        <span>Reveal components</span>
      </Label>
      <P>
        Now how would you name them and what html tag would you use for each?
      </P>
      <Label htmlFor="component-labels-toggle">
        <Switch
          onChange={toggleDisplayComponentLabels}
          checkedIcon={false}
          uncheckedIcon={false}
          checked={displayComponentLabels}
          id="component-labels-toggle"
          disabled={!displayComponents}
        />
        <span>Reveal component tags</span>
      </Label>
    </MainContainer>
  );
};

export default IdentifyDescription;
