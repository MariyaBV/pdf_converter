jQuery(document).ready(function ($) {
    // Валидация email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    // Обработка отправки формы
    $('#message-contact').on('submit', function (e) {
        e.preventDefault();

        const email = $('input[name="email"]').val().trim();
        const recaptcha = grecaptcha.getResponse();

        const lang = document.documentElement.lang;
        const messages = {
            en: {
                fill: "Please enter a valid email.",
                captcha: "Please confirm you are not a robot."
            },
            ru: {
                fill: "Пожалуйста, введите корректные email и телефон.",
                captcha: "Пожалуйста, подтвердите, что вы не робот."
            },
        };
        const msg = messages[lang] || messages['en'];

        // Проверки
        if (!email || !phone || !isValidEmail(email)) {
            e.preventDefault();
            alert(msg.fill);
            return false;
        }

        if (recaptcha.length === 0) {
            e.preventDefault();
            alert(msg.captcha);
            return false;
        }

        // Если всё ок то форма отправляется обычным POST на сервер
    });

});