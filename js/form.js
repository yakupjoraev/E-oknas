class Form
{
    constructor()
    {
        this.inputClearButtonSendRequest = this.formSendRequest.querySelectorAll('.js-input-clear');
        this.errorformSendRequest = document.querySelector('#js-form-send-request-message-error');
        this.errorformCustomWindows = document.querySelector('#js-form-custom-windows-message-error');
        $(this.inputPhone).mask('+7 (999) 999-99-99');
        this.addEvent();
    }

    addEvent()
    {
        this.formCustomWindow.addEventListener('submit', async (event) => {
            event.preventDefault();
            let data = await this.serializeObject(event.target);
            let checkError = await this.checkError(event.target, data, ['phone']);
            this.formCustomWindowSubmitter = event.submitter;
            if (checkError) {
                this.formCustomWindowSubmitter.disabled = true;
                data.form = 'formCustomWindow';
                this.ajax(data);
            }
        })
        this.formSendRequest.addEventListener('submit', async (event) => {
            event.preventDefault();
            let data = await this.serializeObject(event.target);
            let checkError = await this.checkError(event.target, data, ['name', 'phone', 'address', 'checkPersonalData']);
            this.formSendRequestSubmitter = event.submitter;
            if (checkError) {
                this.formSendRequestSubmitter.disabled = true;
                data.form = 'formSendRequest';
                this.ajax(data);
            }
        });
        this.inputClearButtonSendRequest.forEach((button) => {
            button.addEventListener('click', (event) => {
                let inputName = event.target.dataset.inputName;
                this.formSendRequest.querySelector('input[name="' + inputName + '"]').value = '';
            })
        })
    }

    async checkError(form, data, fields = [])
    {
        let result = true;
        fields.forEach((name) => {
            if (!data[name]) {
                form.querySelector('[name="' + name + '"]').classList.add('error');
                result = false;
            } else {
                form.querySelector('[name="' + name + '"]').classList.remove('error');
            }
        })
        return await result;
    }

    async serializeObject(form)
    {
        let result = {};
        let formData = new FormData(form);
        formData.forEach(function (value,name){
            result[name] = value;
        })
        return await result;
    }

    clearForm(form, nameFields = [])
    {
        let formFields = form.querySelectorAll('textarea, input');
        formFields.forEach((formField) => {
            if (nameFields.indexOf(formField.name) !== -1) {
                formField.value = '';
            }
        })
    }

    errorForm(form, condition, message = '')
    {
        let messageWrappers = form.querySelector('.message-error');
        if (condition === 'show') {
            messageWrappers.innerHTML = message;
            form.style.display = 'block'
        }
        if (condition === 'hide') {
            messageWrappers.innerHTML = '';
            form.style.display = 'none'
        }
    }

    ajax(data)
    {
        $.ajax({
            url: '/class/form.php',
            type: 'POST',
            dataType: 'json',
            data: data,
        }).done((response) => {
            if (response.form === 'formSendRequest') {
                $('#js-form-send-request').find('.custom__CAPTCHA').removeClass('error-v2');
                $('#js-form-send-request').find('input').parents('.modal-form__group').removeClass('error-v2');
                $('#js-form-send-request').find('textarea').parents('.modal-form__group').removeClass('error-v2');
                
                if (typeof response.message === 'object') {
                    if (response.message.CAPTCHA) {
                        $('#js-form-send-request').find('.custom__CAPTCHA').addClass('error-v2');
                    }

                    if (response.message.input) {
                        for (var key in response.message.input) {
                            $('#js-form-send-request').find('input[name="'+key+'"]').parents('.modal-form__group').addClass('error-v2');
                            $('#js-form-send-request').find('input[name="'+key+'"]').parents('.modal-form__group').find('.modal-form__error-text').text(response.message.input[key]);
                        }
                    }

                    if (response.message.textarea) {
                        for (var key in response.message.textarea) {
                            $('#js-form-send-request').find('textarea[name="'+key+'"]').parents('.modal-form__group').addClass('error-v2');
                            $('#js-form-send-request').find('textarea[name="'+key+'"]').parents('.modal-form__group').find('.modal-form__error-text').text(response.message.textarea[key]);
                        }
                    }
                }

                if (response.result) {
                    $.fancybox.close();
                    this.formSendRequestSubmitter.disabled = false;
                    this.errorForm(this.errorformSendRequest, 'hide');
                    this.clearForm(this.formSendRequest, ['name', 'phone', 'address', 'message']);
                } else {
                    this.formSendRequestSubmitter.disabled = false
                    if (typeof response.message != 'object') {
                        this.errorForm(this.errorformSendRequest, 'show', response.message);
                    }
                }
            }
            if (response.form === 'formCustomWindow') {
                $('#js-form-custom-window').find('.custom__CAPTCHA').removeClass('error-v2');
                if (typeof response.message === 'object') {
                    if (response.message.CAPTCHA) {
                        $('#js-form-custom-window').find('.custom__CAPTCHA').addClass('error-v2');
                    }
                }

                if (response.result) {
                    $.fancybox.close();
                    this.formCustomWindowSubmitter.disabled = false;
                    this.errorForm(this.errorformCustomWindows, 'hide');
                    this.clearForm(this.formCustomWindow, ['phone']);
                } else {
                    this.formCustomWindowSubmitter.disabled = false
                    this.errorForm(this.errorformCustomWindows, 'show', response.message);
                }
            }
        });
    }
}