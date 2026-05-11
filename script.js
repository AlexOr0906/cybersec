// ===== NAVIGATION =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const idx = ['home','threats','simulator','quiz'].indexOf(id);
  document.querySelectorAll('.nav-links button')[idx].classList.add('active');
  window.scrollTo(0,0);
  if (id === 'simulator') initSimulator();
  if (id === 'quiz') initQuiz();
}

// ===== THREAT CARDS =====
function toggleCard(card) {
  const isExp = card.classList.contains('expanded');
  document.querySelectorAll('.threat-card').forEach(c => c.classList.remove('expanded'));
  if (!isExp) card.classList.add('expanded');
}

// ===== SIMULATOR =====
const scenarios = [
  {
    type: 'email',
    from: 'support@vk-security.net',
    subject: 'Ваш аккаунт ВКонтакте будет заблокирован!',
    body: `Уважаемый пользователь!

Наша система безопасности зафиксировала подозрительную активность в вашем аккаунте. Для предотвращения блокировки необходимо подтвердить личность в течение <span class="highlight-red">24 ЧАСОВ</span>.

Нажмите на ссылку ниже для подтверждения:
<span class="highlight-red">http://vk-acc0unt-verify.ru/login</span>

С уважением,
Служба безопасности ВКонтакте`,
    question: 'Что ты сделаешь с этим письмом?',
    options: [
      'Перейду по ссылке и введу свои данные',
      'Отвечу на письмо и попрошу подробности',
      'Перешлю друзьям, чтобы они тоже проверили',
      'Удалю письмо и зайду на vk.com напрямую, набрав адрес вручную'
    ],
    correct: 3,
    feedback: {
      title: '✓ Правильно! Это классический фишинг.',
      text: 'Признаки мошенничества: подозрительный домен (vk-security.NET вместо vk.com), искажённая ссылка (acc0unt с нулём вместо буквы «о»), искусственная срочность. ВКонтакте никогда не присылает письма с посторонних доменов. Всегда заходи на сайты, набирая адрес в строке браузера вручную.',
      wrongTitle: '✗ Это фишинг!',
      wrongText: 'Домен vk-security.net — не настоящий ВКонтакте. Ссылка ведёт на мошеннический сайт, который украдёт твой пароль. Правильное действие — удалить письмо и зайти на vk.com напрямую через адресную строку.'
    }
  },
  {
    type: 'sms',
    from: '+7 (900) 123-45-67',
    subject: 'СМС-сообщение',
    body: `Мама, это я! Потерял телефон, пишу с чужого номера.

Срочно нужно <span class="highlight-red">5 000 рублей</span> — попал в неприятную ситуацию. Переведи на карту <span class="highlight-red">2200 **** **** 8821</span>.

Всё объясню потом, НЕ ЗВОНИ на мой номер — телефон у чужих людей.`,
    question: 'Ты мама. Что делаешь?',
    options: [
      'Немедленно перевожу деньги — ребёнок в беде',
      'Перевожу половину суммы, чтобы поддержать на всякий случай',
      'Звоню сыну на его обычный номер, чтобы проверить, действительно ли это он',
      'Пишу в ответ на этот номер и жду подтверждения'
    ],
    correct: 2,
    feedback: {
      title: '✓ Правильно! Это схема «родственник в беде».',
      text: 'Фраза «не звони на мой номер» — главный признак мошенничества. Всегда звони сам на тот номер, который ты знаешь. Если ребёнок реально потерял телефон — он или возьмёт трубку, или ответит позже. Мошенники создают искусственную панику специально, чтобы ты не успел подумать.',
      wrongTitle: '✗ Это ловушка!',
      wrongText: 'Запрет звонить на известный номер — стандартный приём мошенников. Они отговаривают от проверки, чтобы ты быстрее перевёл деньги. Правильно — позвонить ребёнку на его обычный номер.'
    }
  },
  {
    type: 'browser',
    from: 'Всплывающее окно в браузере',
    subject: 'Системное предупреждение',
    body: `⚠️ ВНИМАНИЕ! ВАШ КОМПЬЮТЕР ЗАРАЖЁН!

Обнаружено <span class="highlight-red">5 вирусов</span>, которые похищают ваши банковские данные прямо сейчас.

Для немедленного удаления угроз:
📞 Позвоните в техподдержку: <span class="highlight-yellow">8-800-555-0199</span>

<span class="highlight-red">НЕ ЗАКРЫВАЙТЕ это окно!</span> Это может привести к полной потере данных.`,
    question: 'Ты видишь такое окно. Твои действия?',
    options: [
      'Звоню по указанному номеру — нужно срочно спасать данные',
      'Закрываю вкладку и проверяю компьютер своим антивирусом',
      'Скачиваю утилиту с того же сайта, она поможет почистить вирусы',
      'Сообщаю провайдеру интернета, чтобы он заблокировал атаку'
    ],
    correct: 1,
    feedback: {
      title: '✓ Правильно! Это scareware — программа-запугиватель.',
      text: 'Ни один сайт не может «видеть», что происходит на твоём компьютере. Такие окна всегда фальшивые. Звонок приведёт к мошенничеству: тебе предложат установить «утилиту» (которая окажется вирусом) или заплатить за «очистку». Закрой окно и при сомнениях проверь компьютер своим антивирусом.',
      wrongTitle: '✗ Это scareware — запугивание!',
      wrongText: 'Сайт в браузере физически не может сканировать твой компьютер на вирусы. Это поддельное сообщение, цель которого — заставить тебя позвонить или скачать вредонос. Правильное действие — просто закрыть вкладку.'
    }
  },
  {
    type: 'email',
    from: 'noreply@gosuslugi-bonus.ru',
    subject: 'Вам начислена выплата 15 480 руб.',
    body: `Уважаемый гражданин!

По результатам проверки вам полагается <span class="highlight-red">социальная выплата в размере 15 480 рублей</span>.

Для получения выплаты необходимо:
1. Пройти по ссылке: <span class="highlight-red">gosuslugi-bonus.ru/get</span>
2. Ввести данные банковской карты для зачисления
3. Оплатить комиссию за обработку: <span class="highlight-red">450 рублей</span>

Срок действия предложения: 48 часов`,
    question: 'Как расцениваешь это письмо?',
    options: [
      'Оплачу комиссию — 450 рублей небольшие деньги ради 15 000',
      'Введу только номер карты, без CVV — этого должно быть безопасно',
      'Игнорирую письмо — это мошенничество, государство не берёт комиссию за свои выплаты',
      'Перешлю письмо в банк, пусть проверят'
    ],
    correct: 2,
    feedback: {
      title: '✓ Правильно! Это фишинг под Госуслуги.',
      text: 'Два главных признака мошенничества: неофициальный домен (gosuslugi-bonus.ru вместо gosuslugi.ru) и схема «заплати, чтобы получить деньги». Настоящие государственные выплаты никогда не требуют предоплаты или комиссии. Информацию о реальных выплатах можно проверить только на gosuslugi.ru.',
      wrongTitle: '✗ Это фишинговая ловушка!',
      wrongText: '«Заплати, чтобы получить» — классическая схема мошенничества. Заплатишь 450 рублей и введёшь данные карты — лишишься и денег, и доступа к карте. Правильное действие — игнорировать письмо.'
    }
  },
  {
    type: 'chat',
    from: 'Незнакомец в игровом чате',
    subject: 'Сообщение в игре',
    body: `[PRO_player_777]: эй, тебе повезло! я сотрудник игры, раздаём скины топ игрокам

[PRO_player_777]: зайди на <span class="highlight-red">free-skins-cs.net</span> и войди через стим — там твой приз

[PRO_player_777]: только побыстрее, акция до конца дня. уже 2000 игроков получили`,
    question: 'Что делаешь?',
    options: [
      'Захожу на сайт — хочу получить скины',
      'Игнорирую сообщение — игровые компании не раздают призы через личные сообщения',
      'Спрашиваю у него промокод для подтверждения',
      'Сначала открою сайт, посмотрю — а потом решу'
    ],
    correct: 1,
    feedback: {
      title: '✓ Правильно! Это стим-фишинг.',
      text: 'Никакая игровая компания не раздаёт призы случайным игрокам через личные сообщения. Сайт free-skins-cs.net создан для кражи аккаунтов Steam: он имитирует страницу входа, и если ввести логин и пароль — аккаунт со всеми скинами уйдёт мошенникам. Даже просто открыть подозрительный сайт небезопасно.',
      wrongTitle: '✗ Это кража аккаунта!',
      wrongText: 'Сайт имитирует страницу входа в Steam, чтобы украсть твои логин и пароль. Фраза «2000 игроков уже получили» создаёт ложное социальное давление. Игровые компании никогда не раздают призы через личный чат — правильное действие — просто проигнорировать.'
    }
  }
];

