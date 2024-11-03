//3rd party
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { useAtom } from 'jotai';
import { toBlob } from 'html-to-image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactModal from 'react-modal';
//local
import './App.css';
import Board from './Board';
import { useModal } from '../util/useModal';
import HamburgerModal, { hamburgerReturnOptions } from './modal/HamburgerModal';
import OptionsModal from './modal/OptionsModal';
import { atoms } from '../data';
import { getBingoTypeDisplayName, createNewBoard } from '../util';
import gearIcon from '../images/211751_gear_icon.png';
import InfoModal from './modal/InfoModal';
import AboutView from './AboutView';
import TypeModal from './modal/TypeModal';

const TopView = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const HeaderView = styled.div`
  display: flex;
  flex-direction: row;
`;

const LINK_BLUE = '#0000FF';
const StyledButton = styled.button`
  font-size: 20px;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: ${LINK_BLUE};
`;

const Spacer = styled.div`
  flex: 1;
`;

const HamburgerBtn = styled.button`
  height: 5em;
  width: 5em;
  background-image: url(${gearIcon});
  border: none;
  background-size: 5em 5em;
  background-color: transparent;
`;

const clearBoard = (board) => {
  const newBoard = _.cloneDeep(board);

  newBoard.forEach((row) => row.forEach((space) => (space.isSelected = false)));

  return newBoard;
};

const App = (props) => {
  const [bingoType, setBingoType] = useAtom(atoms.bingoType);
  const [board, setBoard] = useAtom(atoms.board);
  const boardRef = useRef();

  const { modal: hamburgerModal, show: showHamburgerModal } =
    useModal(HamburgerModal);
  const { modal: allOptionsModal, show: showAllOptions } =
    useModal(OptionsModal);
  const { modal: aboutModal, show: showAboutModal } = useModal(InfoModal);
  const { modal: typeModal, show: showTypeModal } = useModal(TypeModal);

  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);
  //init board
  useEffect(() => {
    if (!board) {
      setBoard(createNewBoard());
    }
  }, [board, setBoard]);

  const handleHamburgerModal = async () => {
    const result = await showHamburgerModal({ bingoType });

    if (result) {
      const { action, payload } = result;
      switch (action) {
        case hamburgerReturnOptions.NEW_GAME:
          setBoard(createNewBoard());
          break;
        case hamburgerReturnOptions.CLEAR_BOARD:
          setBoard(clearBoard(board));
          break;
        case hamburgerReturnOptions.BINGO_TYPE:
          setBingoType(payload.value);
          break;
        case hamburgerReturnOptions.VIEW_ALL_OPTIONS:
          showAllOptions();
          break;
        case hamburgerReturnOptions.ABOUT:
          showAboutModal({ message: <AboutView /> });
          break;
        case hamburgerReturnOptions.EXPORT:
          const blob = await toBlob(boardRef.current, { cacheBust: true });
          navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ]);
          toast('Image copied to clipboard');
          break;
        default:
          break;
      }
    }
  };

  const onTypeClick = async () => {
    const newType = await showTypeModal();
    newType && setBingoType(newType);
  };

  return (
    <TopView className="top-view">
      <HeaderView className="main-header">
        <StyledButton className="header-text" onClick={onTypeClick}>
          BINGO: {getBingoTypeDisplayName(bingoType)}
        </StyledButton>
        <Spacer />
        <HamburgerBtn
          className="hamburger-button"
          onClick={handleHamburgerModal}
        />
      </HeaderView>
      <Board className="game-board" ref={boardRef} />
      {hamburgerModal}
      {allOptionsModal}
      {aboutModal}
      {typeModal}
      <ToastContainer position="bottom-right" />
    </TopView>
  );
};
export default App;
