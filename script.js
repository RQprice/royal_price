document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultList = document.getElementById('resultList');
    const showRidingBeasts = document.getElementById('showRidingBeasts');
    const showKeys = document.getElementById('showKeys');
    const showCards = document.getElementById('showCards');
    const showImprovements = document.getElementById('showImprovements');
    const showСonsumables = document.getElementById('showСonsumables');
    const showResources = document.getElementById('showResources');
    const showPets = document.getElementById('showPets');
    const showReals = document.getElementById('showReals');
    const showTrophy = document.getElementById('showTrophy');
    let openList = false;

    // Функция для поиска элементов
    function searchElements() {
        const searchTerm = searchInput.value.toLowerCase();
        resultList.innerHTML = ''; // Очистка результата поиска

        if (searchTerm != ''){
            elementsList.forEach((element) => {
                if (element.toLowerCase().includes(searchTerm)) {
                    const listItem = document.createElement('li');
                    listItem.textContent = element;
                    // Добавляем обработчик события на клик по элементу списка
                    listItem.addEventListener('click', () => openElementPage(element));
                    resultList.appendChild(listItem);
                }
            });
        }
        else alwaysElements();
    }

    function openElementPage(element) {
        // Очищаем значение поля ввода перед переходом
        searchInput.value = '';
        window.location.href = `./element.html?name=${encodeURIComponent(element)}`;
    }

    // Функция для добавления значка
    function replaceIcon(element) {
        if (!openList) {
            element.textContent = element.textContent.replace('▲', '▼');
        } else {
            element.textContent = element.textContent.replace('▼', '▲');
        }
    }

    function alwaysElements() { // элементы, которые должны отображаться всегда
        resultList.innerHTML = ''; 
        resultList.appendChild(showReals);
        resultList.appendChild(showRidingBeasts);
        resultList.appendChild(showKeys);
        resultList.appendChild(showCards);
        resultList.appendChild(showTrophy);
        resultList.appendChild(showImprovements);
        resultList.appendChild(showСonsumables);
        resultList.appendChild(showResources);
        resultList.appendChild(showPets);
    }

    function showElements(Elements, showElement) {
        resultList.innerHTML = '';
        resultList.appendChild(showElement);
        if (!openList){
            Elements.forEach((element) => {
                if (element.toLowerCase().includes('')) {
                    const listItem = document.createElement('li');
                    listItem.textContent = element;
                    listItem.addEventListener('click', () => openElementPage(element));
                    resultList.appendChild(listItem);
                }
            });
            replaceIcon(showElement);
            openList = true;
        }
        else{
            alwaysElements();
            replaceIcon(showElement);
            openList = false;
        }
    }

    showReals.addEventListener('click', () => {
        openElementPage("Реалы");
    });

    showRidingBeasts.addEventListener('click', () => {
        showElements(ridingBeastsList, showRidingBeasts);
    });

    showKeys.addEventListener('click', () => {
        showElements(keysList, showKeys);
    });

    showCards.addEventListener('click', () => {
        showElements(cardsList, showCards);
    });

    showImprovements.addEventListener('click', () => {
        showElements(improvementsList, showImprovements);
    });

    showСonsumables.addEventListener('click', () => {
        showElements(сonsumablesList, showСonsumables);
    });

    showResources.addEventListener('click', () => {
        showElements(resourcesList, showResources);
    });

    showPets.addEventListener('click', () => {
        showElements(petsList, showPets);
    });

    showTrophy.addEventListener('click', () => {
        showElements(trophiesList, showTrophy);
    });

    // Обработчик события ввода в поле поиска
    searchInput.addEventListener('input', searchElements);

    alwaysElements();

});

// Список элементов из данных

const realsList = ["Реалы"];

const ridingBeastsList = [
    "Архи-вайдер", "Багровый Ирекс", "Белый крок", "Грим", "Громовой зверь", "Дронт", "Златозавр", "Инсектор", "Каркарон", "Механозавр",
    "Некрок", "Некропёс", "Прирученный дзоноква", "Прокси-вайдер", "Протолюпус", "Псай-вайдер", "Розовый крок", "Рудвольф", "Сара", "Снежный крок",
    "Степной охотник", "Стервятник", "Тирекс", "Фламинго"
];