let simIndex = 0;
let simAnswered = false;

function initSimulator() {
  simIndex = 0;
  renderSim();
}

function renderSim() {
  const progress = document.getElementById('simProgress');
  progress.innerHTML = scenarios.map((_, i) =>
    `<div class="sim-dot ${i < simIndex ? 'done' : i === simIndex ? 'current' : ''}"></div>`
  ).join('');

  if (simIndex >= scenarios.length) {
    document.getElementById('simContent').innerHTML = `
      <div style="text-align:center;padding:3rem 1rem">
        <div style="font-size:3rem;margin-bottom:1rem">🛡️</div>
        <div class="section-title" style="margin-bottom:0.5rem">Симулятор пройден!</div>
        <p style="color:var(--text-dim);margin-bottom:2rem">Теперь ты знаешь основные схемы мошенников. Готов проверить знания в финальном тесте?</p>
        <button class="btn-primary" onclick="showSection('quiz')">Пройти тест →</button>
      </div>`;
    return;
  }

  const s = scenarios[simIndex];
  simAnswered = false;

  const icons = { email: '📧', sms: '💬', browser: '🌐', chat: '🎮' };
  const labels = { email: 'Электронное письмо', sms: 'СМС-сообщение', browser: 'Браузер', chat: 'Игровой чат' };

  document.getElementById('simContent').innerHTML = `
    <div class="sim-scenario">
      <div class="sim-header">
        <div class="sim-header-dot dot-red"></div>
        <div class="sim-header-dot dot-yellow"></div>
        <div class="sim-header-dot dot-green"></div>
        <span>${icons[s.type]} ${labels[s.type]}</span>
        <span style="margin-left:auto;color:var(--accent3);font-size:0.78rem;">От: ${s.from}</span>
      </div>
      <div class="sim-body">
        <div class="sim-label">Тема</div>
        <div style="font-weight:600;margin-bottom:1rem;font-size:0.95rem">${s.subject}</div>
        <div class="sim-message">${s.body}</div>
        <div class="sim-counter">Ситуация ${simIndex + 1} из ${scenarios.length}</div>
        <div class="sim-question">${s.question}</div>
        <div class="sim-options">
          ${s.options.map((opt, i) => `
            <button class="sim-option" onclick="answerSim(${i})" id="simOpt${i}">
              <span class="option-letter">${String.fromCharCode(65+i)}</span>
              ${opt}
            </button>`).join('')}
        </div>
        <div class="sim-feedback" id="simFeedback"></div>
      </div>
    </div>
    <div class="sim-nav" id="simNav" style="display:none">
      <button class="btn-primary" onclick="nextSim()">${simIndex < scenarios.length - 1 ? 'Следующая ситуация →' : 'Завершить симулятор →'}</button>
    </div>`;
}

