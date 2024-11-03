/**
 * Author: RSP Aguilar
 * Created: 2021
 */
import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { generateClassname } from '../../util';

const TopView = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerView = styled.div`
  background-color: white;
  margin: 20px;
  padding: 20px;
  border: solid 1px black;
  border-radius: 12px;
`;

const ModalView = (props) => (
  <TopView
    className={generateClassname('modal-view', props.className)}
    {..._.omit(props, ['children', 'className'])}
  >
    <InnerView className="inner-modal-view">{props.children}</InnerView>
  </TopView>
);

export default ModalView;
