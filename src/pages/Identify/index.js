import React, { Fragment, useState } from "react";

import { IdentifyContainer } from "./Identify.Layout";
import Header from "../../components/Header";
import Main from "../../components/Main";
import IdentifySandbox from "./IdentifySandbox";

import BackgroundBase from "../../assets/decorations/BackgroundBase";
import Pencil from "../../assets/decorations/Pencil";
import IdentifyDescription from "./IdentifyDescription";

const Identify = () => {
  const [interactions, setInteractions] = useState({
    displayBlocks: false,
    displayBlockLabels: false,
    displayComponents: false,
    displayComponentLabels: false
  });

  return (
    <Fragment>
      <Header />
      <Main narrow expandable>
        <IdentifyContainer>
          <IdentifyDescription
            interactions={interactions}
            setInteractions={setInteractions}
          />
          <IdentifySandbox interactions={interactions} />
        </IdentifyContainer>
      </Main>
      <BackgroundBase>
        <Pencil.Shadow rotate="25" left="145px" top="0">
          <Pencil />
        </Pencil.Shadow>
      </BackgroundBase>
    </Fragment>
  );
};

export default Identify;
