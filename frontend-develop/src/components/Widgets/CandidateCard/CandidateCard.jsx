import React from 'react';
import st from './CandidateCard.module.css';

const CandidateCard = ({ candidateData, resumeId }) => {
  const candidate = candidateData;
  const user = candidate.user || {};
  const workExperience = candidate.workExperience || {};
  const skills = candidate.skills || [];
  const languages = candidate.languages || [];
  const profileImage = user.profileImage || 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png';

  // Функция для загрузки резюме
  const downloadResume = async () => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/download`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf', // Задайте тип, который будет соответствовать типу файла на сервере
        },
      });

      if (response.ok) {
        // Создание ссылки на загруженный файл и автоматическое его скачивание
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.pdf'; // Задайте имя файла
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Ошибка загрузки резюме');
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };
  const formatWorkExperience = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return years > 0 
      ? `${years} ${years === 1 ? 'год' : 'лет'}, ${remainingMonths} ${remainingMonths === 1 ? 'месяц' : 'месяцев'}`
      : `${remainingMonths} месяцев`;
  };
  return (
    <div className={st.candidate_card}>
      <div className={st.candidate_card_header}>
        <img
          src={profileImage}
          alt={`${user.firstName || ''} ${user.lastName || ''}`}
          className={st.candidate_image}
        />
        <div className={st.candidate_info}>
          <h3>{user.firstName} {user.lastName || ''}</h3>
          <p><b>{user.position || 'Должность не указана'}</b></p>
          <p>{user.city}, {user.country}</p>
          <p><b>{workExperience.companyName}</b> - {workExperience.position}</p>
          <p><b>Опыт работы:</b> {formatWorkExperience(candidate.workExperienceInMonths)}</p>
        </div>
      </div>

      <div className={st.candidate_skills}>
        <h4>Навыки:</h4>
        {skills.length > 0 ? (
          <ul>
            {skills.slice(0, 3).map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>Навыки не указаны</p>
        )}
      </div>

      <div className={st.candidate_languages}>
        <h4>Языки:</h4>
        {languages.length > 0 ? (
          <ul>
            {languages.map((lang, index) => (
              <li key={index}>{lang.language} ({lang.proficiency})</li>
            ))}
          </ul>
        ) : (
          <p>Языки не указаны</p>
        )}
      </div>

      {/* Ожидаемая зарплата */}
      <div className={st.candidate_salary}>
        <h4>Ожидаемая зарплата:</h4>
        <p className={st.salary_amount}>
          {user.expectedSalary ? `${user.expectedSalary} ${user.expectedSalaryCurrency}` : 'Не указана'}
        </p>
      </div>

      {/* Ссылка на скачивание резюме */}
      <div className={st.download_resume}>
        <button onClick={downloadResume}>Скачать резюме</button>
      </div>
    </div>
  );
};

export default CandidateCard;
