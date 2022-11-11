class Calculator {
    constructor()
    {
        this.order = {};
        this.orders = {};
        this.contacts = [];
        this.addEvent();
        this.addRightSashDoor();
        this.initVariantsProductImg();
        this.initAddNewProduct();
        this.initDeliveryOptions();
        this.checkWindowDimensions();
        this.sendCalculator();
        this.showAdditionalAccessories();
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
                            value: step.querySelector('input[name="sash_4_1"]:checked').value,
                            grid: step.querySelector('input[name="sashGrid_4_1"]:checked') !== null ? step.querySelector('input[name="sashGrid_4_1"]:checked').value : 'false',
                            castle: step.querySelector('input[name="sashCastle_4_1"]:checked') !== null ? step.querySelector('input[name="sashCastle_4_1"]:checked').value : 'false',
                        }
                    ]
                    this.order['windowImg'] = step.querySelector('#step_4_1').src;
                    this.setActiveStepNext(step);
                    break;
                case '4-2':
                    this.order['product'] = [
                        {
                            step: '4-2',
                            type: 'leftSash',
                            name: step.querySelector('input[name="leftSash_4_2"]:checked').dataset.name,
                            value: step.querySelector('input[name="leftSash_4_2"]:checked').value,
                            grid: step.querySelector('input[name="leftSashGrid_4_2"]:checked') !== null ? step.querySelector('input[name="leftSashGrid_4_2"]:checked').value : 'false',
                            castle: step.querySelector('input[name="leftSashCastle_4_2"]:checked') !== null ? step.querySelector('input[name="leftSashCastle_4_2"]:checked').value : 'false',
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
                    this.order['windowImg'] = step.querySelector('#step_4_2').src;
                    this.setActiveStepNext(step);
                    break;
                case '4-3':
                    this.order['product'] = [
                        {
                            step: '4-3',
                            type: 'leftSash',
                            name: step.querySelector('input[name="leftSash_4_3"]:checked').dataset.name,
                            value: step.querySelector('input[name="leftSash_4_3"]:checked').value,
                            grid: step.querySelector('input[name="leftSashGrid_4_3"]:checked') !== null ? step.querySelector('input[name="leftSashGrid_4_3"]:checked').value : 'false',
                            castle: step.querySelector('input[name="leftSashCastle_4_3"]:checked') !== null ? step.querySelector('input[name="leftSashCastle_4_3"]:checked').value : 'false',
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
                    this.order['windowImg'] = step.querySelector('#step_4_3').src;
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
                            value: step.querySelector('input[name="leftSash_4_4"]:checked').value,
                            grid: step.querySelector('input[name="leftSashGrid_4_4"]:checked') !== null ? step.querySelector('input[name="leftSashGrid_4_4"]:checked').value : 'false',
                            castle: step.querySelector('input[name="leftSashCastle_4_4"]:checked') !== null ? step.querySelector('input[name="leftSashCastle_4_4"]:checked').value : 'false',
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
                    this.order['windowImg'] = step.querySelector('#step_4_4').src;
                    this.setActiveStepNext(step);
                    break;
                case '5':
                    let windowsill = step.querySelector('input[name="windowsill"]:checked');
                    let slopes = step.querySelector('input[name="slopes"]:checked');
                    let lowTide = step.querySelector('input[name="lowTide"]:checked');
                    this.order['complects'] = {};
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
let multiPackage = step.querySelector('input[name="multiPackage"]:checked');
let designWindows = step.querySelector('input[name="designWindows"]:checked');
                    this.order['parameters'] = {};
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
		    if (lamination !== null) {
                        this.order['parameters']['multiPackage'] = multiPackage.value;
                    }
		    if (lamination !== null) {
                        this.order['parameters']['designWindows'] = designWindows.value;
                    }
                    if (Object.keys(this.order).length > 0) {
                        this.orders[Object.keys(this.orders).length] = this.order
                        this.order = {};
                        this.calculator.querySelector('#js-order-6').innerHTML = this.renderProductCard(this.orders);
                        this.addCounterProduct();
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
                            this.addCounterProduct();
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
                        this.addCounterProduct();
                        this.calculator.querySelector('#js-delivery-9').innerHTML = this.contacts['delivery'];
                        this.calculator.querySelector('#js-montage-9').innerHTML = this.contacts['montage'];
                        this.buttonNext.style.display = 'none';
                        this.setActiveStepNext(step);
                    }
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
                case '4':
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

    showAdditionalAccessories()
    {
        this.calculator.querySelectorAll('input[name="sash_4_1"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesSash_4_1 = this.calculator.querySelector('#accessoriesSash_4_1');
                if (event.target.value === 'Глухая') {
                    accessoriesSash_4_1.style.display = 'none';
                    accessoriesSash_4_1.dataset.active = 'false';
                    accessoriesSash_4_1.querySelector('input[name="sashGrid_4_1"]').checked = false
                    accessoriesSash_4_1.querySelector('input[name="sashCastle_4_1"]').checked = false
                } else {
                    accessoriesSash_4_1.style.display = 'block';
                    accessoriesSash_4_1.dataset.active = 'true';
                }
            })
        });
        this.calculator.querySelectorAll('input[name="leftSash_4_2"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesleftSash_4_2 = this.calculator.querySelector('#accessoriesleftSash_4_2');
                if (event.target.value === 'Глухая') {
                    accessoriesleftSash_4_2.style.display = 'none';
                    accessoriesleftSash_4_2.dataset.active = 'false';
                    accessoriesleftSash_4_2.querySelector('input[name="leftSashGrid_4_2"]').checked = false
                    accessoriesleftSash_4_2.querySelector('input[name="leftSashCastle_4_2"]').checked = false
                } else {
                    accessoriesleftSash_4_2.style.display = 'block';
                    accessoriesleftSash_4_2.dataset.active = 'true';
                }
            })
        });
        this.calculator.querySelectorAll('input[name="rightSash_4_2"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesRightSash_4_2 = this.calculator.querySelector('#accessoriesRightSash_4_2');
                if (event.target.value === 'Глухая') {
                    accessoriesRightSash_4_2.style.display = 'none';
                    accessoriesRightSash_4_2.dataset.active = 'false';
                    accessoriesRightSash_4_2.querySelector('input[name="rightSashGrid_4_2"]').checked = false
                    accessoriesRightSash_4_2.querySelector('input[name="rightSashCastle_4_2"]').checked = false
                } else {
                    accessoriesRightSash_4_2.style.display = 'block';
                    accessoriesRightSash_4_2.dataset.active = 'true';
                }
            })
        });
        this.calculator.querySelectorAll('input[name="leftSash_4_3"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesLeftSash_4_3 = this.calculator.querySelector('#accessoriesLeftSash_4_3');
                if (event.target.value === 'Глухая') {
                    accessoriesLeftSash_4_3.style.display = 'none';
                    accessoriesLeftSash_4_3.dataset.active = 'false';
                    accessoriesLeftSash_4_3.querySelector('input[name="leftSashGrid_4_3"]').checked = false
                    accessoriesLeftSash_4_3.querySelector('input[name="leftSashCastle_4_3"]').checked = false
                } else {
                    accessoriesLeftSash_4_3.style.display = 'block';
                    accessoriesLeftSash_4_3.dataset.active = 'true';
                }
            })
        });
        this.calculator.querySelectorAll('input[name="centerSash_4_3"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesCenterSash_4_3 = this.calculator.querySelector('#accessoriesCenterSash_4_3');
                if (event.target.value === 'Глухая') {
                    accessoriesCenterSash_4_3.style.display = 'none';
                    accessoriesCenterSash_4_3.dataset.active = 'false';
                    accessoriesCenterSash_4_3.querySelector('input[name="centerSashGrid_4_3"]').checked = false
                    accessoriesCenterSash_4_3.querySelector('input[name="centerSashCastle_4_3"]').checked = false
                } else {
                    accessoriesCenterSash_4_3.style.display = 'block';
                    accessoriesCenterSash_4_3.dataset.active = 'true';
                }
            })
        });
        this.calculator.querySelectorAll('input[name="rightSash_4_3"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesRightSash_4_3 = this.calculator.querySelector('#accessoriesRightSash_4_3');
                if (event.target.value === 'Глухая') {
                    accessoriesRightSash_4_3.style.display = 'none';
                    accessoriesRightSash_4_3.dataset.active = 'false';
                    accessoriesRightSash_4_3.querySelector('input[name="rightSashGrid_4_3"]').checked = false
                    accessoriesRightSash_4_3.querySelector('input[name="rightSashCastle_4_3"]').checked = false
                } else {
                    accessoriesRightSash_4_3.style.display = 'block';
                    accessoriesRightSash_4_3.dataset.active = 'true';
                }
            })
        });
        this.calculator.querySelectorAll('input[name="leftSash_4_4"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesLeftSash_4_4 = this.calculator.querySelector('#accessoriesLeftSash_4_4');
                if (event.target.value === 'Глухая') {
                    accessoriesLeftSash_4_4.style.display = 'none';
                    accessoriesLeftSash_4_4.dataset.active = 'false';
                    accessoriesLeftSash_4_4.querySelector('input[name="leftSashGrid_4_4"]').checked = false
                    accessoriesLeftSash_4_4.querySelector('input[name="leftSashCastle_4_4"]').checked = false
                } else {
                    accessoriesLeftSash_4_4.style.display = 'block';
                    accessoriesLeftSash_4_4.dataset.active = 'true';
                }
            })
        });
        this.calculator.querySelectorAll('input[name="rightSash_4_4"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                let accessoriesRightSash_4_4 = this.calculator.querySelector('#accessoriesRightSash_4_4');
                if (event.target.value === 'Глухая') {
                    accessoriesRightSash_4_4.style.display = 'none';
                    accessoriesRightSash_4_4.dataset.active = 'false';
                    accessoriesRightSash_4_4.querySelector('input[name="rightSashGrid_4_4"]').checked = false
                    accessoriesRightSash_4_4.querySelector('input[name="rightSashCastle_4_4"]').checked = false
                } else {
                    accessoriesRightSash_4_4.style.display = 'block';
                    accessoriesRightSash_4_4.dataset.active = 'true';
                }
            })
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
            this.calculator.querySelector('.active-step').classList.remove('active-step');
            this.calculator.querySelector('div[data-step="1"]').classList.add('active-step');
            this.calculator.querySelector('#js-form-calc-result-send').disabled = false;
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
                                    Конструкций:
                                </p>
                                <div class="wiew-options__item-regulator js-counter-product-container">
                                    <div class="wiew-options__item-regulator-minus js-counter-product-minus">-</div>
                                    <div class="wiew-options__item-regulator-count js-counter-product-count" data-count="${data[key1]['count'] ? data[key1]['count'] : 1}" data-id="${key1}">
                                        ${data[key1]['count'] ? data[key1]['count'] : 1}
                                    </div>
                                    <div class="wiew-options__item-regulator-plus js-counter-product-plus">+</div>
                                </div>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Створки:
                                </p>
                                <p class="wiew-options__text">
                                    ${data[key1]['numberOfFlaps']}
                                </p>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Размеры окна, мм:
                                </p>
                                <p class="wiew-options__text">
                                    ${data[key1]['windowSize']['noSize'] ? data[key1]['windowSize']['noSize'] : data[key1]['windowSize']['height'] + '.mm' + ' x ' + data[key1]['windowSize']['width'] + '.mm'}
                                </p>
                            </li>
                            <li class="wiew-options__item">
                                <p class="wiew-options__text-grey">
                                    Аксессуары:
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

    addCounterProduct()
    {
        this.calculator.querySelectorAll('.js-counter-product-container').forEach((container) => {
            container.addEventListener('click', (event) => {
                let element = event.target
                let counter = container.querySelector('.js-counter-product-count');
                if (element.classList.contains('js-counter-product-minus')) {
                    if (Number(counter.dataset.count) > 1) {
                        counter.innerHTML = Number(counter.dataset.count) - 1;
                        counter.dataset.count = Number(counter.dataset.count) - 1;
                        this.orders[counter.dataset.id]['count'] = Number(counter.dataset.count) - 1;
                    }
                }
                if (element.classList.contains('js-counter-product-plus')) {
                    counter.innerHTML = Number(counter.dataset.count) + 1;
                    counter.dataset.count = Number(counter.dataset.count) + 1;
                    this.orders[counter.dataset.id]['count'] = Number(counter.dataset.count) + 1;
                }
            })
        })
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
        this.calculator.querySelector('div[data-step="4-1"]').addEventListener('click', (event) => {
            let sash_4_1 = this.calculator.querySelector('input[name="sash_4_1"]:checked');
            let img = this.calculator.querySelector('#step_4_1');
            if (sash_4_1.value === 'Глухая') {
                img.src = 'img/calc/step-4-1.png';
            }
            if (sash_4_1.value === 'Поворотная') {
                img.src = 'img/calc/step-4-2.png';
            }
            if (sash_4_1.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3.png';
            }
        })
        this.calculator.querySelector('div[data-step="4-2"]').addEventListener('click', (event) => {
            let leftSash_4_2 = this.calculator.querySelector('input[name="leftSash_4_2"]:checked');
            let rightSash_4_2 = this.calculator.querySelector('input[name="rightSash_4_2"]:checked');
            let img = this.calculator.querySelector('#step_4_2');
            if (leftSash_4_2.value === 'Глухая'&& rightSash_4_2.value === 'Глухая') {
                img.src = 'img/calc/step-4-2-1-1.png';
            }
            if (leftSash_4_2.value === 'Глухая' && rightSash_4_2.value === 'Поворотная') {
                img.src = 'img/calc/step-4-2-1-2.png';
            }
            if (leftSash_4_2.value === 'Глухая' && rightSash_4_2.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-2-1-3.png';
            }
            if (leftSash_4_2.value === 'Поворотная' && rightSash_4_2.value === 'Глухая') {
                img.src = 'img/calc/step-4-2-2-1.png';
            }
            if (leftSash_4_2.value === 'Поворотная' && rightSash_4_2.value === 'Поворотная') {
                img.src = 'img/calc/step-4-2-2-2.png';
            }
            if (leftSash_4_2.value === 'Поворотная' && rightSash_4_2.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-2-2-3.png';
            }
            if (leftSash_4_2.value === 'Поворотно-откидная' && rightSash_4_2.value === 'Глухая') {
                img.src = 'img/calc/step-4-2-3-1.png';
            }
            if (leftSash_4_2.value === 'Поворотно-откидная' && rightSash_4_2.value === 'Поворотная') {
                img.src = 'img/calc/step-4-2-3-2.png';
            }
            if (leftSash_4_2.value === 'Поворотно-откидная' && rightSash_4_2.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-2-3-3.png';
            }
        })
        this.calculator.querySelector('div[data-step="4-3"]').addEventListener('click', (event) => {
            let leftSash_4_3 = this.calculator.querySelector('input[name="leftSash_4_3"]:checked');
            let centerSash_4_3 = this.calculator.querySelector('input[name="centerSash_4_3"]:checked');
            let rightSash_4_3 = this.calculator.querySelector('input[name="rightSash_4_3"]:checked');
            let img = this.calculator.querySelector('#step_4_3');
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-1-1-1.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-1-1-2.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-1-1-3.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-1-2-1.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-1-3-1.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-1-2-2.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-1-2-3.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-1-3-2.png';
            }
            if (leftSash_4_3.value === 'Глухая' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-1-3-3.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-2-1-1.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-2-2-1.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-2-1-2.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-2-1-3.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-2-2-2.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-2-2-3.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-2-3-1.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-2-3-2.png';
            }
            if (leftSash_4_3.value === 'Поворотная' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-2-3-3.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-3-1-1.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-3-2-1.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Глухая') {
                img.src = 'img/calc/step-4-3-3-3-1.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-3-1-2.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Глухая' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-3-1-3.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-3-2-2.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Поворотная' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-3-2-3.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Поворотная') {
                img.src = 'img/calc/step-4-3-3-3-2.png';
            }
            if (leftSash_4_3.value === 'Поворотно-откидная' && centerSash_4_3.value === 'Поворотно-откидная' && rightSash_4_3.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-3-3-3-3.png';
            }
        })
        this.calculator.querySelector('div[data-step="4-4"]').addEventListener('click', (event) => {
            let door_4_4 = this.calculator.querySelector('input[name="door_4_4"]:checked');
            let leftSash_4_4 = this.calculator.querySelector('input[name="leftSash_4_4"]:checked');
            let rightSash_4_4 = {
                value: 'undefined'
            };
            let img = this.calculator.querySelector('#step_4_4');
            if (this.calculator.querySelector('#js-right-sash-4-4').dataset.active === 'true') {
                rightSash_4_4 = this.calculator.querySelector('input[name="rightSash_4_4"]:checked');
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'undefined') {
                img.src = 'img/calc/step-4-4-1-1.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'undefined') {
                img.src = 'img/calc/step-4-4-1-2.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'undefined') {
                img.src = 'img/calc/step-4-4-1-3.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'undefined') {
                img.src = 'img/calc/step-4-4-2-1.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'undefined') {
                img.src = 'img/calc/step-4-4-2-1.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'undefined') {
                img.src = 'img/calc/step-4-4-2-2.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'undefined') {
                img.src = 'img/calc/step-4-4-2-3.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'Глухая') {
                img.src = 'img/calc/step-4-4-1-1-1.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'Поворотная') {
                img.src = 'img/calc/step-4-4-1-1-2.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-4-1-1-3.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'Глухая') {
                img.src = 'img/calc/step-4-4-1-2-1.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'Поворотная') {
                img.src = 'img/calc/step-4-4-1-2-2.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-4-1-2-3.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'Глухая') {
                img.src = 'img/calc/step-4-4-1-3-1.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'Поворотная') {
                img.src = 'img/calc/step-4-4-1-3-2.png';
            }
            if (door_4_4.value === 'Поворотная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-4-1-3-3.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'Глухая') {
                img.src = 'img/calc/step-4-4-2-1-1.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'Поворотная') {
                img.src = 'img/calc/step-4-4-2-1-2.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Глухая' && rightSash_4_4.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-4-2-1-3.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'Глухая') {
                img.src = 'img/calc/step-4-4-2-2-1.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'Поворотная') {
                img.src = 'img/calc/step-4-4-2-2-2.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотная' && rightSash_4_4.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-4-2-2-3.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'Глухая') {
                img.src = 'img/calc/step-4-4-2-3-1.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'Поворотная') {
                img.src = 'img/calc/step-4-4-2-3-2.png';
            }
            if (door_4_4.value === 'Поворотно-откидная' && leftSash_4_4.value === 'Поворотно-откидная' && rightSash_4_4.value === 'Поворотно-откидная') {
                img.src = 'img/calc/step-4-4-2-3-3.png';
            }
        })
    }

    checkWindowDimensions()
    {
        let windowDimensionsNone = this.calculator.querySelector('input[name="windowDimensionsNone"]');
        let windowHeight = this.calculator.querySelector('input[name="windowHeight"]');
        let windowWidth = this.calculator.querySelector('input[name="windowWidth"]');
        windowDimensionsNone.addEventListener('click', function (event) {
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
            value.classList.add('error-cal');
        })
    }

    removeError(input = [])
    {
        input.forEach(function (value) {
            value.classList.remove('error-cal');
        })
    }

    getActiveStep()
    {
        return this.calculator.querySelector('.active-step');
    }

    setActiveStepPrew(step)
    {
        step.classList.remove('active-step');
        if (step.dataset.stepPrew !== 'false') {
            this.calculator.querySelector('div[data-step="' + step.dataset.stepPrew + '"]').classList.add('active-step');
        }
        this.scrollCalculator();
    }

    setActiveStepNext(step)
    {
        step.classList.remove('active-step');
        if (step.dataset.stepNext === "variants") {
            let variants = this.calculator.querySelector('input[name="numberOfFlaps"]:checked').value;
            this.calculator.querySelector('div[data-step="' + variants + '"]').classList.add('active-step');
        } else if (step.dataset.stepNext !== 'false') {
            this.calculator.querySelector('div[data-step="' + step.dataset.stepNext + '"]').classList.add('active-step');
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
            if (response.form === 'formCalculator') {
                $('#js-form-calc-resultw').find('.custom__CAPTCHA').removeClass('error-v2');
                if (typeof response.message === 'object') {
                    if (response.message.CAPTCHA) {
                        $('#js-form-calc-result').find('.custom__CAPTCHA').addClass('error-v2');
                    }
                }

                let message = document.querySelector('#calculator-result-modal').querySelector('.calculator-message');
                if (response.result) {
                    this.calculator.querySelector('#js-form-calc-result-send').disabled = true;
                    message.innerHTML = 'Ваша заявка принята наш менеджер свяжется с вами в ближайшее время.'
                    $.fancybox.open({
                        src: '#calculator-result-modal',
                        type: 'inline'
                    });
                    setTimeout(function (){
                        $.fancybox.close();
                    }, 2000)
                } else {
                    this.calculator.querySelector('#js-form-calc-result-send').disabled = false;
                    message.innerHTML = response.message;
                    $.fancybox.open({
                        src: '#calculator-result-modal',
                        type: 'inline'
                    });
                }
            }
        });
    }
}