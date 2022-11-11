<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

/**
 * Класс отправки форм на почту
 */
class Form
{
    public static $mail;

    private static $result = [
        'errors' => [],
        'code' => 0
    ];

    /**
     * Инициализация
     */
    public static function init()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            self::configPhpMailer();
            self::customСaptcha();
            switch ($_POST['form']) {
                case 'formSendRequest':
                    self::formSendRequest();
                    break;
                case 'formCustomWindow':
                    self::formCustomWindow();
                    break;
                case 'formCalculator':
                    self::formCalculator();
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * Форма - Ваша заявка
     */
    private static function formSendRequest()
    {
        if (self::$result['code'] === 200 && $_POST['name'] && $_POST['phone'] && $_POST['address']) {
            self::$mail->Subject = 'Форма: Ваша заявка';
            self::$mail->Body = '
              <table>
                <colgroup>
                  <col span="4" style="background: aliceblue">
                </colgroup>
                <tr>
                  <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                    Имя:
                  </th>
                  <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                    Телефон:
                  </th>
                  <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                    Адрес:
                  </th>
                  <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                    Вопрос:
                  </th>
                </tr>
                <tr>
                  <td style="padding: 5px 10px; min-width: 150px; text-align: center">
                    ' . $_POST['name'] . '
                  </td>
                  <td style="padding: 5px 10px; min-width: 150px; text-align: center">
                    ' . $_POST['phone'] . '
                  </td>
                  <td style="padding: 5px 10px; text-align: center">
                    ' . $_POST['address'] . '
                  </td>
                  <td style="padding: 5px 10px; text-align: center">
                    ' . $_POST['message'] . '
                  </td>
                </tr>
              </table>
            ';
            if (self::$mail->send()) {
                echo json_encode(['result' => true, 'form' => 'formSendRequest']);
            } else {
                echo json_encode(['result' => false, 'message' => 'Что то пошло не так, попробуйте отправить еще раз.', 'form' => 'formSendRequest']);
            }
        }
    }

    /*
     * Форма - Нестандартное окно
     */
    private static function formCustomWindow()
    {
        if (self::$result['code'] === 200) {
                self::$mail->Subject = 'Форма: Нестандартное окно';
                self::$mail->Body = '
                  <table>
                    <colgroup>
                      <col span="4" style="background: aliceblue">
                    </colgroup>
                    <tr>
                      <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                        Телефон:
                      </th>
                    </tr>
                    <tr>
                      <td style="padding: 5px 10px; min-width: 150px; text-align: center">
                        ' . $_POST['phone'] . '
                      </td>
                    </tr>
                  </table>
                ';
                if (self::$mail->send()) {
                    echo json_encode(['result' => true, 'form' => 'formCustomWindow']);
                } else {
                    echo json_encode(['result' => false, 'message' => 'Что то пошло не так, попробуйте отправить еще раз.', 'form' => 'formCustomWindow']);
                }
            }
        }

        /*
        * Форма - Калькулятор
        */
        private static function formCalculator()
        {
            if (self::$result['code'] === 200 && $_POST['name'] && $_POST['phone'] && $_POST['address']) {
            $message = '
              <table>
                <colgroup>
                  <col span="4" style="background: aliceblue">
                </colgroup>
                <tr>
                  <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                    Телефон:
                  </th>

                  <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                    Доставка:
                  </th>
                  <th style="padding: 5px 10px; background: cadetblue; text-align: center">
                    Монтаж:
                  </th>
                </tr>
                <tr>
                  <td style="padding: 5px 10px; min-width: 150px; text-align: center">
                    ' . $_POST['phone'] . '
                  </td>
                  <td style="padding: 5px 10px; min-width: 150px; text-align: center">
                    ' . $_POST['delivery'] . '
                  </td>
                  <td style="padding: 5px 10px; min-width: 150px; text-align: center">
                    ' . $_POST['montage'] . '
                  </td>
                </tr>
              </table>
              <br>
            ';
            foreach (json_decode($_POST['orders'], true) as $item) {
                $windowSize = $item['windowSize']['noSize'] === 'Не знаю размера' ? $item['windowSize']['noSize'] : 'Высота - ' . $item['windowSize']['height'] . '.mm' . ' ' . 'Ширина - ' . $item['windowSize']['width'] . '.mm';
                $message .= '
                  <table>
                    <colgroup>
                      <col span="4" style="background: aliceblue">
                    </colgroup>
                    <tr>
                      <th style="padding: 5px 10px; background: cadetblue">
                        Изделие: ' . $item['numberOfFlaps'] . '
                      </th>
                    </tr>
                    <tr>
                      <td style="padding: 5px 10px; text-align: center">
                        <img src="' . $item['windowImg'] . '">
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 10px; text-align: center">
                        Конструкций: ' . $item['count'] . '
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 10px; text-align: center">
                        Тип помещения: ' . $item['typeOfRoom'] . '
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 10px; text-align: center">
                        Размеры окна: ' . $windowSize . '
                      </td>
                    </tr>
                    <tr>
                    <tr>
                      <th style="padding: 5px 10px; background: #7dfffa">
                        Тип открывания створок:
                      </th>
                    </tr>
                    ';
                foreach ($item['product'] as $product) {
                    $accessories = 'Дополнительные аксессуары: ';
                    if (!empty($product['castle']) && $product['castle'] !== 'false') {
                        $accessories .= $product['castle'] . ', ';
                    }
                    if (!empty($product['grid']) && $product['grid'] !== 'false') {
                        $accessories .= $product['grid'] . ', ';
                    }
                    if (empty($product['grid']) && empty($product['castle'])) {
                        $accessories .= '-';
                    }
                    $message .= '
                        <tr>
                          <td style="padding: 5px 10px; text-align: center">
                            ' . $product['name'] . ': ' . $product['value'] . '<br>
                            ' . $accessories . '
                          </td>
                        </tr>
                    ';
                }
                if (count($item['complects']) > 0) {
                    $message .= '
                        <tr>
                          <td style="padding: 5px 10px; text-align: center">
                            Комплектующие: ' . implode(', ', $item['complects']) . '
                          </td>
                        </tr>
                    ';
                }
                if (count($item['parameters']) > 0) {
                    $message .= '
                        <tr>
                          <td style="padding: 5px 10px; text-align: center">
                            Дополнительные параметры: ' . implode(', ', $item['parameters']) . '
                          </td>
                        </tr>
                    ';
                }
                $message .= '</table><br>';
            };
            self::$mail->Subject = 'Форма: Калькулятор оконных конструкций';
            self::$mail->Body = $message;
            if (self::$mail->send()) {
                echo json_encode(['result' => true, 'form' => 'formCalculator']);
            } else {
                echo json_encode(['result' => false, 'message' => 'Что то пошло не так, попробуйте отправить еще раз.', 'form' => 'formCalculator']);
            }
        }
    }

    /**
     * Конфигурация PHPMailer
     */
    private static function configPhpMailer()
    {
        self::$mail = new PHPMailer();
        self::$mail->CharSet = "UTF-8";
        self::$mail->SMTPAuth = true;
        self::$mail->Host = 'smtp.mail.ru';
        /*
         * Логин SMTP
         */
        self::$mail->Username = 'info@e-okna.ru';
        /*
         * Пароль SMTP
         */
        self::$mail->Password = 'cpUvQEJVbBuH2xm6wPrb';
        self::$mail->SMTPSecure = 'ssl';
        self::$mail->Port = 465;
        self::$mail->isSMTP();
        self::$mail->isHTML(true);
        /*
         * От кого отправить
         */
        self::$mail->setFrom('info@e-okna.ru', 'e-okna.ru');
        /*
         * Кому отправить
         */
        self::$mail->addAddress('info@e-okna.ru');
    }

    /**
     * Кастомная CAPTCHA
    */
    public function customСaptcha()
    {
        if ($_POST['CAPTCHA_TEXT'])
            self::$result['errors']['CAPTCHA'][] = 'Ошибка: заполнено скрытое поле TEXT';
        if ($_POST['CAPTCHA_TEL'])
            self::$result['errors']['CAPTCHA'][] = 'Ошибка: заполнено скрытое поле TEL';
        if ($_POST['CAPTCHA_EMAIL'])
            self::$result['errors']['CAPTCHA'][] = 'Ошибка: заполнено скрытое поле EMAIL';
        if ($_POST['CAPTCHA_TEXTAREA'])
            self::$result['errors']['CAPTCHA'][] = 'Ошибка: заполнено скрытое поле TEXTAREA';

        if (preg_match('/[A-Za-z]/iu', $_POST['name']))
            self::$result['errors']['input']['name'] = 'Ошибка: имя должно быть на русском';
        if (preg_match('/[<\/][a-zA-Z]{1,7}[>]+/', $_POST['message']))
            self::$result['errors']['textarea']['message'] = 'Ошибка: в поле вопрос не должно быть HTML тегов';

        if (self::$result['errors']) {
            self::$result['code'] = 300;
            echo json_encode(['result' => false, 'message' => self::$result['errors'], 'form' => $_POST['form']]);
        } else {
            self::$result['code'] = 200;
        }
    }
}

Form::init();