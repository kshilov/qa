     /* Скрипт обслуживаения отправки email */
     /*
    Пример вызова:
     
    subscribeAjax(input, submit, config, data)
    input - поле ввода
    submit - поле сабмит
    config - конфигурация для AJAX
    data - JSON по умолчанию (перезаписывается ключ email)
     
    new subscribeAjax(
        $(".subscribe-wrapper").find('input[type=text]'), // INPUT
        $(".subscribe-wrapper").find('input[type=submit]'), // SUBMIT BUTTON
        {
             url: '' // Url для Ajax
        },
        {
            "id": 7,
            "merge_vars": {
                "groupings": [
                    {
                        "name": "subscribe_source",
                        "groups": [
                            "notrit_main"
                        ]
                    }
                ],
            }
       }
    );
    */
     
    var subscribeAjax = function(name, input, submit, config, data) {
     
        this.active = {
            name: name,
            input: input,
            submit: submit
        };
        this.config = $.extend({
            url: '/',
            success: function() { alert('Отправлено'); },
            validReg: {
                email: /^[-a-zа-я0-9!#$%&'*+\/=?^_`{|}~]+(\.[-a-zа-я0-9!#$%&'*+\/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i
            }
        }, config || {});
        this.data = $.extend({
            "apikey": 0,
            "__lid": 0, //здесь будет ID листа подписки
            "email": "",
            "name": "",
            "merge_vars": {
                "groupings": [
                    {
                        "name": "subscribe_source",
                        "groups": [
                            "notrit_main"
                        ]
                    }
                ],
            },
            "double_optin": true,
            "update_existing": true,
            "replace_interests": false,
            "send_welcome": true
        }, data || {});
        this.init = function() {
            var that = this;
            // Binds
            $(this.active.submit).click(function() {
               
                that.submit();
            });
        };
        this.submit = function() {
            // Validate
            var email = $(this.active.input).val();
            if (!this.config.validReg.email.test(email)) {
                this.alert(); return false;
            } else {
                 this.unalert();
            }
            var name = "";
            if (this.active.name != null && this.active.name != ""){
                    name = $(this.active.name).val();
            }
           
            // Prepare
            var data = $.extend(this.data, {
                'email': email,
                'name': name,
            });
     
            var that = this;
            // Ajax send
         
            var options = {
                url: this.config.url,
                type: 'post',
                data: data,
                dataType: 'json',
                cache: false,
                error: function(response) {
                    if ("function" == typeof that.config.error) that.config.error.call(that, response); else alert('Ошибка сервера');
                },
                success: function(response) {
                    if ("function" == typeof that.config.success) that.config.success.call(that, response);
                }
            };
         
            // jQuery ajax
            $.ajax(options);
        };
         this.alert = function() {
        $(this.active.input).css({
                background: "#ffdada"
            });
        };
        this.unalert = function() {
            $(this.active.input).css({
                background: ""
            });
            $('#name').val('');
            $('#email').val('');
            $('#subscribe-success').text('Спасибо, а теперь проверьте вашу почту!');
            $('#subscribe-success').show();
        };
        this.init();
    };