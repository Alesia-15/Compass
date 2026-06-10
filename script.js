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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeMenu();
    }
  });
}

// consultation modal

const consultationModal = document.querySelector(".consultation-modal");

const openConsultationButtons = document.querySelectorAll(
  ".consultation-modal-open, .js-open-consultation",
);

const closeConsultationButtons = document.querySelectorAll(
  ".consultation-modal-close, .consultation-modal-overlay, [data-consultation-close]",
);

function openConsultationModal() {
  if (!consultationModal) return;

  closeMenu();

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

openConsultationButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openConsultationModal();
  });
});

closeConsultationButtons.forEach((button) => {
  button.addEventListener("click", closeConsultationModal);
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
        Результат: Вы получаете решение для своего запроса с оптимальным соотношением цены, качества и сроков поставки от подтвержденного поставщика.
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
        Результат: Вы снижаете риски, экономите время, получаете иностранного торгового партнера.
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
        Результат: Вы экономите время и деньги, уменьшая срок поставки товара.
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
        Результат: Вы получаете оптимизированный вариант загрузки товара, экономите время и деньги.
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
        Результат: ваши поставщики получают деньги в срок, а Вы — товар без срыва контрактных обязательств.
      </p>
    `,
  },
};

function openServiceModal(serviceKey) {
  const service = serviceModalData[serviceKey];

  if (!serviceModal || !service || !serviceModalTitle || !serviceModalText) {
    return;
  }

  closeMenu();

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

  if (!consultationModal || !consultationModal.classList.contains("is-open")) {
    document.body.classList.remove("is-menu-open");
  }
}

serviceOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openServiceModal(button.dataset.serviceModal);
  });
});

serviceCloseButtons.forEach((button) => {
  button.addEventListener("click", closeServiceModal);
});

// кнопка "Заказать" внутри окна услуги

document.querySelectorAll(".service-modal-order").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    closeServiceModal();
    openConsultationModal();
  });
});

// close modals by Escape

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeServiceModal();
    closeConsultationModal();
    closePolicyModal();
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

// services search rotating examples + quiz

const productExamples = [
  "Пальмовое масло (цистерна)",
  "Фреза концевая по металлу",
  "Шоколадка Milka — опт коробка",
  "Гидравлический листогибочный пресс",
  "Промышленный контроллер Siemens S7-1200",
  "Сальники радиальные",
  "Линия продольной резки металла",
  "Автоматический выключатель Schneider Electric (упаковка)",
  "Ленточнопильный станок по металлу",
  "Футболка Gildan",
  "Fruit of the Loom (белая, паллета 1000 шт)",
  "Координатно-расточной станок",
  "Клеммная колодка Wago / Weidmüller (упаковка 100 шт)",
  "Молочная сыворотка сухая (мешок 25 кг)",
  "Пудра фиксирующая для волос (салонный объём)",
  "Дизельный генератор на 100 кВт (б/у из ЕС)",
  "Сварочная проволока (ER70S-6, катушка 5 кг / 15 кг)",
  "Промышленный вентилятор радиальный",
  "Глюкозный сироп (IBC-контейнер 1000 кг)",
  "Промышленный осушитель сжатого воздуха",
  "Линейный подшипник SC20UU",
  "Какао-порошок",
  "Мотор-редуктор (Sew / Nord / Lenze)",
  "Электродвигатель 7,5 кВт IE3",
  "Погружной насос для скважины Grundfos 5 кВт",
  "Кондитерская глазурь — мешок 25 кг",
  "Электроды паллета",
  "Токарно-винторезный станок",
  "Свёрла по металлу с кобальтом",
  "Датчик приближения PNP NO M12",
  "Полипропилен",
  "Соевый лецитин",
  "ПВХ-компаунд",
  "Крем Nivea Soft",
  "Термобельё оптом",
  "Промышленный холодильник",
  "Шампунь Elseve / Gliss Kur",
  "Компрессор винтовой 22 кВт",
  "Kinder Surprise",
  "Сварочный робот-манипулятор",
  "Карбонат кальция",
  "Джинсы Lee Cooper / Wrangler",
  "Лимонная кислота",
  "Метчики и плашки",
  "Сменные пластины для токарных резцов",
  "Гель для душа Fa",
  "Фанта (Fanta) 1 л",
  "Nutella 3 кг — промышленная упаковка",
  "Реле времени и промежуточные реле",
  "Винты DIN 912 M4x12 мм",
  "Зубная паста Paradontax / Lacalut",
  "Гигиеническая помада Labello Classic",
  "Подшипник SKF / FAG / NSK",
  "Лепестковые торцевые щётки",
];

const servicesSearchInput = document.querySelector("#services-search-input");
const servicesSearchButton = document.querySelector("#services-search-button");
const servicesSearchSuggestions = document.querySelector(
  "#services-search-suggestions",
);

let productExampleIndex = 0;
let productPlaceholderTimer = null;

function startProductPlaceholderRotation() {
  if (!servicesSearchInput) return;

  stopProductPlaceholderRotation();

  productPlaceholderTimer = setInterval(() => {
    if (
      document.activeElement === servicesSearchInput ||
      servicesSearchInput.value.trim()
    ) {
      return;
    }

    productExampleIndex =
      productExampleIndex >= productExamples.length - 1
        ? 0
        : productExampleIndex + 1;

    servicesSearchInput.placeholder = productExamples[productExampleIndex];
  }, 1500);
}

function stopProductPlaceholderRotation() {
  if (productPlaceholderTimer) {
    clearInterval(productPlaceholderTimer);
    productPlaceholderTimer = null;
  }
}

function closeSearchSuggestions() {
  if (!servicesSearchSuggestions) return;

  servicesSearchSuggestions.classList.remove("is-open");
  servicesSearchSuggestions.innerHTML = "";
}

function renderSearchSuggestions(value) {
  if (!servicesSearchSuggestions) return;

  const query = value.trim().toLowerCase();

  if (!query) {
    closeSearchSuggestions();
    return;
  }

  const matches = productExamples
    .filter((item) => item.toLowerCase().includes(query))
    .slice(0, 7);

  if (!matches.length) {
    closeSearchSuggestions();
    return;
  }

  servicesSearchSuggestions.innerHTML = matches
    .map(
      (item) => `
        <button class="search-suggestion" type="button">
          ${item}
        </button>
      `,
    )
    .join("");

  servicesSearchSuggestions.classList.add("is-open");

  servicesSearchSuggestions
    .querySelectorAll(".search-suggestion")
    .forEach((button) => {
      button.addEventListener("click", () => {
        servicesSearchInput.value = button.textContent.trim();
        closeSearchSuggestions();
      });
    });
}

function getSelectedProductName() {
  if (!servicesSearchInput) {
    return productExamples[productExampleIndex];
  }

  return (
    servicesSearchInput.value.trim() ||
    servicesSearchInput.placeholder ||
    productExamples[productExampleIndex]
  );
}

if (servicesSearchInput) {
  servicesSearchInput.placeholder = productExamples[0];
  startProductPlaceholderRotation();

  servicesSearchInput.addEventListener("focus", () => {
    stopProductPlaceholderRotation();

    if (!servicesSearchInput.value.trim()) {
      servicesSearchInput.placeholder = "Введите название товара";
    }
  });

  servicesSearchInput.addEventListener("input", () => {
    renderSearchSuggestions(servicesSearchInput.value);
  });

  servicesSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openQuizModal(getSelectedProductName());
    }

    if (event.key === "Escape") {
      closeSearchSuggestions();
    }
  });

  servicesSearchInput.addEventListener("blur", () => {
    setTimeout(() => {
      closeSearchSuggestions();

      if (!servicesSearchInput.value.trim()) {
        startProductPlaceholderRotation();
      }
    }, 150);
  });
}

servicesSearchButton?.addEventListener("click", () => {
  openQuizModal(getSelectedProductName());
});

// quiz modal

const quizModal = document.querySelector("#quiz-modal");
const quizProductName = document.querySelector("#quiz-product-name");
const quizModalBody = document.querySelector("#quiz-modal-body");
const quizCloseButtons = document.querySelectorAll("[data-quiz-close]");

const quizSteps = [
  {
    step: "Шаг 1",
    title: "Для кого требуется услуга?",
    key: "clientType",
    options: [
      { label: "Юридическое лицо / ИП" },
      { label: "Физическое лицо" },
      { label: "Иной статус", input: true, placeholder: "Укажите ваш статус" },
    ],
  },
  {
    step: "Шаг 2",
    title: "На каком этапе находится ваш запрос?",
    key: "requestStage",
    options: [
      { label: "Есть поставщик и товар" },
      { label: "Есть товар, нужен поставщик" },
      { label: "Есть поставщик, нужен товар" },
      { label: "Нужна помощь на всех этапах" },
      {
        label: "Другой запрос",
        input: true,
        placeholder: "Опишите ваш запрос",
      },
    ],
  },
  {
    step: "Шаг 3",
    title: "Информация о товаре?",
    key: "productInfo",
    options: [
      { label: "Код ТН ВЭД", input: true, placeholder: "Введите код ТН ВЭД" },
      {
        label: "Наименование товара",
        input: true,
        placeholder: "Введите наименование товара",
      },
      {
        label: "Ссылка или спецификация",
        input: true,
        placeholder: "Вставьте ссылку или краткую спецификацию",
      },
      { label: "Пока нет информации" },
      {
        label: "Другие вводные",
        input: true,
        placeholder: "Опишите вводные данные",
      },
    ],
  },
  {
    step: "Шаг 4",
    title: "Какая услуга вас интересует?",
    key: "serviceType",
    options: [
      { label: "Закупка" },
      { label: "Логистика и доставка" },
      { label: "Закупка + логистика" },
      { label: "Решение под ключ" },
      { label: "Иная услуга", input: true, placeholder: "Укажите услугу" },
    ],
  },
];

let quizCurrentStep = 0;
let quizAnswers = {};
let quizProduct = "";

function openQuizModal(productName) {
  if (!quizModal || !quizModalBody || !quizProductName) return;

  quizProduct = productName;
  quizCurrentStep = 0;
  quizAnswers = {};

  quizProductName.textContent = quizProduct;

  closeSearchSuggestions();
  closeMenu();

  quizModal.classList.add("is-open");
  quizModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-menu-open");

  renderQuizStep();
}

function closeQuizModal() {
  if (!quizModal) return;

  quizModal.classList.remove("is-open");
  quizModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-menu-open");
}

function renderQuizStep() {
  if (!quizModalBody) return;

  const step = quizSteps[quizCurrentStep];

  if (!step) {
    renderQuizFinal();
    return;
  }

  quizModalBody.innerHTML = `
    <p class="quiz-step-number">${step.step}</p>

    <h3 class="quiz-step-title">${step.title}</h3>

    <div class="quiz-options">
      ${step.options
        .map((option, index) => {
          if (option.input) {
            return `
              <div class="quiz-option-field">
                <label>
                  <span>${option.label}</span>
                  <input
                    class="quiz-inline-input"
                    type="text"
                    placeholder="${option.placeholder || ""}"
                    data-option-index="${index}"
                  />
                </label>

                <button
                  class="quiz-option-submit"
                  type="button"
                  data-option-index="${index}"
                >
                  Далее
                </button>
              </div>
            `;
          }

          return `
            <button class="quiz-option" type="button" data-answer="${option.label}">
              ${option.label}
            </button>
          `;
        })
        .join("")}
    </div>
  `;

  quizModalBody.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      quizAnswers[step.key] = button.dataset.answer;
      quizCurrentStep += 1;
      renderQuizStep();
    });
  });

  quizModalBody.querySelectorAll(".quiz-option-submit").forEach((button) => {
    button.addEventListener("click", () => {
      const optionIndex = Number(button.dataset.optionIndex);
      const option = step.options[optionIndex];
      const input = quizModalBody.querySelector(
        `.quiz-inline-input[data-option-index="${optionIndex}"]`,
      );

      const value = input?.value.trim();

      if (!value) {
        alert("Пожалуйста, заполните поле");
        input?.focus();
        return;
      }

      quizAnswers[step.key] = `${option.label}: ${value}`;
      quizCurrentStep += 1;
      renderQuizStep();
    });
  });

  quizModalBody.querySelectorAll(".quiz-inline-input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        const optionIndex = Number(input.dataset.optionIndex);
        const button = quizModalBody.querySelector(
          `.quiz-option-submit[data-option-index="${optionIndex}"]`,
        );

        button?.click();
      }
    });
  });
}

function renderQuizFinal() {
  if (!quizModalBody) return;

  quizModalBody.innerHTML = `
    <p class="quiz-step-number">Шаг 5</p>

    <h3 class="quiz-step-title">Оставьте контакты для расчёта</h3>

    <p class="quiz-final-text">
      Мы закрепили товар в заявке. Ответы по предыдущим шагам сохранены,
      но на экране остаётся только выбранный товар.
    </p>

    <input
      class="quiz-field"
      type="text"
      id="quiz-name"
      placeholder="Имя"
      autocomplete="name"
    />

    <input
      class="quiz-field"
      type="tel"
      id="quiz-phone"
      placeholder="Телефон"
      autocomplete="tel"
      style="margin-top: 12px"
    />

    <button class="quiz-next" type="button" id="quiz-submit">
      Отправить заявку
    </button>
  `;

  document.querySelector("#quiz-submit")?.addEventListener("click", () => {
    const name = document.querySelector("#quiz-name")?.value.trim();
    const phone = document.querySelector("#quiz-phone")?.value.trim();

    if (!name || !phone) {
      alert("Пожалуйста, заполните имя и телефон");
      return;
    }

    console.log("Квиз заявка:", {
      product: quizProduct,
      answers: quizAnswers,
      name,
      phone,
    });

    quizModalBody.innerHTML = `
      <h3 class="quiz-step-title">Спасибо! Заявка сформирована</h3>

      <p class="quiz-final-text">
        Мы получили запрос по товару: <strong>${quizProduct}</strong>.
        Менеджер свяжется с вами для уточнения деталей.
      </p>

      <button class="quiz-next" type="button" data-quiz-close>
        Закрыть
      </button>
    `;

    quizModalBody
      .querySelector("[data-quiz-close]")
      ?.addEventListener("click", closeQuizModal);
  });
}

quizCloseButtons.forEach((button) => {
  button.addEventListener("click", closeQuizModal);
});

// Политика конфиденциальности и обработки персональных данных

const policyModal = document.querySelector("#policy-modal");
const policyOpenButtons = document.querySelectorAll(".js-open-policy");
const policyCloseButtons = document.querySelectorAll("[data-policy-close]");

function openPolicyModal() {
  if (!policyModal) return;

  policyModal.classList.add("is-open");
  policyModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-menu-open");
}

function closePolicyModal() {
  if (!policyModal) return;

  policyModal.classList.remove("is-open");
  policyModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-menu-open");
}

policyOpenButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openPolicyModal();
  });
});

policyCloseButtons.forEach((button) => {
  button.addEventListener("click", closePolicyModal);
});
