/**
 * Author: RSP Aguilar
 * Create Date: 2021-02-06T02:26:19.730Z
 */

import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import optionData from '../../spaces.json';
import { ModalBtn } from './ModalComponents';
import ModalView from './ModalView';
import { Listbox } from 'react-widgets/cjs';

const Spacer = styled.div`
  height: 15px;
`;

const options = optionData.options;

const StyledList = styled(Listbox)`
  max-height: calc(85vh - 75px);
  .rw-list-option {
    border-top: solid 1px black;
  }

  .rw-list-option:first-child {
    border-top: none;
  }
`;

const Title = styled.div`
  font-size: 1.25em;
`;

const OptionsModal = (props) => {
  const { onRequestClose } = props;

  return (
    <Modal {...props}>
      <ModalView>
        <Title>Options</Title>
        <br />
        <StyledList data={options} textField="full" readOnly />
        <Spacer />
        <ModalBtn onClick={onRequestClose}> Close </ModalBtn>
      </ModalView>
    </Modal>
  );
};

export default OptionsModal;