function answerSim(idx) {
  if (simAnswered) return;
  simAnswered = true;
  const s = scenarios[simIndex];
  const isCorrect = idx === s.correct;

  document.querySelectorAll('.sim-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === s.correct) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
  });

  const fb = document.getElementById('simFeedback');
  fb.classList.add('visible');
  fb.classList.add(isCorrect ? 'correct-fb' : 'wrong-fb');
  fb.innerHTML = `
    <div class="sim-feedback-title" style="color:${isCorrect ? '#28c840' : 'var(--accent2)'}">${isCorrect ? s.feedback.title : s.feedback.wrongTitle}</div>
    <div style="color:var(--text-dim)">${isCorrect ? s.feedback.text : s.feedback.wrongText}</div>`;

  document.getElementById('simNav').style.display = 'flex';
}

function nextSim() {
  simIndex++;
  renderSim();
}

// ===== QUIZ =====
const questions = [
  { q: 'Ты получил письмо от «Сбербанка» с просьбой подтвердить данные карты по ссылке. Адрес отправителя: sber-online@gmail.com. Что это?', opts: ['Обычное письмо от банка', 'Фишинговая атака', 'Техническое уведомление', 'Реклама'], correct: 1 },
  { q: 'Какой пароль наиболее безопасный?', opts: ['qwerty123', 'дата рождения', 'KiberZaschita#2024!', 'имя + год'], correct: 2 },
  { q: 'Что такое двухфакторная аутентификация?', opts: ['Два разных пароля', 'Подтверждение входа через второй способ (SMS, приложение)', 'Антивирус нового поколения', 'Шифрование файлов'], correct: 1 },
  { q: 'Незнакомый человек онлайн предлагает бесплатные игровые ресурсы, нужно только войти через его сайт. Это:',  opts: ['Честный подарок', 'Попытка угона аккаунта', 'Маркетинговая акция', 'Технический сбой'], correct: 1 },
  { q: 'Ты скачал программу с торрента. Антивирус молчит. Это безопасно?', opts: ['Да, если антивирус не среагировал', 'Нет — пиратский софт часто содержит вредоносы, не все из которых обнаруживаются', 'Безопасно если программа популярная', 'Зависит от операционной системы'], correct: 1 },
  { q: 'Что значит «https» в начале адреса сайта?', opts: ['Сайт создан в России', 'Соединение зашифровано — данные труднее перехватить', 'Сайт проверен государством', 'Сайт не содержит вирусов'], correct: 1 },
  { q: 'Тебе позвонили из «службы безопасности банка» и просят назвать код из SMS. Ты:',  opts: ['Называю — они же из банка', 'Кладу трубку и перезваниваю в банк сам по номеру с карты', 'Называю только последние цифры', 'Прошу подождать и советуюсь с родителями'], correct: 1 },
  { q: 'Как мошенники используют искусственный интеллект?', opts: ['Только для взлома сайтов', 'Для создания дипфейков, клонирования голосов, персонализированного фишинга', 'ИИ не используется в мошенничестве', 'Только для рассылки спама'], correct: 1 },
  { q: 'Что нужно сделать если ты стал жертвой кибермошенников?', opts: ['Ничего, всё равно не помогут', 'Сообщить в банк и заблокировать карту, обратиться в полицию', 'Попытаться вернуть деньги самостоятельно', 'Рассказать только друзьям'], correct: 1 },
  { q: 'Публичный Wi-Fi в кафе. Ты можешь безопасно:',  opts: ['Вводить пароли и данные карты', 'Делать банковские переводы', 'Просматривать новости и общаться (без ввода паролей)', 'Всё вышеперечисленное'], correct: 2 }
];

