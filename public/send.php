<?php
/**
 * お問い合わせフォーム送信処理
 * フロント（Contact）から JSON で POST された内容を info@lala-reform.com へメール送信する。
 *
 * ※ PHP が動作するサーバーに、ビルド後の一式（dist/）と一緒に設置してください。
 *    このファイルは public/ にあるため、ビルドすると dist/send.php として出力され、
 *    公開URL /send.php で動作します。
 */

header('Content-Type: application/json; charset=utf-8');

// POST 以外は拒否
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method Not Allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 送信先（メールの宛先）
$to = 'info@lala-reform.com, kurihara@lala-reform.com';
// 送信元（サイト側の差出人。宛先と同一ドメインにしておくと届きやすい）
$from = 'info@lala-reform.com';

// --- 入力の取得（JSON、なければ通常のPOST） ---
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

function field($data, $key) {
    return isset($data[$key]) ? trim((string) $data[$key]) : '';
}

$place   = field($data, 'place');
$name    = field($data, 'name');
$phone   = field($data, 'phone');
$email   = field($data, 'email');
$message = field($data, 'message');
$consent = !empty($data['consent']);

// --- バリデーション ---
$errors = [];
if ($name === '') {
    $errors[] = 'お名前を入力してください。';
}
if ($phone === '' && $email === '') {
    $errors[] = '電話番号またはメールアドレスを入力してください。';
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'メールアドレスの形式が正しくありません。';
}
if (!$consent) {
    $errors[] = 'プライバシーポリシーへの同意が必要です。';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode("\n", $errors)], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- ヘッダインジェクション対策（ヘッダに入る値から改行を除去） ---
function clean_header($value) {
    return str_replace(["\r", "\n", "%0a", "%0d", "\0"], '', $value);
}
$safe_name  = clean_header($name);
$safe_email = clean_header($email);

// --- 日本語メールの設定 ---
mb_language('Japanese');
mb_internal_encoding('UTF-8');

$subject = '【外壁・屋根塗装ナビ】お問い合わせ';

$body  = "外壁・屋根塗装ナビのお問い合わせフォームより、以下の内容が送信されました。\n\n";
$body .= "──────────────────────────\n";
$body .= "ご相談の箇所 ： " . ($place !== '' ? $place : '（未選択）') . "\n";
$body .= "お名前　　　 ： " . $name . "\n";
$body .= "電話番号　　 ： " . ($phone !== '' ? $phone : '（未入力）') . "\n";
$body .= "メールアドレス： " . ($email !== '' ? $email : '（未入力）') . "\n";
$body .= "──────────────────────────\n";
$body .= "ご相談内容：\n";
$body .= ($message !== '' ? $message : '（未入力）') . "\n";
$body .= "──────────────────────────\n\n";
$body .= "送信日時 ： " . date('Y-m-d H:i:s') . "\n";
if (!empty($_SERVER['REMOTE_ADDR'])) {
    $body .= "IPアドレス： " . $_SERVER['REMOTE_ADDR'] . "\n";
}

// --- ヘッダ（差出人名は MIME エンコード） ---
$from_name = mb_encode_mimeheader('外壁・屋根塗装ナビ');
$headers  = 'From: ' . $from_name . ' <' . $from . '>' . "\r\n";
$headers .= 'Content-Transfer-Encoding: 7bit' . "\r\n";
if ($safe_email !== '') {
    // 返信すると送信者本人に届くように Reply-To を設定
    $reply_name = $safe_name !== '' ? mb_encode_mimeheader($safe_name) : '';
    $headers .= 'Reply-To: ' . ($reply_name !== '' ? $reply_name . ' ' : '') . '<' . $safe_email . '>' . "\r\n";
}

// エンベロープ送信元（-f）。サーバーによっては無視/不可の場合あり
$sent = @mb_send_mail($to, $subject, $body, $headers, '-f ' . $from);

if ($sent) {
    echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(
        ['ok' => false, 'error' => 'メールの送信に失敗しました。お手数ですが、お電話にてお問い合わせください。'],
        JSON_UNESCAPED_UNICODE
    );
}