const keysList = [
    "Железный ключ", "Золотой ключ", "Кристальный ключ"
];

const cardsList = [
    "Золотая карта воителя", "Золотая карта инея", "Золотая карта кладоискателя", "Золотая карта мага", "Золотая карта мастера",
    "Золотая карта мстителя", "Золотая карта ожога", "Золотая карта разряда", "Золотая карта рыцаря", "Золотая карта удара",
    "Золотая карта ученика", "Карта Алаитского морока", "Карта Алисы", "Карта Альфа-кусаки", "Карта Альфа-самца",
    "Карта Ангеласки", "Карта Анубиса", "Карта Арконского Зверя", "Карта Арлекина", "Карта Архиножки", "Карта Архона",
    "Карта Баксбакуалануксивайе", "Карта Баттлера", "Карта Бафомета", "Карта Бафометика", "Карта Бешеного кабана",
    "Карта Бешеного крога", "Карта Бзыкалки", "Карта Бигбена", "Карта Блома", "Карта Богатого Упыря", "Карта Богомола",
    "Карта Боевого богомола", "Карта Болотного кокона", "Карта Болотной гадюки", "Карта Болотной жужи", "Карта Борозубки",
    "Карта Броненожки", "Карта Бронированного хаула", "Карта Вальдерстая", "Карта Винторогого тоуса", "Карта Водоножки",
    "Карта воды", "Карта воздуха", "Карта Воко", "Карта Волка", "Карта Воспитанника Соло", "Карта Воспитанницы Соло",
    "Карта Гадюки", "Карта Гаргульи", "Карта Гарма", "Карта Герцога приливов", "Карта Гигантской тортоллы", "Карта Гоблина",
    "Карта Гоблина без головы", "Карта Гоблина гренадера", "Карта Гоблина наездника", "Карта Гоблина-мародера", "Карта Голодного люпуса",
    "Карта Голодной тернии", "Карта Гончей Соло", "Карта Горного сисиутла", "Карта Гранита истины", "Карта Грибоедки",
    "Карта Денгура", "Карта Деревяшки", "Карта Деструктора", "Карта Детеныша злобоглаза", "Карта Дзоноквы", "Карта Дикого вальдерстая",
    "Карта Дикого кабана", "Карта Драгглера", "Карта Древнего пенька", "Карта Древнего энта", "Карта Древней улитки",
    "Карта Древошляпа", "Карта Дрессированного вальдерстая", "Карта Дрона-робобура", "Карта Дуана Безжалостного", "Карта Дубового энта",
    "Карта Дупеля", "Карта Духа моземия", "Карта Желудя", "Карта Жабы", "Карта Жана-Франсуа", "Карта Железного термита",
    "Карта Железной жужи", "Карта Женевьевы", "Карта Жужелицы Темной", "Карта Заиндевевшей жужи", "Карта Зараженного орка рабочего",
    "Карта Зараженного орка техника", "Карта Зараженного орка-добытчика", "Карта Зараженного сисиутла", "Карта Зараженного тоуса",
    "Карта Зараженного флайкона", "Карта Зараженного щупальника", "Карта Зараженной ангеласки", "Карта Зараженной борозубки",
    "Карта Зараженной жужи", "Карта Зараженной рогоножки", "Карта Зараженной саблехвостки", "Карта Зачарованного тоуса", "Карта Звероглаза",
    "Карта Зверомора", "Карта земли", "Карта Зерокса", "Карта Зимы", "Карта Злобоглаза", "Карта Золотого скарабея",
    "Карта Золотого Таракана", "Карта Зомби", "Карта Зомби-утопленника", "Карта Изумрудного термита", "Карта Инсерфанты",
    "Карта Ирекса", "Карта К'Талу", "Карта Кабана", "Карта Кабана Вожака", "Карта Камнееда", "Карта Квачи", "Карта Керока",
    "Карта Кладбищенского пугала", "Карта Кленового энта", "Карта Кокона", "Карта Конунга Виндсвалла", "Карта Кораллового краба",
    "Карта Королевского паука", "Карта Королевской тернии", "Карта Королевы Крыс", "Карта Королевы термитов", "Карта Костяного кошмара",
    "Карта Костяной волоконницы", "Карта Кристаллоида", "Карта Крога", "Карта Крока", "Карта Крокера", "Карта Кромсателя", "Карта Крупье",
    "Карта Крылозуба", "Карта Лаффона", "Карта Ледяного гога", "Карта Лесного воина", "Карта Лесного паука", "Карта Лесного Шамана",
    "Карта Лета", "Карта Летучей мыши", "Карта Луговой жужи", "Карта Лунатика", "Карта Лунного гарма", "Карта Лякуши", "Карта М'уно",
    "Карта Матерого клешнегрыза", "Карта Мега Ирекса", "Карта Мертвячка", "Карта Мерцающей жужи", "Карта Металлера",
    "Карта Метателя спор", "Карта Минотавра", "Карта Многоножки", "Карта Молодого ирекса", "Карта Молодого нетопыря", "Карта Морока",
    "Карта Мотогрома", "Карта Мохоедки", "Карта Мумии", "Карта Муравья-воина", "Карта Муравья-рабочего", "Карта Мэри", "Карта Мясорубочника",
    "Карта Наемника Остина", "Карта Наяды", "Карта Небесной остролитки", "Карта Нетопыря", "Карта Нечто Дымящегося", "Карта Нечто Огненного",
    "Карта Нижада", "Карта Ночного кокона", "Карта Ночного Смотрителя", "Карта Ночной жужи", "Карта Облака Тьмы", "Карта Оборотня",
    "Карта Овна", "Карта Огненного дракончика", "Карта Огненного ирекса", "Карта огня", "Карта Огородного пугала", "Карта Огра",
    "Карта Одуванчика", "Карта Озерного дракончика", "Карта Оракула", "Карта Орка", "Карта Орка-командира", "Карта Орка-надсмотрщика",
    "Карта Орка-шамана", "Карта Орка-шахана", "Карта Орка-шахана", "Карта Орка-шахана", "Карта Орка-шахана", "Карта Орка-шахана", "Карта Орка-шахана", "Карта Орка-шахана",
    "Карта Осени", "Карта П'атага", "Карта Паучьей осы", "Карта Пенька", "Карта Пепла", "Карта Песочного человека", "Карта Песчанки",
    "Карта Песчаного кокона", "Карта Песчаного огурца", "Карта Песчаного харриера", "Карта Пещерного волка", "Карта Пещерного гнусмаса",
    "Карта Пещерного клешнегрыза", "Карта Пещерного паука", "Карта Пещерной улитки", "Карта Пламярыка", "Карта Подземного щупальника",
    "Карта Пожирателя воды", "Карта Пожирателя воздуха", "Карта Пожирателя земли", "Карта Пожирателя моземия", "Карта Пожирателя огня",
    "Карта Пожирателя тьмы", "Карта Пожирателя хаоса", "Карта Пожирателя элениума", "Карта Пожирателя яда", "Карта Ползня",
    "Карта Полярного морока", "Карта Прибрежной ройки", "Карта Проглота", "Карта Пружинки I", "Карта Пустоглота", "Карта Пустынного краба",
    "Карта Пыльной жужи", "Карта Пьеро", "Карта Пятиглаза", "Карта Равнинной ройки", "Карта Речного гнусмаса", "Карта Ритуального скорпиона",
    "Карта Рогоножки", "Карта Розового слима", "Карта Ройлера", "Карта Росинки", "Карта Рубинового муравья", "Карта Саблехвостки",
    "Карта Самки жужи", "Карта Светлячка", "Карта Свирепого люпуса", "Карта Свирепого оборотня", "Карта Свиты Дуана",
    "Карта Северного клешнегрыза", "Карта Северного орка", "Карта Северного орка командира", "Карта Северного орка шамана", "Карта Северной жужи",
    "Карта Скарабея", "Карта Скелета", "Карта Скелета-воина", "Карта Скелета-лучника", "Карта Скорпиона", "Карта Слепой жужи",
    "Карта Слуги Соло", "Карта Снегобея", "Карта Снегобея-перевертыша", "Карта Снежной жужи", "Карта Советника Остина", "Карта Старого снегобея",
    "Карта Сточной крысы", "Карта Стража Соло", "Карта Стрекоскопа", "Карта Стрелка Остина", "Карта Стрелка Соло",
    "Карта Темного Оракула", "Карта Темного Энта", "Карта Темной мумии", "Карта Таракана", "Карта Тернии", "Карта Террана",
    "Карта Тиранизатора", "Карта Тортоллы", "Карта Тоуса", "Карта Тролля", "Карта Тролля Арбалетчика", "Карта Тролля Копейщика",
    "Карта Трухляшки", "Карта Туманганского Богомола", "Карта Тундрового сисиутла", "Карта Тыквы", "Карта Увражика", "Карта Ужа",
    "Карта Улитки", "Карта Упыря", "Карта Ф'араона", "Карта Фелура", "Карта хаоса", "Карта Харриера", "Карта Хаттлера",
    "Карта Хаула", "Карта Хлезня", "Карта Хлыстовика", "Карта Хозяина", "Карта Хьюго", "Карта Цапальника", "Карта Черного волка",
    "Карта Черного краба", "Карта Черной борозубки", "Карта Часов", "Карта Червя", "Карта Шагающего погрузчика", "Карта Шипострела",
    "Карта Ширры", "Карта Щупальника", "Карта Щупальца", "Карта Эдварда", "Карта Эльки", "Карта яда", "Карта Ядовитого слима", "Карта Ядовитого таракана",
    "Карта Ядовитой ангеласки", "Карта Ядовитой бзыкалки"
];

