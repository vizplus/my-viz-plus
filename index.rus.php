<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>my VIZ+</title>
	<meta name="description" content="My VIZ+ manager: wallet, services, DAO">
	<meta property="og:description" content="My VIZ+ manager: wallet, services, DAO">
	<meta name="twitter:description" content="My VIZ+ manager: wallet, services, DAO">
	<meta name="viewport" content="width=device-width">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<!--
		<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Serif&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
	-->
	<link rel="stylesheet" href="/app.css?<?=filemtime('app.css')?>">
	<script type="text/javascript" src="/viz.min.js"></script>
	<script type="text/javascript" src="/jquery-3.4.1.min.js"></script>
	<script type="text/javascript" src="/progressbar.min.js"></script>
	<script type="text/javascript" src="/app.js?<?=filemtime('app.js')?>"></script>
</head>
<body>
<div class="header shadow unselectable">
	<div class="horizontal-view">
		<div class="menu-button menu-button-action"><img class="menu-button-action" src="/menu.svg"></div>
		<div class="logo">
			<a data-href="/" class="prefix">my.</a><a href="https://viz.plus/"><img src="/logo.svg" alt="VIZ+"></a>
		</div>
		<div class="user-menu">
			<div class="login">&hellip;</div>
			<div class="user-buttons">
				<img class="drop-down" src="/drop-down.svg">
				<div class="users-drop-down"></div>
				<img class="add-account" src="/circle-plus.svg">
				<img class="logout" src="/logout.svg">
			</div>
		</div>
		<div class="menu-list captions">
			<div class="menu-bg">
				<a class="menu-el color-blue" data-href="/accounts/">Аккаунты</a>
				<a class="menu-el color-green" data-href="/assets/">Активы</a>
				<a class="menu-el color-orange" data-href="/dao/">ДАО</a>
				<a class="menu-el color-red" data-href="/market/">Магазин</a>
			</div>
		</div>
	</div>
</div>

