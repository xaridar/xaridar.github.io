const toggleDark = () => {
    const darkMode =
        (
            !localStorage.getItem('darkMode') &&
            window.matchMedia?.('(prefers-color-scheme: dark)')
        ).matches || localStorage.getItem('darkMode') === 'dark';
    $('body').toggleClass('dark', darkMode);
    $('#darkToggle').prop('checked', darkMode);

    $('.sun-logo').toggleClass('animate-sun', !darkMode);
    $('.moon-logo').toggleClass('animate-moon', !darkMode);
};
let maxNavLen;
let toggleLen;
$(document).ready(() => {
    maxNavLen =
        $('#nav > ul').width() +
        +$('#nav > ul').css('padding-left').split(/\D/)[0] +
        +$('#nav > ul').css('padding-right').split(/\D/)[0];
    toggleLen =
        +$('#nav > ul').css('padding-right').split(/\D/)[0] +
        $('#nav > label').width() +
        2 * +$('#nav > label').css('margin-right').split(/\D/)[0];
    if ($(window).width() < 500) {
        $('html').addClass('mobile');
    }
    toggleDark();
    windowSize();
    setTimeout(() => {
        $('.transition-colors, .transition-color, .hasSpans span').addClass(
            'duration-500'
        );
    }, 500);
    $(window).resize(function (e) {
        windowSize();
    });
    addEventListener('storage', toggleDark);
    $('#darkToggle').on('click', function () {
        localStorage.setItem(
            'darkMode',
            $(this).prop('checked') ? 'dark' : 'light'
        );
        toggleDark();
    });
    let toggleChecked = $('#darkToggle').prop('checked');
    $(document).on('keydown', '#darkToggle + button', function (e) {
        console.log(e.key);
        if (e.key !== 'Enter' && e.key !== ' ') return;
        toggleChecked = !toggleChecked;
        localStorage.setItem('darkMode', toggleChecked ? 'dark' : 'light');
        toggleDark();
    });
    $(document).on('click', (e) => {
        if (e.target.id === 'contactToggle') showContact();
        else showContact(false);
    });
    $('.hamburger').on('click', function () {
        $(this).next().css('transition', 'transform 500ms ease-in-out');
        $(this).next().toggleClass('show');
        $(this).first().first().toggleClass('is-active');
        if ($(this).next().hasClass('show'))
            $('nav > ul > a').prop('tabindex', '0');
        else $('#nav > ul > a').prop('tabindex', '-1');
    });
});
const showContact = (show = undefined) => {
    $('#contact').toggleClass(
        'opacity-0 pointer-events-none',
        show === undefined ? undefined : !show
    );
    $('#contact').toggleClass('opacity-1 pointer-events-auto', show);
};
const windowSize = () => {
    if (maxNavLen > $(window).width()) {
        $('#nav > ul > a').prop('tabindex', '-1');
        $('html').addClass('mobile');
        $('body').addClass('dark-fab');
    } else {
        $('#nav > ul > a').prop('tabindex', '0');
        $('html').removeClass('mobile');
        if (toggleLen + maxNavLen > $(window).width()) {
            $('body').addClass('dark-fab');
        } else {
            $('body').removeClass('dark-fab');
        }
    }
};
