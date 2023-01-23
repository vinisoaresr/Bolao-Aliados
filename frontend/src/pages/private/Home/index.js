import React, { useState, useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import SpinnerLoading from "../../../components/SpinnerLoading";
import CardMatch from "../../../components/CardMatch";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Body,
  Wrapper,
  WrapperCard,
  WrapperRanking,
  WrapperTransactions,
  Row,
  CarouselButton,
} from "./styles";
import Ranking from "../../../components/Ranking";
import Modal from "react-modal";
import ModalMatchGuess from "../../../components/ModalGuess";
import useToast from "../../../hooks/useToast";
import EnhancedTable from "../../../components/Transactions";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    width: "85%",
    height: "85%",
  },
};

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const matches = useFetch("/match");
  const ranking = useFetch(`/ranking/list`);
  const transactions = useFetch(`/transactions/read`, "POST", user.user);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { notifyUser } = useToast();

  const carousel = useRef(null);

  if (matches.loading || ranking.loading || transactions.loading) {
    return <SpinnerLoading value={matches.loading} />;
  }

  const filteredMatches = matches.value.map((match) => {
    const hasTransaction = transactions.value.some(
      (transaction) => transaction.match.id_match === match.id_match
    );
    return { ...match, hasTransaction };
  });

  const handleLeftClick = (event) => {
    event.preventDefault();
    carousel.current.scrollLeft -= 0.9 * carousel.current.offsetWidth; // 90% of width
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    carousel.current.scrollLeft += 0.9 * carousel.current.offsetWidth; // 90% of width
  };

  function openModal(match) {
    if (match.hasTransaction) {
      const transaction = transactions.value.find(
        (transaction) => transaction.match.id_match === match.id_match
      );
      setSelectedMatch({ ...match, transaction });
    } else {
      setSelectedMatch(match);
    }
    setIsOpen(true);
  }

  function closeModal({ success = false, messages = null, notify = true }) {
    if (!notify) {
      setIsOpen(false);
      return;
    }
    if (success) {
      notifyUser("success", "Transação realizada com sucesso!", "");
      transactions.setNeedRefresh(true);
    } else {
      if (messages) {
        notifyUser("error", "Ocorreram os seguintes erros:", messages);
      } else {
        notifyUser(
          "error",
          "Erro ao atualizar a transação",
          "Não foi possível atualizar a transação."
        );
      }
      transactions.setNeedRefresh(true);
    }
    setIsOpen(false);
  }

  return (
    <Body>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal({ notify: false })}
        style={customStyles}
        contentLabel="Modal"
      >
        <ModalMatchGuess match={selectedMatch} callback={closeModal} />
      </Modal>
      <WrapperCard ref={carousel}>
        {/* todo: wrap this for other component, without carousel buttons, row and map() here */}
        <CarouselButton className="carousel--left" onClick={handleLeftClick}>
          <IoIosArrowBack />
        </CarouselButton>
        <Row className="carousel">
          {filteredMatches.map((match) => (
            <CardMatch key={match.id} match={match} callback={openModal} />
          ))}
        </Row>
        <CarouselButton className="carousel--right" onClick={handleRightClick}>
          <IoIosArrowForward />
        </CarouselButton>
      </WrapperCard>
      <Wrapper>
        <WrapperTransactions>
          <EnhancedTable transactions={transactions.value} />
        </WrapperTransactions>
        <WrapperRanking>
          <Ranking ranking={ranking} />
        </WrapperRanking>
      </Wrapper>
    </Body>
  );
}

export default Home;
