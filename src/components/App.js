//3rd party
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { useAtom } from 'jotai';
import { toBlob } from 'html-to-image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const TopView = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderView = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderText = styled.div`
  font-size: 20px;
  padding: 10px;
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

  return (
    <TopView className="top-view">
      <HeaderView className="main-header">
        <HeaderText className="header-text">
          BINGO: {getBingoTypeDisplayName(bingoType)}{' '}
        </HeaderText>
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
      <ToastContainer position="bottom-right" />
    </TopView>
  );
};
export default App;