const trophiesList = [
    "Агат", "Агатовый кулон", "Аквамарин", "Алаитское ожерелье", "Алмаз", "Альфа-бур", "Амальгама", "Аметист", "Анкх", "Белая глина",
    "Белая жемчужина", "Белая трава", "Белок", "Белый гриб", "Белый песок", "Бледная поганка", "Болт", "Брюшко филлера",
    "Бубен", "Ветвь энта", "Ветка шипованного куста", "Ветки тростника", "Волчий клык", "Газ-клапан", "Гайка", "Гвоздь", "Гиацинт",
    "Гибкие жилы", "Гибкий зубной нерв", "Глаз Гарма", "Глаз богомола", "Глаз злобоглаза", "Глаз змеи", "Глаз камнееда", "Глаза ночной жужи",
    "Гоблинский бумеранг", "Голова снегобея", "Голубая щелочь", "Горный хрусталь", "Гранат", "Гранит", "Гриб Волчанка", "Грибница",
    "Густой сок", "Диетическое зерно", "Дикий кристалл", "Договор с Остином", "Древесная шляпа", "Древесник", "Душа пламени",
    "Дьявольские рога", "Дьявольские рожки", "Едкая кислота", "Елочные игрушки", "Жаберный клапан", "Жало осы", "Жало скорпиона",
    "Жгучее щупальце", "Желатин", "Желе", "Железное сердце", "Железный хлам", "Живой лед", "Желтая трава", "Заклинившая бомба",
    "Закрученный рог", "Защитная пластина", "Звездная пыль", "Зеленорост", "Зеленая слизь", "Зеленая трава", "Зеленый мох",
    "Зеркальный амулет", "Зеркальный осколок", "Змеиная кожа", "Золотое копыто", "Золотой браслет", "Золотой зуб", "Золотой скарабей",
    "Зубной нерв", "Игральные кости", "Изумруд", "Икра хваги", "Индевень", "Искристая слизь", "Истлевшие бинты", "Каменная кожа",
    "Каменная кость", "Каменное сердце", "Кандалы", "Канифоль", "Капля смолы", "Кварц", "Кедровая шишка", "Киноварь", "Клевер",
    "Клешня краба", "Клешня скорпиона", "Клубень зеленороста", "Клубок паутины", "Клык оборотня", "Клык орка", "Клыки летучей мыши",
    "Коготь оборотня", "Копыто", "Корень мандрагоры", "Корень мункуса", "Корень толстоцвета", "Корешок Эльтана", "Кость скелета",
    "Костяное оперение", "Красивое перо", "Красный коралл", "Красный цветок", "Кровавый договор", "Кровь нетопыря", "Кровь оборотня",
    "Крупица моземия", "Крупный желудь", "Крылья летучей мыши", "Крысиная шкура", "Крысиный хвост", "Кукум", "Куски кремния", "Кусок мяса",
    "Кучка старой пыли", "Ледовый серпантин", "Ледяное серебро", "Летучий мешок", "Липкое волокно", "Лист толстоцвета", "Ловец зимних снов",
    "Лягушачья икра", "Манипулятор", "Маска шамана", "Масленка", "Медальон жажды", "Медальон страсти", "Медная трубка", "Медный браслет",
    "Мембрана", "Мерцающая пыльца", "Мерцающий мох", "Молодые одуванчики", "Морион", "Морская тина", "Морской Орех", "Муравьиная кислота",
    "Муравьиные усики", "Мухомор", "Мягкая шерсть", "Мясо варана", "Мясо древней улитки", "Мясо змеи", "Мясо одуванчика", "Мясо островной улитки",
    "Мясо снежной жужи", "Мясо улитки", "Мед ройлера", "Набор цветных контактов", "Нефрит", "Обломок ножа", "Обыканская морошка",
    "Огненная искра", "Огнеупорная чешуя", "Опал", "Орбитула", "Осколок звезды", "Осколок раковины", "Осколок хрустальной реки",
    "Остролист", "Острые жвалы", "Ошейник вальдерстая", "Панцирь железной жужи", "Панцирь жужи", "Панцирь мерцающей жужи", "Панцирь северной жужи",
    "Панцирь снегобея", "Панцирь ядовитого таракана", "Пеньковая трава", "Пепел огненного элементаля", "Перепонка", "Перстень стража",
    "Пещерная соль", "Платье Алисы", "Плоды Упрямки", "Позвонок", "Полено", "Ползучее корневище", "Порох", "Портативная дубинка",
    "Посох сумрачного хаттлера", "Прах", "Присоска", "Пристрелочный монокуляр", "Прозрачные крылышки", "Проклятая кровь", "Пружинка",
    "Пупырчатый мозг", "Пучок синей шерсти", "Пушинка Одуванчика", "Пыльца песчаной жужи", "Регулятор снегобея", "Речная жемчужина",
    "Ржавая гайка", "Ржавая пружина", "Ржавый болт", "Ржавый доспех", "Рог Овна", "Рог слепой жужи", "Роговой шип", "Розалия",
    "Ройкин глаз", "Роса", "Рубин", "Сало", "Самоцветы", "Сапфир", "Сверкающая чешуйка", "Северный мох", "Семена кленов", "Семена морошки",
    "Сера", "Сердце Террана", "Сердце стужи", "Серпантинный жук", "Серый песок", "Синий диск", "Синий мох", "Синильник", "Синяя поганка",
    "Скорлупа", "Скорлупа Желудя", "Сладкие специи", "Слеза Ауры", "Слипшиеся ракушки", "Слюда", "Слюна вальдерстая", "Снежная пыль",
    "Сонные шары", "Сочная мякоть", "Старая кость", "Старинная монета", "Стланик", "Стланиковая шишка", "Стрелки часов",
    "Сухожилия бафомета", "Сухой лист", "Сырые семечки", "Твердый сплав", "Терморегулятор", "Тигровый глаз", "Титановая пластина",
    "Титановые лезвия", "Ткань зомби", "Токсичный гриб", "Толстоцвет", "Топаз", "Тряпичная кукла", "Тряпичное сердце", "Тыква",
    "Тяжелая вода", "Усики бзыкалки", "Усики слепой жужи", "Феромоновая пыльца", "Фрагмент адских поводьев", "Хабульский корунд",
    "Хвост Металлера", "Хвост скорпиона", "Хвостик ройки", "Хвоя стланика", "Хитиновая пластина", "Хитиновая трубка", "Хмель",
    "Хоботок гнусмаса", "Холодный песок", "Хрустящий стебель", "Цветок Логруса", "Цветы травы Джи", "Целебный мох", "Частица тьмы",
    "Челюсть крылозуба", "Череп", "Череп огра", "Черная жемчужина", "Черная икра", "Черная трава", "Черный коралл", "Черный песок",
    "Шелковинка", "Шестеренка", "Шкура Хаула", "Шкура вальдерстая", "Шкура волка", "Шкура гарма", "Шкура голодного люпуса",
    "Шкура грибоедки", "Шкура кабана", "Шкура нижада", "Шкура оборотня", "Шкура саламандры", "Шкура свирепого люпуса", "Шляпка гриба",
    "Шуруп", "Шелковое сердце", "Щепка", "Эктоплазма", "Элениумное сплетение", "Эссенция вампирской крови", "Ягоды верляники",
    "Яд гадюки", "Ядовитая железа", "Ядовитое перо", "Язык гончей", "Яйцо ройки", "Яйцо тортоллы", "Янтарная смола", "Ячейки памяти"
];

