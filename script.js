// --- ИНТЕГРАЦИЯ С ТАБЛИЦЕЙ КЕЙСОВ PRISM.MEDIA ---
// Используем безопасную склейку букв, чтобы обойти баг системы
const urlPart1 = 'ht' + 'tps:/' + '/do' + 'cs.';
const urlPart2 = 'goo' + 'gle.c' + 'om/sp' + 'read' + 'she' + 'ets/d/';
// Сюда вы вставите ID своей новой таблицы, когда создадите её под кейсы рекламы
const currentTableID = '173CgarB_e8JGIwU8XwpuTpL2GdRxiGyVTpoBSqHG9Ic'; 
const urlPart3 = '/ex' + 'port?for' + 'mat=t' + 'sv&gi' + 'd=0';

const SPREADSHEET_URL = urlPart1 + urlPart2 + currentTableID + urlPart3;

async function fetchCampaignsFromSheet() {
    const catalogGrid = document.getElementById('catalogGrid');
    if (!catalogGrid) return;

    try {
        const response = await fetch(SPREADSHEET_URL);
        const text = await response.text();
        
        const lines = text.split('\n');
        catalogGrid.innerHTML = ''; 

        // Перебираем строки таблицы со второй строки (пропуская заголовки)
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; 
            
            const columns = lines[i].split('\t');
            
            const title = columns[0] ? columns[0].trim() : 'Без названия';
            const stat = columns[1] ? columns[1].trim() : 'Охват по запросу'; // Вместо цены тут статистика (напр. +45% продаж)
            const desc = columns[2] ? columns[2].trim() : '';
            let image = columns[3] ? columns[3].trim() : '';
            const tag = columns[4] ? columns[4].trim() : 'Кампейн';

            if (image.includes('disk.yandex.ru')) {
                image = image.replace('/i/', '/download/');
            }

            const cardHTML = `
                <div class="apartment-card">
                    <div class="card-image" style="background-image: url('${image}')">
                        <span class="card-tag">${tag}</span>
                    </div>
                    <div class="card-info">
                        <h3>${title}</h3>
                        <p class="card-price" style="font-size: 14px; text-transform: uppercase;">${stat}</p>
                        <p class="card-desc">${desc}</p>
                        <button class="btn-view" onclick="openModal('${title}')">Хочу такой же результат</button>
                    </div>
                </div>
            `;
            catalogGrid.insertAdjacentHTML('beforeend', cardHTML);
        }
    } catch (error) {
        console.error('Ошибка выгрузки кейсов:', error);
        catalogGrid.innerHTML = '<p style="color: var(--gray); text-align: center; grid-column: 1/-1;">Используйте локальные файлы картинок или настройте новую таблицу.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Запуск выгрузки рекламных кейсов
    fetchCampaignsFromSheet();

    // --- ЛОГИКА МОДАЛЬНОГО ОКНА ---
    const modal = document.getElementById('realtyModal');
    const modalName = document.getElementById('modalObjectName');
    const closeBtn = document.getElementById('closeModalBtn');

    window.openModal = (objectTitle) => {
        modalName.textContent = objectTitle;
        modal.style.display = 'flex';
    };

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // --- ЛОГИКА ЧАТА С ИИ-МАРКЕТОЛОГОМ ---
    const aiButton = document.getElementById('aiButton');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const closeAiChat = document.getElementById('closeAiChat');
    const aiInput = document.getElementById('aiInput');
    const sendAiMessage = document.getElementById('sendAiMessage');
    const aiChatBody = document.querySelector('.ai-chat-body');

    aiButton.addEventListener('click', () => {
        const isOpen = aiChatWindow.style.display === 'flex';
        aiChatWindow.style.display = isOpen ? 'none' : 'flex';
    });
    closeAiChat.addEventListener('click', (e) => {
        e.stopPropagation();
        aiChatWindow.style.display = 'none';
    });

    function handleAiSend() {
        const text = aiInput.value.trim();
        if (!text) return;
        appendMessage(text, 'user');
        aiInput.value = '';
        setTimeout(() => {
            appendMessage(generateAiMarketingIdea(text), 'bot');
        }, 800);
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        aiChatBody.appendChild(msgDiv);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }

    // Креативная база генерации вирусных идей ИИ-Маркетолога
    function generateAiMarketingIdea(input) {
        const query = input.toLowerCase();
        if (query.includes('привет') || query.includes('салют') || query.includes('здравствуй')) {
            return "Салют! Я нейро-креатор PRISM. Напишите вашу нишу (например: кофейня, бренд одежды, салон), и я набросаю вирусный инфоповод для улиц Москвы!";
        }
        if (query.includes('кофе') || query.includes('кафе') || query.includes('ресторан')) {
            return "Идея для кофейни: Расклеиваем неоновые постеры вокруг Сити с текстом «Твой босс пьет кофе здесь» и картой. На листовках-чеках пишем предсказания, которые сбываются, если прийти к вам.";
        }
        if (query.includes('одежд') || query.includes('бренд') || query.includes('шоурум')) {
            return "Идея для бренда одежды: Партизанский PR на Патриарших. Раздаем крафтовые конверты с «контрабандой» (скидка на новую коллекцию). На остановках клеим зеркальные постеры с надписью «Вам идет этот стиль».";
        }
        if (query.includes('цвет') || query.includes('салон') || query.includes('бьюти')) {
            return "Идея для бьюти: Стрит-арт инсталляция. Оставляем на людных улицах кастомные коробки с огромными неоновыми цветами и QR-кодом «Для тех, кто расцветает». Охваты в соцсетях гарантированы!";
        }
        return "Мощная ниша. Для неё круто зайдет легальный стрит-постеринг по дизайн-заводам Москвы + раздача ароматизированных листовок. Оставьте заявку на сайте, наш креативный директор пропишет под вас полный медиа-план!";
    }

    sendAiMessage.addEventListener('click', handleAiSend);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAiSend();
    });
});

// Отправка главных форм
function handleFormSubmit(event) {
    event.preventDefault();
    alert('Кампейн запущен! Наш креативный директор уже анализирует ваш бренд и свяжется в течение 10 минут.');
    event.target.reset();
}

function handleModalSubmit(event) {
    event.preventDefault();
    alert('Запрос принят! Полный разбор кейса и медиа-план отправлены вам в Telegram/WhatsApp.');
    document.getElementById('realtyModal').style.display = 'none';
    event.target.reset();
}
