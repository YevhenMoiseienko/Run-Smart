$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        centerMode: true,
        variableWidth: true,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/previous.png" alt="#"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/next.png" alt="#"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this)
            .index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function () {
       $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    function validate(item) {
        $(item).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                name: {
                    required: "Введите Ваше имя",
                    minlength: jQuery.validator.format("Необходимо ввести минимум {0} символа")
                },
                phone: "Введите Ваш номер телефона",
                email: {
                    required: "Введите Вашу почту",
                    email: "Неверный адрес почты"
                }
            }
        });
    }

    validate('#consultation-form');
    validate('#consultation form');
    validate('#order form');

    $('input[name=phone]').mask("+38(999) 999-99-99");

    $('form').submit(function (e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
           $(this).find("input").val("");
           $('#consultation, #order').fadeOut();
           $('.overlay, #thanks').fadeIn('slow');
           $('form').trigger('reset');
        });
        return false;
    });
});