const improvementsList = [
    "Арконитовый сургуч", "Ашкалотский кубик", "Черный философский камень", "Белый философский камень", "Красный философский камень",
    "Руна Сохранения", "Руна Холода", "Сердце аркона", "Сердце стужи"
];

const сonsumablesList = [
    "Алхимическая отмычка", "Алхимический энергетик", "Алхимическое зелье отваги", "Амброзия", "Ашкалотская жвачка",
    "Ашкалотская таблетка бодрости", "Бальзам Эльмара", "Билет инфанты", "Билет на арену", "Благословенное зелье",
    "Большое алхимическое зелье отваги", "Большое лечебное зелье", "Большое торговое место", "Большой флакон с зельем маны",
    "Ведьмин корень", "Водостойкая шкатулка для вызова", "Выжимка из крога", "Газировка", "Гиперсумка Норина",
    "Глинтвейн", "Желтое зелье охотника", "Жажда тролля", "Заиндевевший лоскут", "Зеленый листок", "Зелье возврата маны",
    "Зелье возврата молодости", "Зелье высокой концентрации", "Зелье исцеления стратега", "Зелье маны", "Зелье меткого стрелка",
    "Зелье неукротимой ярости", "Зелье повышенной хитрости", "Зелье тролля", "Зимняя шкатулка", "Игристое вино",
    "Камень призыва", "Клюквенное пирожное", "Клюквенный пирог", "Колба с зельем маны", "Корм для ездового животного",
    "Королевское благословение 14 д.", "Королевское благословение 3 д.", "Королевское благословение 30 д.",
    "Королевское благословение 7 д.", "Красное зелье защитника", "Красное яблоко", "Кристалл Аквы", "Кристалл Души",
    "Кристальный сосуд", "Кровавый пунш", "Крылья бешеной жужи", "Крылья жужи", "Кураре", "Лепесток Эльтана",
    "Летучее зелье бодрости", "Лечебное зелье", "Лечебное зелье из морошки", "Лист придорожника", "Листок мандрагоры",
    "Листок черной мандрагоры", "Мед", "Малое алхимическое зелье отваги", "Малое торговое место", "Малый флакон с зельем маны",
    "Мощное лечебное зелье", "Муравьиный чай", "Мясо тролля", "Настой Мелиоса", "Настойка эльтана", "Обугленный клочок поводьев",
    "Огуречный сок", "Орочье зелье бодрости", "Орочье зелье маны", "Орочье лечебное зелье", "Орочье пойло", "Осколок Грима",
    "Осколок протолюпуса", "Осколок рудвольфа", "Печать друида", "Печать мертвеца", "Печать механика", "Печать пожирателя",
    "Печать Стража зимы", "Печать странника", "Печать ужаса", "Печать фараона", "Печать черного алхимика", "Печенье с предсказанием",
    "Плод мандрагоры", "Плод черной мандрагоры", "Праздничный торт", "Приглашение на Небесную ярмарку", "Приглашение на Снежный фестиваль",
    "Протехтор", "Противоядие", "Резонатор крови", "Росток одеяния дриады", "Рыбий жир", "Сахарная вата", "Сахарная фантазия",
    "Свиток безумных превращений", "Семена весенних цветов", "Семечко безумной тыквы", "Синее шаманское зелье", "Снежное наслаждение",
    "Снежок", "Среднее торговое место", "Стебель Эльтана", "Стрела Любви", "Сушеный филлер", "Травяная жвачка", "Травяной чай",
    "Тыквенные семечки", "Тыквенный лимонад", "Тыквенный пирог", "Фиал крови", "Флакон с зельем маны", "Хорошее бодрящее зелье",
    "Цветок мандрагоры", "Цветок черной мандрагоры", "Цветок Эльтана", "Цветочный мед", "Четырехлистный клевер", "Шоколадное сердце",
    "Экстракт Эльтана", "Эликсир Бледной Луны", "Эликсир Везунчика", "Эликсир Гневного Дракона", "Эликсир Жизненной Силы",
    "Эликсир Искателя Сокровищ", "Эликсир Королевского Стража", "Эликсир Могущества", "Эликсир Мудрого Дракона", "Эликсир Слепой Ярости",
    "Эмблема стражника", "Эссенция бодрости", "Эссенция жизни", "Эссенция сосредоточения"
];

