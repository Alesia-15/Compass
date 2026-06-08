// burger

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(
  ".mobile-nav a, .mobile-actions a",
);

function closeMenu() {
  if (!burger || !mobileMenu) return;

  burger.classList.remove("is-active");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Открыть меню");

  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");

  document.body.classList.remove("is-menu-open");
}

function openMenu() {
  if (!burger || !mobileMenu) return;

  burger.classList.add("is-active");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Закрыть меню");

  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");

  document.body.classList.add("is-menu-open");
}

function toggleMenu() {
  if (!burger || !mobileMenu) return;

  const isOpen = burger.classList.contains("is-active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (burger && mobileMenu) {
  burger.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeMenu();
    }
  });
}

// consultation modal

const consultationModal = document.querySelector("#consultation-modal");
const consultationOpenButtons = document.querySelectorAll(
  ".consultation-modal-open",
);
const consultationCloseButtons = document.querySelectorAll(
  "[data-consultation-close]",
);

function openConsultationModal(event) {
  if (event) event.preventDefault();
  if (!consultationModal) return;

  consultationModal.classList.add("is-open");
  consultationModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-menu-open");
}

function closeConsultationModal() {
  if (!consultationModal) return;

  consultationModal.classList.remove("is-open");
  consultationModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-menu-open");
}

consultationOpenButtons.forEach((button) => {
  button.addEventListener("click", openConsultationModal);
});

consultationCloseButtons.forEach((button) => {
  button.addEventListener("click", closeConsultationModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeConsultationModal();
  }
});

// services modal

const serviceModal = document.querySelector("#service-modal");
const serviceModalTitle = document.querySelector("#service-modal-title");
const serviceModalText = document.querySelector("#service-modal-text");
const serviceOpenButtons = document.querySelectorAll("[data-service-modal]");
const serviceCloseButtons = document.querySelectorAll("[data-service-close]");

const serviceModalData = {
  search: {
    title: "Поиск товара",
    html: `
      <p>
        Подбор товаров или поставщиков под ваш запрос.
      </p>
      <ul>
        <li>Анализ запроса: детально изучаем техническую часть.</li>
        <li>Поиск и проверка: подбираем релевантного поставщика товара или сам товар; проверяем репутацию поставщика.</li>
        <li>Лучшее предложение: анализируем полученную информацию и условия поставки; выбираем лучшее.</li>
      </ul>
      <p class="service-modal-result">
        Результат: вы получаете решение для своего запроса с оптимальным соотношением цены, качества и сроков поставки от подтвержденного поставщика.
      </p>
    `,
  },

  middleman: {
    title: "Посреднические услуги",
    html: `
      <p>
        Вы заключаете контракт напрямую с иностранным контрагентом, а мы профессионально сопровождаем сделку, представляя ваши интересы.
      </p>
      <ul>
        <li>Проверка контрагента: анализируем регистрационные данные и репутацию контрагента.</li>
        <li>Ведение переговоров: согласовываем условия сделки и документации.</li>
        <li>Заключение сделки: фиксируем достигнутые договоренности, заключаем контракт, сопровождаем сделку.</li>
      </ul>
      <p class="service-modal-result">
        Результат: вы снижаете риски, экономите время, получаете иностранного торгового партнера.
      </p>
    `,
  },

  export: {
    title: "Экспорт",
    html: `
      <p>
        Организуем экспортные поставки вашей продукции за рубеж с учетом текущих логистических и санкционных ограничений.
      </p>
      <ul>
        <li>Анализ товара: оцениваем ваш товар на совместимость с требованиями страны получателя.</li>
        <li>Выбор логистики: подбираем вариант логистики исходя из анализа товара и страны назначения.</li>
        <li>Полное сопровождение: запускаем процесс поставки с полным документальным оформлением.</li>
      </ul>
      <p class="service-modal-result">
        Результат: новые или возобновленные экспортные поставки вашим партнерам с полным документальным оформлением.
      </p>
    `,
  },

  import: {
    title: "Импорт",
    html: `
      <p>
        Вы получаете готовый товар, разрешенный для реализации в торговле без вашего участия в операционной рутине.
      </p>
      <ul>
        <li>Поиск и проверка: подбираем релевантного поставщика товара или сам товар; проверяем репутацию поставщика.</li>
        <li>Выкуп и поставка: оформляем вывоз и ввоз товара в адрес страны-назначения.</li>
        <li>Ввоз и реализация: проводим таможенное оформление с подготовкой разрешительной документации; продажа товара в ваш адрес.</li>
      </ul>
      <p class="service-modal-result">
        Результат: товар получаете в согласованные сроки с полным комплектом сопроводительных документов, готовый для реализации.
      </p>
    `,
  },

  transit: {
    title: "Транзит",
    html: `
      <p>
        Услуга для тех, кому нужно оптимизировать расходы по продаже товаров через территории других стран.
      </p>
      <ul>
        <li>Анализ запроса: детально изучаем техническую часть.</li>
        <li>Проектирование транзита: подбираем вариант по результату запроса.</li>
        <li>Запуск и сопровождение: запускаем процесс сопряженных поставок между странами с полным документальным оформлением.</li>
      </ul>
      <p class="service-modal-result">
        Результат: вы экономите время и деньги, уменьшая срок поставки товара.
      </p>
    `,
  },

  customs: {
    title: "Таможенное оформление",
    html: `
      <p>
        Полное сопровождение таможенных процедур при импорте, экспорте или транзите.
      </p>
      <ul>
        <li>Предварительная классификация: подбираем код ТН ВЭД.</li>
        <li>Сопровождение и оформление: сопровождаем полный цикл таможенного оформления.</li>
      </ul>
      <p class="service-modal-result">
        Результат: своевременное и быстрое прохождение процедуры таможенного оформления.
      </p>
    `,
  },

  warehouse: {
    title: "Консолидация и складирование",
    html: `
      <p>
        Услуга для сборки грузов от разных поставщиков с последующей отправкой одной партией.
      </p>
      <ul>
        <li>Приемка товара: принимаем товары на складах своих партнеров в ЕС; оказываем дополнительные услуги по идентификации товара и проверке на соответствие заявленным параметрам.</li>
        <li>Консолидация и хранение: сборка, переупаковка, оптимизация количества грузовых мест.</li>
      </ul>
      <p class="service-modal-result">
        Результат: вы получаете оптимизированный вариант загрузки товара, экономите время и деньги.
      </p>
    `,
  },

  payments: {
    title: "Международные платежи",
    html: `
      <p>
        Услуга для компаний из РФ и РБ, столкнувшихся с блокировками SWIFT, валютным контролем или отказами банков.
      </p>
      <ul>
        <li>Анализ запроса: детально изучаем техническую часть.</li>
        <li>Выбор решения: подбираем банк-корреспондент или платежного агента в дружественной юрисдикции.</li>
        <li>Проведение платежа: подготавливаем сопровождающие документы и проводим платеж по выбранному варианту финансовой логистики.</li>
      </ul>
      <p class="service-modal-result">
        Результат: ваши поставщики получают деньги в срок, а вы — товар без срыва контрактных обязательств.
      </p>
    `,
  },
};

