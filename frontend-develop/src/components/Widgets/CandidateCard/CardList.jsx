import React, { useState } from 'react';
import CandidateCard from './CandidateCard';
import st from './CardList.module.css';
const CardList = ({ candidates }) => {

 /*   const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const candidatesPerPage = 10; // Количество карточек на странице

  // Вычисление индексов для среза массива
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  // Функция для переключения страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Количество страниц
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(candidates.length / candidatesPerPage); i++) {
    pageNumbers.push(i);
  }*/

    return (
      <div className={st.card_list_container}>
        <div className={st.card_list}>
          {candidates.map((candidateData, index) => (
            <CandidateCard key={index} candidateData={candidateData} resumeId={candidateData.id} />
          ))}
        </div>

        {/*<div className={st.pagination}>
        {pageNumbers.map((number) => (
            <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-button ${number === currentPage ? 'active' : ''}`}
        >
            {number}
        </button>
        ))}
    </div>*/}
  </div>
  );
};

export default CardList;