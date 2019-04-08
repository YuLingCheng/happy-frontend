import React from "react";
import styled from "styled-components";
import { H1, H2, H3, P, Toggle, Explanations, Ul, ExternalLink } from "../../components/Styleguide";
import { Label } from "./Identify.Components";

const MainContainer = styled.section`
  padding: 0 2rem 1rem;
  color: rgba(43, 27, 11, 1);
  box-sizing: border-box;
  width: calc(100% - ${props => props.sandboxWidth});
`;

const IdentifyDescription = ({ interactions, setInteractions, sandboxWidth }) => {
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
    <MainContainer sandboxWidth={sandboxWidth}>
      <H1>Identify Layouts and Components on a Mockup</H1>
      <P>
        Make sure that you have all the information about the design: size,
        position, alignment, appearance.
      </P>
      <H2>Identify layout components</H2>
      <P>Can you outline the different blocks on the mockup to the right?</P>
      <Label htmlFor="blocks-toggle">
        <Toggle
          onChange={toggleDisplayBlocks}
          checked={displayBlocks}
          id="blocks-toggle"
        />
        <span>Reveal blocks</span>
      </Label>
      {displayBlocks && <Explanations>
        <H3>Where should there be a block?</H3>
        <P>
          Blocks are <u>containers</u>. You want to wrap content into groups that <u>make sense</u>.<br/>
          <em>Tips</em>:
          <Ul>
            <li>Blocks should be <u>adjacent or nested</u>. There are hardly blocks intersecting each other (except when you use layers).</li>
            <li>If you want to apply a background (color or image) you need to define a block container.</li>
            <li>Usually, you'll need a block if you want to put on the same line several elements that aren't all text.</li>
          </Ul>
        </P>
        <H3>What size should blocks be?</H3>
        <P>
          By default in HTML, blocks take <u>all the space available</u> in the horizontal direction (their width spreads).<br/>
          Vertically, blocks fit the content by default (their height does not spread).<br/>
          Size is then <u>constrained by specified properties</u>:
        </P>
        <Ul>
          <li>
            Set on the block: <u>width/height properties</u>
            <Ul>
              <li>Is the size fixed (<ExternalLink href='https://www.w3schools.com/cssref/css_units.asp'>px, cm...</ExternalLink>) or proportional (<ExternalLink href='https://www.w3schools.com/cssref/css_units.asp'>rem, em, %, vh, vw</ExternalLink>)?</li>
            </Ul>
          </li>
          <li>
            Set by the parent: <u>padding</u>
            <Ul>
              <li>Padding is the space inside a block, between the block border and the blocks children elements.</li>
              <li>It affects the size of the block and its children as they'll take the space left inside.</li>
            </Ul>
          </li>
          <li>
            Set by adjacent elements: <u>margin</u>
            <Ul>
              <li>Margin is the space outside the block, between the block border and the adjacent elements.</li>
              <li>Margins space elements from the same level.</li>
              <li>They affect the size of the adjacent elements if they were supposed to spread in the same direction.</li>
            </Ul>
          </li>
        </Ul>
        <P>
          Ex 1: If the "Interactive tutorials" block was supposed to spread vertically to the available page height,
          its size is limitted by the elements at the same level (Header, Subscription block, Footer)
          and the margins between them.
        </P>
        <P><em>Tips</em>:</P>
        <Ul>
          <li><b>Make sure that proportional sizes are clearly specified with the mockup</b>,
          as they are not directly visible or difficult to infer.</li>
          <li>
            Is you set a padding on a container that has many children,
            it will affect all children.
            Make sure that each child won't need to be bigger than the space they'll have left.
          </li>
        </Ul>
        <P>
          Ex 2: Padding cannot affect the whole html page because the footer needs to be 100% width.
          There are therefore two blocks (red container and footer).<br/>
          Ex 3: In the red container, there seem to be the same space between the red container's border and the header or the "Subscription" block contents.
          However, the cup background spreads beyond that space.
          Consequenltly, if the cup backgroud applies to the "Interactive tutorials" block,
          the red container cannot have padding on the side
          because it would make the "Interactive tutorials" block too small.
        </P>
      </Explanations>}
      <P>
        Now how would you name them and what html tag would you use for each?
      </P>
      <Label htmlFor="block-labels-toggle">
        <Toggle
          onChange={toggleDisplayBlockLabels}
          checked={displayBlockLabels}
          id="block-labels-toggle"
          disabled={!displayBlocks}
        />
        <span>Reveal blocks tags</span>
      </Label>
      {displayBlockLabels && <Explanations>
        <H3>How to choose names and tags?</H3>
        <P>
          Html tags have a semantic meaning (used by SEO engines and accessibility tools).
          It ts thus important to choose relevant ones if you care about these.<br/>
          Html tags define default display properties. Are by default displayed as blocks:
        </P>
        <Ul>
          <li>header</li>
          <li>footer</li>
          <li>main (one per page)</li>
          <li>section (many, can be nested)</li>
          <li>article (many)</li>
          <li>div</li>
          <li>form</li>
          <li>nav</li>
        </Ul>
        <P><em>Tips</em>:</P>
        <Ul>
          <li>
            Name blocks by type of layout and business definition.
            Do not define a name from the block appearance (because it can change without you wanting to change the name).
          </li>
          <li>
            Consequently, if two elements have the same style,
            it does not mean they should necessary have the same name.
            You might want to change the first's style but not the latter.
          </li>
          <li>You can use a default style with inheritance and overwritting to manage different elements styles</li>
        </Ul>
      </Explanations>}
      <H2>Identify components</H2>
      <P>
        Can you outline the different components on the mockup to the right?
      </P>
      <Label htmlFor="component-toggle">
        <Toggle
          onChange={toggleDisplayComponents}
          checked={displayComponents}
          id="component-toggle"
        />
        <span>Reveal components</span>
      </Label>
      {displayComponents && <Explanations>
        <H3>List of components</H3>
        <P>
          These are the different types of components:
        </P>
        <Ul>
          <li>text</li>
          <li>link</li>
          <li>button</li>
          <li>form input</li>
          <li>icon</li>
          <li>media (images or videos that are not background)</li>
        </Ul>
      </Explanations>}
      <P>
        Now how would you name them and what html tag would you use for each?
      </P>
      <Label htmlFor="component-labels-toggle">
        <Toggle
          onChange={toggleDisplayComponentLabels}
          checked={displayComponentLabels}
          id="component-labels-toggle"
          disabled={!displayComponents}
        />
        <span>Reveal component tags</span>
      </Label>
      {displayComponentLabels && <Explanations>
        <H3>How to choose names and tags?</H3>
        <P>
          Html tags have a semantic meaning (used by SEO engines and accessibility tools).
          It ts thus important to choose relevant ones if you care about these.<br/>
          Html tags define default display properties.<br/>
          Are by default displayed as blocks (with width spreading to the available space):
        </P>
        <Ul>
          <li>Titles (h1, h2...)</li>
          <li>Paragraphs (p)</li>
          <li>Lists (ul, li)</li>
          <li>Inputs (input)</li>
          <li>Images (img, svg) and Videos (video)</li>
        </Ul>
        <P>The followings have their size fits the content and are displayed inline</P>
        <Ul>
          <li>Spans (span)</li>
          <li>Links (a)</li>
          <li>Emphasis (em, i, u, b)</li>
          <li>Labels (label)</li>
          <li>Buttons (button) - also blocks (can contain other inline elements)</li>
        </Ul>
        <P><em>Tips</em>:</P>
        <Ul>
          <li>
            Inline elements can be nested in block elements.
          </li>
          <li>
            Name components by type of layout and business definition.
            Do not define a name from the element appearance (because it can change without you wanting to change the name).
          </li>
          <li>
            Consequently, if two elements have the same style,
            it does not mean they should necessary have the same name.
            You might want to change the first's style but not the latter.
          </li>
          <li>You can use a default style with inheritance and overwritting to manage different elements styles</li>
        </Ul>
      </Explanations>
    }

    </MainContainer>
  );
};

export default IdentifyDescription;