let quizAnswers = new Array(questions.length).fill(null);
let quizSubmitted = false;

function initQuiz() {
  if (quizSubmitted) return;
  quizAnswers = new Array(questions.length).fill(null);
  renderQuiz();
}

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  container.innerHTML = questions.map((q, qi) => `
    <div class="quiz-card" id="qcard${qi}">
      <div class="quiz-num">Вопрос ${qi + 1} из ${questions.length}</div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-opts">
        ${q.opts.map((opt, oi) => `
          <button class="quiz-opt" onclick="selectQuiz(${qi}, ${oi})" id="qopt${qi}_${oi}">
            <span class="option-letter">${String.fromCharCode(65+oi)}</span>
            ${opt}
          </button>`).join('')}
      </div>
    </div>`).join('') + `
  <div class="quiz-submit">
    <button class="btn-primary" onclick="submitQuiz()">Проверить результаты →</button>
  </div>`;
}

function selectQuiz(qi, oi) {
  if (quizSubmitted) return;
  quizAnswers[qi] = oi;
  document.querySelectorAll(`[id^="qopt${qi}_"]`).forEach(btn => btn.classList.remove('selected'));
  document.getElementById(`qopt${qi}_${oi}`).classList.add('selected');
}

function submitQuiz() {
  const unanswered = quizAnswers.filter(a => a === null).length;
  if (unanswered > 0) {
    alert(`Пожалуйста, ответь на все вопросы. Осталось: ${unanswered}`);
    return;
  }
  quizSubmitted = true;
  let score = 0;

  questions.forEach((q, qi) => {
    const userAns = quizAnswers[qi];
    if (userAns === q.correct) score++;
    document.querySelectorAll(`[id^="qopt${qi}_"]`).forEach(btn => {
      btn.disabled = true;
      const oi = parseInt(btn.id.split('_')[1]);
      if (oi === q.correct) btn.classList.add('correct-q');
      else if (oi === userAns && userAns !== q.correct) btn.classList.add('wrong-q');
    });
  });

  showResults(score);
}