function openServiceModal(serviceKey) {
  const service = serviceModalData[serviceKey];

  if (!serviceModal || !service || !serviceModalTitle || !serviceModalText) {
    return;
  }

  serviceModalTitle.textContent = service.title;
  serviceModalText.innerHTML = service.html;

  serviceModal.classList.add("is-open");
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-menu-open");
}

function closeServiceModal() {
  if (!serviceModal) return;

  serviceModal.classList.remove("is-open");
  serviceModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-menu-open");
}

serviceOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openServiceModal(button.dataset.serviceModal);
  });
});

serviceCloseButtons.forEach((button) => {
  button.addEventListener("click", closeServiceModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeServiceModal();
  }
});

// reviews cyclic slider

const reviewsSlider = document.querySelector(".reviews-slider");
const reviewsTrack = document.querySelector(".reviews-track");
const reviewsCards = document.querySelectorAll(".review-video-card");
const reviewsPrev = document.querySelector(".reviews-prev");
const reviewsNext = document.querySelector(".reviews-next");

let reviewsIndex = 0;
let reviewsAutoplay = null;

function getReviewsVisibleCount() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 900) return 2;
  if (window.innerWidth <= 1200) return 3;
  return 4;
}

function updateReviewsSlider() {
  if (!reviewsTrack || !reviewsCards.length) return;

  const card = reviewsCards[0];
  const gap = parseFloat(getComputedStyle(reviewsTrack).gap) || 0;
  const cardWidth = card.offsetWidth;
  const offset = reviewsIndex * (cardWidth + gap);

  reviewsTrack.style.transform = `translateX(-${offset}px)`;
}

function nextReviewSlide() {
  const visibleCount = getReviewsVisibleCount();
  const maxIndex = Math.max(reviewsCards.length - visibleCount, 0);

  reviewsIndex = reviewsIndex >= maxIndex ? 0 : reviewsIndex + 1;
  updateReviewsSlider();
}

function prevReviewSlide() {
  const visibleCount = getReviewsVisibleCount();
  const maxIndex = Math.max(reviewsCards.length - visibleCount, 0);

  reviewsIndex = reviewsIndex <= 0 ? maxIndex : reviewsIndex - 1;
  updateReviewsSlider();
}

function startReviewsAutoplay() {
  stopReviewsAutoplay();

  reviewsAutoplay = setInterval(() => {
    nextReviewSlide();
  }, 4500);
}

function stopReviewsAutoplay() {
  if (reviewsAutoplay) {
    clearInterval(reviewsAutoplay);
    reviewsAutoplay = null;
  }
}

if (reviewsTrack && reviewsCards.length) {
  reviewsNext?.addEventListener("click", () => {
    nextReviewSlide();
    startReviewsAutoplay();
  });

  reviewsPrev?.addEventListener("click", () => {
    prevReviewSlide();
    startReviewsAutoplay();
  });

  reviewsSlider?.addEventListener("mouseenter", stopReviewsAutoplay);
  reviewsSlider?.addEventListener("mouseleave", startReviewsAutoplay);

  window.addEventListener("resize", () => {
    const visibleCount = getReviewsVisibleCount();
    const maxIndex = Math.max(reviewsCards.length - visibleCount, 0);

    if (reviewsIndex > maxIndex) {
      reviewsIndex = maxIndex;
    }

    updateReviewsSlider();
  });

  startReviewsAutoplay();
}

// review video play

const reviewPlayButtons = document.querySelectorAll(".review-play");

reviewPlayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoBox = button.closest(".review-video");
    const video = videoBox?.querySelector("video");

    if (!video) return;

    if (video.paused) {
      video.play();
      video.setAttribute("controls", "controls");
      button.style.display = "none";
    }
  });
});
