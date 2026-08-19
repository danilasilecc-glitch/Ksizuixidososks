// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mods');
    const detailContainer = document.getElementById('mod-detail');

    // Функция для отображения списка модов (главная страница)
    function renderMods(mods) {
        if (!container) return;

        container.innerHTML = '';

        mods.forEach(mod => {
            const card = document.createElement('div');
            card.className = 'mod-card';

            card.innerHTML = `
                <a href="mod-detail.html?id=${mod.id}">
                    <img src="${mod.image}" alt="${mod.name}">
                    <h3>${mod.name}</h3>
                    <p>${mod.shortDesc}</p>
                </a>
            `;

            container.appendChild(card);
        });
    }

    // Функция для отображения детальной страницы мода
    function renderModDetail(mods) {
        if (!detailContainer) return;

        // Получаем ID мода из URL
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            detailContainer.innerHTML = `<p style="color: #ff6666;">❌ Мод не выбран.</p>`;
            return;
        }

        const mod = mods.find(m => m.id === id);

        if (!mod) {
            detailContainer.innerHTML = `<p style="color: #ff6666;">❌ Мод с ID "${id}" не найден.</p>`;
            return;
        }

        detailContainer.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <img src="${mod.image}" alt="${mod.name}" style="width: 100%; max-height: 350px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
                <h2 style="margin: 10px 0;">${mod.name}</h2>
                <p style="font-size: 1rem; line-height: 1.6; color: #ccc;">${mod.shortDesc}</p>
                <p style="margin: 15px 0;"><strong>Версия:</strong> ${mod.version || 'Не указана'}</p>
                <p style="margin-bottom: 25px; font-size: 0.9rem; color: #888;">
                    👤 Автор: ${mod.author || 'Не указан'}
                </p>
               <a href="${mod.download}" target="_blank" class="download-btn" style="display: inline-block; background: #6a9cff; color: #fff; padding: 14px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 1.1rem; transition: 0.3s; border: 2px solid #6a9cff;">
    ⬇️ Скачать мод
</a>
            </div>
        `;
    }

    // Загрузка данных из mods.json
    fetch('data/mods.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить список модов');
            }
            return response.json();
        })
        .then(mods => {
            renderMods(mods);
            renderModDetail(mods);
        })
        .catch(error => {
            // Показываем ошибку в том контейнере, который существует
            const target = container || detailContainer;
            if (target) {
                target.innerHTML = `<p style="color: #ff6666;">❌ Ошибка загрузки: ${error.message}</p>`;
            }
            console.error('Ошибка:', error);
        });
});
