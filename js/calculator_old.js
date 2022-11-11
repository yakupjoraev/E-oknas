class Calculator_old {
    constructor()
    {
        this.order = {};
        this.orders = {};
        this.contacts = [];
        this.addEvent();
        this.addRightSashDoor();
        this.checkWindowDimensions();
        this.initVariantsProductImg();
        this.initAddNewProduct();
        this.initDeliveryOptions();
        this.sendCalculator();
    }

    addEvent()
    {
        this.buttonNext.addEventListener('click', (event) => {
            event.preventDefault();
            let step = this.getActiveStep();
            switch (step.dataset.step) {
                case '1':
                    this.order['typeOfRoom'] = step.querySelector('input[name="typeOfRoom"]:checked').value;
                    this.setActiveStepNext(step);
                    break;
                case '2':
                    this.order['numberOfFlaps'] = step.querySelector('input[name="numberOfFlaps"]:checked').dataset.value;
                    this.setActiveStepNext(step);
                    break;
                case '3':
                    let getWindowSize = this.getWindowSize(step);
                    if (getWindowSize) {
                        this.order['windowSize'] = getWindowSize;
                        this.setActiveStepNext(step);
                    }
                    break;
                case '4-1':
                    this.order['product'] = [
                        {
                            step: '4-1',
                            type: 'sash',
                            name: step.querySelector('input[name="sash_4_1"]:checked').dataset.name,
                            value: step.querySelector('input[name="sash_4_1"]:checked').value
                        }
                    ]
                    this.setActiveStepNext(step);
                    break;
                case '4-2':
                    this.order['product'] = [
                        {
                            step: '4-2',
                            type: 'leftSash',
                            name: step.querySelector('input[name="leftSash_4_2"]:checked').dataset.name,
                            value: step.querySelector('input[name="leftSash_4_2"]:checked').value
                        },
                        {
                            step: '4-2',
                            type: 'rightSash',
                            name: step.querySelector('input[name="rightSash_4_2"]:checked').dataset.name,
                            value: step.querySelector('input[name="rightSash_4_2"]:checked').value,
                            grid: step.querySelector('input[name="rightSashGrid_4_2"]:checked') !== null ? step.querySelector('input[name="rightSashGrid_4_2"]:checked').value : 'false',
                            castle: step.querySelector('input[name="rightSashCastle_4_2"]:checked') !== null ? step.querySelector('input[name="rightSashCastle_4_2"]:checked').value : 'false',
                        }
                    ]
                    this.setActiveStepNext(step);
                    break;
                case '4-3':
                    this.order['product'] = [
                        {
                            step: '4-3',
                            type: 'leftSash',
                            name: step.querySelector('input[name="leftSash_4_3"]:checked').dataset.name,
                            value: step.querySelector('input[name="leftSash_4_3"]:checked').value
                        },
                        {
                            step: '4-3',
                            type: 'centerSash',
                            name: step.querySelector('input[name="centerSash_4_3"]:checked').dataset.name,
                            value: step.querySelector('input[name="centerSash_4_3"]:checked').value,
                            grid: step.querySelector('input[name="centerSashGrid_4_3"]:checked') !== null ? step.querySelector('input[name="centerSashGrid_4_3"]:checked').value : 'false',
                            castle: step.querySelector('input[name="centerSashCastle_4_3"]:checked') !== null ? step.querySelector('input[name="centerSashCastle_4_3"]:checked').value : 'false',
                        },
                        {
                            step: '4-3',
                            type: 'rightSash',
                            name: step.querySelector('input[name="rightSash_4_3"]:checked').dataset.name,
                            value: step.querySelector('input[name="rightSash_4_3"]:checked').value,
                            grid: step.querySelector('input[name="rightSashGrid_4_3"]:checked') !== null ? step.querySelector('input[name="rightSashGrid_4_3"]:checked').value : 'false',
                            castle: step.querySelector('input[name="rightSashCastle_4_3"]:checked') !== null ? step.querySelector('input[name="rightSashCastle_4_3"]:checked').value : 'false',
                        }
                    ]
                    this.setActiveStepNext(step);
                    break;
                case '4-4':
                    this.order['product'] = [
                        {
                            step: '4-4',
                            type: 'door',
                            name: step.querySelector('input[name="door_4_4"]:checked').dataset.name,
                            value: step.querySelector('input[name="door_4_4"]:checked').value
                        },
                        {
                            step: '4-4',
                            type: 'leftSash',
                            name: step.querySelector('input[name="leftSash_4_4"]:checked').dataset.name,
                            value: step.querySelector('input[name="leftSash_4_4"]:checked').value
                        },
                    ]
                    if (this.calculator.querySelector('#js-right-sash-4-4').dataset.active === 'true') {
                        this.order['product'].push({
                            step: '4-4',
                            type: 'rightSash',
                            name: step.querySelector('input[name="rightSash_4_4"]:checked').dataset.name,
                            value: step.querySelector('input[name="rightSash_4_4"]:checked').value,
                            grid: step.querySelector('input[name="rightSashGrid_4_4"]:checked') !== null ? step.querySelector('input[name="rightSashGrid_4_4"]:checked').value : 'false',
                            castle: step.querySelector('input[name="rightSashCastle_4_4"]:checked') !== null ? step.querySelector('input[name="rightSashCastle_4_4"]:checked').value : 'false',
                        })
                    }
                    this.setActiveStepNext(step);
                    break;
                case '5':
                    let windowsill = step.querySelector('input[name="windowsill"]:checked');
                    let slopes = step.querySelector('input[name="slopes"]:checked');
                    let lowTide = step.querySelector('input[name="lowTide"]:checked');
                    this.order['complects'] = [];
                    if (windowsill !== null) {
                        this.order['complects']['windowsill'] = windowsill.value;
                    }
                    if (slopes !== null) {
                        this.order['complects']['slopes'] = slopes.value;
                    }
                    if (lowTide !== null) {
                        this.order['complects']['lowTide'] = lowTide.value;
                    }
                    this.setActiveStepNext(step);
                    break;
                case '6':
                    let soundInsulation = step.querySelector('input[name="soundInsulation"]:checked');
                    let heatSaving = step.querySelector('input[name="heatSaving"]:checked');
                    let sunProtection = step.querySelector('input[name="sunProtection"]:checked');
                    let microVentilation = step.querySelector('input[name="microVentilation"]:checked');
                    let antiBurglary = step.querySelector('input[name="antiBurglary"]:checked');
                    let lightTransmission = step.querySelector('input[name="lightTransmission"]:checked');
                    let lamination = step.querySelector('input[name="lamination"]:checked');
                    this.order['parameters'] = [];
                    if (soundInsulation !== null) {
                        this.order['parameters']['soundInsulation'] = soundInsulation.value;
                    }
                    if (heatSaving !== null) {
                        this.order['parameters']['heatSaving'] = heatSaving.value;
                    }
                    if (sunProtection !== null) {
                        this.order['parameters']['sunProtection'] = sunProtection.value;
                    }
                    if (microVentilation !== null) {
                        this.order['parameters']['microVentilation'] = microVentilation.value;
                    }
                    if (antiBurglary !== null) {
                        this.order['parameters']['antiBurglary'] = antiBurglary.value;
                    }
                    if (lightTransmission !== null) {
                        this.order['parameters']['lightTransmission'] = lightTransmission.value;
                    }
                    if (lamination !== null) {
                        this.order['parameters']['lamination'] = lamination.value;
                    }
                    this.order['windowImg'] = this.getWindowImgResult();
                    if (Object.keys(this.order).length > 0) {
                        this.orders[Object.keys(this.orders).length] = this.order
                        this.order = {};
                        this.calculator.querySelector('#js-order-6').innerHTML = this.renderProductCard(this.orders);
                    }
                    this.buttonPrew.disabled = true;
                    this.setActiveStepNext(step);
                    break;
                case '7':
                    this.buttonPrew.disabled = false;
                    this.setActiveStepNext(step);
                    break;
                case '8':
                    let delivery = step.querySelector('input[name="delivery"]:checked');
                    let montage = step.querySelector('input[name="montage"]:checked');
                    let address = step.querySelector('input[name="address"]');
                    if (delivery.value === 'Другое') {
                        if (address.value === '') {
                            this.addError([
                                address
                            ])
                        } else {
                            this.removeError([
                                address
                            ])
                            this.contacts['delivery'] = address.value;
                            this.contacts['montage'] = montage.value;
                            this.calculator.querySelector('#js-order-9').innerHTML = this.renderProductCard(this.orders);
                            this.calculator.querySelector('#js-delivery-9').innerHTML = this.contacts['delivery'];
                            this.calculator.querySelector('#js-montage-9').innerHTML = this.contacts['montage'];
                            this.buttonNext.style.display = 'none';
                            this.setActiveStepNext(step);
                        }
                    } else {
                        this.removeError([
                            address
                        ])
                        this.contacts['delivery'] = delivery.value;
                        this.contacts['montage'] = montage.value;
                        this.calculator.querySelector('#js-order-9').innerHTML = this.renderProductCard(this.orders);
                        this.calculator.querySelector('#js-delivery-9').innerHTML = this.contacts['delivery'];
                        this.calculator.querySelector('#js-montage-9').innerHTML = this.contacts['montage'];
                        this.buttonNext.style.display = 'none';
                        this.setActiveStepNext(step);
                    }
                    break;
                case '9':
                    break;
                default:
                    console.log('buttonNext end');
                    break;
            }
        });
        this.buttonPrew.addEventListener('click', (event) => {
            event.preventDefault();
            let step = this.getActiveStep();
            switch (step.dataset.stepPrew) {
                case '1':
                    this.setActiveStepPrew(step);
                    break;
                case '2':
                    this.setActiveStepPrew(step);
                    break;
                case '3':
                    this.setActiveStepPrew(step);
                    break;
                case '5':
                    this.setActiveStepPrew(step);
                    break;
                case '6':
                    this.setActiveStepPrew(step);
                    break;
                case '7':
                    this.buttonPrew.disabled = true;
                    this.setActiveStepPrew(step);
                    break;
                case '8':
                    this.buttonNext.style.display = '';
                    this.setActiveStepPrew(step);
                    break;
                default:
                    console.log('buttonPrew end');
                    break;
            }
        });
    }

    sendCalculator()
    {
        this.calculator.querySelector('#js-form-calc-result').addEventListener('submit', (event) => {
            event.preventDefault();
            let phone = event.target.querySelector('input[name="phone"]');
            if (phone.value === '') {
                this.addError([
                    phone
                ])
            } else {
                this.removeError([
                    phone
                ])
                this.ajax({
                    phone: phone.value,
                    form: 'formCalculator',
                    delivery: this.contacts['delivery'],
                    montage: this.contacts['montage'],
                    orders: JSON.stringify(this.orders)
                });
            }
        })
    }

    initDeliveryOptions()
    {
        this.calculator.querySelector('div[data-step="8"]').querySelectorAll('input').forEach((input) => {
            input.addEventListener('change', (event) => {
                event.preventDefault();
                let address = this.calculator.querySelector('#js-delivery-option').querySelector('input[name="address"]');
                if (event.target.value === 'Другое' || event.target.name === 'address') {
                    address.disabled = false;
                } else {
                    address.disabled = true;
                }
            });
        })
    }

    initAddNewProduct()
    {
        this.calculator.querySelector('#js-add-button-new-product').addEventListener('click', (event) => {
            this.calculator.querySelector('.active').classList.remove('active');
            this.calculator.querySelector('div[data-step="1"]').classList.add('active');
            this.buttonPrew.disabled = false;
        })
    }

    renderProductCard(data = [])
    {
        let template = '';
        for (let key1 in data) {
            let accessories = '';
            data[key1]['product'].forEach(function (product) {
                accessories += product['name'] + ': ';
                if (product['castle'] && product['castle'] !== 'false') {
                    accessories += product['castle'] + ', ';
                }
                if (product['grid'] && product['grid'] !== 'false') {
                    accessories += product['grid'] + ', ';
                }
                accessories += '<br>';
            })
            let complects = '';
            for (let key2 in data[key1]['complects']) {
                complects += data[key1]['complects'][key2] + ', ';
            }
            let parameters = '';
            for (let key3 in data[key1]['parameters']) {
                parameters += data[key1]['parameters'][key3] + ', ';
            }
            template += `
            <div class="wiew-options">
                <div class="wiew-options__info">
                    <div class="wiew-options__ordering">
                        <ul class="wiew-options__list">
                            <li class="wiew-options__item">
                                <p class="wiew-options__text">
                                    Параметры изделия:
                                </p>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Количество створок
                                </p>
                                <p class="wiew-options__text">
                                    ${data[key1]['numberOfFlaps']}
                                </p>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Размеры окна, мм
                                </p>
                                <p class="wiew-options__text">
                                    ${data[key1]['windowSize']['noSize'] ? data[key1]['windowSize']['noSize'] : data[key1]['windowSize']['height'] + '.mm' + ' x ' + data[key1]['windowSize']['width'] + '.mm'}
                                </p>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Аксессуары
                                </p>
                                <p class="wiew-options__text">
                                    ${accessories}
                                </p>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Комплектующие:
                                </p>
                                <p class="wiew-options__text">
                                    ${complects}
                                </p>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Дополнительные параметры:
                                </p>
                                <p class="wiew-options__text">
                                    ${parameters}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="wiew-options__img">
                    <img src="${data[key1]['windowImg']}" alt="${data[key1]['numberOfFlaps']}">
                </div>
            </div>
            `;
        }
        return template;
    }

    getWindowImgResult()
    {
        let filterParams = {};
        this.order['product'].forEach((params) => {
            if (params['type'] === 'sash') {
                filterParams.sash = params.value;
            }
            if (params['type'] === 'door') {
                filterParams.door = params.value;
            }
            if (params['type'] === 'leftSash') {
                filterParams.leftSash = params.value;
            }
            if (params['type'] === 'centerSash') {
                filterParams.centerSash = params.value;
            }
            if (params['type'] === 'rightSash') {
                filterParams.rightSash = params.value;
            }
        })
        if (this.order['numberOfFlaps'] === 'Одностворчатое окно') {
            if (filterParams['sash'] === 'Глухая') {
                return 'img/calc/step-4-1.png'
            }
            if (filterParams['sash'] === 'Поворотная') {
                return 'img/calc/step-4-2.png'
            }
            if (filterParams['sash'] === 'Поворотно-откидная') {
                return 'img/calc/step-4-3.png'
            }
        }
        if (this.order['numberOfFlaps'] === 'Двухстворчатое окно') {
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/1-1.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/1-2.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/1-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/2-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/2-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/2-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/3-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/3-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/3-3.png'
            }
        }
        if (this.order['numberOfFlaps'] === 'Трехстворчатое окно') {
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-1-1-1.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-1-1-2.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-1-1-3.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-1-2-1.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-1-2-2.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-1-2-3.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-1-3-1.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-1-3-2.png'
            }
            if (filterParams['leftSash'] === 'Глухая'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-1-3-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-2-1-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-2-1-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-2-1-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-2-2-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-2-2-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-2-2-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-2-3-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-2-3-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотная'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-2-3-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-3-1-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-3-1-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Глухая'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-3-1-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-3-2-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-3-2-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Поворотная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-3-2-3.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Глухая'
            ) {
                return 'img/calc/4-3-3-1.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/4-3-3-2.png'
            }
            if (filterParams['leftSash'] === 'Поворотно-откидная'
                && filterParams['centerSash'] === 'Поворотно-откидная'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/4-3-3-3.png'
            }
        }
        if (this.order['numberOfFlaps'] === 'Балконный блок') {
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'Глухое'
                && !filterParams['rightSash']
            ) {
                return 'img/calc/5-1-1.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'Глухое'
                && !filterParams['rightSash']
            ) {
                return 'img/calc/5-2-1.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'С поворотной створкой'
                && !filterParams['rightSash']
            ) {
                return 'img/calc/5-1-2.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'С поворотно-откидной створкой'
                && !filterParams['rightSash']
            ) {
                return 'img/calc/5-1-3.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'С поворотной створкой'
                && !filterParams['rightSash']
            ) {
                return 'img/calc/5-2-2.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'С поворотно-откидной створкой'
                && !filterParams['rightSash']
            ) {
                return 'img/calc/5-2-3.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/5-1-1-1.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/5-1-1-2.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/5-2-1-1.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/5-2-1-2.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/6-1-1-1.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/6-1-1-2.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/6-2-1-1.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'Глухое'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/6-2-1-2.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'С поворотной створкой'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/6-1-2-1.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'С поворотно-откидной створкой'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/6-1-3-1.png'
            }
            if (filterParams['door'] === 'Поворотная'
                && filterParams['leftSash'] === 'С поворотно-откидной створкой'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/6-1-3-2.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'С поворотной створкой'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/6-2-2-1.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'С поворотной створкой'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/6-2-2-2.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'С поворотно-откидной створкой'
                && filterParams['rightSash'] === 'Поворотная'
            ) {
                return 'img/calc/6-2-3-1.png'
            }
            if (filterParams['door'] === 'Поворотно-откидная'
                && filterParams['leftSash'] === 'С поворотно-откидной створкой'
                && filterParams['rightSash'] === 'Поворотно-откидная'
            ) {
                return 'img/calc/6-2-3-2.png'
            }
        }
    }

    addRightSashDoor()
    {
        this.calculator.querySelector('#js-add-button-right-sash-4-4').addEventListener('click', () => {
            let rightSash = this.calculator.querySelector('#js-right-sash-4-4');
            if (rightSash.dataset.active === 'false') {
                rightSash.style.display = 'block';
                rightSash.dataset.active = 'true';
            }
        });
        this.calculator.querySelector('#js-delete-button-right-sash-4-4').addEventListener('click', () => {
            let rightSash = this.calculator.querySelector('#js-right-sash-4-4');
            if (rightSash.dataset.active === 'true') {
                rightSash.style.display = 'none';
                rightSash.dataset.active = 'false';
            }
        })
    }

    initVariantsProductImg()
    {
        this.calculator.querySelector('div[data-step="4-1"]').querySelectorAll('input[name="sash_4_1"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-1"]').querySelector('img[data-img-name="sash_4_1"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-2"]').querySelectorAll('input[name="leftSash_4_2"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-2"]').querySelector('img[data-img-name="leftSash_4_2"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-2"]').querySelectorAll('input[name="rightSash_4_2"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-2"]').querySelector('img[data-img-name="rightSash_4_2"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-3"]').querySelectorAll('input[name="leftSash_4_3"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-3"]').querySelector('img[data-img-name="leftSash_4_3"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-3"]').querySelectorAll('input[name="centerSash_4_3"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-3"]').querySelector('img[data-img-name="centerSash_4_3"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-3"]').querySelectorAll('input[name="rightSash_4_3"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-3"]').querySelector('img[data-img-name="rightSash_4_3"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-4"]').querySelectorAll('input[name="door_4_4"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-4"]').querySelector('img[data-img-name="door_4_4"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-4"]').querySelectorAll('input[name="leftSash_4_4"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-4"]').querySelector('img[data-img-name="leftSash_4_4"]').src = event.target.dataset.img;
            })
        })
        this.calculator.querySelector('div[data-step="4-4"]').querySelectorAll('input[name="rightSash_4_4"]').forEach((input) => {
            input.addEventListener('click', (event) => {
                this.calculator.querySelector('div[data-step="4-4"]').querySelector('img[data-img-name="rightSash_4_4"]').src = event.target.dataset.img;
            })
        })
    }

    checkWindowDimensions()
    {
        this.calculator.querySelector('input[name="windowDimensionsNone"]').addEventListener('click', (event) => {
            let windowHeight = this.calculator.querySelector('input[name="windowHeight"]');
            let windowWidth = this.calculator.querySelector('input[name="windowWidth"]');
            if (event.target.checked === true) {
                windowHeight.value = '';
                windowHeight.disabled = true;
                windowWidth.value = '';
                windowWidth.disabled = true;
            } else {
                windowHeight.disabled = false;
                windowWidth.disabled = false;
            }
        });
    }

    getWindowSize(step)
    {
        let windowDimensionsNone = step.querySelector('input[name="windowDimensionsNone"]');
        let windowHeight = step.querySelector('input[name="windowHeight"]');
        let windowWidth = step.querySelector('input[name="windowWidth"]');
        if (windowHeight.value === '' && windowWidth.value === '' && windowDimensionsNone.checked === false) {
            this.addError([
                windowHeight,
                windowWidth,
                windowDimensionsNone
            ]);
            return false;
        } else if (windowHeight.value === '' && windowDimensionsNone.checked === false ) {
            this.addError([
                windowHeight,
            ]);
            this.removeError([
                windowWidth,
                windowDimensionsNone
            ]);
            return false;
        } else if (windowWidth.value === '' && windowDimensionsNone.checked === false ) {
            this.addError([
                windowWidth,
            ]);
            this.removeError([
                windowHeight,
                windowDimensionsNone
            ]);
            return false;
        } else if (windowDimensionsNone.checked === true) {
            this.removeError([
                windowHeight,
                windowWidth,
                windowDimensionsNone
            ]);
            windowHeight.value = '';
            windowWidth.value = '';
            return {
                noSize: windowDimensionsNone.value
            };
        } else {
            this.removeError([
                windowHeight,
                windowWidth,
                windowDimensionsNone
            ]);
            return {
                height: windowHeight.value,
                width: windowWidth.value
            }
        }
    }

    addError(input = [])
    {
        input.forEach(function (value) {
            value.classList.add('error');
        })
    }

    removeError(input = [])
    {
        input.forEach(function (value) {
            value.classList.remove('error');
        })
    }

    getActiveStep()
    {
        return this.calculator.querySelector('.active');
    }

    setActiveStepPrew(step)
    {
        step.classList.remove('active');
        if (step.dataset.stepPrew !== 'false') {
            this.calculator.querySelector('div[data-step="' + step.dataset.stepPrew + '"]').classList.add('active');
        }
        this.scrollCalculator();
    }

    setActiveStepNext(step)
    {
        step.classList.remove('active');
        if (step.dataset.stepNext === "variants") {
            let variants = this.calculator.querySelector('input[name="numberOfFlaps"]:checked').value;
            this.calculator.querySelector('div[data-step="' + variants + '"]').classList.add('active');
        } else if (step.dataset.stepNext !== 'false') {
            this.calculator.querySelector('div[data-step="' + step.dataset.stepNext + '"]').classList.add('active');
        }
        this.scrollCalculator();
    }

    scrollCalculator()
    {
        $('html, body').stop().animate({
            scrollTop: $('#calc').offset().top - 60
        }, 200);
    }

    ajax(data)
    {
        $.ajax({
            url: '/class/form.php',
            type: 'POST',
            dataType: 'json',
            data: data,
        }).done((response) => {

            console.log(JSON.parse(response.result.orders))

            /*
            if (response.form === 'formCalculator') {
                let message = document.querySelector('#calculator-result-modal').querySelector('.calculator-message');
                if (response.result) {
                    message.innerHTML = 'Ваша заявка принята наш менеджер свяжется с вами в ближайшее время.'
                    $.fancybox.open({
                        src: '#calculator-result-modal',
                        type: 'inline'
                    });
                    setTimeout(function (){
                        $.fancybox.close();
                    }, 2000)
                } else {
                    this.buttonCalcResult.disabled = false;
                    message.innerHTML = response.message;
                    $.fancybox.open({
                        src: '#calculator-result-modal',
                        type: 'inline'
                    });
                }
            }

             */
        });
    }
}