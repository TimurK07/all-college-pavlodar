import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CollegeList.module.css";
import useColleges from '../../hooks/useColleges';

const CollegeList = () => {
  const { data, isLoading, isError } = useColleges();
  const colleges = data?.data || [];
  console.log('colleges from backend:', colleges);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Фильтрация колледжей по поисковому запросу и категории
  const filteredColleges = colleges.filter(college => {
    const title = college.title || '';
    const description = college.description || '';
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "all") return matchesSearch;

    // Фильтрация по типу колледжа
    const collegeType = getCollegeType(title.toLowerCase());
    return matchesSearch && collegeType === activeFilter;
  });

  // Определение типа колледжа по названию
  function getCollegeType(name) {
    if (name.includes("информацион")) return "it";
    if (name.includes("медицин")) return "medical";
    if (name.includes("технолог") || name.includes("политехн")) return "technical";
    if (name.includes("педагог")) return "pedagogical";
    return "other";
  }

  // Сброс поиска
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Колледжи Павлодара</h1>
          <p className={styles.subtitle}>Найдите лучший колледж для вашего будущего образования</p>
        </div>

        <div className={`${styles.searchContainer} ${searchFocused ? styles.searchFocused : ''}`}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Поиск колледжей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          {searchTerm && (
            <button className={styles.clearButton} onClick={handleClearSearch}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.filterContainer}>
          <button
            className={`${styles.filterButton} ${activeFilter === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Все
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'it' ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter('it')}
          >
            IT
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'medical' ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter('medical')}
          >
            Медицинские
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'technical' ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter('technical')}
          >
            Технические
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'pedagogical' ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter('pedagogical')}
          >
            Педагогические
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p className={styles.loadingText}>Загрузка колледжей...</p>
          </div>
        ) : filteredColleges.length > 0 ? (
          <ul className={styles.collegeList}>
            {filteredColleges.map((college) => (
              <li
                className={styles.collegeItem}
                key={college.id}
              >
                <Link to={`/college/${college.id}`} className={styles.collegeName}>
                  <div className={styles.collegeLogoContainer}>
                    <img
                      src={college.logo && college.logo.url ? `http://localhost:1337${college.logo.url}` : '/no-logo.png'}
                      alt={college.title}
                      className={styles.collegeLogo}
                    />
                  </div>
                  <div className={styles.collegeText}>
                    <h3>{college.title}</h3>
                    <div className={styles.collegeDesc}>{
                      college.description && college.description.length > 120
                        ? college.description.slice(0, 120) + '...'
                        : college.description
                    }</div>
                    <div className={styles.collegeDetails}>
                      <div className={styles.detailItem}>
                        <svg className={styles.detailIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{college.location.title}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <svg className={styles.detailIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>{college.contacts.phoneNumber}</span>
                      </div>
                    </div>
                    {/* <div className={styles.programsContainer}>
                      {college.programs.slice(0, 3).map((program, idx) => (
                        <span key={idx} className={styles.programBadge}>{program}</span>
                      ))}
                      {college.programs.length > 3 && (
                        <span className={styles.moreBadge}>+{college.programs.length - 3}</span>
                      )}
                    </div> */}
                  </div>
                  <div className={styles.arrowContainer}>
                    <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noResults}>
            <svg className={styles.noResultsIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <div className={styles.noResultsText}>Колледжи не найдены</div>
            <div className={styles.noResultsSubtext}>Попробуйте изменить поисковый запрос или фильтр</div>
            <button className={styles.resetButton} onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}>
              Сбросить фильтры
            </button>
          </div>
        )}

        <div className={styles.statsContainer}>
          <div className={styles.statsItem}>
            <span className={styles.statsNumber}>{colleges.length}</span>
            <span className={styles.statsLabel}>Всего колледжей</span>
          </div>
          <div className={styles.statsItem}>
            <span className={styles.statsNumber}>{filteredColleges.length}</span>
            <span className={styles.statsLabel}>Найдено</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeList;