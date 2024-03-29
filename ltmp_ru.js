var ltmp_ru_arr={
	menu_preset:`
		<a class="menu-el color-blue" data-href="/accounts/">Аккаунты</a>
		<a class="menu-el color-green" data-href="/assets/">Активы</a>
		<a class="menu-el color-orange" data-href="/dao/">ДАО</a>
		<a class="menu-el color-red" data-href="/market/">Магазин</a>`,
	preset_view_index:`
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
				<p>
					<label class="input-descr">
						<span class="input-caption">Приватный ключ заметок:</span>
						<input type="text" name="memo-key" class="simple-rounded">
						<span class="input-caption text-small grey captions">(опционально)</span>
					</label>
				</p>
				<p class="red error"></p>
				<p><a class="button user-authentication">Подключить аккаунт</a></p>
				<div class="addon captions"><p>При подключении аккаунта ключ сохраняется в вашем браузере и не передается на сервер. Для удаления ключа из браузера отключите аккаунт или очистите кэш браузера.</p></div>
			</div>
			<div class="session-manage">
				<div class="sessions"></div>
			</div>
			<div>
				<a class="nodes-config-action">Настроить подключение к ноде (необязательно)</a>
			</div>
			<div class="nodes-config hidden">
				<hr>
				<h3>Подключение к ноде</h3>
				<div class="nodes"></div>
			</div>
		</div>`,
	select_lang:`<div class="select-lang captions">{items}</div>`,
	select_lang_item:`<a class="select-lang-action" data-lang="{lang}">{caption}</a>`,
	preset_view_portable:`
		<div class="card">
			<h3>Автономная версия</h3>
			<p>Автономная версия my.VIZ.plus позволяет работать с аккаунтами ВИЗа без подключения к серверу. Даже если подсайт <a href="https://my.viz.plus">https://my.viz.plus</a> будет заблокирован, взломан или по другим причинам временно или постоянно прекратит работу, вы этого не заметите: локальная версия никак не связана с нашим сервером.</p>
			<p>Чтобы пользоваться автономной версией, скачайте (например, на Рабочий стол, чтобы не потерять) единственный файл myvizplus.html, содержащий всё необходимое, и откройте в любом браузере. Он будет работать точно так же, как веб-версия сайта. Единственное отличие: в локальной версии по техническим причинам нет раздела Магазин, он доступен только на сайте.</p>
			<p>Если ваш уровень паранойи зашкаливает, мы предлагаем подключить автономный подсайт к вашей собственной ноде блокчейна VIZ: это можно сделать на стартовой странице без ввода имени пользователя и ключа.</p>
			<p>Автономная версия подсайта my.viz.plus - надёжное, удобное и безопасное решение для управления аккаунтами ВИЗа. Мы рекомендуем пользоваться именно этим вариантом, чтобы не зависеть от доступности и безопасности сайта.</p>
			<p><a href="/portable.php" target="_blank" class="inline-button no-margin captions">Скачать myvizplus.html</a></p>
		</div>`,
	preset_view_portable_title:`Автономная версия`,

	preset_view_login:`
		<div class="card">
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
			<p>
				<label class="input-descr">
					<span class="input-caption">Приватный ключ заметок:</span>
					<input type="text" name="memo-key" class="simple-rounded">
					<span class="input-caption text-small grey captions">(опционально)</span>
				</label>
			</p>
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
		</div>`,

	preset_view_memo:`
		<div class="card">
			<input type="hidden" name="back" value="">
			<p>
				<label class="input-descr">
					<span class="input-caption">Аккаунт:</span>
					<input type="text" name="login" class="simple-rounded" disabled>
				</label>
			</p>
			<p>
				<label class="input-descr">
					<span class="input-caption">Приватный ключ заметок:</span>
					<input type="text" name="memo-key" class="simple-rounded">
				</label>
				<br><span class="input-caption text-small grey captions">(<a class="memo-gen-new-key unselectable">сгенерировать новый</a>)</span>
			</p>
			<p class="red error"></p>
			<p class="green success"></p>
			<p>
				<a class="button save-memo-key-action">Сохранить ключ</a>
				<span class="submit-button-ring"></span>
				<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
			</p>
			<div class="memo-new-key"></div>
			<div class="addon captions">
				Ключ сохраняется в вашем браузере и не передается на сервер. Для удаления ключа из браузера отключите аккаунт или очистите кэш браузера.
			</div>
		</div>`,

	preset_view_accounts:`
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

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
			</div>
		</div>`,

	preset_view_assets:`
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
						<div class="tokens-caption standalone captions"><span class="value">&hellip;</span><span class="symbol"> viz</span></div>
						<div class="wide-buttons captions">
							<a class="wide-button color-green" data-href="/assets/transfer/">Перевести</a>
							<!--<a class="wide-button color-green exchange-button" data-href="/assets/exchange/">Обменять</a>-->
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
					<div>Баланс: <span rel="token" class="fill-stake-shares-amount-action">&hellip;</span> viz</div>
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

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>История увеличения социального капитала <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="transfer_to_vesting" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
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

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>История уменьшения социального капитала <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="fill_vesting_withdraw,withdraw_vesting" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
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
						<span class="input-caption text-small grey captions delegate-shares-max-tokens-amount-action">(максимум <span class="delegate-shares-max-tokens-amount">&hellip;</span>)</span>
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

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>
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
		<div class="page page-booster" data-title="Бустер">
			<div class="card">
				<h3>Бустер</h3>
				<!--
				<div class="account-balance captions">
					<div>Баланс: <span rel="token" class="fill-stake-shares-amount-action">&hellip;</span> viz</div>
					<div>Капитал: <span rel="shares">&hellip;</span> viz</div>
				</div>
				-->
				<p>Получите в аренду социальный капитал в размере <span class="booster-valuation">&hellip;</span> viz на 25 дней.</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Имя аккаунта:</span>
						<input type="text" name="booster-account" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Бустер-код:</span>
						<input type="text" name="booster-code" class="simple-rounded" placeholder="...">
					</label>
				</p>
				<p class="red activate-booster-error"></p>
				<p class="green activate-booster-success"></p>
				<p>
					<input class="activate-booster-action green-button captions" type="button" value="Подтвердить">
					<span class="submit-button-ring" rel="activate-booster"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="activate-booster"></span>
				</p>

				<div class="addon captions"><h3>Подсказка</h3><p>Бустер-коды продаются в партнёрских магазинах: <a href="https://aabbcc.casa/booster/?account=" class="booster_set_account" target="_blank">AABBCC</a>, <a href="https://viz.media/booster-kod/" target="_blank">VIZ.Media</a>. Обновите страницу перед вводом кода, чтобы узнать точное количество получаемого капитала.</div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<script src="/booster.js" type="text/javascript"></script>
			</div>
		</div>
		<div class="page page-exchange" data-title="Сервис обмена">
			<div class="card loading-status">
				<h3>Обмен</h3>
				<p class="wait-loading" style="display:block;"><span class="submit-button-ring" rel="exchange-buy" style="display:inline-block;"></span> Пожалуйста, подождите&hellip;</p>
				<p class="loading-error" style="display:none;">Сервис временно недоступен, попробуйте позже.</p>
			</div>
			<div class="card successful-loading" style="display:none;">
				<div class="addon captions"><h3>Внимание!</h3>
					<p>Сервис обмена действует в бета-режиме, поэтому в его работе возможны сбои и ошибки.</p>
					<p>Если что-то пошло не так, пожалуйста, проявите терпение и сообщите нам о возникшей проблеме по адресу <a href="mailto:vizplus@protonmail.com">vizplus@protonmail.com</a> или в Телеграм-группу <a href="https://t.me/vizplus" target="_blank">@vizplus</a>. Спасибо за понимание!</p>
				</div>
				<h3>Обмен</h3>
				<div class="account-balance captions">
					<div>Баланс: <span rel="token" class="fill-exchange-amount-action">&hellip;</span> viz</div>
				</div>
				<div class="table-view exchange-data captions">
					<div class="table-header">
						<div class="columns-view adaptive-hide-flex">
							<div class="column-view column-3">Резерв</div>
							<div class="column-view column-3">viz</div>
							<div class="column-view column-flex">usdt</div>
						</div>
						<div class="columns-view adaptive-show-flex">
							<!--<div class="column-view column-flex">Данные о резервах</div>-->
							<div class="column-view column-3">Резерв</div>
							<div class="column-view column-3">viz</div>
							<div class="column-view column-flex">usdt</div>
						</div>
					</div>
					<div class="table-data">
						<div class="columns-view adaptive-hide-flex summary">
							<div class="column-view column-3 caption-data">— расчётный</div>
							<div class="column-view column-3 viz-data">&hellip;</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex summary">
							<div class="column-view column-flex caption-data" style="width:10% !important;">Расч.</div>
							<div class="column-view column-3 viz-data" style="width:45% !important;white-space:nowrap;">&hellip;</div>
							<div class="column-view column-3 usdt-data" style="width:35% !important;white-space:nowrap;">&hellip;</div>
						</div>
						<!--
						<div class="columns-view adaptive-show-flex summary">
							<div class="column-view column-flex">Расч.:&nbsp;<span class="viz-data" style="white-space:nowrap;">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data" style="white-space:nowrap;">&hellip;</span>&nbsp;usdt</div>
						</div>
						-->
						<div class="columns-view adaptive-hide-flex hot">
							<div class="column-view column-3 caption-data">— горячий</div>
							<div class="column-view column-3 viz-data">&hellip;</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex hot">
							<div class="column-view column-flex caption-data" style="width:10% !important;">Гор.</div>
							<div class="column-view column-3 viz-data" style="width:45% !important;white-space:nowrap;">&hellip;</div>
							<div class="column-view column-3 usdt-data" style="width:35% !important;white-space:nowrap;">&hellip;</div>
						</div>
						<!--
						<div class="columns-view adaptive-show-flex hot">
							<div class="column-view column-flex">Гор.:&nbsp;<span class="viz-data">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data">&hellip;</span>&nbsp;usdt</div>
						</div>
						-->
						<div class="columns-view adaptive-hide-flex cold">
							<div class="column-view column-3 caption-data">— холодный</div>
							<div class="column-view column-3 viz-data">&hellip;</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex cold">
							<div class="column-view column-flex caption-data" style="width:10% !important;">Хол.</div>
							<div class="column-view column-3 viz-data" style="width:45% !important;white-space:nowrap;">&hellip;</div>
							<div class="column-view column-3 usdt-data" style="width:35% !important;white-space:nowrap;">&hellip;</div>
						</div>
						<!--
						<div class="columns-view adaptive-show-flex cold">
							<div class="column-view column-flex">Хол.:&nbsp;<span class="viz-data">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data">&hellip;</span>&nbsp;usdt</div>
						</div>
						-->
						<div class="columns-view adaptive-hide-flex provision">
							<div class="column-view column-3 caption-data">Обеспечение</div>
							<div class="column-view column-3 viz-data">&hellip;</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex provision">
							<div class="column-view column-flex caption-data" style="width:10% !important;">%</div>
							<div class="column-view column-3 viz-data" style="width:45% !important;white-space:nowrap;">&hellip;</div>
							<div class="column-view column-3 usdt-data" style="width:35% !important;white-space:nowrap;">&hellip;</div>
						</div>
						<!--
						<div class="columns-view adaptive-show-flex provision">
							<div class="column-view column-flex">Обесп.:&nbsp;<span class="viz-data">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data">&hellip;</span>&nbsp;usdt</div>
						</div>
						-->
					</div>

					<div class="table-header">
						<div class="columns-view">
							<div class="column-view column-flex minify"></div>
						</div>
					</div>
					<div class="table-data">
						<div class="columns-view adaptive-hide-flex rate">
							<div class="column-view column-3 caption-data">Учётный курс:</div>
							<div class="column-view column-flex ratio-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex rate">
							<div class="column-view column-flex">Учётный курс:&nbsp;<span class="ratio-data">&hellip;</span></div>
						</div>
					</div>
					<div class="table-footer"><em>Не является обязательством. Реальный курс обмена определяется в момент сделки и зависит от её объёма.</em></div>
				</div>

				<hr><h4 class="center">Покупка viz</h4>
				<div class="table-view exchange-buy-data captions">
					<div class="table-header">
						<div class="columns-view">
							<div class="column-view column-flex minify"></div>
						</div>
					</div>
					<div class="table-data">
						<div class="columns-view min-amount">
							<div class="column-view column-3 caption-data">Мин. покупка</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view max-amount">
							<div class="column-view column-3 caption-data">Макс. покупка</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view input-amount">
							<div class="column-view column-3 caption-data" style="padding:23px 15px;">
								<span class="adaptive-hide bold">Вы хотите купить</span>
								<span class="adaptive-show bold">Купить</span>
							</div>
							<div class="column-view column-flex viz-data" style="display:block !important;">
								<input type="text" name="buy-tokens-amount" class="simple-rounded" placeholder="0.00 viz" style="margin:0;" type="number" step="0.01">
								<div class="red exchange-buy-input-error"></div>
							</div>
						</div>
						<div class="columns-view output-amount">
							<div class="column-view column-3 caption-data">на сумму *</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view rate">
							<div class="column-view column-3 caption-data">
								<span class="adaptive-hide">по средней цене</span>
								<span class="adaptive-show">по цене</span>
							</div>
							<div class="column-view column-flex ratio-data">&hellip;</div>
						</div>
					</div>
					<div class="table-footer left"><em>* комиссия включена</em></div>
				</div>
				<p>Нажмите кнопку "Начать обмен" и получите адрес для перевода токенов USDT(ERC20) в блокчейне Ethereum. В этот момент с вашего аккаунта будет снят <span class="eth_wallet_cost">&hellip; viz</span>.</p>
				<p>Переведите любую сумму USDT в пределах лимитов на полученный адрес (учитывайте изменение курса при изменении суммы и комиссию).</p>
				<p>После поступления USDT обменник отправит соответствующее количество viz на ваш аккаунт, <b>исходя из курса на момент поступления USDT</b>.</p>
				<p>Адрес для отправки USDT действует в течение 1 часа после начала обмена. Каждый адрес уникален и  предназначен только для одного обмена!</p>
				<p class="bold">Не отправляйте USDT на один и тот же адрес повторно!</p>
				<p class="red exchange-buy-error"></p>
				<p class="green exchange-buy-success"></p>
				<p>
					<input class="exchange-buy-action green-button captions" type="button" value="Начать обмен">
					<span class="submit-button-ring" rel="exchange-buy"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-buy"></span>
				</p>
				<div class="exchange-buy-view" style="display:none;">
					<p>
						Адрес для перевода USDT:
						<input type="text" name="exchange-income-eth-address" class="simple-rounded wide" placeholder="ETH адрес" disabled>
					</p>
					<p>
						<input class="exchange-copy-eth-action green-button captions" type="button" value="Копировать"><span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-copy-eth"></span></p>
					<p>
						<input class="exchange-qr-eth-action green-button captions" type="button" value="QR-код"><span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-qr-eth"></span>
					</p>
					<div class="qr-view"></div>
				</div>
				<br>
				<p>Скорость сделки практически полностью зависит от скорости поступления ваших USDT на наш адрес. Выбирайте размер комиссии в блокчейне Ethereum, исходя из этого.</p>


				<hr><h4 class="center">Продажа viz</h4>
				<div class="table-view exchange-sell-data captions">
					<div class="table-header">
						<div class="columns-view">
							<div class="column-view column-flex minify"></div>
						</div>
					</div>
					<div class="table-data">
						<div class="columns-view min-amount">
							<div class="column-view column-3 caption-data">Мин. продажа</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view max-amount">
							<div class="column-view column-3 caption-data">Макс. продажа</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view input-amount">
							<div class="column-view column-3 caption-data" style="padding:23px 15px;">
								<span class="adaptive-hide bold">Вы хотите продать</span>
								<span class="adaptive-show bold">Продать</span>
							</div>
							<div class="column-view column-flex viz-data" style="display:block !important;">
								<input type="text" name="sell-tokens-amount" class="simple-rounded" placeholder="0.00 viz" style="margin:0;">
								<div class="red exchange-sell-input-error"></div>
							</div>
						</div>
						<div class="columns-view output-amount">
							<div class="column-view column-3 caption-data">на сумму *</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view rate">
							<div class="column-view column-3 caption-data">
								<span class="adaptive-hide">по средней цене</span>
								<span class="adaptive-show">по цене</span>
							</div>
							<div class="column-view column-flex ratio-data">&hellip;</div>
						</div>
						<!--
						<div class="columns-view address">
							<div class="column-view column-3 caption-data">Ваш адрес для получения USDT</div>
							<div class="column-view column-flex address-data">
								<input type="text" name="exchange-outcome-eth-address" class="simple-rounded wide" placeholder="ETH адрес" style="margin:0;">
							</div>
						</div>
						-->
					</div>
					<div class="table-footer left"><em>* комиссия включена</em></div>
				</div>
				<div class="exchange-sell-view">
					<p>
						Ваш адрес для получения USDT:
						<input type="text" name="exchange-outcome-eth-address" class="simple-rounded wide" placeholder="ETH адрес">
					</p>
				</div>
				<p class="red exchange-sell-error"></p>
				<p class="green exchange-sell-success"></p>
				<p>
					<input class="exchange-sell-action green-button captions" type="button" value="Обменять" disabled="disabled">
					<span class="submit-button-ring" rel="exchange-sell"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-sell"></span>
				</p>
				<br><!--<div class="addon captions"><h3>Подсказка</h3></div>-->
				<p>Введите количество viz на продажу в пределах лимитов и <b>принадлежащий вам</b> адрес в блокчейне Ethereum для получения USDT(ERC20). Нажмите кнопку "Обменять".</p>
				<p>Продажа viz происходит мгновенно. Время поступления токенов USDT(ERC20) на ваш адрес зависит от работы блокчейна Ethereum и обычно составляет несколько минут.</p>

				<script src="/qrcode.min.js" type="text/javascript"></script>
				<script src="/exchange.js" type="text/javascript"></script>
				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-transfer" data-title="Перевести">
			<div class="card">
				<h3>Перевести</h3>
				<div class="account-balance captions">
					<div>Баланс: <span rel="token" class="fill-transfer-amount-action">&hellip;</span> viz</div>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">Шаблон:</span>
						<select name="transfer-template" class="simple-rounded simple-rounded-size">
							<option value="0" selected>Не используется</option>
							<option value="4" data-account="gph.xchng" data-tokens-amount-fee="10" data-memo="log:" data-memo-format="log:GRAPHENE-LOGIN" data-memo-check="^log:([a-z0-9\-\.]+)$" data-memo-encrypt="false">XCHNG на Graphene</option>
							<option value="1" data-account="xchng" data-tokens-amount-fee="10" data-memo="log:" data-memo-format="log:BITSHARES-LOGIN" data-memo-check="^log:([a-z0-9\-\.]+)$" data-memo-encrypt="false">XCHNG на BitShares</option>
							<option value="2" data-account="gls.xchng" data-tokens-amount-fee="0" data-memo="log:" data-memo-format="log:GOLOS-LOGIN" data-memo-check="^log:([a-z0-9\-\.]+)$" data-memo-encrypt="false">XCHNG на GOLOS</option>
							<option value="3" data-account="vmp" data-tokens-amount-fee="0" data-memo="Mx" data-memo-format="Minter address" data-memo-check="^Mx([a-f0-9\-\.]+)$" data-memo-encrypt="false">VIZCHAIN на Minter</option>

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
				<p class="encode-memo-checkbox">
					<label class="check color-red">Зашифровать заметку<input type="checkbox" name="encode-memo"><span class="mark"></span></label>
				</p>
				<p class="memo-key-optional">
					<label class="input-descr">
						<span class="input-caption">Ключ заметок:</span>
						<input type="text" name="memo-key" class="simple-rounded" placeholder="5K...">
					</label>
				</p>
				<p class="red transfer-error"></p>
				<p class="green transfer-success"></p>
				<p>
					<input class="transfer-action green-button captions" type="button" value="Подтвердить">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check"></span>
				</p>

				<div class="addon captions"><h3>Подсказка</h3>
					<p>Используйте шаблоны для стандартных переводов, чтобы не допустить ошибку, которая может привести к потере средств.</p>
					<p>При шифровании ключ заметок будет сохранён в браузере, пока вы не отключите аккаунт. Если у аккаунта нет ключа заметок, сгенерируйте его в разделе <a data-href="/accounts/">Аккаунты</a> - <a data-href="/accounts/manage-access/">Доступы аккаунта</a>.</p>
				</div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>История переводов <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="transfer" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
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
				<!--
				<p>Сервис XCHNG продаёт чеки viz по ценам, близким к биржевым. При переходе по ссылке вы увидите форму ввода данных. Выберите способ платежа и заполните форму. После оплаты вы получите чек в виде кода из букв и цифр. Введите его в форму погашения чека выше и выберите, как погашать чек.</p>
				<p>
					<a style="text-decoration:none" href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2646644&curr=PYU&ai=844298" target="_blank"><input class="green-button captions" type="button" value="Купить 1000 viz"></a>
					<a style="text-decoration:none" href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2646643&curr=PYU&ai=844298" target="_blank"><input class="green-button captions" type="button" value="Купить 500 viz"></a>
					<a style="text-decoration:none" href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2646642&curr=PYU&ai=844298" target="_blank"><input class="green-button captions" type="button" value="Купить 200 viz"></a>
				</p>

				-->
				<div class="addon captions"><h3>Подсказка</h3><p>После создания чека вы получите код для его погашения. Обязательно сохраните его, так как при его потере восстановление невозможно.</p></div>
				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>Чековая книжка <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="create_invite,claim_invite_balance,use_invite_balance" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
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
				<p>
					<label class="check color-red">Зашифровать заметку<input type="checkbox" name="encode-memo"><span class="mark"></span></label>
				</p>
				<p class="memo-key-optional">
					<label class="input-descr">
						<span class="input-caption">Ключ заметок:</span>
						<input type="text" name="memo-key" class="simple-rounded" placeholder="5K...">
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
					<p>При шифровании ключ заметок будет сохранён в браузере, пока вы не отключите аккаунт. Если у аккаунта нет ключа заметок, сгенерируйте его в разделе <a data-href="/accounts/">Аккаунты</a> - <a data-href="/accounts/manage-access/">Доступы аккаунта</a>.</p>
				</div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>История награждений <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="award,receive_award" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
					</div>
				</div>
			</div>
		</div>`,

	preset_view_dao:`
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
				<div class="witnesses-list"><p class="loading"><span class="submit-button-ring" style="display:inline-block"></span> %%default_loading%%</p></div>
				<div class="inactive-witnesses-list"></div>

				<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
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
					<p><hr><a class="inline-button color-orange no-margin fund-show-others-requests captions">%%fund_show_other_requests%%</a></p>
					<div class="fund-others">
						<div class="fund-requests fund-approved-requests" data-status="4"><h3>Одобренные заявки</h3></div>
						<div class="fund-requests fund-paid-requests" data-status="5"><h3>Выплаченные заявки</h3></div>
						<div class="fund-requests fund-refused-by-votes-requests" data-status="2"><h3>Недостаточно голосов</h3></div>
						<div class="fund-requests fund-refused-by-amount-requests" data-status="3"><h3>Минимальная сумма заявки не согласована</h3></div>
						<div class="fund-requests fund-canceled-requests" data-status="1"><h3>Отменены создателем</h3></div>
					</div>

					<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
				</div>
			</div>
		</div>`,

	preset_view_market:`
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
							<a class="wide-button color-red" data-href="/market/buy-short-account/">Два знака</a>
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
		<div class="page page-buy-short-account" data-title="Два знака">
			<div class="card">
				<h3>Два знака</h3>
				<div class="account-balance captions">
					<div>Баланс: <span rel="token">&hellip;</span> viz</div>
				</div>
				<div class="buy-short-account-confirmation section">
					<p>
						<label class="input-descr">
							<span class="input-caption">Покупка аккаунта:</span>
							<input type="text" name="buy-short-account-login" class="simple-rounded" disabled>
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Цена аккаунта:</span>
							<input type="text" name="buy-short-account-offer-price" class="simple-rounded" disabled>
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Дополнительно перевести в капитал:</span>
							<input type="text" name="buy-short-account-token-to-shares" class="simple-rounded" placeholder="1.00 viz">
						</label>
					</p>
					<p class="red buy-short-account-error"></p>
					<p>
						<input class="buy-short-account-action red-button captions" type="button" value="Подтвердить покупку">
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

					<p><hr><a data-href="/market/buy-short-account/">%%default_return_link%%</a></p>
				</div>
				<div class="accounts-on-sale section table-view captions">
					<p>Средства от продажи двухсимвольных аккаунтов поступают в Фонд развития ВИЗ.</p>
					<p>
						<label>
							<input name="account-filter" class="simple-rounded simple-rounded-size">
							&mdash; Фильтр по имени аккаунта
						</label>
					</p>
					<div class="table-header columns-view">
						<div class="column-view column-4">Аккаунт</div>
						<div class="column-view column-flex">Цена</div>
					</div>
					<div class="table-data"></div>
					<div class="table-footer"></div>

					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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

					<p><hr><a data-href="/market/buy-account/">%%default_return_link%%</a></p>
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

					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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

					<p><hr><a data-href="/market/buy-subaccount/">%%default_return_link%%</a></p>
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

					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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
				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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
					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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
					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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
				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
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

				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
			</div>
		</div>`,

	/* Node addon */
	node_request:'Отправляем запрос ноде&hellip;',
	node_not_respond:'Нода не отвечает',
	node_wrong_response:'Ответ от ноды не соответствует формату',
	node_protocol_error:'Адрес ноды должен содержать протокол (http/https/ws/wss)',
	node_empty_error:'Адрес ноды не может быть пустым',

	/* Index */
	index_account_caption:'Аккаунт',
	index_social_capital_caption:'Капитал (viz)',
	index_balance_caption:'Баланс (viz)',
	index_energy_caption:'Энергия',
	index_info_caption:'Информация',
	index_add_account_button:'Добавить аккаунт',
	index_info_acc_on_sale:'аккаунт на продаже',
	index_info_subacc_on_sale:'субаккаунты на продаже',
	index_info_withdraw:'понижение капитала',
	index_info_adaptive_caption:'Информация:',
	index_selected_account:'Выбранный аккаунт',
	index_login_account_caption:'Использовать аккаунт {account}',
	index_logout_account_caption:'Отключить аккаунт {account}',
	index_social_capital_adaptive_caption:'Капитал (viz):',
	index_balance_adaptive_caption:'Баланс (viz):',
	index_energy_adaptive_caption:'Энергия (viz):',
	index_selected_node:'Используемая нода',
	index_remove_node:'удалить',
	index_add_node_caption:'Добавить ноду:',
	index_add_node_button:'Подтвердить',

	/* Manage Profile */
	save_profile_success:'Профиль успешно сохранен',

	/* Access */
	access_remove_caption:'удалить',
	access_weight_caption:'вес {weight}',
	access_need_regular_weight:'Суммарный вес для обычного типа доступа меньше необходимого',
	access_need_active_weight:'Суммарный вес для активного типа доступа меньше необходимого',
	access_need_master_weight:'Суммарный вес для главного типа доступа меньше необходимого',
	access_saved_successfully:'Схема доступа успешно сохранена',
	access_save_keys:', обязательно скопируйте новые ключи',
	access_error:'Ошибка в запросе, проверьте главный ключ и попробуйте позже',
	access_invalid_master_weight_threshold:'Необходимый вес для главного типа доступа недействительный',
	access_invalid_active_weight_threshold:'Необходимый вес для активного типа доступа недействительный',
	access_invalid_regular_weight_threshold:'Необходимый вес для обычного типа доступа недействительный',
	access_reset_success:'Ключи успешно сброшены, обязательно сохраните их',
	access_loaded:'Схема доступов аккаунта успешно загружена',

	/* Witnesses */
	witness_vote_caption:'Проголосовать за делегата {witness}',
	witness_unvote_caption:'Снять голос с делегата {witness}',
	witness_props_caption:'параметры',
	witness_url_caption:'ссылка',
	witness_votes_weight_caption:'Вес голосов',
	witness_user_vote_weight_caption:'Вес вашего голоса',
	witness_node_version_caption:'Версия ноды: ',
	witness_hardfork_vote_caption:'Голосует за новый хардфорк: ',
	witness_hardfork_vote_starting_caption:' начиная с {date}',
	witness_penalty_caption:'Штраф за пропуск блоков: ',
	witness_show_inactive_link:'Показать деактивированных делегатов',
	witness_set_props_button:'Отправить',
	witness_set_props_success:'Голосуемые параметры успешно отправлены',
	witness_set_props_error:'Ошибка: проверьте измененные поля',
	witness_save_signing_key:', сохраните приватный ключ подписи: ',
	witness_was_disabled:', делегат деактивирован',

	/* Delegations */
	social_capital_own_adaptive_caption:'Собственный:',
	social_capital_delegated_adaptive_caption:'Делегировано:',
	social_capital_received_adaptive_caption:'Получено:',
	social_capital_effective_adaptive_caption:'Эффективный:',
	delegations_account_adaptive_caption:'Аккаунт:',
	delegations_social_capital_adaptive_caption:'Капитал:',
	delegations_revocation_button:'Отозвать',
	delegations_revocation_info:'Отзыв возможен после {date}',
	delegations_awaiting_return:'Ожидают возвращения',
	delegation_success:'Делегирование успешно выполнено',

	/* Fund */
	fund_request_vote_list_from:' от ',
	fund_request_vote_list_shares_amount:' эффективный капитал: ',
	fund_request_votes_count:'Всего голосов: ',
	fund_request_votes_shares_amount:'Доля проголосовавших от всей сети: ',
	fund_request_votes_shares_required:'требуется',
	fund_request_calculated_amount:'Рассчитанная сумма заявки на текущий момент: ',
	fund_request_title_caption:'Заявка #<span class="request-id">{id}</span>',
	fund_request_start_time_caption:'Создана: ',
	fund_request_cancel_caption:'Отменить заявку',
	fund_request_descr_caption:'Наименование: ',
	fund_request_url_caption:'Ссылка: ',
	fund_request_creator_caption:'Заявитель: ',
	fund_request_worker_caption:'Исполнитель: ',
	fund_request_min_amount_caption:'Минимальная сумма исполнения заявки: ',
	fund_request_max_amount_caption:'Запрашиваемая сумма: ',
	fund_request_conclusion_time_caption:'Время рассмотрения: ',
	fund_request_end_time_caption:'Время завершения: ',
	fund_request_conclusion_payout_amount_caption:'Согласованная сумма: ',
	fund_request_status_caption:'Статус: ',
	fund_request_payout_amount_caption:'Выплачено: ',
	fund_request_remain_payout_amount_caption:'Осталось выплатить: ',
	fund_request_last_payout_time_caption:'Время последней выплаты: ',
	fund_request_vote_weight_caption:'Процент удовлетворения заявки от запрашиваемой суммы:',
	fund_request_vote_button:'Проголосовать',
	fund_request_votes_caption:'Голоса по заявке',

	fund_show_other_requests:'Показать остальные заявки &rarr;',
	fund_none_requests:'Заявок по данным критериям за последние 7 дней не найдено.',
	fund_cancel_request_confirmation:'Вы уверены, что хотите отменить заявку?',
	fund_request_canceled_successfully:'Вы отменили заявку',

	fund_request_vote:'Вы успешно оставили свой голос по заявке',
	fund_request_url_needed:'Ссылка на заявку не может быть пустой',
	fund_request_url_limit:'Ссылка и описание заявки не должны превышать 256 символов',
	fund_request_worker_check:'Проверьте аккаунт исполнителя',
	fund_request_min_amount_check:'Проверьте минимальную сумму',
	fund_request_max_amount_check:'Проверьте максимальную сумму',
	fund_request_min_lt_max_needed:'Минимальная сумма не может превышать максимальную',
	fund_request_duration_check:'Проверьте срок заявки',
	fund_request_success:'Заявка подана',

	/* Accounts, Subaccounts on sale */
	ba_response_error:'Такой аккаунт не найден, попробуйте позже',
	ba_account_not_found:'Такой аккаунт не найден',
	ba_account_not_on_sale:'Данный аккаунт не был выставлен на продажу',
	bsa_response_error:'Аккаунт продавца не найден, попробуйте позже',
	bsa_account_not_found:'Такой аккаунт продавца не найден',
	bsa_accounts_not_on_sale:'Данный субаккаунт не доступен к покупке',

	/* Witness params */
	account_not_witness:'Аккаунт не объявлен делегатом',
	witness_keys_dont_match:'Приватный и публичный ключ не соответствуют',
	witness_url_is_needed:'Заполните поле ссылки на заявление делегата',
	witness_props_captions:{
		account_creation_fee:'Передаваемая комиссия при создании аккаунта',
		create_account_delegation_ratio:'Коэффициент наценки делегирования при создании аккаунта',
		create_account_delegation_time:'Срок делегирования при создании аккаунта (в секундах)',
		bandwidth_reserve_percent:'Доля сети, выделяемая для резервной пропускной способности',
		bandwidth_reserve_below:'Резервная пропускная способность действует для аккаунтов с долей сети до порога',
		committee_request_approve_min_percent:'Минимальная доля совокупного социального капитала для решения по заявке в Фонде ДАО',
		min_delegation:'Минимальное количество токенов при делегировании',
		vote_accounting_min_rshares:'Минимальный вес голоса для учёта при награждении (reward shares)',
		maximum_block_size:'Максимальный размер блока в сети (в байтах)',
		inflation_witness_percent:'Доля эмиссии, идущая на вознаграждение делегатов',
		inflation_ratio_committee_vs_reward_fund:'Доля оставшейся эмиссии, идущая в Фонд ДАО (остальное - в Фонд наград)',
		inflation_recalc_period:'Количество блоков между пересчётом инфляционной модели',
		data_operations_cost_additional_bandwidth:'Дополнительная наценка пропускной способности за каждую data операцию в транзакции',
		witness_miss_penalty_percent:'Штраф делегату за пропуск блока в процентах от суммарного веса голосов',
		witness_miss_penalty_duration:'Длительность штрафа делегату за пропуск блока в секундах',
		create_invite_min_balance:'Минимальная сумма чека',
		committee_create_request_fee:'Плата за создание заявки в Фонд ДАО',
		create_paid_subscription_fee:'Плата за создание платной подписки',
		account_on_sale_fee:'Плата за выставление аккаунта на продажу',
		subaccount_on_sale_fee:'Плата за выставление субаккаунтов на продажу',
		witness_declaration_fee:'Плата за объявление аккаунта делегатом',
		withdraw_intervals:'Количество периодов (дней) уменьшения капитала',
	},

	/* Witness props order on manage page*/
	witness_props_order:[
		'maximum_block_size',
		'account_creation_fee',
		'create_account_delegation_ratio',
		'create_account_delegation_time',
		'min_delegation',
		'create_invite_min_balance',
		'bandwidth_reserve_percent',
		'bandwidth_reserve_below',
		'vote_accounting_min_rshares',
		'withdraw_intervals',
		'committee_request_approve_min_percent',
		'inflation_witness_percent',
		'inflation_ratio_committee_vs_reward_fund',
		'inflation_recalc_period',
		'data_operations_cost_additional_bandwidth',
		'witness_miss_penalty_percent',
		'witness_miss_penalty_duration',
		'committee_create_request_fee',
		'create_paid_subscription_fee',
		'account_on_sale_fee',
		'subaccount_on_sale_fee',
		'witness_declaration_fee',
		//deprecated:
		'min_curation_percent',
		'max_curation_percent',
		'flag_energy_additional_cost',
	],

	/* Committee requests status*/
	request_status_arr:{
		'0':'На рассмотрении',
		'1':'Отменена создателем',
		'2':'Недостаточно голосов',
		'3':'Минимальная сумма заявки не согласована',
		'4':'Выплачивается',
		'5':'Полностью выплачена',
	},

	/* Invites */
	invites_code_not_found:'код не найден',
	invites_check_code_not_found:'проверочный код не найден',
	invites_invalid_code:'неверный код',
	invites_code_already_claimed:'чек на {amount} уже погашен {receiver}',
	invites_claim_success:'Чек успешно погашен аккаунтом {account}',
	invites_claim_code_not_private:'Введите код погашения, а не проверочный',
	invites_claim_code_incorrect:'Код погашения недействительный',

	/* Login checks */
	login_empty_account:'Введите аккаунт',
	check_login_already_exist:'Логин уже занят, попробуйте другой',
	check_login_starting_error:'Логин должен начинаться на латинский символ',
	check_login_ending_error:'Логин должен заканчиваться на латинский символ или цифру',
	check_login_subaccount_error:'Субаккаунт должен относиться к аккаунту {account}',

	/* History table */
	history_adaptive_data:'Дата:',
	history_adaptive_item:'Запись:',
	history_award:'Награждение <a class="view-account" href="https://info.viz.plus/accounts/{receiver}/" target="_blank">{receiver}</a> энергией <span class="view-percent">{energy}%</span>',
	history_award_memo:' с заметкой ',
	history_receive_award:'Получена награда <span class="view-tokens">{shares}</span> от <a class="view-account" href="https://info.viz.plus/accounts/{initiator}/" target="_blank">{initiator}</a>',
	history_create_invite:'Выписан чек на <span class="view-tokens">{tokens}</span> с кодом проверки <span class="view-key">{key}</span>',
	history_claim_invite_balance:'Погашен чек с кодом <span class="view-key">{key}</span>',
	history_use_invite_balance:'Погашен чек с кодом <span class="view-key">{key}</span>',
	history_transfer_from:'<span class="view-tokens">{tokens}</span> отправлено <a class="view-account" href="https://info.viz.plus/accounts/{to}/" target="_blank">{to}</a>',
	history_transfer_to:'<span class="view-tokens">{tokens}</span> получено от <a class="view-account" href="https://info.viz.plus/accounts/{from}/" target="_blank">{from}</a>',
	history_transfer_memo:' с заметкой ',
	history_transfer_to_vesting_from:'<span class="view-tokens">{tokens}</span> отправлено в социальный капитал <a class="view-account" href="https://info.viz.plus/accounts/{to}/" target="_blank">{to}</a>',
	history_transfer_to_vesting_to:'<span class="view-tokens">{tokens}</span> получено в социальный капитал от <a class="view-account" href="https://info.viz.plus/accounts/{from}/" target="_blank">{from}</a>',
	history_withdraw_vesting_stop:'Остановка понижения социального капитала',
	history_withdraw_vesting:'Активация понижения социального капитала суммой <span class="view-tokens">{shares}</span>',
	history_fill_vesting_withdraw:'Получено <span class="view-tokens">{tokens}</span> от понижения социального капитала',
	history_fill_vesting_withdraw_from:'Аккаунту <a class="view-account" href="https://info.viz.plus/accounts/{to}/" target="_blank">{to}</a> отправлено <span class="view-tokens">{tokens}</span> от понижения социального капитала',
	history_fill_vesting_withdraw_to:'Получено <span class="view-tokens">{tokens}</span> от понижения социального капитала аккаунтом <a class="view-account" href="https://info.viz.plus/accounts/{from}/" target="_blank">{from}<a>',

	login_active_wif_invalid:'Приватный активный ключ невалидный',
	login_memo_wif_invalid:'Приватный ключ заметок невалидный',
	login_account_not_found:'Аккаунт с таким логином не найден',
	login_key_weight_not_enough:'Веса активного ключа недостаточно для выполнения операций этим аккаунтом',
	login_memo_wif_incorrect:'Приватный ключ заметок не соответствует аккаунту',

	plural_days_1:' день',
	plural_days_2:' дня',
	plural_days_5:' дней',

	/* Paid Subscriptions*/
	ps_sub_count_caption:'Подписчиков: ',
	ps_sub_amount_caption:'Сумма платежей: ',
	ps_agreement_link:'Соглашение',
	ps_view_link:'Перейти',
	ps_icon_signed_caption:'Оформлена подписка',
	ps_adaptive_provider:'Провайдер:',
	ps_adaptive_period:'Период:',
	ps_adaptive_levels:'Уровней:',
	ps_adaptive_amount:'Цена:',
	ps_adaptive_descr:'Описание',
	ps_provider_adaptive_caption:'Провайдер:',
	ps_level_adaptive_caption:'Уровень:',
	ps_amount_adaptive_caption:'Сумма:',
	ps_period_adaptive_caption:'Срок:',
	ps_end_date_adaptive_caption:'Дата завершения:',
	ps_next_date_adaptive_caption:'Дата пролонгации:',
	ps_agreement_status_caption:'Статус соглашения',
	ps_agreement_status_ended:'завершено',
	ps_agreement_status_active:'активное',
	ps_agreement_closed_changed_conditions:'Соглашение расторгнуто из-за изменений в условиях соглашения провайдером.',
	ps_agreement_active_changed_conditions:'Условия соглашения будут изменены при пролонгации',
	ps_agreement_active_changed_conditions_good:' без увеличения суммы платежа.',
	ps_agreement_active_changed_conditions_bad:' с увеличением суммы платежа, что приведет к <span class="red">автоматическому завершению соглашения при экспирации</span>. Требуется обновление действующего соглашения.',
	ps_end_date_caption:'Дата завершения соглашения',
	ps_auto_renewal_active:'Автоматическая пролонгация включена',
	ps_next_date_caption:'Дата пролонгации',
	ps_next_end_date_caption:'Дата завершения действия соглашения',
	ps_agreement_closed:'Провайдер остановил подписание новых соглашений.',
	ps_agreement_descr_caption:'Описание',
	ps_agreement_url_caption:'Соглашение',
	ps_agreement_amount_caption:'Цена за уровень',
	ps_agreement_levels_caption:'Количество уровней',
	ps_agreement_period_caption:'Срок соглашения',
	ps_agreement_form_level_caption:'Уровень соглашения',
	ps_agreement_form_sum_amount_caption:'Суммарная стоимость',
	ps_agreement_form_auto_renewal_caption:'Автоматическая пролонгация<span class="adaptive-hide">&nbsp;соглашения</span>',
	ps_agreement_sign_caption:'Подписать условия соглашения',
	ps_agreement_sign_off_caption:'Завершить соглашение',
	ps_agreement_button_caption:'Подтвердить',
	ps_need_sign_agreement:'Вы не выбрали действие для подтверждения',
	ps_sign_off_error:'Вы не можете вручную завершить соглашение. Отмените автоматическую пролонгацию и подождите завершения действующего соглашения.',
	ps_empty_agreement:'Вы не указали условия соглашения',
	ps_levels_must_be_positive_number:'Количество уровней должно быть положительным числом',
	ps_sum_amount_error:'Проверьте стоимость',
	ps_period_must_be_positive_number:'Период действия соглашения должен быть положительным числом',
	ps_agreement_sign_success:'Операция успешно выполнена. Подписка появится в списке доступных через несколько минут.',
	ps_agreement_sign_off_success:'Операция успешно выполнена. Подписка остановлена.',

	memo_title:'Ключ заметок',
	memo_save_key:'Сохранить ключ',
	memo_update_key:'Установить и сохранить ключ',
	memo_key_saved:'Ключ успешно сохранен',
	memo_key_updated:'Ключ успешно установлен, обязательно сохраните его',

	login_title:'Добавить аккаунт',
	create_subaccount_error:'Ошибка при создании субаккаунта',
	deposit_too_much_attempts:'Вы совершили более 5 попыток за 5 минут, подождите немного и попробуйте снова',
	deposit_claimed_code:'Код уже был активирован',
	deposit_incorrect_code:'Код не найден',
	deposit_broadcast_error:'Неполадки на сервере, попробуйте позже',
	deposit_success:'Вы успешно активировали код, средства должны поступить в течение 1 минуты',
	buy_account_error:'Ошибка при покупке аккаунта',
	buy_account_on_recovery:'Аккаунт находится на восстановлении, его нельзя купить',
	buy_account_subaccount_is_busy:'Такой субаккаунт уже занят',
	sell_subaccount_success:'Условия продажи субаккаунтов успешно изменены',
	set_account_price_success:'Условия продажи аккаунта успешно изменены',
	create_account_error:'Ошибка при создании аккаунта',
	transfer_error:'Ошибка при переводе',
	transfer_success:'Перевод успешно выполнен',
	transfer_amount_success:'Перевод {amount} выполнен успешно',
	invite_amount_success:'Чек на {amount} успешно создан',
	invite_info_success:'Чек на {amount}, код погашения: {private_key}',
	transfer_memo_not_match_template:'Заметка не соответствует формату шаблона',
	withdraw_success:'Уменьшение капитала подтверждено',
	stop_withdraw_error:'Ошибка в операции остановки',

	/* Market menu */
	create_paid_subscribe_caption:'Создать',
	edit_paid_subscribe_caption:'Изменить',

	/* Default captions */
	default_index:'Главная',
	default_out_of:' из ',
	default_until:' до ',
	award_info_success:'Награждение {account} успешно выполнено, затрачено {energy}% энергии',
	default_check_amount:'Проверьте сумму',
	default_operation_error:'Ошибка при подтверждении операции',
	default_recipient_error:'Проверьте аккаунт получателя',
	default_no_items:'Записей не найдено.',
	default_no_items_try_other_page:' Попробуйте перейти на другую страницу',
	default_no_items_try_other_search:' или задать другие условия поиска',
	default_no_items_try_other_end:'.',
	default_incorrect_response:'Ошибка в запросе, попробуйте позже',
	default_account_not_found_or_incorrect_response:'Аккаунт не найден или ошибка в запросе',
	default_loading:'Загрузка&hellip;',
	default_loading_more:'Загрузить ещё &#10140;',
	default_node_not_respond:'Ошибка! Публичная нода не отвечает, попробуйте позже обновив страницу.',
	default_node_error:'Ошибка в получении данных от публичной ноды, попробуйте позже.',
	default_prev_page:'&larr; Предыдущая страница',
	default_next_page:'Следующая страница &rarr;',
	default_list_items_counter:'Показано',
	default_select_action:'Выберите действие',
	default_invalid_master_key:'Главный пароль недействительный',
	default_date_utc:' UTC',
	default_return_link:'&larr; Вернуться',
	default_error:'Ошибка: {text}',
	default_insufficient_funds:'Недостаточно средств',
	default_not_enough_energy:'Недостаточно энергии',
	default_fee_confirmation:'Подтвердите согласие с взимаемой комиссией',
	default_successful_operation:'Операция успешно выполнена',
	default_incorrect_private_key_try_again:'Неверный приватный ключ, попробуйте снова',
	default_type_memo_key:'Введите приватный memo ключ для шифрования заметки',
	default_memo_encode_error:'Ошибка при шифровании заметки, попробуйте позже...',
	default_api_error:'API сервис не отвечает',

	enter_memo_link:'<a data-href="/memo/?back={link}">Введите приватный ключ заметок</a> для дешифрования',
	error_update_memo_link:'Неверный приватный ключ заметок, попробуйте снова или <a data-href="/memo/?back={link}">обновите ключ</a>',
};