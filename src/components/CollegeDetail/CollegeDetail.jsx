import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CollegeDetail.module.css";
import useCollegeDetail from '../../hooks/useCollegeDetail';

const CollegeDetail = () => {
  const { id } = useParams();
  const { data: college, isLoading, isError } = useCollegeDetail(id);
  const navigate = useNavigate();


  if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
  if (isError) return <div className={styles.error}>Ошибка загрузки данных</div>;
  if (!college) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.collegeDetail}>
          <div className={styles.notFound}>
            <svg className={styles.notFoundIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12" y2="17"></line>
            </svg>
            <div className={styles.notFoundText}>Колледж не найден</div>
            <div className={styles.notFoundSubtext}>Колледж с указанным идентификатором не найден в нашей базе данных</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
      <div className={styles.collegeDetail}>
        <div className={styles.backBtnContainer}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <svg className={styles.backIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Назад к списку
          </button>
        </div>

        <div className={styles.headerCard}>
          <div className={styles.logoContainer}>
            <img
              src={college.logo && college.logo.url ? `http://localhost:1337${college.logo.url}` : '/no-logo.png'}
              alt={college.title}
              className={styles.collegeLogo}
            />
          </div>
          <div className={styles.headerInfo}>
            <h1 className={styles.collegeName}>{college.title}</h1>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <svg className={styles.infoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{college.location.title}</span>
              </div>

              <div className={styles.infoItem}>
                <svg className={styles.infoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{college.contacts.phoneNumber}</span>
              </div>

              <div className={styles.infoItem}>
                <svg className={styles.infoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>{college.contacts.email}</span>
              </div>

              <div className={styles.infoItem}>
                <svg className={styles.infoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                {college.contacts?.siteUrl && (
                  <a href={college.contacts.siteUrl} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                    {college.contacts.siteUrl.replace('https://', '')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                О колледже
              </h2>
              <div className={styles.sectionContent}>
                <p className={styles.fullDescription}>{college.description}</p>
              </div>
            </div>

            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                Видео о колледже
              </h2>
              {college.media && college.media.length > 0 && (
                <div className={styles.videoContainer}>
                  <video
                    controls
                    className={styles.smallVideo}
                    width="100%"
                  >
                    <source src={`http://localhost:1337${college.media[0].url}`} type={college.media[0].mime || "video/mp4"} />
                    Ваш браузер не поддерживает видео.
                  </video>
                </div>
              )}
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Местоположение
              </h2>
              <div className={styles.mapContainer}>
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${college.location.lon},${college.location.lat}&z=16&pt=${college.location.lon},${college.location.lat},pm2rdm`}
                  allowFullScreen=""
                  loading="lazy"
                  title="Карта колледжа"
                ></iframe>
              </div>
              <p style={{ marginTop: '10px', color: '#4a5568', fontSize: '15px' }}>{college.location.title}</p>
            </div>

            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Приемная комиссия
              </h2>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <strong>Телефон:</strong> {college.contacts.phoneNumber}
                </div>
                <div className={styles.contactItem}>
                  <strong>Email:</strong> {college.contacts.email}
                </div>
                <div className={styles.contactItem}>
                  <strong>Адрес:</strong> {college.location.title}
                </div>
                <a href={college.contacts.siteUrl} target="_blank" rel="noopener noreferrer" className={styles.websiteButton}>
                  Перейти на сайт колледжа
                  <svg className={styles.externalIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