<div class="horizontal-view vertical-view">
	<div class="cards-view">
		<div class="cards-container">
			<div class="view view-index">
				<div class="card portable-version-card small-borders text-right grey">
						Доступна автономная версия сайта. <a class="grey" data-href="/portable/">Подробнее&hellip;</a>
				</div>
				<div class="card">
					<h3>Ваши аккаунты</h3>
					<div class="login">
						<p>Нет подключенных аккаунтов.</p>
						<input type="hidden" name="back" value="">
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт:</span>
								<input type="text" name="login" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Приватный активный ключ:</span>
								<input type="text" name="active-key" class="simple-rounded">
							</label>
						</p>
						<!--
							<p><input type="text" class="simple-rounded" name="login"> &mdash; аккаунт</p>
							<p><input type="text" class="simple-rounded" name="active-key"> &mdash; приватный активный ключ</p>
						-->
						<p class="red error"></p>
						<p><a class="button user-authentication">Подключить аккаунт</a></p>
						<div class="addon captions"><p>При подключении аккаунта ключ сохраняется в вашем браузере и не передается на сервер. Для удаления ключа из браузера отключите аккаунт или очистите кэш браузера.</p></div>
					</div>
					<div class="session-manage">
						<div class="sessions"></div>
					</div>
					<!--
						<div>
							<a class="portable-version-action">Доступна автономная версия сайта</a>
						</div>
					-->
					<div>
						<a class="nodes-config-action">Настроить подключение к ноде (необязательно)</a>
					</div>
					<!--
						<div class="portable-version hidden">
							<hr>
						</div>
					-->
					<div class="nodes-config hidden">
						<hr>
						<h3>Подключение к ноде</h3>
						<div class="nodes"></div>
					</div>
				</div>
				<div class="select-lang captions"><!--<a href="/?lang=eng">English</a>--><a href="/?lang=rus">Русский</a></div>
			</div>

			<div class="view view-portable" data-title="Автономная версия">
				<div class="card">
					<h3>Автономная версия</h3>
					<p>Автономная версия my.VIZ.plus позволяет работать с аккаунтами ВИЗа без подключения к серверу. Даже если подсайт <a href="https://my.viz.plus">https://my.viz.plus</a> будет заблокирован, взломан или по другим причинам временно или постоянно прекратит работу, вы этого не заметите: локальная версия никак не связана с нашим сервером.</p>
					<p>Чтобы пользоваться автономной версией, скачайте (например, на Рабочий стол, чтобы не потерять) единственный файл myvizplus.html, содержащий всё необходимое, и откройте в любом браузере. Он будет работать точно так же, как веб-версия сайта. Единственное отличие: в локальной версии по техническим причинам нет раздела Магазин, он доступен только на сайте.</p>
					<p>Если ваш уровень паранойи зашкаливает, мы предлагаем подключить автономный подсайт к вашей собственной ноде блокчейна VIZ: это можно сделать на стартовой странице без ввода имени пользователя и ключа.</p>
					<p>Автономная версия подсайта my.viz.plus - надёжное, удобное и безопасное решение для управления аккаунтами ВИЗа. Мы рекомендуем пользоваться именно этим вариантом, чтобы не зависеть от доступности и безопасности сайта.</p>
					<p><a href="/portable.php" target="_blank" class="inline-button no-margin captions">Скачать myvizplus.html</a></p>
				</div>
			</div>

			<div class="view view-login">
				<div class="card">
					<!--<h3>Добавить аккаунт</h3>-->
					<input type="hidden" name="back" value="">
					<p>
						<label class="input-descr">
							<span class="input-caption">Аккаунт:</span>
							<input type="text" name="login" class="simple-rounded">
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Приватный активный ключ:</span>
							<input type="text" name="active-key" class="simple-rounded">
						</label>
					</p>
					<!--
						<p><input type="text" class="simple-rounded" name="login"> &mdash; аккаунт</p>
						<p><input type="text" class="simple-rounded" name="active-key"> &mdash; приватный активный ключ</p>
					-->
					<p class="red error"></p>
					<p><a class="button user-authentication">Подключить аккаунт</a></p>
					<div class="addon captions">
						При подключении аккаунта ключ сохраняется в вашем браузере и не передается на сервер. Для удаления ключа из браузера отключите аккаунт или очистите кэш браузера.
						<div class="authorized">
							<hr>
								Вы уже вошли под следующими аккаунтами: <span></span><br>
								Для управления ими <a data-href="/">перейдите по ссылке</a>.
						</div>
					</div>
				</div>
			</div>

			<div class="view view-accounts">
				<div class="page page-index">
					<div class="card transparent">
						<h3 class="adaptive-show-block">Аккаунты</h3>
						<div class="columns-view">
							<div class="column column-2 shadow grid">
								<h4 class="center captions">Создать</h4>
								<!--<div class="icon icon-wide icon-150px icon-color-blue icon-add-account"></div>-->
								<div class="wide-buttons captions">
									<a class="wide-button" data-href="/accounts/create-account/">Аккаунт</a>
									<a class="wide-button" data-href="/accounts/create-subaccount/">Субаккаунт</a>
								</div>
							</div>
							<div class="column column-2 shadow grid">
								<h4 class="center captions">Управлять</h4>
								<!--<div class="icon icon-wide icon-150px icon-color-blue icon-config-account"></div>-->
								<div class="wide-buttons captions">
									<a class="wide-button" data-href="/accounts/reset-access/">Сбросить ключи</a>
									<a class="wide-button" data-href="/accounts/manage-access/">Доступы аккаунта</a>
									<a class="wide-button" data-href="/accounts/manage-profile/">Изменить профиль</a>

								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="page page-create-account" data-title="Создать аккаунт">
					<div class="card">
						<h3>Создать аккаунт</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
							<div>Капитал: <span rel="shares">&hellip;</span> viz</div>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Новый аккаунт:</span>
								<input type="text" name="create-account-login" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Передать с баланса:</span>
								<input type="text" name="create-account-token-amount" class="simple-rounded" placeholder="1.00 viz" value="1.00 viz">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Делегировать капитал:</span>
								<input type="text" name="create-account-shares-amount" class="simple-rounded" placeholder="10.00 viz">
							</label>
						</p>
						<p class="red create-account-available"></p>
						<p class="red create-account-error"></p>
						<p>
							<input class="create-account-action blue-button captions" type="button" value="Создать">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
						</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>Для создания аккаунта необходимо передать ему как минимум <span class="median-props" rel="account_creation_fee">1.00 viz</span> или делегировать капитал как минимум на <span class="median-props" rel="create_account_delegation_fee">10.00 viz</span>.</p>
						</div>
						<div class="account-keys hidden">
							<h3 class="left">Поздравляем!</h3>

							<p>Создан аккаунт: <span class="green account-login"></span></p>

							<p>Ключи:</p>

							<p><span class="master-key captions">&hellip;</span> &mdash; master или главный ключ</p>
							<p><span class="active-key captions">&hellip;</span> &mdash; active или активный ключ</p>
							<p><span class="regular-key captions">&hellip;</span> &mdash; regular или обычный ключ</p>
							<p><span class="memo-key captions">&hellip;</span> &mdash; memo или ключ заметок</p>

							<p>Сохраните ключи прямо сейчас!</p>
						</div>

						<p><hr><a data-href="/accounts/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-create-subaccount" data-title="Создать субаккаунт">
					<div class="card">
						<h3>Создать субаккаунт</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
							<div>Капитал: <span rel="shares">&hellip;</span> viz</div>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Новый субаккаунт:</span>
								<input type="text" name="create-subaccount-login" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Передать с баланса:</span>
								<input type="text" name="create-subaccount-token-amount" class="simple-rounded" placeholder="1.00 viz" value="1.00 viz">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Делегировать капитал:</span>
								<input type="text" name="create-subaccount-shares-amount" class="simple-rounded" placeholder="10.00 viz">
							</label>
						</p>
						<p class="red create-subaccount-available"></p>
						<p class="red create-subaccount-error"></p>
						<p>
							<input class="create-subaccount-action blue-button captions" type="button" value="Создать">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
						</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>Созданный субаккаунт будет обладать суффиксом <strong>.</strong><span class="current_user bold"></span></p>
							<p>Для создания субаккаунта необходимо передать ему как минимум <span class="median-props" rel="account_creation_fee">1.00 viz</span> или делегировать капитал как минимум на <span class="median-props" rel="create_account_delegation_fee">10.00 viz</span>.</p>
						</div>
						<div class="account-keys hidden">
							<h3 class="left">Поздравляем!</h3>

							<p>Создан аккаунт: <span class="green account-login"></span></p>

							<p>Ключи:</p>

							<p><span class="master-key captions">&hellip;</span> &mdash; master или главный ключ</p>
							<p><span class="active-key captions">&hellip;</span> &mdash; active или активный ключ</p>
							<p><span class="regular-key captions">&hellip;</span> &mdash; regular или обычный ключ</p>
							<p><span class="memo-key captions">&hellip;</span> &mdash; memo или ключ заметок</p>

							<p>Сохраните ключи прямо сейчас!</p>
						</div>

						<p><hr><a data-href="/accounts/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-reset-access" data-title="Сбросить ключи">
					<div class="card">
						<h3>Сбросить ключи</h3>
						<p>Внимание! При сбросе ключей у аккаунта удаляются все старые доверенные аккаунты и дополнительные ключи. Останется только по одному ключу для каждого из типов доступа.</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт для сброса ключей:</span>
								<input type="text" name="reset-access-login" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Главный ключ (master):</span>
								<input type="text" name="reset-access-master-key" class="simple-rounded" placeholder="5K...">
							</label>
						</p>

						<p class="red reset-access-error"></p>
						<p class="green reset-access-success"></p>
						<p>
							<input class="reset-access-action blue-button captions" type="button" value="Сбросить ключи">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
						</p>

						<div class="account-keys hidden">
							<h3 class="left">Ключи заменены!</h3>

							<p>Аккаунт: <span class="green account-login"></span></p>

							<p>Ключи:</p>

							<p><span class="master-key captions">&hellip;</span> &mdash; master или главный ключ</p>
							<p><span class="active-key captions">&hellip;</span> &mdash; active или активный ключ</p>
							<p><span class="regular-key captions">&hellip;</span> &mdash; regular или обычный ключ</p>
							<p><span class="memo-key captions">&hellip;</span> &mdash; memo или ключ заметок</p>

							<p>Сохраните ключи прямо сейчас!</p>
						</div>

						<div class="addon captions"><h3>Подсказка</h3><p>Если вы хотите настроить управление аккаунтом для мульти-подписи, перейдите в подраздел <a data-href="/accounts/manage-access/">«Доступы аккаунта»</a>.</p></div>

						<p><hr><a data-href="/accounts/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-manage-profile" data-title="Изменить профиль">
					<div class="card">
						<h3>Изменить профиль</h3>
						<p>Заполните профиль и сохраните его в блокчейн (ни одно поле не является обязательным).</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Имя:</span>
								<input type="text" name="manage-profile-nickname" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Немного о себе:</span>
								<input type="text" name="manage-profile-about" maxlength="200" class="simple-rounded wide">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аватар (ссылка на изображение):</span>
								<input type="text" name="manage-profile-avatar" placeholder="https://" class="simple-rounded wide">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Пол:</span>
								<select name="manage-profile-gender" class="simple-rounded simple-rounded-size">
									<option value="" selected>Не указан</option>
									<option value="male" selected="">Мужской</option>
									<option value="female">Женский</option>
									<option value="robot">Робот</option>
								</select>
							</label>
						</p>

						<p>
							<label class="input-descr">
								<span class="input-caption">Город, страна:</span>
								<input type="text" name="manage-profile-location" class="simple-rounded wide">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Интересы (через запятую):</span>
								<input type="text" name="manage-profile-interests" class="simple-rounded wide">
							</label>
						</p>

						<p>
							<label class="input-descr">
								<span class="input-caption">Сайт:</span>
								<input type="text" name="manage-profile-site" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Email:</span>
								<input type="text" name="manage-profile-mail" class="simple-rounded">
							</label>
						</p>

						<p>
							<label class="input-descr">
								<span class="input-caption">Facebook:</span>
								<input type="text" name="manage-profile-facebook" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Instagram:</span>
								<input type="text" name="manage-profile-instagram" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Twitter:</span>
								<input type="text" name="manage-profile-twitter" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">VK:</span>
								<input type="text" name="manage-profile-vk" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Telegram:</span>
								<input type="text" name="manage-profile-telegram" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Skype:</span>
								<input type="text" name="manage-profile-skype" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Viber:</span>
								<input type="text" name="manage-profile-viber" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">WhatsApp:</span>
								<input type="text" name="manage-profile-whatsapp" class="simple-rounded" placeholder="аккаунт">
							</label>
						</p>

						<p class="red manage-profile-error"></p>
						<p class="green manage-profile-success"></p>
						<p>
							<input class="manage-profile-action blue-button captions" type="button" value="Сохранить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
						</p>

						<div class="addon captions"><h3>Подсказка</h3><p>Все отправляемые данные будут записаны в блокчейн и не могут быть удалены, но вы можете их изменить в любой момент.</p></div>

						<p><hr><a data-href="/accounts/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-manage-access" data-title="Доступы аккаунта">
					<div class="card">
						<h3>Доступы аккаунта</h3>
						<p>Внимание! Данный подраздел предназначен для продвинутых пользователей.</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт:</span>
								<input type="text" name="manage-access-login" class="simple-rounded">
							</label>
						</p>
						<p class="red manage-access-preload-error"></p>
						<p class="green manage-access-preload-success"></p>
						<p>
							<input class="manage-access-preload-action blue-button captions" type="button" value="Просмотреть схему доступов">
							<span class="submit-button-ring" rel="preload"></span>
							<span class="icon icon-margin hidden icon-color-blue icon-check" rel="preload"></span>
						</p>

						<div class="account-keys hidden">
							<hr>
							<h3 class="left">Схема доступов</h3>

							<p>Аккаунт: <span class="green account-login"></span></p>

							<p>Master или главный тип доступа:</p>
							<div class="account-keys-master captions">
								<p>
									<label class="input-descr">
										<span class="input-caption">Необходимый вес:</span>
										<input type="text" name="master-weight-threshold" class="simple-rounded">
									</label>
								</p>
								<hr>
								<p class="bold">Ключи для подписи:</p>
								<div class="master-keys">
									<div class="none-auths">Ключи отсутствуют</div>
								</div>
								<div class="add-key-auths">
									<input class="simple-inline" type="text" name="public-key" placeholder="публичный ключ">
									<input class="simple-inline" type="text" name="private-key" placeholder="приватный ключ">
									<input class="simple-inline" type="text" name="weight" placeholder="вес">
									<a class="gen-key-auths-action blue-button-inline unselectable" rel="master">сгенерировать</a>
									<a class="add-key-auths-action blue-button-inline unselectable" rel="master">добавить ключ</a>
								</div>
								<hr>
								<p class="bold">Доверенные аккаунты:</p>
								<div class="master-accounts">
									<div class="none-auths">Доверенных аккаунтов нет</div>
								</div>
								<div class="add-account-auths">
									<input class="simple-inline" type="text" name="account" placeholder="аккаунт">
									<input class="simple-inline" type="text" name="weight" placeholder="вес">
									<a class="add-account-auths-action blue-button-inline unselectable" rel="master">добавить аккаунт</a>
								</div>
							</div>

							<p>Active или активный тип доступа:</p>
							<div class="account-keys-active captions">
								<p>
									<label class="input-descr">
										<span class="input-caption">Необходимый вес:</span>
										<input type="text" name="active-weight-threshold" class="simple-rounded">
									</label>
								</p>
								<hr>
								<p class="bold">Ключи для подписи:</p>
								<div class="active-keys">
									<div class="none-auths">Ключи отсутствуют</div>
								</div>
								<div class="add-key-auths">
									<input class="simple-inline" type="text" name="public-key" placeholder="публичный ключ">
									<input class="simple-inline" type="text" name="private-key" placeholder="приватный ключ">
									<input class="simple-inline" type="text" name="weight" placeholder="вес">
									<a class="gen-key-auths-action blue-button-inline unselectable" rel="active">сгенерировать</a>
									<a class="add-key-auths-action blue-button-inline unselectable" rel="active">добавить ключ</a>
								</div>
								<hr>
								<p class="bold">Доверенные аккаунты:</p>
								<div class="active-accounts">
									<div class="none-auths">Доверенных аккаунтов нет</div>
								</div>
								<div class="add-account-auths">
									<input class="simple-inline" type="text" name="account" placeholder="аккаунт">
									<input class="simple-inline" type="text" name="weight" placeholder="вес">
									<a class="add-account-auths-action blue-button-inline unselectable" rel="active">добавить аккаунт</a>
								</div>
							</div>

							<p>Regular или обычный тип доступа:</p>
							<div class="account-keys-regular captions">
								<p>
									<label class="input-descr">
										<span class="input-caption">Необходимый вес:</span>
										<input type="text" name="regular-weight-threshold" class="simple-rounded">
									</label>
								</p>
								<hr>
								<p class="bold">Ключи для подписи:</p>
								<div class="regular-keys">
									<div class="none-auths">Ключи отсутствуют</div>
								</div>
								<div class="add-key-auths">
									<input class="simple-inline" type="text" name="public-key" placeholder="публичный ключ">
									<input class="simple-inline" type="text" name="private-key" placeholder="приватный ключ">
									<input class="simple-inline" type="text" name="weight" placeholder="вес">
									<a class="gen-key-auths-action blue-button-inline unselectable" rel="regular">сгенерировать</a>
									<a class="add-key-auths-action blue-button-inline unselectable" rel="regular">добавить ключ</a>
								</div>
								<hr>
								<p class="bold">Доверенные аккаунты:</p>
								<div class="regular-accounts">
									<div class="none-auths">Доверенных аккаунтов нет</div>
								</div>
								<div class="add-account-auths">
									<input class="simple-inline" type="text" name="account" placeholder="аккаунт">
									<input class="simple-inline" type="text" name="weight" placeholder="вес">
									<a class="add-account-auths-action blue-button-inline unselectable" rel="regular">добавить аккаунт</a>
								</div>
							</div>

							<p>
								<label class="input-descr">
									<span class="input-caption">Memo или ключ заметок (<a class="manage-access-gen-memo unselectable">сгенерировать новый</a>):</span>
									<input type="text" name="manage-access-memo-key" class="simple-rounded" placeholder="VIZ..." disabled>
								</label>
							</p>

							<p>
								<label class="input-descr">
									<span class="input-caption">Главный ключ (master) для аккаунта <span class="account-login bold"></span>:</span>
									<input type="text" name="manage-access-master-key" class="simple-rounded" placeholder="5K..." data-account="">
									<input type="hidden" name="manage-access-json-metadata">
								</label>
							</p>

							<p class="red manage-access-save-error"></p>
							<p>
								<input class="manage-access-save-action blue-button captions" type="button" value="Сохранить схему доступа">
								<span class="submit-button-ring" rel="save"></span>
								<span class="icon icon-margin hidden icon-color-blue icon-check" rel="save"></span>
							</p>
							<p class="green manage-access-save-success"></p>
							<div class="manage-access-new-keys"></div>
						</div>

						<div class="addon captions"><h3>Подсказка</h3><p>Если вы хотите просто сбросить ключи доступа для аккаунта — перейдите в подраздел <a data-href="/accounts/reset-access/">«Сбросить ключи»</a>.</p></div>

						<p><hr><a data-href="/accounts/">&larr; Вернуться</a></p>
					</div>
				</div>
			</div>

			<div class="view view-assets">
				<div class="page page-index">
					<div class="card transparent">
						<h3 class="adaptive-show-block">Активы</h3>
						<div class="columns-view">
							<div class="column column-3 shadow">
								<h4 class="center captions">Капитал</h4>
								<div class="shares-caption captions"><span class="value">&hellip;</span><span class="symbol"> viz</span></div>
								<div class="wide-buttons captions">
									<a class="wide-button color-green" data-href="/assets/stake-shares/">Увеличить</a>
									<a class="wide-button color-green" data-href="/assets/unstake-shares/">Уменьшить</a>
									<a class="wide-button color-green" data-href="/assets/delegate-shares/">Делегировать</a>
								</div>
							</div>
							<div class="column column-3 shadow">
								<h4 class="center captions">Кошелёк</h4>
								<div class="tokens-caption captions"><span class="value">&hellip;</span><span class="symbol"> viz</span></div>
								<div class="wide-buttons captions">
									<a class="wide-button color-green" data-href="/assets/transfer/">Перевести</a>
									<a class="wide-button color-green" data-href="/assets/checks/">Чеки</a>
								</div>
							</div>
							<div class="column column-3 shadow">
								<h4 class="center captions">Энергия</h4>
								<div class="energy-radial"><div class="energy-percentage captions"><span class="value" rel="energy">&hellip;</span><span class="symbol">%</span></div></div>
								<div class="wide-buttons captions">
									<a class="wide-button color-green" data-href="/assets/award/">Наградить</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="page page-stake-shares" data-title="Увеличить социальный капитал">
					<div class="card">
						<h3>Увеличить социальный капитал</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
							<div>Капитал: <span rel="shares">&hellip;</span> viz</div>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Сколько viz перевести в капитал:</span>
								<input type="text" name="stake-shares-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
							</label>
						</p>
						<p class="red stake-shares-error"></p>
						<p class="green stake-shares-success"></p>
						<p>
							<input class="stake-shares-action green-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring" rel="stake"></span>
							<span class="icon icon-margin hidden icon-color-green icon-check" rel="stake"></span>
						</p>
						<!--
						<div class="activate-viz-dollars">
							<hr>
							<p>
								<label class="input-descr">
									<span class="input-caption">Код для погашения виз-долларов:</span>
									<input type="text" name="activate-viz-dollars-code" class="simple-rounded" placeholder="...">
								</label>
							</p>
							<p class="red activate-viz-dollars-error"></p>
							<p class="green activate-viz-dollars-success"></p>
							<p>
								<input class="activate-viz-dollars-action green-button captions" type="button" value="Погасить виз-доллары">
								<span class="submit-button-ring" rel="activate-viz-dollars"></span>
								<span class="icon icon-margin hidden icon-color-green icon-check" rel="activate-viz-dollars"></span>
							</p>
						</div>
						-->

						<div class="addon captions"><h3>Подсказка</h3><p>Вы можете увеличить социальный капитал переводом токенов viz со своего баланса. Обратное действие занимает до <span class="median-props" rel="withdraw_intervals">&hellip;</span> дней.</p></div>

						<p><hr><a data-href="/assets/">&larr; Вернуться</a></p>

						<div class="table-view captions">
							<div class="table-header">
								<h3>История увеличения социального капитала <span class="loading">Загрузка&hellip;</span></h3>
							</div>
							<div class="table-data history" data-operations="transfer_to_vesting" data-lower-bound="" data-upper-bound="">
							</div>
							<div class="table-footer">
								<a class="inline-button history-load-more-action">Загрузить ещё &#10140;</a>
							</div>
						</div>
					</div>
				</div>
				<div class="page page-unstake-shares" data-title="Уменьшить социальный капитал">
					<div class="card">
						<h3>Уменьшить социальный капитал</h3>
						<div class="shares-balance table-view captions">
							<div class="table-header">
								<h3>Социальный капитал</h3>
							</div>
							<div class="table-data">
								<div class="columns-view adaptive-hide-flex">
									<div class="column-view column-3">собственный</div>
									<div class="column-view column-3">делегировано</div>
									<div class="column-view column-flex">эффективный</div>
								</div>
								<div class="columns-view">
									<div class="column-view column-3 vesting-shares">&hellip;</div>
									<div class="column-view column-3 delegated-vesting-shares received-vesting-shares">&hellip;</div>
									<div class="column-view column-flex effective-vesting-shares">&hellip;</div>
								</div>
							</div>
							<div class="table-footer">

							</div>
						</div>
						<div class="addon account-withdraw-status hidden captions">
							<p>У вас уже запущен процесс уменьшения социального капитала со следующими параметрами:</p>
							<p>Всего токенов на вывод &mdash; <span rel="to_withdraw"></span></p>
							<p>Уже выведено &mdash; <span rel="withdrawn"></span></p>
							<p>Ожидают вывода &mdash; <span rel="left_to_withdraw"></span></p>
							<p>Объем выводимых токенов в сутки &mdash; <span rel="vesting_withdraw_rate"></span></p>
							<p>Следующее уменьшение &mdash; <span rel="next_vesting_withdrawal"></span></p>
							<p>Осталось дней до полного вывода &mdash; <span rel="left_to_withdraw_duration"></span></p>
							<p class="red stop-unstake-shares-error"></p>
							<p><input class="stop-unstake-shares-action green-button captions" type="button" value="Остановить"><span class="submit-button-ring" rel="stop"></span></p>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Сколько viz вывести из капитала:</span>
								<input type="text" name="unstake-shares-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
								<span class="range-slider">
									<input class="range-slider-input range-slider-color-green simple-rounded-size" data-result-element="input[name=unstake-shares-tokens-amount]" data-input-element=".page-unstake-shares .shares-balance .vesting-shares" type="range" value="0" min="0" max="100" step="5">
									<span class="range-slider-value captions" rel="percent">0%</span>
								</span>
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Сколько viz оставить в капитале:</span>
								<input type="text" name="unstake-shares-tokens-left" class="simple-rounded" placeholder="0.00 viz">
								<span class="range-slider">
									<input class="range-slider-input range-slider-color-green simple-rounded-size" data-result-element="input[name=unstake-shares-tokens-left]" data-input-element=".page-unstake-shares .shares-balance .vesting-shares" type="range" value="0" min="0" max="100" step="5">
									<span class="range-slider-value captions" rel="percent">0%</span>
								</span>
							</label>
						</p>
						<p>Объем выводимых viz в сутки: <span class="unstake-shares-partition">&hellip;</span></p>
						<p>Примерное время вывода: <span class="unstake-shares-duration">&hellip;</span></p>
						<p class="red unstake-shares-error"></p>
						<p class="green unstake-shares-success"></p>
						<p>
							<input class="unstake-shares-action green-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring" rel="unstake"></span>
							<span class="icon icon-margin hidden icon-color-green icon-check" rel="unstake"></span>
						</p>

						<div class="addon captions"><h3>Подсказка</h3><p>Уменьшение социального капитала происходит частями по 1/<span class="median-props" rel="withdraw_intervals">&hellip;</span> от всего доступного капитала в сутки с момента активации уменьшения.</p></div>

						<p><hr><a data-href="/assets/">&larr; Вернуться</a></p>

						<div class="table-view captions">
							<div class="table-header">
								<h3>История уменьшения социального капитала <span class="loading">Загрузка&hellip;</span></h3>
							</div>
							<div class="table-data history" data-operations="fill_vesting_withdraw,withdraw_vesting" data-lower-bound="" data-upper-bound="">
							</div>
							<div class="table-footer">
								<a class="inline-button history-load-more-action">Загрузить ещё &#10140;</a>
							</div>
						</div>
					</div>
				</div>
				<div class="page page-delegate-shares" data-title="Делегировать социальный капитал">
					<div class="card">
						<h3>Делегировать социальный капитал</h3>
						<div class="shares-balance table-view captions">
							<div class="table-header">
								<h3>Социальный капитал</h3>
							</div>
							<div class="table-data">
								<div class="columns-view adaptive-hide-flex">
									<div class="column-view column-3">собственный</div>
									<div class="column-view column-3">делегировано</div>
									<div class="column-view column-flex">эффективный</div>
								</div>
								<div class="columns-view">
									<div class="column-view column-3 vesting-shares">&hellip;</div>
									<div class="column-view column-3 delegated-vesting-shares received-vesting-shares">&hellip;</div>
									<div class="column-view column-flex effective-vesting-shares">&hellip;</div>
								</div>
							</div>
							<div class="table-footer">

							</div>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Получатель:</span>
								<input type="text" name="delegate-shares-account" class="simple-rounded" placeholder="">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Делегировать:</span>
								<input type="text" name="delegate-shares-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
								<span class="input-caption text-small grey captions delegate-shares-max-tokens-amount-action">(максимум <span class="effective-vesting-shares">&hellip;</span>)</span>
							</label>
						</p>
						<p class="red delegate-shares-error"></p>
						<p class="green delegate-shares-success"></p>
						<p>
							<input class="delegate-shares-action green-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-green icon-check"></span>
						</p>

						<div class="addon captions"><h3>Подсказка</h3><p>Если вы решите делегировать другую сумму капитала тому же аккаунту, необходимо указать эту новую сумму.</p></div>

						<p><hr><a data-href="/assets/">&larr; Вернуться</a></p>
					</div>
					<div class="card">
						<h3>Исходящее делегирование</h3>
						<div class="table-view outcome-delegations captions">
							<div class="table-header">
								<div class="columns-view adaptive-hide-flex">
									<div class="column-view column-3">Аккаунт</div>
									<div class="column-view column-3">Капитал</div>
									<div class="column-view column-flex">Действие</div>
								</div>
								<div class="columns-view adaptive-show-flex">
									<div class="column-view column-flex"></div>
								</div>
							</div>
							<div class="table-data">
							</div>
							<div class="table-footer">Отображается максимум 1000 записей</div>
						</div>
					</div>
					<div class="card">
						<h3>Входящее делегирование</h3>
						<div class="table-view income-delegations captions">
							<div class="table-header">
								<div class="columns-view adaptive-hide-flex">
									<div class="column-view column-3">Аккаунт</div>
									<div class="column-view column-flex">Капитал</div>
								</div>
								<div class="columns-view adaptive-show-flex">
									<div class="column-view column-flex"></div>
								</div>
							</div>
							<div class="table-data">
							</div>
							<div class="table-footer">Отображается максимум 1000 записей</div>
						</div>
					</div>
				</div>
				<div class="page page-transfer" data-title="Перевести">
					<div class="card">
						<h3>Перевести</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token" class="fill-transfer-amount-action cursor">&hellip;</span> viz</div>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Шаблон:</span>
								<select name="transfer-template" class="simple-rounded simple-rounded-size">
									<option value="0" selected>Не используется</option>
									<option value="1" data-account="xchng" data-tokens-amount-fee="5" data-memo="log:" data-memo-format="log:BITSHARES-LOGIN" data-memo-check="^log:([a-z0-9\-\.]*)$">XCHNG на BitShares</option>
								</select>
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Получатель:</span>
								<input type="text" name="transfer-account" class="simple-rounded" placeholder="">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Сумма:</span>
								<input type="text" name="transfer-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
								<span class="input-caption text-small grey captions transfer-tokens-amount-caption" style="display:none">(комиссия: <span class="transfer-tokens-amount-fee">&hellip;</span>)</span>
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Заметка:</span>
								<input type="text" name="transfer-memo" class="simple-rounded" placeholder="">
								<span class="input-caption text-small grey captions transfer-memo-caption" style="display:none">(формат: <span class="transfer-memo-format">&hellip;</span>)</span>
							</label>
						</p>
						<p class="red transfer-error"></p>
						<p class="green transfer-success"></p>
						<p>
							<input class="transfer-action green-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-green icon-check"></span>
						</p>

						<div class="addon captions"><h3>Подсказка</h3><p>Используйте шаблоны для стандартных переводов, чтобы не допустить ошибку, которая может привести к потере средств.</p></div>

						<p><hr><a data-href="/assets/">&larr; Вернуться</a></p>

						<div class="table-view captions">
							<div class="table-header">
								<h3>История переводов <span class="loading">Загрузка&hellip;</span></h3>
							</div>
							<div class="table-data history" data-operations="transfer" data-lower-bound="" data-upper-bound="">
							</div>
							<div class="table-footer">
								<a class="inline-button history-load-more-action">Загрузить ещё &#10140;</a>
							</div>
						</div>
					</div>
				</div>
				<div class="page page-checks" data-title="Чеки">
					<div class="card">
						<h3>Чеки</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Сумма:</span>
								<input type="text" name="invites-create-amount" class="simple-rounded" placeholder="0.00 viz">
								<span class="input-caption text-small grey captions">(минимум: <span class="create-invite-min-balance">&hellip;</span>)</span>
							</label>
						</p>
						<p class="red invites-create-error"></p>
						<p class="green invites-create-success"></p>
						<p>
							<input class="invites-create-action green-button captions" type="button" value="Выписать чек">
							<span class="submit-button-ring" rel="create"></span>
							<span class="icon icon-margin hidden icon-color-green icon-check" rel="create"></span>
						</p>
						<div class="invites-create hidden"></div>
						<hr>
						<p>
							<label class="input-descr">
								<span class="input-caption">Код погашения:</span>
								<input type="text" name="invites-claim-code" class="simple-rounded" placeholder="5K...">
								<span class="input-caption text-small grey captions invites-claim-code-caption" style="display:none">(содержит: <span class="invites-claim-code-balance">&hellip;</span>)</span>
							</label>
						</p>
						<p class="red invites-claim-error"></p>
						<p class="green invites-claim-success"></p>
						<p>
							<input class="invites-claim-action green-button captions" type="button" value="Погасить чек в кошелёк">
							<input class="invites-use-action green-button captions" type="button" value="Погасить чек в капитал">
							<span class="submit-button-ring" rel="claim"></span>
							<span class="icon icon-margin hidden icon-color-green icon-check" rel="claim"></span>
						</p>

						<div class="addon captions"><h3>Подсказка</h3><p>После создания чека вы получите код для его погашения. Обязательно сохраните его, так как при его потере восстановление невозможно.</p></div>

						<p><hr><a data-href="/assets/">&larr; Вернуться</a></p>

						<div class="table-view captions">
							<div class="table-header">
								<h3>Чековая книжка <span class="loading">Загрузка&hellip;</span></h3>
							</div>
							<div class="table-data history" data-operations="create_invite,claim_invite_balance,use_invite_balance" data-lower-bound="" data-upper-bound="">
							</div>
							<div class="table-footer">
								<a class="inline-button history-load-more-action">Загрузить ещё &#10140;</a>
							</div>
						</div>
					</div>
				</div>

				<div class="page page-award" data-title="Наградить">
					<div class="card">
						<h3>Наградить</h3>
						<div class="account-balance captions">
							<div>Энергия: <span rel="energy">&hellip;</span>%</div>
							<div>Капитал: <span rel="effective_shares">&hellip;</span> viz</div>
						</div>
						<p>
							<label class="input-descr">
								<span class="input-caption">Получатель:</span>
								<input type="text" name="award-account" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Затрачиваемая энергия:</span>
								<input type="text" name="award-energy" class="simple-rounded" placeholder="0.00%">
							</label>
							<span class="range-slider">
								<input class="range-slider-input range-slider-color-green simple-rounded-size" data-result-element="input[name=award-energy]" data-input-element=".page-award .account-balance span[rel=effective_shares]" type="range" value="0" min="0" max="10000" step="1">
								<span class="range-slider-value captions" rel="amount">~0.00 viz</span>
							</span>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Заметка:</span>
								<input type="text" name="award-memo" class="simple-rounded" placeholder="">
							</label>
						</p>
						<p class="red award-error"></p>
						<p class="green award-success"></p>
						<p>
							<input class="award-action green-button captions" type="button" value="Наградить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-green icon-check"></span>
						</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>На данной странице отображается эффективный социальный капитал, который учитывает делегирование.</p>
							<p>Реальный размер награды может немного отличаться от указанного.</p>
						</div>

						<p><hr><a data-href="/assets/">&larr; Вернуться</a></p>

						<div class="table-view captions">
							<div class="table-header">
								<h3>История награждений <span class="loading">Загрузка&hellip;</span></h3>
							</div>
							<div class="table-data history" data-operations="award,receive_award" data-lower-bound="" data-upper-bound="">
							</div>
							<div class="table-footer">
								<a class="inline-button history-load-more-action">Загрузить ещё &#10140;</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="view view-dao">
				<div class="page page-index">
					<div class="card transparent">
						<h3 class="adaptive-show-block">ДАО</h3>
						<div class="columns-view">
							<div class="column column-2 shadow">
								<h4 class="center captions">Делегаты</h4>
								<!--<div class="icon icon-wide icon-150px icon-color-orange icon-witnesses"></div>-->
								<div class="wide-buttons captions">
									<a class="wide-button color-orange" data-href="/dao/witnesses/">Голосовать</a>
									<a class="wide-button color-orange" data-href="/dao/witness-params/">Установить параметры</a>
								</div>
							</div>
							<div class="column column-2 shadow">
								<h4 class="center captions">Фонд</h4>
								<!--<div class="icon icon-wide icon-150px icon-color-orange icon-fund"></div>-->
								<div class="wide-buttons captions">
									<a class="wide-button color-orange" data-href="/dao/fund-create-request/">Подать заявку</a>
									<a class="wide-button color-orange" data-href="/dao/fund-requests/">Рассмотреть заявки</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="page page-witnesses" data-title="Голосовать за делегатов">
					<div class="card">
						<h3>Голосовать за делегатов</h3>
						<div class="account-balance captions">
							<div>Капитал: <span rel="shares">&hellip;</span> viz</div>
						</div>
						<p>Поставьте галочки напротив выбранных вами делегатов. Ваш голос будет учтён немедленно.</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>При голосовании за делегатов учитывается ваш собственный социальный капитал без учёта делегирования.<br>
							Вес голоса равен собственному социальному капиталу, делённому на количество выбранных делегатов.</p>
						</div>
						<div class="witnesses-list"><p class="loading"><span class="submit-button-ring" style="display:inline-block"></span> Загрузка&hellip;</p></div>
						<div class="inactive-witnesses-list"></div>

						<p><hr><a data-href="/dao/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-witness-params" data-title="Установить параметры">
					<div class="card">
						<h3>Установить параметры</h3>
						<p>Объявите себя делегатом и/или установите голосуемые параметры блокчейна.</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Ссылка на заявление делегата:</span>
								<input type="text" name="witness-setup-url" class="simple-rounded" placeholder="https://">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Ключ подписи (публичный):</span>
								<input type="text" name="witness-setup-signing-key" class="simple-rounded" placeholder="VIZ...">
								<span class="input-caption text-small grey captions witness-setup-signing-key-action">(сгенерировать: <span class="witness-setup-signing-private-key">&mdash;</span>)</span>
							</label>
						</p>
						<label class="check color-red fee-checkbox">При объявлении аккаунта делегатом с вашего кошелька будет списано <span class="median-props" rel="witness_declaration_fee">&hellip; viz</span>.<input type="checkbox" name="witness-declaration-fee"><span class="mark"></span></label>
						<p class="red witness-setup-error"></p>
						<p class="green witness-setup-success"></p>
						<p>
							<input class="witness-setup-action orange-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring" rel="setup"></span>
							<span class="icon icon-margin hidden icon-color-orange icon-check" rel="setup"></span>
						</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>Вы можете установить ключ подписи пустым, чтобы временно или насовсем отключить делегата.</p>
						</div>
						<div class="witness-set-props"></div>

						<p><hr><a data-href="/dao/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-fund-create-request" data-title="Подать заявку">
					<div class="card">
						<h3>Подать заявку</h3>
						<p>
							<label class="input-descr">
								<span class="input-caption">Краткое описание заявки (не более 200 знаков):</span>
								<input type="text" name="fund-create-request-descr" class="simple-rounded wide" placeholder="" maxlength="200">
							</label>
						</p>

						<p>
							<label class="input-descr">
								<span class="input-caption">Ссылка на текст заявки:</span>
								<input type="text" name="fund-create-request-url" class="simple-rounded wide" placeholder="https://">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт получателя средств:</span>
								<input type="text" name="fund-create-request-worker" class="simple-rounded" placeholder="">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Минимальная сумма:</span>
								<input type="text" name="fund-create-request-min-amount" class="simple-rounded" placeholder="0.00 viz">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Максимальная сумма (не более 500 000.00 viz):</span>
								<input type="text" name="fund-create-request-max-amount" class="simple-rounded" placeholder="0.00 viz">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Длительность рассмотрения заявки в днях (от 5 до 30):</span>
								<input type="text" name="fund-create-request-duration" class="simple-rounded" placeholder="0">
							</label>
						</p>
						<label class="check color-red fee-checkbox">При создании заявки с вашего кошелька будет списано <span class="median-props" rel="committee_create_request_fee">&hellip; viz</span>.<input type="checkbox" name="committee-create-request-fee"><span class="mark"></span></label>
						<p class="red fund-create-request-error"></p>
						<p class="green fund-create-request-success"></p>
						<p>
							<input class="fund-create-request-action orange-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-orange icon-check"></span>
						</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>Подать можно не более 1 заявки в сутки.</p>
						</div>

						<p><hr><a data-href="/dao/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-fund-requests" data-title="Рассмотреть заявки">
					<div class="card">
						<div class="section-fund-request section">
						</div>
						<div class="section-fund-requests section">
							<h3>Рассмотреть заявки</h3>
							<div class="account-balance captions">
								<div>Баланс фонда: <span class="fund-balance">&hellip;</span></div>
							</div>
							<div class="fund-requests fund-active-requests" data-status="0"></div>
							<p><hr><a class="inline-button color-orange no-margin fund-show-others-requests captions">Показать другие заявки &rarr;</a></p>
							<div class="fund-others">
								<div class="fund-requests fund-approved-requests" data-status="4"><h3>Одобренные заявки</h3></div>
								<div class="fund-requests fund-paid-requests" data-status="5"><h3>Выплаченные заявки</h3></div>
								<div class="fund-requests fund-refused-by-votes-requests" data-status="2"><h3>Недостаточно голосов</h3></div>
								<div class="fund-requests fund-refused-by-amount-requests" data-status="3"><h3>Минимальная сумма заявки не согласована</h3></div>
								<div class="fund-requests fund-canceled-requests" data-status="1"><h3>Отменены создателем</h3></div>
							</div>

							<p><hr><a data-href="/dao/">&larr; Вернуться</a></p>
						</div>
					</div>
				</div>
			</div>

			<div class="view view-market">
				<div class="page page-index">
					<div class="card transparent">
						<h3 class="adaptive-show-block">Магазин</h3>
						<div class="columns-view">
							<!--
								<div class="column column-4 shadow">
									<h4 class="center captions">Визы</h4>
									<div class="icon icon-wide icon-100px icon-color-red icon-send-token-long"></div>
									<div class="wide-buttons size3 captions">
										<a class="wide-button color-red" data-href="/market/deposit/">Пополнить</a>
									</div>
								</div>
							-->
							<div class="column column-3 shadow grid">
								<h4 class="center captions">Аккаунты</h4>
								<!--<div class="icon icon-wide icon-100px icon-color-red icon-buy-account"></div>-->
								<div class="wide-buttons captions">
									<a class="wide-button color-red" data-href="/market/buy-account/">Купить</a>
									<a class="wide-button color-red" data-href="/market/sell-account/">Продать</a>
								</div>
							</div>
							<div class="column column-3 shadow grid">
								<h4 class="center captions">Субаккаунты</h4>
								<!--<div class="icon icon-wide icon-100px icon-color-red icon-buy-subaccount"></div>-->
								<div class="wide-buttons captions">
									<a class="wide-button color-red" data-href="/market/buy-subaccount/">Купить</a>
									<a class="wide-button color-red" data-href="/market/sell-subaccount/">Продать</a>
								</div>
							</div>
							<div class="column column-3 shadow grid">
								<h4 class="center captions">Подписки</h4>
								<!--<div class="icon icon-wide icon-100px icon-color-red icon-paid-subscription"></div>-->
								<div class="wide-buttons captions">
									<a class="wide-button color-red" data-href="/market/paid-subscriptions/">Найти</a>
									<a class="wide-button color-red" data-href="/market/active-paid-subscriptions/">Управлять</a>
									<a class="wide-button color-red create-edit-paid-subscribe-caption" data-href="/market/create-paid-subscribe/">Создать</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="page page-buy-account" data-title="Купить аккаунт">
					<div class="card">
						<h3>Купить аккаунт</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
						</div>
						<div class="buy-account-confirmation section">
							<p>
								<label class="input-descr">
									<span class="input-caption">Покупка аккаунта:</span>
									<input type="text" name="buy-account-login" class="simple-rounded" disabled>
								</label>
							</p>
							<p>
								<label class="input-descr">
									<span class="input-caption">Цена аккаунта:</span>
									<input type="text" name="buy-account-offer-price" class="simple-rounded" disabled>
								</label>
							</p>
							<p>
								<label class="input-descr">
									<span class="input-caption">Дополнительно перевести в капитал:</span>
									<input type="text" name="buy-account-token-to-shares" class="simple-rounded" placeholder="1.00 viz">
								</label>
							</p>
							<p class="red buy-account-error"></p>
							<p>
								<input class="buy-account-action red-button captions" type="button" value="Подтвердить покупку">
								<span class="submit-button-ring"></span>
								<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
							</p>
							<div class="addon captions">
								<h3>Подсказка</h3>
								<p>После покупки у аккаунта будет один приватный ключ для всех типов операций, для их разделения воспользуйтесь <a data-href="/accounts/reset-access/">сбросом ключей</a> (вы сможете сделать это через час после покупки).</p>
							</div>
							<div class="account-keys hidden">
								<h3 class="left">Поздравляем!</h3>

								<p>Приобретенный аккаунт: <span class="green account-login"></span></p>

								<p>Ключи:</p>

								<p><span class="master-key captions">&hellip;</span> &mdash; master или главный ключ</p>
								<p><span class="active-key captions">&hellip;</span> &mdash; active или активный ключ</p>
								<p><span class="regular-key captions">&hellip;</span> &mdash; regular или обычный ключ</p>
								<p><span class="memo-key captions">&hellip;</span> &mdash; memo или ключ заметок</p>

								<p>Сохраните ключи прямо сейчас!</p>
							</div>

							<p><hr><a data-href="/market/buy-account/">&larr; Вернуться</a></p>
						</div>
						<div class="accounts-on-sale section table-view captions">
							<p>
								<label>
									<input name="account-filter" class="simple-rounded simple-rounded-size">
									&mdash; Фильтр по имени аккаунта
								</label>
							</p>
							<p>
								<label>
									<select name="order" class="simple-rounded simple-rounded-size">
										<option value="+price" selected>Цена по возрастанию</option>
										<option value="-price">Цена по убыванию</option>
									</select>
									&mdash; Сортировка
								</label>
							</p>
							<div class="table-header columns-view">
								<div class="column-view column-4">Аккаунт</div>
								<div class="column-view column-flex">Цена</div>
							</div>
							<div class="table-data"></div>
							<div class="table-footer"></div>

							<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
						</div>
					</div>
				</div>
				<div class="page page-buy-subaccount" data-title="Купить субаккаунт">
					<div class="card">
						<h3>Купить субаккаунт</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
						</div>
						<div class="buy-subaccount-confirmation section">
							<p>
								<label class="input-descr">
									<span class="input-caption">Покупка субаккаунта (с суффиксом <strong>.</strong><span class="account-login bold"></span>):</span>
									<input type="text" name="buy-subaccount-login" class="simple-rounded" data-suffix="">
								</label>
							</p>
							<p>
								<label class="input-descr">
									<span class="input-caption">Цена:</span>
									<input type="text" name="buy-subaccount-offer-price" class="simple-rounded" disabled>
								</label>
							</p>
							<p>
								<label class="input-descr">
									<span class="input-caption">Дополнительно перевести в капитал:</span>
									<input type="text" name="buy-subaccount-token-to-shares" class="simple-rounded" placeholder="1.00 viz">
								</label>
							</p>
							<p class="red buy-subaccount-error"></p>
							<p>
								<input class="buy-subaccount-action red-button captions" type="button" value="Подтвердить покупку">
								<span class="submit-button-ring"></span>
								<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
							</p>
							<div class="addon captions">
								<h3>Подсказка</h3>
								<p>Для покупки субаккаунта необходимо сразу перевести ему в капитал как минимум <span class="median-props" rel="account_creation_fee">1 viz</span>.</p>
								<p>После покупки у аккаунта будет один приватный ключ для всех типов операций, для их разделения воспользуйтесь <a data-href="/accounts/reset-access/">сбросом ключей</a> (вы сможете сделать это через час после покупки).</p>
							</div>
							<div class="account-keys hidden">
								<h3 class="left">Поздравляем!</h3>

								<p>Приобретенный аккаунт: <span class="green account-login"></span></p>

								<p>Ключи:</p>

								<p><span class="master-key captions">&hellip;</span> &mdash; master или главный ключ</p>
								<p><span class="active-key captions">&hellip;</span> &mdash; active или активный ключ</p>
								<p><span class="regular-key captions">&hellip;</span> &mdash; regular или обычный ключ</p>
								<p><span class="memo-key captions">&hellip;</span> &mdash; memo или ключ заметок</p>

								<p>Сохраните ключи прямо сейчас!</p>
							</div>

							<p><hr><a data-href="/market/buy-subaccount/">&larr; Вернуться</a></p>
						</div>
						<div class="subaccounts-on-sale section table-view captions">
							<p>
								<label>
									<input name="subaccount-filter" class="simple-rounded simple-rounded-size">
									&mdash; Фильтр по имени аккаунта
								</label>
							</p>
							<p>
								<label>
									<select name="order" class="simple-rounded simple-rounded-size">
										<option value="+price" selected>Цена по возрастанию</option>
										<option value="-price">Цена по убыванию</option>
									</select>
									&mdash; Сортировка
								</label>
							</p>
							<div class="table-header columns-view">
								<div class="column-view column-4">Аккаунт</div>
								<div class="column-view column-flex">Цена</div>
							</div>
							<div class="table-data"></div>
							<div class="table-footer"></div>

							<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
						</div>
					</div>
				</div>
				<div class="page page-sell-account" data-title="Продать аккаунт">
					<div class="card">
						<h3>Продать аккаунт</h3>
						<p>Внимание! При продаже аккаунта весь баланс и капитал переходят к покупателю.<br>Вам необходимо указать аккаунт продавца, которому пойдет оплата за покупку аккаунта.</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт на продажу:</span>
								<input type="text" name="set-account-login" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Главный ключ (master) от аккаунта на продажу:</span>
								<input type="text" name="set-account-master-key" class="simple-rounded" placeholder="5K...">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Цена аккаунта:</span>
								<input type="text" name="set-account-price" class="simple-rounded" placeholder="0.00 viz">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт продавца:</span>
								<input type="text" name="set-account-seller" class="simple-rounded">
							</label>
						</p>
						<p><label class="radio color-red">Выставить на продажу<input type="radio" name="set-account-on-sale" value="true"><span class="mark"></span></label></p>
						<p><label class="radio color-red">Снять с продажи<input type="radio" name="set-account-on-sale" value="false"><span class="mark"></span></label></p>
						<label class="check color-red fee-checkbox">При подаче заявки на продажу аккаунта с вашего кошелька будет списано <span class="median-props" rel="account_on_sale_fee">&hellip; viz</span>.<input type="checkbox" name="account-on-sale-fee"><span class="mark"></span></label>
						<p class="red sell-account-error"></p>
						<p class="green sell-account-success"></p>
						<p>
							<input class="sell-account-action red-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
						</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>Аккаунт будет выставлен на продажу через 7 суток после подачи заявки. Это необходимая мера борьбы с продажей украденных аккаунтов.</p>
						</div>
						<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-sell-subaccount" data-title="Продать субаккаунт">
					<div class="card">
						<h3>Продать субаккаунт</h3>
						<p>Внимание! При продаже субаккаунтов покупатель сможет самостоятельно выбрать имя аккаунта.<br>Вам необходимо указать аккаунт продавца, которому пойдет оплата за покупку аккаунта.</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт выставляющий субаккаунты на продажу:</span>
								<input type="text" name="set-subaccount-login" class="simple-rounded">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Главный ключ (master):</span>
								<input type="text" name="set-subaccount-master-key" class="simple-rounded" placeholder="5K...">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Цена за субаккаунт:</span>
								<input type="text" name="set-subaccount-price" class="simple-rounded" placeholder="0.00 viz">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт продавца:</span>
								<input type="text" name="set-subaccount-seller" class="simple-rounded">
							</label>
						</p>
						<p><label class="radio color-red">Выставить субаккаунты на продажу<input type="radio" name="set-subaccount-on-sale" value="true"><span class="mark"></span></label></p>
						<p><label class="radio color-red">Снять субаккаунты с продажи<input type="radio" name="set-subaccount-on-sale" value="false"><span class="mark"></span></label></p>
						<label class="check color-red fee-checkbox">При подаче заявки на продажу субаккаунтов с вашего кошелька будет списано <span class="median-props" rel="subaccount_on_sale_fee">&hellip; viz</span>.<input type="checkbox" name="subaccount-on-sale-fee"><span class="mark"></span></label>
						<p class="red sell-subaccount-error"></p>
						<p class="green sell-subaccount-success"></p>
						<p>
							<input class="sell-subaccount-action red-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
						</p>

						<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-deposit" data-title="Пополнить">
					<div class="card">
						<h3>Пополнить</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
						</div>
						<p>
							Пополнить кошелёк ВИЗ можно несколькими способами:<br>
						</p>
						<ul class="simple">
							<li>Для перевода с другого аккаунта достаточно указать ваш аккаунт <span class="bold current_user"></span></li>
							<li>Для получения viz с биржи <a href="https://wallet.bitshares.org/" target="_blank">Bitshares</a> в ваш кошелёк, перейдите на неё и переведите токены XCHNG.VIZ на адрес <strong>xchng-viz</strong> с заметкой <strong>log:<span class="bold current_user"></span></strong></li>
							<li>Также вы можете купить viz за обычные деньги или биткоины:<br>
								&mdash; <a href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2742298&amp;lang=ru-RU" target="_blank">Покупка VIZ на $2</a><br>
								&mdash; <a href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2742300&amp;lang=ru-RU" target="_blank">Покупка VIZ на $5</a><br>
								&mdash; <a href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2742303&amp;lang=ru-RU" target="_blank">Покупка VIZ на $10</a>
							</li>
						</ul>
						<p>Полученный после оплаты код введите здесь:</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Аккаунт:</span>
								<input type="text" name="deposit-account" class="simple-rounded" placeholder="">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Код:</span>
								<input type="text" name="deposit-claim-code" class="simple-rounded" placeholder="">
							</label>
						</p>
						<p class="red deposit-error"></p>
						<p class="green deposit-success"></p>
						<p>
							<input class="deposit-action red-button captions" type="button" value="Получить">
							<span class="submit-button-ring"></span>
							<span class="icon icon-margin hidden icon-color-red icon-check"></span>
						</p>
						<div class="addon captions">
							<h3>Предупреждение</h3>
							<p>Цена viz, купленных этим способом, скорее всего, будет заметно хуже биржевой из-за сложностей в продаже токенов за обычные деньги, комиссий посредников (и за это тоже мы не любим банки) и других причин.</p>
						</div>

						<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-paid-subscriptions" data-title="Обзор доступных подписок">
					<div class="card">
						<div class="section view-paid-subscription">
							<h3>Соглашение с провайдером подписки <span class="provider-account bold"></span></h3>
							<div class="account-balance captions">
								<div>Баланс: <span rel="token">&hellip;</span> viz</div>
							</div>
							<div class="edit-paid-subscription"></div>
							<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
						</div>
						<div class="section view-paid-subscriptions">
							<h3>Обзор доступных подписок</h3>
							<div class="table-view captions">
								<p>
									<label>
										<input name="provider-filter" class="simple-rounded simple-rounded-size">
										&mdash; Поиск по провайдеру
									</label>
								</p>
								<p>
									<label>
										<input name="descr-filter" class="simple-rounded simple-rounded-size">
										&mdash; Поиск по описанию
									</label>
								</p>
								<p>
									<label>
										<select name="order" class="simple-rounded">
											<option value="+provider" selected>Аккаунт провайдера по возрастанию</option>
											<option value="-provider">Аккаунт провайдера по убыванию</option>
											<option value="+amount">Цена по возрастанию</option>
											<option value="-amount">Цена по убыванию</option>
											<option value="+sub_count">Количество подписчиков по возрастанию</option>
											<option value="-sub_count">Количество подписчиков по убыванию</option>
											<option value="+sub_amount">Сумма платежей по возрастанию</option>
											<option value="-sub_amount">Сумма платежей по убыванию</option>
										</select>
										&mdash; Сортировка
									</label>
								</p>
								<div class="table-header">
									<div class="columns-view adaptive-hide-flex">
										<div class="column-view column-flex"></div>
										<!--
										<div class="column-view column-4">Провайдер</div>
											<div class="column-view column-6">Срок</div>
											<div class="column-view column-6">Уровней</div>
											<div class="column-view column-6">Стоимость</div>
										<div class="column-view column-flex">Информация</div>
										-->
									</div>
									<div class="columns-view adaptive-show-flex">
										<div class="column-view column-flex"></div>
									</div>
								</div>
								<div class="table-data"></div>
								<div class="table-footer"></div>
							</div>
							<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
						</div>
					</div>
				</div>
				<div class="page page-active-paid-subscriptions" data-title="Управлять подписками">
					<div class="card">
						<h3>Управлять подписками</h3>
						<div class="account-balance captions">
							<div>Баланс: <span rel="token">&hellip;</span> viz</div>
						</div>
						<p>Активные подписки аккаунта <span class="current_user bold"></span>.</p>
						<div class="active-paid-subscriptions">
							<div class="table-view captions">
								<div class="table-header">
									<div class="columns-view adaptive-hide-flex">
										<div class="column-view column-5">Провайдер</div>
										<div class="column-view column-5">Срок</div>
										<div class="column-view column-5">Уровень</div>
										<div class="column-view column-5">Сумма</div>
										<div class="column-view column-flex">Дата пролонгации</div>
									</div>
									<div class="columns-view adaptive-show-flex">
										<div class="column-view column-flex"></div>
									</div>
								</div>
								<div class="table-data"></div>
								<div class="table-footer"></div>
							</div>
						</div>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>Если на момент пролонгации (автоматического продления подписки) недостаточно средств в кошельке, подписка останавливается и переносится в список неактивных.</p>
						</div>
						<a class="show-inactive-paid-subscriptions-action">Показать неактивные подписки (завершенные или просроченные)</a>
						<div class="inactive-paid-subscriptions hidden">
							<h3>Неактивные подписки</h3>
							<div class="table-view captions">
								<div class="table-header">
									<div class="columns-view adaptive-hide-flex">
										<div class="column-view column-5">Провайдер</div>
										<div class="column-view column-5">Срок</div>
										<div class="column-view column-5">Уровень</div>
										<div class="column-view column-5">Сумма</div>
										<div class="column-view column-flex">Дата завершения</div>
									</div>
									<div class="columns-view adaptive-show-flex">
										<div class="column-view column-flex"></div>
									</div>
								</div>
								<div class="table-data"></div>
								<div class="table-footer"></div>
							</div>
						</div>
						<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
					</div>
				</div>
				<div class="page page-create-paid-subscribe" data-title="Создать или изменить подписку">
					<div class="card">
						<h3><span class="create-edit-paid-subscribe-caption">Создать или изменить</span> подписку</h3>
						<p>
							Создатель соглашения (провайдер): <span class="current_user bold"></span>.
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Описание (до 1000 символов):</span>
								<input type="text" name="create-paid-subscribe-descr" class="simple-rounded wide" maxlength="1000" placeholder="">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Ссылка на условия соглашения:</span>
								<input type="text" name="create-paid-subscribe-url" class="simple-rounded wide" maxlength="1000" placeholder="https://">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Количество доступных уровней подписки:</span>
								<input type="text" name="create-paid-subscribe-levels" class="simple-rounded" placeholder="">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Цена за уровень:</span>
								<input type="text" name="create-paid-subscribe-amount" class="simple-rounded" placeholder="0.00 viz">
							</label>
						</p>
						<p>
							<label class="input-descr">
								<span class="input-caption">Срок действия подписки после оплаты (количество дней):</span>
								<input type="text" name="create-paid-subscribe-period" class="simple-rounded" placeholder="0">
							</label>
						</p>
						<p><label class="check color-red">Обязуюсь выполнять условия соглашения<input type="checkbox" name="create-paid-subscribe-agreement"><span class="mark"></span></label></p>
						<!--<p><label class="radio color-red">Остановить заключение соглашений<input type="radio" name="create-paid-subscribe-agreement" value="false"><span class="mark"></span></label></p>-->
						<label class="check color-red fee-checkbox">При создании подписки с вашего кошелька будет списано <span class="median-props" rel="create_paid_subscription_fee">&hellip; viz</span>.<input type="checkbox" name="create-paid-subscribe-fee"><span class="mark"></span></label>
						<p class="red create-paid-subscribe-error"></p>
						<p class="green create-paid-subscribe-success"></p>
						<p>
							<input class="create-paid-subscribe-action red-button captions" type="button" value="Подтвердить">
							<span class="submit-button-ring" rel="create"></span>
							<span class="icon icon-margin hidden icon-color-red icon-check" rel="create"></span>
						</p>
						<p>
							<input class="cancel-paid-subscribe-action red-button captions" type="button" value="Остановить подписку">
							<span class="submit-button-ring" rel="cancel"></span>
							<span class="icon icon-margin hidden icon-color-red icon-check" rel="cancel"></span>
						</p>
						<div class="addon captions">
							<h3>Подсказка</h3>
							<p>Один аккаунт может создать только одну подписку. Допускается изменение условий соглашения о подписке и прекращение её действия. Нарушение условий соглашения отразится на вашей репутации. Все соглашения и изменения в них записаны в блокчейн и могут быть проверены.<br>
							После остановки подписки заключённые соглашения продолжат действовать до истечения их срока, а новые соглашения заключаться не будут.</p>
						</div>

						<p><hr><a data-href="/market/">&larr; Вернуться</a></p>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
<div class="go-top adaptive-show-block">&uarr;</div>
</body>
</html>