const resourcesList = [
    "Антрацит", "Лен", "Льняная ткань", "Железная ткань", "Веритовая ткань", "Мифриловая ткань", "Обсидиановая ткань", "Адамантиевая ткань",
    "Серебряная ткань", "Золотая ткань", "Железная руда", "Железо", "Сталь", "Веритовая руда", "Веритовая сталь", "Мифриловая руда",
    "Мифриловая сталь", "Обсидиановая руда", "Обсидиановая сталь", "Адамантиевая руда", "Адамантиевая сталь", "Серебряная руда",
    "Серебряный слиток", "Золотая руда", "Золотой слиток", "Красный элум", "Синий элум", "Зеленый элум", "Звездная руда", "Магниевая руда",
    "Синева", "Слиток элумия", "Логос", "Магнетизит", "Хедра"
];

const petsList = [
    "Арахнид", "Аями", "Белохвост", "Бронекраб", "Вьюжок", "ВЭ-дроид", "Глазеныш", "Гранит", "Грибоедка", "Долли",
    "Драко", "Жаба", "Живой клинок", "Жужебот", "Заклинатель дождя", "Зеленый шум", "Златоглотик", "Император", "К'давру",
    "Керок", "Косточка", "Котик", "Кошмарный Арли", "Кристаллид", "Крокер", "Кронпринц", "Крупьончик", "Ледышка", "Летучая мышь",
    "Люпус", "Мантис", "Матильда", "Мета-ящер", "Мохоедка", "Мумия", "Ночной ужас", "Огнеглотик", "Огонек", "Олаф",
    "Паук пучеглаз", "Полуночник", "Принцесса Крыс", "Про-терран", "Роджер", "Розохвост", "Росинка", "Сборщик", "Сварок", "Слимми",
    "Стрекоскоп", "Сумрак", "Темнохвост", "Тик-так-чик", "Тыковка", "Фьордик", "Хаулыш", "Хранитель", "Хрустик", "Шаробей", "Эак", "Энди-ар-340"
];

const elementsList = [].concat(realsList, ridingBeastsList, keysList, cardsList, trophiesList, improvementsList, сonsumablesList, resourcesList, petsList);