function showResults(score) {
  const pct = Math.round(score / questions.length * 100);
  let title, desc, level;
  if (pct >= 90) { title = 'Эксперт по кибербезопасности!'; desc = 'Отличный результат. Ты отлично разбираешься в киберугрозах и знаешь как от них защититься. Поделись этими знаниями с друзьями и семьёй!'; level = 'var(--accent)'; }
  else if (pct >= 70) { title = 'Хороший уровень защиты'; desc = 'Ты знаешь основные угрозы, но есть пробелы. Перечитай раздел «Угрозы» и обрати особое внимание на темы, в которых ошибся.'; level = '#7b61ff'; }
  else if (pct >= 50) { title = 'Средний уровень'; desc = 'Базовые знания есть, но мошенники могут тебя перехитрить. Пройди симулятор заново и изучи карточки угроз подробнее.'; level = '#ffb100'; }
  else { title = 'Нужно подтянуть знания'; desc = 'Не расстраивайся — ты только начинаешь. Изучи все разделы сайта и вернись к тесту. Знания — лучшая защита!'; level = 'var(--accent2)'; }

  const tips = [
    { icon: '🔑', text: 'Используй уникальные пароли для каждого сервиса — менеджер паролей поможет их запомнить' },
    { icon: '📱', text: 'Включи двухфакторную аутентификацию в ВКонтакте, Telegram, почте' },
    { icon: '🧠', text: 'Главное правило: если торопят принять решение — это признак мошенничества' },
    { icon: '🔗', text: 'Всегда проверяй URL сайта перед вводом данных' },
    { icon: '👨‍👩‍👧', text: 'Расскажи родителям о схемах мошенников — они чаще становятся жертвами' }
  ];

  const container = document.getElementById('quizContainer');
  container.innerHTML = `
    <div class="results-box">
      <div class="results-score" style="border-color:${level};box-shadow:0 0 30px ${level}40">
        <span class="score-num" style="color:${level}">${score}</span>
        <span class="score-total">из ${questions.length}</span>
      </div>
      <div class="results-title">${title}</div>
      <div class="results-desc">${desc}</div>
      <div class="results-tips">
        <h4>Ключевые правила защиты</h4>
        ${tips.map(t => `<div class="tip-item"><span class="tip-icon">${t.icon}</span><span>${t.text}</span></div>`).join('')}
      </div>
      <div class="btn-group">
        <button class="btn-primary" onclick="restartQuiz()">Пройти тест заново</button>
        <button class="btn-secondary" onclick="showSection('threats')">Повторить теорию</button>
      </div>
    </div>`;
}

function restartQuiz() {
  quizSubmitted = false;
  quizAnswers = new Array(questions.length).fill(null);
  renderQuiz();
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
  initSimulator();
  initQuiz();
});
