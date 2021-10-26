var ltmp_en_arr={
	menu_preset:`
		<a class="menu-el color-blue" data-href="/accounts/">Accounts</a>
		<a class="menu-el color-green" data-href="/assets/">Assets</a>
		<a class="menu-el color-orange" data-href="/dao/">DAO</a>
		<a class="menu-el color-red" data-href="/market/">Market</a>`,
	preset_view_index:`
		<div class="card portable-version-card small-borders text-right grey">
				Available standalone version of the site. <a class="grey" data-href="/portable/">More details&hellip;</a>
		</div>
		<div class="card">
			<h3>Your accounts</h3>
			<div class="login">
				<p>No accounts.</p>
				<input type="hidden" name="back" value="">
				<p>
					<label class="input-descr">
						<span class="input-caption">Account:</span>
						<input type="text" name="login" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Private active key:</span>
						<input type="text" name="active-key" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Private memo key:</span>
						<input type="text" name="memo-key" class="simple-rounded">
						<span class="input-caption text-small grey captions">(optional)</span>
					</label>
				</p>
				<p class="red error"></p>
				<p><a class="button user-authentication">Sign in</a></p>
				<div class="addon captions"><p>When you sign in your account, the key is saved in your browser and is not transmitted to the server. To remove the key from your browser, log out or clear your browser cache.</p></div>
			</div>
			<div class="session-manage">
				<div class="sessions"></div>
			</div>
			<div>
				<a class="nodes-config-action">Configure node connection (not neccessary)</a>
			</div>
			<div class="nodes-config hidden">
				<hr>
				<h3>Node connection</h3>
				<div class="nodes"></div>
			</div>
		</div>`,
	select_lang:`<div class="select-lang captions">{items}</div>`,
	select_lang_item:`<a class="select-lang-action" data-lang="{lang}">{caption}</a>`,
	preset_view_portable:`
		<div class="card">
			<h3>Standalone version</h3>
			<p>Standalone version my.VIZ.plus allows you to work with VIZ accounts without connecting to the site. Even if the sub-site <a href="https://my.viz.plus">https://my.viz.plus</a> is blocked, hacked, or for other reasons temporarily or permanently suspended, you will not notice it: the local version is in no way connected with our server</p>
			<p>To use the standalone version, download (e.g. to the Desktop so you don't lose it) the single file myvizplus.html, containing everything you need, and open it in any browser. It will work just like the web version of the site. The only difference: in the local version for technical reasons there is no Market section, it is only available on the website.</p>
			<p>If your level of paranoia is off the charts, we suggest connecting a standalone version to your own VIZ blockchain node: you can do this on the start page without entering your username and key.</p>
			<p>Standalone version my.viz.plus - a reliable, convenient and secure solution for VIZ account management. We recommend that you use this option so you don't depend on the availability and security of the site.</p>
			<p><a href="/portable.php" target="_blank" class="inline-button no-margin captions">Download myvizplus.html</a></p>
		</div>`,
	preset_view_portable_title:`Standalone version`,

	preset_view_login:`
		<div class="card">
			<input type="hidden" name="back" value="">
			<p>
				<label class="input-descr">
					<span class="input-caption">Account:</span>
					<input type="text" name="login" class="simple-rounded">
				</label>
			</p>
			<p>
				<label class="input-descr">
					<span class="input-caption">Private active key:</span>
					<input type="text" name="active-key" class="simple-rounded">
				</label>
			</p>
			<p>
				<label class="input-descr">
					<span class="input-caption">Private memo key:</span>
					<input type="text" name="memo-key" class="simple-rounded">
					<span class="input-caption text-small grey captions">(optional)</span>
				</label>
			</p>
			<p class="red error"></p>
			<p><a class="button user-authentication">Sign in</a></p>
			<div class="addon captions">
				When you connect the account, the key is saved in your browser and is not sent to the server. To remove the key from your browser, logout or clear the browser cache.
				<div class="authorized">
					<hr>
						You are already logged in under the following accounts: <span></span><br>
						To manage them, <a data-href="/">click on the link</a>.
				</div>
			</div>
		</div>`,

	preset_view_memo:`
		<div class="card">
			<input type="hidden" name="back" value="">
			<p>
				<label class="input-descr">
					<span class="input-caption">Account:</span>
					<input type="text" name="login" class="simple-rounded" disabled>
				</label>
			</p>
			<p>
				<label class="input-descr">
					<span class="input-caption">Private memo key:</span>
					<input type="text" name="memo-key" class="simple-rounded">
				</label>
				<br><span class="input-caption text-small grey captions">(<a class="memo-gen-new-key unselectable">generate a new</a>)</span>
			</p>
			<p class="red error"></p>
			<p class="green success"></p>
			<p>
				<a class="button save-memo-key-action">Save key</a>
				<span class="submit-button-ring"></span>
				<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
			</p>
			<div class="memo-new-key"></div>
			<div class="addon captions">
				The key is stored in your browser and is not sent to the server. To remove the key from your browser, disable the account or clear the browser cache.
			</div>
		</div>`,

	preset_view_accounts:`
		<div class="page page-index">
			<div class="card transparent">
				<h3 class="adaptive-show-block">Accounts</h3>
				<div class="columns-view">
					<div class="column column-2 shadow grid">
						<h4 class="center captions">Create</h4>
						<!--<div class="icon icon-wide icon-150px icon-color-blue icon-add-account"></div>-->
						<div class="wide-buttons captions">
							<a class="wide-button" data-href="/accounts/create-account/">Account</a>
							<a class="wide-button" data-href="/accounts/create-subaccount/">Subaccount</a>
						</div>
					</div>
					<div class="column column-2 shadow grid">
						<h4 class="center captions">Manage</h4>
						<!--<div class="icon icon-wide icon-150px icon-color-blue icon-config-account"></div>-->
						<div class="wide-buttons captions">
							<a class="wide-button" data-href="/accounts/reset-access/">Reset keys</a>
							<a class="wide-button" data-href="/accounts/manage-access/">Access scheme</a>
							<a class="wide-button" data-href="/accounts/manage-profile/">Change profile</a>

						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page page-create-account" data-title="Create an account">
			<div class="card">
				<h3>Create an account</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
					<div>Capital: <span rel="shares">&hellip;</span> viz</div>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">New account name:</span>
						<input type="text" name="create-account-login" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Transfer from the balance:</span>
						<input type="text" name="create-account-token-amount" class="simple-rounded" placeholder="1.00 viz" value="1.00 viz">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Delegate capital:</span>
						<input type="text" name="create-account-shares-amount" class="simple-rounded" placeholder="10.00 viz">
					</label>
				</p>
				<p class="red create-account-available"></p>
				<p class="red create-account-error"></p>
				<p>
					<input class="create-account-action blue-button captions" type="button" value="Create">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
				</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>To create an account, you need to give him at least <span class="median-props" rel="account_creation_fee">1.00 viz</span> or delegate capital for at least <span class="median-props" rel="create_account_delegation_fee">10.00 viz</span>.</p>
				</div>
				<div class="account-keys hidden">
					<h3 class="left">Congratulations!</h3>

					<p>Created account: <span class="green account-login"></span></p>

					<p>Keys:</p>

					<p><span class="master-key captions">&hellip;</span> &mdash; master or owner key</p>
					<p><span class="active-key captions">&hellip;</span> &mdash; active key</p>
					<p><span class="regular-key captions">&hellip;</span> &mdash; regular key</p>
					<p><span class="memo-key captions">&hellip;</span> &mdash; memo key</p>

					<p>Save your keys right now!</p>
				</div>

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-create-subaccount" data-title="Create a subaccount">
			<div class="card">
				<h3>Create a subaccount</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
					<div>Capital: <span rel="shares">&hellip;</span> viz</div>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">New subaccount:</span>
						<input type="text" name="create-subaccount-login" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Transfer from the balance:</span>
						<input type="text" name="create-subaccount-token-amount" class="simple-rounded" placeholder="1.00 viz" value="1.00 viz">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Delegate capital:</span>
						<input type="text" name="create-subaccount-shares-amount" class="simple-rounded" placeholder="10.00 viz">
					</label>
				</p>
				<p class="red create-subaccount-available"></p>
				<p class="red create-subaccount-error"></p>
				<p>
					<input class="create-subaccount-action blue-button captions" type="button" value="Create">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
				</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>The created subaccount will have the suffix <strong>.</strong><span class="current_user bold"></span></p>
					<p>To create a subaccount, you must transfer to it at least <span class="median-props" rel="account_creation_fee">1.00 viz</span> or delegate capital to at least <span class="median-props" rel="create_account_delegation_fee">10.00 viz</span>.</p>
				</div>
				<div class="account-keys hidden">
					<h3 class="left">Congratulations!</h3>

					<p>Created account: <span class="green account-login"></span></p>

					<p>Keys:</p>

					<p><span class="master-key captions">&hellip;</span> &mdash; master or owner key</p>
					<p><span class="active-key captions">&hellip;</span> &mdash; active key</p>
					<p><span class="regular-key captions">&hellip;</span> &mdash; regular key</p>
					<p><span class="memo-key captions">&hellip;</span> &mdash; memo key</p>

					<p>Save your keys right now!</p>
				</div>

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-reset-access" data-title="Reset keys">
			<div class="card">
				<h3>Reset keys</h3>
				<p>Attention! When you reset the keys, all old authorized accounts and additional keys are deleted from the account. Only one key for each type of access will remain.</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Account for resetting keys:</span>
						<input type="text" name="reset-access-login" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Master key:</span>
						<input type="text" name="reset-access-master-key" class="simple-rounded" placeholder="5K...">
					</label>
				</p>

				<p class="red reset-access-error"></p>
				<p class="green reset-access-success"></p>
				<p>
					<input class="reset-access-action blue-button captions" type="button" value="Reset keys">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
				</p>

				<div class="account-keys hidden">
					<h3 class="left">The keys have been replaced!</h3>

					<p>Account: <span class="green account-login"></span></p>

					<p>Keys:</p>

					<p><span class="master-key captions">&hellip;</span> &mdash; master or owner key</p>
					<p><span class="active-key captions">&hellip;</span> &mdash; active key</p>
					<p><span class="regular-key captions">&hellip;</span> &mdash; regular key</p>
					<p><span class="memo-key captions">&hellip;</span> &mdash; memo key</p>

					<p>Save your keys right now!</p>
				</div>

				<div class="addon captions"><h3>Hint</h3><p>If you want to set up account management for multisignature, go to the subsection <a data-href="/accounts/manage-access/">Access scheme</a>.</p></div>

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-manage-profile" data-title="Change profile">
			<div class="card">
				<h3>Change profile</h3>
				<p>Fill out your profile and save it to the blockchain (no field is required).</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Name:</span>
						<input type="text" name="manage-profile-nickname" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">A little about yourself:</span>
						<input type="text" name="manage-profile-about" maxlength="200" class="simple-rounded wide">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Avatar (link to image):</span>
						<input type="text" name="manage-profile-avatar" placeholder="https://" class="simple-rounded wide">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Sex:</span>
						<select name="manage-profile-gender" class="simple-rounded simple-rounded-size">
							<option value="" selected>Not specified</option>
							<option value="male" selected="">Male</option>
							<option value="female">Female</option>
							<option value="robot">Robot</option>
						</select>
					</label>
				</p>

				<p>
					<label class="input-descr">
						<span class="input-caption">City, country:</span>
						<input type="text" name="manage-profile-location" class="simple-rounded wide">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Interests (separated by commas):</span>
						<input type="text" name="manage-profile-interests" class="simple-rounded wide">
					</label>
				</p>

				<p>
					<label class="input-descr">
						<span class="input-caption">Website:</span>
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
						<input type="text" name="manage-profile-facebook" class="simple-rounded" placeholder="account">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Instagram:</span>
						<input type="text" name="manage-profile-instagram" class="simple-rounded" placeholder="account">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Twitter:</span>
						<input type="text" name="manage-profile-twitter" class="simple-rounded" placeholder="account">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">VK:</span>
						<input type="text" name="manage-profile-vk" class="simple-rounded" placeholder="account">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Telegram:</span>
						<input type="text" name="manage-profile-telegram" class="simple-rounded" placeholder="account">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Skype:</span>
						<input type="text" name="manage-profile-skype" class="simple-rounded" placeholder="account">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Viber:</span>
						<input type="text" name="manage-profile-viber" class="simple-rounded" placeholder="account">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">WhatsApp:</span>
						<input type="text" name="manage-profile-whatsapp" class="simple-rounded" placeholder="account">
					</label>
				</p>

				<p class="red manage-profile-error"></p>
				<p class="green manage-profile-success"></p>
				<p>
					<input class="manage-profile-action blue-button captions" type="button" value="Save">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
				</p>

				<div class="addon captions"><h3>Hint</h3><p>All sent data will be recorded in the blockchain and cannot be deleted, but you can edit it at any time.</p></div>

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-manage-access" data-title="Access scheme">
			<div class="card">
				<h3>Access scheme</h3>
				<p>Attention! This subsection is intended for advanced users.</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Account:</span>
						<input type="text" name="manage-access-login" class="simple-rounded">
					</label>
				</p>
				<p class="red manage-access-preload-error"></p>
				<p class="green manage-access-preload-success"></p>
				<p>
					<input class="manage-access-preload-action blue-button captions" type="button" value="View the access scheme">
					<span class="submit-button-ring" rel="preload"></span>
					<span class="icon icon-margin hidden icon-color-blue icon-check" rel="preload"></span>
				</p>

				<div class="account-keys hidden">
					<hr>
					<h3 class="left">Access scheme</h3>

					<p>Account: <span class="green account-login"></span></p>

					<p>Master authority:</p>
					<div class="account-keys-master captions">
						<p>
							<label class="input-descr">
								<span class="input-caption">Weight threshold:</span>
								<input type="text" name="master-weight-threshold" class="simple-rounded">
							</label>
						</p>
						<hr>
						<p class="bold">Keys for signing:</p>
						<div class="master-keys">
							<div class="none-auths">No keys</div>
						</div>
						<div class="add-key-auths">
							<input class="simple-inline" type="text" name="public-key" placeholder="public key">
							<input class="simple-inline" type="text" name="private-key" placeholder="private key">
							<input class="simple-inline" type="text" name="weight" placeholder="weight">
							<a class="gen-key-auths-action blue-button-inline unselectable" rel="master">generate</a>
							<a class="add-key-auths-action blue-button-inline unselectable" rel="master">add key</a>
						</div>
						<hr>
						<p class="bold">Authorized accounts:</p>
						<div class="master-accounts">
							<div class="none-auths">No authorized accounts</div>
						</div>
						<div class="add-account-auths">
							<input class="simple-inline" type="text" name="account" placeholder="account">
							<input class="simple-inline" type="text" name="weight" placeholder="weight">
							<a class="add-account-auths-action blue-button-inline unselectable" rel="master">add account</a>
						</div>
					</div>

					<p>Active authority:</p>
					<div class="account-keys-active captions">
						<p>
							<label class="input-descr">
								<span class="input-caption">Weight threshold:</span>
								<input type="text" name="active-weight-threshold" class="simple-rounded">
							</label>
						</p>
						<hr>
						<p class="bold">Keys for signing:</p>
						<div class="active-keys">
							<div class="none-auths">No keys</div>
						</div>
						<div class="add-key-auths">
							<input class="simple-inline" type="text" name="public-key" placeholder="public key">
							<input class="simple-inline" type="text" name="private-key" placeholder="private key">
							<input class="simple-inline" type="text" name="weight" placeholder="weight">
							<a class="gen-key-auths-action blue-button-inline unselectable" rel="active">generate</a>
							<a class="add-key-auths-action blue-button-inline unselectable" rel="active">add key</a>
						</div>
						<hr>
						<p class="bold">Authorized accounts:</p>
						<div class="active-accounts">
							<div class="none-auths">No authorized accounts</div>
						</div>
						<div class="add-account-auths">
							<input class="simple-inline" type="text" name="account" placeholder="account">
							<input class="simple-inline" type="text" name="weight" placeholder="weight">
							<a class="add-account-auths-action blue-button-inline unselectable" rel="active">add account</a>
						</div>
					</div>

					<p>Regular authority:</p>
					<div class="account-keys-regular captions">
						<p>
							<label class="input-descr">
								<span class="input-caption">Weight threshold:</span>
								<input type="text" name="regular-weight-threshold" class="simple-rounded">
							</label>
						</p>
						<hr>
						<p class="bold">Keys for signing:</p>
						<div class="regular-keys">
							<div class="none-auths">No keys</div>
						</div>
						<div class="add-key-auths">
							<input class="simple-inline" type="text" name="public-key" placeholder="public key">
							<input class="simple-inline" type="text" name="private-key" placeholder="private key">
							<input class="simple-inline" type="text" name="weight" placeholder="weight">
							<a class="gen-key-auths-action blue-button-inline unselectable" rel="regular">generate</a>
							<a class="add-key-auths-action blue-button-inline unselectable" rel="regular">add key</a>
						</div>
						<hr>
						<p class="bold">Authorized accounts:</p>
						<div class="regular-accounts">
							<div class="none-auths">No authorized accounts</div>
						</div>
						<div class="add-account-auths">
							<input class="simple-inline" type="text" name="account" placeholder="account">
							<input class="simple-inline" type="text" name="weight" placeholder="weight">
							<a class="add-account-auths-action blue-button-inline unselectable" rel="regular">add account</a>
						</div>
					</div>

					<p>
						<label class="input-descr">
							<span class="input-caption">Memo key (<a class="manage-access-gen-memo unselectable">generate new</a>):</span>
							<input type="text" name="manage-access-memo-key" class="simple-rounded" placeholder="VIZ..." disabled>
						</label>
					</p>

					<p>
						<label class="input-descr">
							<span class="input-caption">Current master key <span class="account-login bold"></span>:</span>
							<input type="text" name="manage-access-master-key" class="simple-rounded" placeholder="5K..." data-account="">
							<input type="hidden" name="manage-access-json-metadata">
						</label>
					</p>

					<p class="red manage-access-save-error"></p>
					<p>
						<input class="manage-access-save-action blue-button captions" type="button" value="Save Access scheme">
						<span class="submit-button-ring" rel="save"></span>
						<span class="icon icon-margin hidden icon-color-blue icon-check" rel="save"></span>
					</p>
					<p class="green manage-access-save-success"></p>
					<div class="manage-access-new-keys"></div>
				</div>

				<div class="addon captions"><h3>Hint</h3><p>If you just want to reset keys for the account - go to the subsection <a data-href="/accounts/reset-access/">Reset keys</a>.</p></div>

				<p><hr><a data-href="/accounts/">%%default_return_link%%</a></p>
			</div>
		</div>`,

	preset_view_assets:`
		<div class="page page-index">
			<div class="card transparent">
				<h3 class="adaptive-show-block">Assets</h3>
				<div class="columns-view">
					<div class="column column-3 shadow">
						<h4 class="center captions">Capital</h4>
						<div class="shares-caption captions"><span class="value">&hellip;</span><span class="symbol"> viz</span></div>
						<div class="wide-buttons captions">
							<a class="wide-button color-green" data-href="/assets/stake-shares/">Stake</a>
							<a class="wide-button color-green" data-href="/assets/unstake-shares/">Unstake</a>
							<a class="wide-button color-green" data-href="/assets/delegate-shares/">Delegate</a>
						</div>
					</div>
					<div class="column column-3 shadow">
						<h4 class="center captions">Wallet</h4>
						<div class="tokens-caption standalone captions"><span class="value">&hellip;</span><span class="symbol"> viz</span></div>
						<div class="wide-buttons captions">
							<a class="wide-button color-green" data-href="/assets/transfer/">Transfer</a>
							<!--<a class="wide-button color-green exchange-button" data-href="/assets/exchange/">Exchange</a>-->
							<a class="wide-button color-green" data-href="/assets/checks/">Checks</a>
						</div>
					</div>
					<div class="column column-3 shadow">
						<h4 class="center captions">Energy</h4>
						<div class="energy-radial"><div class="energy-percentage captions"><span class="value" rel="energy">&hellip;</span><span class="symbol">%</span></div></div>
						<div class="wide-buttons captions">
							<a class="wide-button color-green" data-href="/assets/award/">Award</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page page-stake-shares" data-title="Stake social capital">
			<div class="card">
				<h3>Stake social capital</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token" class="fill-stake-shares-amount-action">&hellip;</span> viz</div>
					<div>Capital: <span rel="shares">&hellip;</span> viz</div>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">What amount of viz to stake into capital:</span>
						<input type="text" name="stake-shares-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
					</label>
				</p>
				<p class="red stake-shares-error"></p>
				<p class="green stake-shares-success"></p>
				<p>
					<input class="stake-shares-action green-button captions" type="button" value="Confirm">
					<span class="submit-button-ring" rel="stake"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="stake"></span>
				</p>

				<div class="addon captions"><h3>Hint</h3><p>You can increase your social capital by staking viz tokens from your balance. The reverse action takes up to <span class="median-props" rel="withdraw_intervals">&hellip;</span> days.</p></div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>A history of staking social capital <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="transfer_to_vesting" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
					</div>
				</div>
			</div>
		</div>
		<div class="page page-unstake-shares" data-title="Unstake social capital">
			<div class="card">
				<h3>Unstake social capital</h3>
				<div class="shares-balance table-view captions">
					<div class="table-header">
						<h3>Social capital</h3>
					</div>
					<div class="table-data">
						<div class="columns-view adaptive-hide-flex">
							<div class="column-view column-3">own</div>
							<div class="column-view column-3">delegated</div>
							<div class="column-view column-flex">effective</div>
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
					<p>You already have a social capital unstake process in action with the following parameters:</p>
					<p>Total tokens to unstake &mdash; <span rel="to_withdraw"></span></p>
					<p>Already unstaked &mdash; <span rel="withdrawn"></span></p>
					<p>Awaiting unstake &mdash; <span rel="left_to_withdraw"></span></p>
					<p>Amount of unstaking tokens per day &mdash; <span rel="vesting_withdraw_rate"></span></p>
					<p>Next unstaking &mdash; <span rel="next_vesting_withdrawal"></span></p>
					<p>Days to go until full unstaking &mdash; <span rel="left_to_withdraw_duration"></span></p>
					<p class="red stop-unstake-shares-error"></p>
					<p><input class="stop-unstake-shares-action green-button captions" type="button" value="Stop"><span class="submit-button-ring" rel="stop"></span></p>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">How much viz to unstake from capital:</span>
						<input type="text" name="unstake-shares-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
						<span class="range-slider">
							<input class="range-slider-input range-slider-color-green simple-rounded-size" data-result-element="input[name=unstake-shares-tokens-amount]" data-input-element=".page-unstake-shares .shares-balance .vesting-shares" type="range" value="0" min="0" max="100" step="5">
							<span class="range-slider-value captions" rel="percent">0%</span>
						</span>
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">How much viz to keep in the capital:</span>
						<input type="text" name="unstake-shares-tokens-left" class="simple-rounded" placeholder="0.00 viz">
						<span class="range-slider">
							<input class="range-slider-input range-slider-color-green simple-rounded-size" data-result-element="input[name=unstake-shares-tokens-left]" data-input-element=".page-unstake-shares .shares-balance .vesting-shares" type="range" value="0" min="0" max="100" step="5">
							<span class="range-slider-value captions" rel="percent">0%</span>
						</span>
					</label>
				</p>
				<p>Amount of unstaking viz per day: <span class="unstake-shares-partition">&hellip;</span></p>
				<p>Approximate time: <span class="unstake-shares-duration">&hellip;</span></p>
				<p class="red unstake-shares-error"></p>
				<p class="green unstake-shares-success"></p>
				<p>
					<input class="unstake-shares-action green-button captions" type="button" value="Confirm">
					<span class="submit-button-ring" rel="unstake"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="unstake"></span>
				</p>

				<div class="addon captions"><h3>Hint</h3><p>Unstaking of social capital occurs in portions of 1/<span class="median-props" rel="withdraw_intervals">&hellip;</span> of all available capital per day from the activation of the unstaking.</p></div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>History of unstaking social capital <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="fill_vesting_withdraw,withdraw_vesting" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
					</div>
				</div>
			</div>
		</div>
		<div class="page page-delegate-shares" data-title="Delegate social capital">
			<div class="card">
				<h3>Delegate social capital</h3>
				<div class="shares-balance table-view captions">
					<div class="table-header">
						<h3>Social capital</h3>
					</div>
					<div class="table-data">
						<div class="columns-view adaptive-hide-flex">
							<div class="column-view column-3">own</div>
							<div class="column-view column-3">delegated</div>
							<div class="column-view column-flex">effective</div>
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
						<span class="input-caption">Receiver:</span>
						<input type="text" name="delegate-shares-account" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Delegate:</span>
						<input type="text" name="delegate-shares-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
						<span class="input-caption text-small grey captions delegate-shares-max-tokens-amount-action">(max <span class="delegate-shares-max-tokens-amount">&hellip;</span>)</span>
					</label>
				</p>
				<p class="red delegate-shares-error"></p>
				<p class="green delegate-shares-success"></p>
				<p>
					<input class="delegate-shares-action green-button captions" type="button" value="Confirm">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check"></span>
				</p>

				<div class="addon captions"><h3>Hint</h3><p>If you decide to delegate a different amount of capital to the same account, you must specify this new amount.</p></div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>
			</div>
			<div class="card">
				<h3>Outgoing delegations</h3>
				<div class="table-view outcome-delegations captions">
					<div class="table-header">
						<div class="columns-view adaptive-hide-flex">
							<div class="column-view column-3">Account</div>
							<div class="column-view column-3">Capital</div>
							<div class="column-view column-flex">Action</div>
						</div>
						<div class="columns-view adaptive-show-flex">
							<div class="column-view column-flex"></div>
						</div>
					</div>
					<div class="table-data">
					</div>
					<div class="table-footer">Displaying a maximum of 1,000 entries</div>
				</div>
			</div>
			<div class="card">
				<h3>Incoming delegations</h3>
				<div class="table-view income-delegations captions">
					<div class="table-header">
						<div class="columns-view adaptive-hide-flex">
							<div class="column-view column-3">Account</div>
							<div class="column-view column-flex">Capital</div>
						</div>
						<div class="columns-view adaptive-show-flex">
							<div class="column-view column-flex"></div>
						</div>
					</div>
					<div class="table-data">
					</div>
					<div class="table-footer">Displaying a maximum of 1,000 entries</div>
				</div>
			</div>
		</div>
		<div class="page page-booster" data-title="Booster">
			<div class="card">
				<h3>Booster</h3>
				<!--
				<div class="account-balance captions">
					<div>Balance: <span rel="token" class="fill-stake-shares-amount-action">&hellip;</span> viz</div>
					<div>Capital: <span rel="shares">&hellip;</span> viz</div>
				</div>
				-->
				<p>Get a social capital rent in the amount of <span class="booster-valuation">&hellip;</span> viz for 25 days.</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Account:</span>
						<input type="text" name="booster-account" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Booster-code:</span>
						<input type="text" name="booster-code" class="simple-rounded" placeholder="...">
					</label>
				</p>
				<p class="red activate-booster-error"></p>
				<p class="green activate-booster-success"></p>
				<p>
					<input class="activate-booster-action green-button captions" type="button" value="Confirm">
					<span class="submit-button-ring" rel="activate-booster"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="activate-booster"></span>
				</p>

				<div class="addon captions"><h3>Hint</h3><p>Booster codes are available at partner stores: <a href="https://aabbcc.casa/booster/?account=" class="booster_set_account" target="_blank">AABBCC</a>, <a href="https://viz.media/booster-kod/" target="_blank">VIZ.Media</a>. Refresh the page before entering the code to find out the exact amount of capital you are receiving.</div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<script src="/booster.js" type="text/javascript"></script>
			</div>
		</div>
		<div class="page page-exchange" data-title="Exchange Service">
			<div class="card loading-status">
				<h3>Exchange</h3>
				<p class="wait-loading" style="display:block;"><span class="submit-button-ring" rel="exchange-buy" style="display:inline-block;"></span> Please wait&hellip;</p>
				<p class="loading-error" style="display:none;">Service is temporarily unavailable, try again later.</p>
			</div>
			<div class="card successful-loading" style="display:none;">
				<div class="addon captions"><h3>Attention!</h3>
					<p>Exchange service operates in beta-mode, so its work can have failures and errors.</p>
					<p>If something went wrong, please be patient and let us know about the problem by mail <a href="mailto:vizplus@protonmail.com">vizplus@protonmail.com</a> or via the telegram group <a href="https://t.me/vizplus" target="_blank">@vizplus</a>. Thank you for understanding!</p>
				</div>
				<h3>Exchange</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token" class="fill-exchange-amount-action">&hellip;</span> viz</div>
				</div>
				<div class="table-view exchange-data captions">
					<div class="table-header">
						<div class="columns-view adaptive-hide-flex">
							<div class="column-view column-3">Reserve</div>
							<div class="column-view column-3">viz</div>
							<div class="column-view column-flex">usdt</div>
						</div>
						<div class="columns-view adaptive-show-flex">
							<!--<div class="column-view column-flex">Reserves data</div>-->
							<div class="column-view column-3">Reserve</div>
							<div class="column-view column-3">viz</div>
							<div class="column-view column-flex">usdt</div>
						</div>
					</div>
					<div class="table-data">
						<div class="columns-view adaptive-hide-flex summary">
							<div class="column-view column-3 caption-data">— accounting</div>
							<div class="column-view column-3 viz-data">&hellip;</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex summary">
							<div class="column-view column-flex caption-data" style="width:10% !important;">Accounting</div>
							<div class="column-view column-3 viz-data" style="width:45% !important;white-space:nowrap;">&hellip;</div>
							<div class="column-view column-3 usdt-data" style="width:35% !important;white-space:nowrap;">&hellip;</div>
						</div>
						<!--
						<div class="columns-view adaptive-show-flex summary">
							<div class="column-view column-flex">Accounting:&nbsp;<span class="viz-data" style="white-space:nowrap;">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data" style="white-space:nowrap;">&hellip;</span>&nbsp;usdt</div>
						</div>
						-->
						<div class="columns-view adaptive-hide-flex hot">
							<div class="column-view column-3 caption-data">— hot</div>
							<div class="column-view column-3 viz-data">&hellip;</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex hot">
							<div class="column-view column-flex caption-data" style="width:10% !important;">Hot</div>
							<div class="column-view column-3 viz-data" style="width:45% !important;white-space:nowrap;">&hellip;</div>
							<div class="column-view column-3 usdt-data" style="width:35% !important;white-space:nowrap;">&hellip;</div>
						</div>
						<!--
						<div class="columns-view adaptive-show-flex hot">
							<div class="column-view column-flex">Hot:&nbsp;<span class="viz-data">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data">&hellip;</span>&nbsp;usdt</div>
						</div>
						-->
						<div class="columns-view adaptive-hide-flex cold">
							<div class="column-view column-3 caption-data">— cold</div>
							<div class="column-view column-3 viz-data">&hellip;</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex cold">
							<div class="column-view column-flex caption-data" style="width:10% !important;">Cold</div>
							<div class="column-view column-3 viz-data" style="width:45% !important;white-space:nowrap;">&hellip;</div>
							<div class="column-view column-3 usdt-data" style="width:35% !important;white-space:nowrap;">&hellip;</div>
						</div>
						<!--
						<div class="columns-view adaptive-show-flex cold">
							<div class="column-view column-flex">Cold:&nbsp;<span class="viz-data">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data">&hellip;</span>&nbsp;usdt</div>
						</div>
						-->
						<div class="columns-view adaptive-hide-flex provision">
							<div class="column-view column-3 caption-data">Collateral</div>
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
							<div class="column-view column-flex">Collateral:&nbsp;<span class="viz-data">&hellip;</span>&nbsp;viz,&nbsp;<span class="usdt-data">&hellip;</span>&nbsp;usdt</div>
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
							<div class="column-view column-3 caption-data">Accounting rate:</div>
							<div class="column-view column-flex ratio-data">&hellip;</div>
						</div>
						<div class="columns-view adaptive-show-flex rate">
							<div class="column-view column-flex">Accounting rate:&nbsp;<span class="ratio-data">&hellip;</span></div>
						</div>
					</div>
					<div class="table-footer"><em>It is not an obligation. The actual exchange rate is determined at the time of the transaction and depends on its volume.</em></div>
				</div>

				<hr><h4 class="center">Buying viz</h4>
				<div class="table-view exchange-buy-data captions">
					<div class="table-header">
						<div class="columns-view">
							<div class="column-view column-flex minify"></div>
						</div>
					</div>
					<div class="table-data">
						<div class="columns-view min-amount">
							<div class="column-view column-3 caption-data">Minimum amount</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view max-amount">
							<div class="column-view column-3 caption-data">Maximum amount</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view input-amount">
							<div class="column-view column-3 caption-data" style="padding:23px 15px;">
								<span class="adaptive-hide bold">You want to buy</span>
								<span class="adaptive-show bold">Buy</span>
							</div>
							<div class="column-view column-flex viz-data" style="display:block !important;">
								<input type="text" name="buy-tokens-amount" class="simple-rounded" placeholder="0.00 viz" style="margin:0;" type="number" step="0.01">
								<div class="red exchange-buy-input-error"></div>
							</div>
						</div>
						<div class="columns-view output-amount">
							<div class="column-view column-3 caption-data">for the amount *</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view rate">
							<div class="column-view column-3 caption-data">
								<span class="adaptive-hide">at the average price</span>
								<span class="adaptive-show">at the price</span>
							</div>
							<div class="column-view column-flex ratio-data">&hellip;</div>
						</div>
					</div>
					<div class="table-footer left"><em>* fee is included</em></div>
				</div>
				<p>Click the "Start exchange" button and get the address to transfer tokens USDT(ERC20) in the Ethereum blockchain. At this moment, your wallet will be charged with 1 <span class="eth_wallet_cost">&hellip; viz</span>.</p>
				<p>Transfer any amount of USDT within the limits to the received address (take into account the change of the exchange rate when changing the amount and the fee).</p>
				<p>After receiving USDT, the exchanger will send the appropriate amount of viz to your account, <b>based on the rate at the time of receipt of USDT</b>.</p>
				<p>The address to send USDT is valid for 1 hour after the start of the exchange. Each address is unique and intended for one exchange only!</p>
				<p class="bold">Do not send USDT to the same address repeatedly!</p>
				<p class="red exchange-buy-error"></p>
				<p class="green exchange-buy-success"></p>
				<p>
					<input class="exchange-buy-action green-button captions" type="button" value="Start exchange">
					<span class="submit-button-ring" rel="exchange-buy"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-buy"></span>
				</p>
				<div class="exchange-buy-view" style="display:none;">
					<p>
						Address for USDT transfer:
						<input type="text" name="exchange-income-eth-address" class="simple-rounded wide" placeholder="ETH address" disabled>
					</p>
					<p>
						<input class="exchange-copy-eth-action green-button captions" type="button" value="Copy"><span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-copy-eth"></span></p>
					<p>
						<input class="exchange-qr-eth-action green-button captions" type="button" value="QR-code"><span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-qr-eth"></span>
					</p>
					<div class="qr-view"></div>
				</div>
				<br>
				<p>The speed of the transaction depends almost entirely on the speed at which your USDT is arrived at our address. Choose the fee rate (gas price) in the Ethereum blockchain based on this.</p>


				<hr><h4 class="center">Selling viz</h4>
				<div class="table-view exchange-sell-data captions">
					<div class="table-header">
						<div class="columns-view">
							<div class="column-view column-flex minify"></div>
						</div>
					</div>
					<div class="table-data">
						<div class="columns-view min-amount">
							<div class="column-view column-3 caption-data">Minimum sale</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view max-amount">
							<div class="column-view column-3 caption-data">Maximum sale</div>
							<div class="column-view column-flex viz-data">&hellip;</div>
						</div>
						<div class="columns-view input-amount">
							<div class="column-view column-3 caption-data" style="padding:23px 15px;">
								<span class="adaptive-hide bold">You want to sell</span>
								<span class="adaptive-show bold">Sell</span>
							</div>
							<div class="column-view column-flex viz-data" style="display:block !important;">
								<input type="text" name="sell-tokens-amount" class="simple-rounded" placeholder="0.00 viz" style="margin:0;">
								<div class="red exchange-sell-input-error"></div>
							</div>
						</div>
						<div class="columns-view output-amount">
							<div class="column-view column-3 caption-data">for the amount *</div>
							<div class="column-view column-flex usdt-data">&hellip;</div>
						</div>
						<div class="columns-view rate">
							<div class="column-view column-3 caption-data">
								<span class="adaptive-hide">at the average price</span>
								<span class="adaptive-show">at the price</span>
							</div>
							<div class="column-view column-flex ratio-data">&hellip;</div>
						</div>
						<!--
						<div class="columns-view address">
							<div class="column-view column-3 caption-data">Your address for receiving USDT</div>
							<div class="column-view column-flex address-data">
								<input type="text" name="exchange-outcome-eth-address" class="simple-rounded wide" placeholder="ETH address" style="margin:0;">
							</div>
						</div>
						-->
					</div>
					<div class="table-footer left"><em>* fee is included</em></div>
				</div>
				<div class="exchange-sell-view">
					<p>
						Your address for receiving USDT:
						<input type="text" name="exchange-outcome-eth-address" class="simple-rounded wide" placeholder="ETH address">
					</p>
				</div>
				<p class="red exchange-sell-error"></p>
				<p class="green exchange-sell-success"></p>
				<p>
					<input class="exchange-sell-action green-button captions" type="button" value="Exchange" disabled="disabled">
					<span class="submit-button-ring" rel="exchange-sell"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="exchange-sell"></span>
				</p>
				<br><!--<div class="addon captions"><h3>Hint</h3></div>-->
				<p>Enter the number of viz to sell within the limits and <b>your</b> address in the Ethereum blockchain to receive USDT(ERC20). Press the "Exchange" button.</p>
				<p>The sale of viz is made instantaneously. The time of arrival of USDT(ERC20) tokens to your address depends on the Ethereum blockchain and is usually a few minutes.</p>

				<script src="/qrcode.min.js" type="text/javascript"></script>
				<script src="/exchange.js" type="text/javascript"></script>
				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-transfer" data-title="Transfer">
			<div class="card">
				<h3>Transfer</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token" class="fill-transfer-amount-action">&hellip;</span> viz</div>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">Template:</span>
						<select name="transfer-template" class="simple-rounded simple-rounded-size">
							<option value="0" selected>Not used</option>
							<option value="4" data-account="gph.xchng" data-tokens-amount-fee="10" data-memo="log:" data-memo-format="log:GRAPHENE-LOGIN" data-memo-check="^log:([a-z0-9\-\.]+)$" data-memo-encrypt="false">XCHNG on Graphene</option>
							<option value="1" data-account="xchng" data-tokens-amount-fee="10" data-memo="log:" data-memo-format="log:BITSHARES-LOGIN" data-memo-check="^log:([a-z0-9\-\.]+)$" data-memo-encrypt="false">XCHNG on BitShares</option>
							<option value="2" data-account="gls.xchng" data-tokens-amount-fee="0" data-memo="log:" data-memo-format="log:GOLOS-LOGIN" data-memo-check="^log:([a-z0-9\-\.]+)$" data-memo-encrypt="false">XCHNG on GOLOS</option>
							<option value="3" data-account="vmp" data-tokens-amount-fee="0" data-memo="Mx" data-memo-format="Minter address" data-memo-check="^Mx([a-f0-9\-\.]+)$" data-memo-encrypt="false">VIZCHAIN on Minter</option>

						</select>
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Receiver:</span>
						<input type="text" name="transfer-account" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Amount:</span>
						<input type="text" name="transfer-tokens-amount" class="simple-rounded" placeholder="0.00 viz">
						<span class="input-caption text-small grey captions transfer-tokens-amount-caption" style="display:none">(fee: <span class="transfer-tokens-amount-fee">&hellip;</span>)</span>
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Memo:</span>
						<input type="text" name="transfer-memo" class="simple-rounded" placeholder="">
						<span class="input-caption text-small grey captions transfer-memo-caption" style="display:none">(format: <span class="transfer-memo-format">&hellip;</span>)</span>
					</label>
				</p>
				<p class="encode-memo-checkbox">
					<label class="check color-red">Encrypt the memo<input type="checkbox" name="encode-memo"><span class="mark"></span></label>
				</p>
				<p class="memo-key-optional">
					<label class="input-descr">
						<span class="input-caption">Memo key:</span>
						<input type="text" name="memo-key" class="simple-rounded" placeholder="5K...">
					</label>
				</p>
				<p class="red transfer-error"></p>
				<p class="green transfer-success"></p>
				<p>
					<input class="transfer-action green-button captions" type="button" value="Confirm">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check"></span>
				</p>

				<div class="addon captions"><h3>Hint</h3>
					<p>Use templates for standard transfers to avoid mistakes that can lead to loss of funds.</p>
					<p>When encrypted, your notes key will be saved in your browser until you turn off your account. If the account does not have a notes key, generate one in the <a data-href="/accounts/">Accounts</a> section - <a data-href="/accounts/manage-access/">Access scheme</a>.</p>
				</div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>Transfers history <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="transfer" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
					</div>
				</div>
			</div>
		</div>
		<div class="page page-checks" data-title="Checks">
			<div class="card">
				<h3>Checks</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">Amount:</span>
						<input type="text" name="invites-create-amount" class="simple-rounded" placeholder="0.00 viz">
						<span class="input-caption text-small grey captions">(minimum: <span class="create-invite-min-balance">&hellip;</span>)</span>
					</label>
				</p>
				<p class="red invites-create-error"></p>
				<p class="green invites-create-success"></p>
				<p>
					<input class="invites-create-action green-button captions" type="button" value="Create a check">
					<span class="submit-button-ring" rel="create"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="create"></span>
				</p>
				<div class="invites-create hidden"></div>
				<hr>
				<p>
					<label class="input-descr">
						<span class="input-caption">Redeeming code:</span>
						<input type="text" name="invites-claim-code" class="simple-rounded" placeholder="5K...">
						<span class="input-caption text-small grey captions invites-claim-code-caption" style="display:none">(contains: <span class="invites-claim-code-balance">&hellip;</span>)</span>
					</label>
				</p>
				<p class="red invites-claim-error"></p>
				<p class="green invites-claim-success"></p>
				<p>
					<input class="invites-claim-action green-button captions" type="button" value="Redeem the check on the balance">
					<input class="invites-use-action green-button captions" type="button" value="Redeem a check in capital">
					<span class="submit-button-ring" rel="claim"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check" rel="claim"></span>
				</p>
				<!--
				<p>The XCHNG service sells viz checks at close to stock exchange prices. When you click the link, you will see a data entry form. Choose a payment method and fill out the form. After payment, you will receive a check in the form of a code of letters and numbers. Enter it in the check redemption form above and choose how to redeem the check.</p>
				<p>
					<a style="text-decoration:none" href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2646644&curr=PYU&ai=844298" target="_blank"><input class="green-button captions" type="button" value="Buy 1000 viz"></a>
					<a style="text-decoration:none" href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2646643&curr=PYU&ai=844298" target="_blank"><input class="green-button captions" type="button" value="Buy 500 viz"></a>
					<a style="text-decoration:none" href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2646642&curr=PYU&ai=844298" target="_blank"><input class="green-button captions" type="button" value="Buy 200 viz"></a>
				</p>

				-->
				<div class="addon captions"><h3>Hint</h3><p>After you create a check, you will receive a code to redeem it. Be sure to keep it, because if you lose it, it cannot be redeemed.</p></div>
				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>Checkbook <span class="loading">%%default_loading%%</span></h3>
					</div>
					<div class="table-data history" data-operations="create_invite,claim_invite_balance,use_invite_balance" data-lower-bound="" data-upper-bound="">
					</div>
					<div class="table-footer">
						<a class="inline-button history-load-more-action">%%default_loading_more%%</a>
					</div>
				</div>
			</div>
		</div>

		<div class="page page-award" data-title="Award">
			<div class="card">
				<h3>Award</h3>
				<div class="account-balance captions">
					<div>Energy: <span rel="energy">&hellip;</span>%</div>
					<div>Capital: <span rel="effective_shares">&hellip;</span> viz</div>
				</div>
				<p>
					<label class="input-descr">
						<span class="input-caption">Receiver:</span>
						<input type="text" name="award-account" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Spend energy:</span>
						<input type="text" name="award-energy" class="simple-rounded" placeholder="0.00%">
					</label>
					<span class="range-slider">
						<input class="range-slider-input range-slider-color-green simple-rounded-size" data-result-element="input[name=award-energy]" data-input-element=".page-award .account-balance span[rel=effective_shares]" type="range" value="0" min="0" max="10000" step="1">
						<span class="range-slider-value captions" rel="amount">~0.00 viz</span>
					</span>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Memo:</span>
						<input type="text" name="award-memo" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="check color-red">Encrypt the memo<input type="checkbox" name="encode-memo"><span class="mark"></span></label>
				</p>
				<p class="memo-key-optional">
					<label class="input-descr">
						<span class="input-caption">Memo key:</span>
						<input type="text" name="memo-key" class="simple-rounded" placeholder="5K...">
					</label>
				</p>
				<p class="red award-error"></p>
				<p class="green award-success"></p>
				<p>
					<input class="award-action green-button captions" type="button" value="Award">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-green icon-check"></span>
				</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>This page displays effective social capital, which includes delegations.</p>
					<p>The actual amount of the award may be slightly different from what is shown.</p>
					<p>When encrypted, the memo key will be saved in the browser until you disable the account. If the account does not have a notes key, generate one in <a data-href="/accounts/">Accounts</a> - <a data-href="/accounts/manage-access/">Access scheme</a>.</p>
				</div>

				<p><hr><a data-href="/assets/">%%default_return_link%%</a></p>

				<div class="table-view captions">
					<div class="table-header">
						<h3>Awards history <span class="loading">%%default_loading%%</span></h3>
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
				<h3 class="adaptive-show-block">DAO</h3>
				<div class="columns-view">
					<div class="column column-2 shadow">
						<h4 class="center captions">Witnesses</h4>
						<!--<div class="icon icon-wide icon-150px icon-color-orange icon-witnesses"></div>-->
						<div class="wide-buttons captions">
							<a class="wide-button color-orange" data-href="/dao/witnesses/">Vote</a>
							<a class="wide-button color-orange" data-href="/dao/witness-params/">Set the parameters</a>
						</div>
					</div>
					<div class="column column-2 shadow">
						<h4 class="center captions">Fund</h4>
						<!--<div class="icon icon-wide icon-150px icon-color-orange icon-fund"></div>-->
						<div class="wide-buttons captions">
							<a class="wide-button color-orange" data-href="/dao/fund-create-request/">Submit a request</a>
							<a class="wide-button color-orange" data-href="/dao/fund-requests/">Review requests</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page page-witnesses" data-title="Vote for witnesses">
			<div class="card">
				<h3>Vote for witnesses</h3>
				<div class="account-balance captions">
					<div>Capital: <span rel="shares">&hellip;</span> viz</div>
				</div>
				<p>Place a check mark next to the witnesses of your choice. Your vote will be counted immediately.</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>Voting for witnesses counts your own social capital without accounting for delegations.<br>
					The weight of the vote equals social capital divided by the number of elected witnesses.</p>
				</div>
				<div class="witnesses-list"><p class="loading"><span class="submit-button-ring" style="display:inline-block"></span> %%default_loading%%</p></div>
				<div class="inactive-witnesses-list"></div>

				<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-witness-params" data-title="Set the parameters">
			<div class="card">
				<h3>Set the parameters</h3>
				<p>Declare yourself a witness and/or set voting parameters for the blockchain.</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Link to witness statement:</span>
						<input type="text" name="witness-setup-url" class="simple-rounded" placeholder="https://">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Signing key (public):</span>
						<input type="text" name="witness-setup-signing-key" class="simple-rounded" placeholder="VIZ...">
						<span class="input-caption text-small grey captions witness-setup-signing-key-action">(generate: <span class="witness-setup-signing-private-key">&mdash;</span>)</span>
					</label>
				</p>
				<label class="check color-red fee-checkbox">When an account is declared as a witness, it will be charged <span class="median-props" rel="witness_declaration_fee">&hellip; viz</span>.<input type="checkbox" name="witness-declaration-fee"><span class="mark"></span></label>
				<p class="red witness-setup-error"></p>
				<p class="green witness-setup-success"></p>
				<p>
					<input class="witness-setup-action orange-button captions" type="button" value="Confirm">
					<span class="submit-button-ring" rel="setup"></span>
					<span class="icon icon-margin hidden icon-color-orange icon-check" rel="setup"></span>
				</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>You can set the signature key to blank to temporarily or permanently disable the witness.</p>
				</div>
				<div class="witness-set-props"></div>

				<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-fund-create-request" data-title="Submit a request">
			<div class="card">
				<h3>Submit a request</h3>
				<p>
					<label class="input-descr">
						<span class="input-caption">A short description of the request (no more than 200 characters):</span>
						<input type="text" name="fund-create-request-descr" class="simple-rounded wide" placeholder="" maxlength="200">
					</label>
				</p>

				<p>
					<label class="input-descr">
						<span class="input-caption">Link to request description:</span>
						<input type="text" name="fund-create-request-url" class="simple-rounded wide" placeholder="https://">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Funds recipient account:</span>
						<input type="text" name="fund-create-request-worker" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Minimum amount:</span>
						<input type="text" name="fund-create-request-min-amount" class="simple-rounded" placeholder="0.00 viz">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Maximum amount (not more than 500,000.00 viz):</span>
						<input type="text" name="fund-create-request-max-amount" class="simple-rounded" placeholder="0.00 viz">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Duration of request review in days (from 5 to 30):</span>
						<input type="text" name="fund-create-request-duration" class="simple-rounded" placeholder="0">
					</label>
				</p>
				<label class="check color-red fee-checkbox">When you create a request, your wallet will be charged with <span class="median-props" rel="committee_create_request_fee">&hellip; viz</span>.<input type="checkbox" name="committee-create-request-fee"><span class="mark"></span></label>
				<p class="red fund-create-request-error"></p>
				<p class="green fund-create-request-success"></p>
				<p>
					<input class="fund-create-request-action orange-button captions" type="button" value="Confirm">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-orange icon-check"></span>
				</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>You can submit no more than 1 request per day.</p>
				</div>

				<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-fund-requests" data-title="Review requests">
			<div class="card">
				<div class="section-fund-request section">
				</div>
				<div class="section-fund-requests section">
					<h3>Review requests</h3>
					<div class="account-balance captions">
						<div>Balance of the fund: <span class="fund-balance">&hellip;</span></div>
					</div>
					<div class="fund-requests fund-active-requests" data-status="0"></div>
					<p><hr><a class="inline-button color-orange no-margin fund-show-others-requests captions">%%fund_show_other_requests%%</a></p>
					<div class="fund-others">
						<div class="fund-requests fund-approved-requests" data-status="4"><h3>Approved requests</h3></div>
						<div class="fund-requests fund-paid-requests" data-status="5"><h3>Fully paid out requests</h3></div>
						<div class="fund-requests fund-refused-by-votes-requests" data-status="2"><h3>Not enough votes</h3></div>
						<div class="fund-requests fund-refused-by-amount-requests" data-status="3"><h3>The minimum amount of the request has not been reached</h3></div>
						<div class="fund-requests fund-canceled-requests" data-status="1"><h3>Cancelled by the creator</h3></div>
					</div>

					<p><hr><a data-href="/dao/">%%default_return_link%%</a></p>
				</div>
			</div>
		</div>`,

	preset_view_market:`
		<div class="page page-index">
			<div class="card transparent">
				<h3 class="adaptive-show-block">Market</h3>
				<div class="columns-view">
					<!--
						<div class="column column-4 shadow">
							<h4 class="center captions">Viz</h4>
							<div class="icon icon-wide icon-100px icon-color-red icon-send-token-long"></div>
							<div class="wide-buttons size3 captions">
								<a class="wide-button color-red" data-href="/market/deposit/">Deposit</a>
							</div>
						</div>
					-->
					<div class="column column-3 shadow grid">
						<h4 class="center captions">Accounts</h4>
						<!--<div class="icon icon-wide icon-100px icon-color-red icon-buy-account"></div>-->
						<div class="wide-buttons captions">
							<a class="wide-button color-red" data-href="/market/buy-short-account/">Two symbols</a>
							<a class="wide-button color-red" data-href="/market/buy-account/">Buy</a>
							<a class="wide-button color-red" data-href="/market/sell-account/">Sell</a>
						</div>
					</div>
					<div class="column column-3 shadow grid">
						<h4 class="center captions">Subaccounts</h4>
						<!--<div class="icon icon-wide icon-100px icon-color-red icon-buy-subaccount"></div>-->
						<div class="wide-buttons captions">
							<a class="wide-button color-red" data-href="/market/buy-subaccount/">Buy</a>
							<a class="wide-button color-red" data-href="/market/sell-subaccount/">Sell</a>
						</div>
					</div>
					<div class="column column-3 shadow grid">
						<h4 class="center captions">Subscribes</h4>
						<!--<div class="icon icon-wide icon-100px icon-color-red icon-paid-subscription"></div>-->
						<div class="wide-buttons captions">
							<a class="wide-button color-red" data-href="/market/paid-subscriptions/">Search</a>
							<a class="wide-button color-red" data-href="/market/active-paid-subscriptions/">Manage</a>
							<a class="wide-button color-red create-edit-paid-subscribe-caption" data-href="/market/create-paid-subscribe/">Create</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page page-buy-short-account" data-title="Two symbols">
			<div class="card">
				<h3>Two symbols</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
				</div>
				<div class="buy-short-account-confirmation section">
					<p>
						<label class="input-descr">
							<span class="input-caption">Buying an account:</span>
							<input type="text" name="buy-short-account-login" class="simple-rounded" disabled>
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Account price:</span>
							<input type="text" name="buy-short-account-offer-price" class="simple-rounded" disabled>
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Additional transfer to capital:</span>
							<input type="text" name="buy-short-account-token-to-shares" class="simple-rounded" placeholder="1.00 viz">
						</label>
					</p>
					<p class="red buy-short-account-error"></p>
					<p>
						<input class="buy-short-account-action red-button captions" type="button" value="Confirm purchase">
						<span class="submit-button-ring"></span>
						<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
					</p>
					<div class="addon captions">
						<h3>Hint</h3>
						<p>After purchase the account will have one private key for all types of operations, to separate them use <a data-href="/accounts/reset-access/">key reset</a> (you can do it an hour after purchase).</p>
					</div>
					<div class="account-keys hidden">
						<h3 class="left">Congratulations!</h3>

						<p>Purchased account: <span class="green account-login"></span></p>

						<p>Keys:</p>

						<p><span class="master-key captions">&hellip;</span> &mdash; master or owner key</p>
						<p><span class="active-key captions">&hellip;</span> &mdash; active key</p>
						<p><span class="regular-key captions">&hellip;</span> &mdash; regular key</p>
						<p><span class="memo-key captions">&hellip;</span> &mdash; memo key</p>

						<p>Save your keys right now!</p>
					</div>

					<p><hr><a data-href="/market/buy-short-account/">%%default_return_link%%</a></p>
				</div>
				<div class="accounts-on-sale section table-view captions">
					<p>Funds from the sale of two-character accounts go to the VIZ DAO.</p>
					<p>
						<label>
							<input name="account-filter" class="simple-rounded simple-rounded-size">
							&mdash; Filter by account name
						</label>
					</p>
					<div class="table-header columns-view">
						<div class="column-view column-4">Account</div>
						<div class="column-view column-flex">Price</div>
					</div>
					<div class="table-data"></div>
					<div class="table-footer"></div>

					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
				</div>
			</div>
		</div>
		<div class="page page-buy-account" data-title="Buy account">
			<div class="card">
				<h3>Buy account</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
				</div>
				<div class="buy-account-confirmation section">
					<p>
						<label class="input-descr">
							<span class="input-caption">Buying an account:</span>
							<input type="text" name="buy-account-login" class="simple-rounded" disabled>
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Account price:</span>
							<input type="text" name="buy-account-offer-price" class="simple-rounded" disabled>
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Additional transfer to capital:</span>
							<input type="text" name="buy-account-token-to-shares" class="simple-rounded" placeholder="1.00 viz">
						</label>
					</p>
					<p class="red buy-account-error"></p>
					<p>
						<input class="buy-account-action red-button captions" type="button" value="Confirm purchase">
						<span class="submit-button-ring"></span>
						<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
					</p>
					<div class="addon captions">
						<h3>Hint</h3>
						<p>After purchase the account will have one private key for all types of operations, to separate them use <a data-href="/accounts/reset-access/">key reset</a> (you can do it an hour after purchase).</p>
					</div>
					<div class="account-keys hidden">
						<h3 class="left">Congratulations!</h3>

						<p>Purchased account: <span class="green account-login"></span></p>

						<p>Keys:</p>

						<p><span class="master-key captions">&hellip;</span> &mdash; master or owner key</p>
						<p><span class="active-key captions">&hellip;</span> &mdash; active key</p>
						<p><span class="regular-key captions">&hellip;</span> &mdash; regular key</p>
						<p><span class="memo-key captions">&hellip;</span> &mdash; memo key</p>

						<p>Save your keys right now!</p>
					</div>

					<p><hr><a data-href="/market/buy-account/">%%default_return_link%%</a></p>
				</div>
				<div class="accounts-on-sale section table-view captions">
					<p>
						<label>
							<input name="account-filter" class="simple-rounded simple-rounded-size">
							&mdash; Filter by account name
						</label>
					</p>
					<p>
						<label>
							<select name="order" class="simple-rounded simple-rounded-size">
								<option value="+price" selected>Price ascending</option>
								<option value="-price">Price descending</option>
							</select>
							&mdash; Sort by
						</label>
					</p>
					<div class="table-header columns-view">
						<div class="column-view column-4">Account</div>
						<div class="column-view column-flex">Price</div>
					</div>
					<div class="table-data"></div>
					<div class="table-footer"></div>

					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
				</div>
			</div>
		</div>
		<div class="page page-buy-subaccount" data-title="Buy subaccount">
			<div class="card">
				<h3>Buy subaccount</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
				</div>
				<div class="buy-subaccount-confirmation section">
					<p>
						<label class="input-descr">
							<span class="input-caption">Buy a subaccount (with suffix <strong>.</strong><span class="account-login bold"></span>):</span>
							<input type="text" name="buy-subaccount-login" class="simple-rounded" data-suffix="">
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Price:</span>
							<input type="text" name="buy-subaccount-offer-price" class="simple-rounded" disabled>
						</label>
					</p>
					<p>
						<label class="input-descr">
							<span class="input-caption">Additional transfer to capital:</span>
							<input type="text" name="buy-subaccount-token-to-shares" class="simple-rounded" placeholder="1.00 viz">
						</label>
					</p>
					<p class="red buy-subaccount-error"></p>
					<p>
						<input class="buy-subaccount-action red-button captions" type="button" value="Confirm purchase">
						<span class="submit-button-ring"></span>
						<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
					</p>
					<div class="addon captions">
						<h3>Hint</h3>
						<p>To buy a subaccount, you must immediately transfer to his capital at least <span class="median-props" rel="account_creation_fee">1 viz</span>.</p>
						<p>After purchase the account will have one private key for all types of operations, use <a data-href="/accounts/reset-access/">the key reset</a> to separate them (you can do it in an hour after purchase).</p>
					</div>
					<div class="account-keys hidden">
						<h3 class="left">Congratulations!</h3>

						<p>Purchased account: <span class="green account-login"></span></p>

						<p>Keys:</p>

						<p><span class="master-key captions">&hellip;</span> &mdash; master or owner key</p>
						<p><span class="active-key captions">&hellip;</span> &mdash; active key</p>
						<p><span class="regular-key captions">&hellip;</span> &mdash; regular key</p>
						<p><span class="memo-key captions">&hellip;</span> &mdash; memo key</p>

						<p>Save your keys right now!</p>
					</div>

					<p><hr><a data-href="/market/buy-subaccount/">%%default_return_link%%</a></p>
				</div>
				<div class="subaccounts-on-sale section table-view captions">
					<p>
						<label>
							<input name="subaccount-filter" class="simple-rounded simple-rounded-size">
							&mdash; Filter by account name
						</label>
					</p>
					<p>
						<label>
							<select name="order" class="simple-rounded simple-rounded-size">
								<option value="+price" selected>Price ascending</option>
								<option value="-price">Price descending</option>
							</select>
							&mdash; Sort by
						</label>
					</p>
					<div class="table-header columns-view">
						<div class="column-view column-4">Account</div>
						<div class="column-view column-flex">Price</div>
					</div>
					<div class="table-data"></div>
					<div class="table-footer"></div>

					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
				</div>
			</div>
		</div>
		<div class="page page-sell-account" data-title="Sell account">
			<div class="card">
				<h3>Sell account</h3>
				<p>Attention! When selling an account, the entire balance and capital goes to the buyer.<br>You need to specify the seller's account, which will go to the payment for the purchase of the account.</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Account for sale:</span>
						<input type="text" name="set-account-login" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Master key of the account for sale:</span>
						<input type="text" name="set-account-master-key" class="simple-rounded" placeholder="5K...">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Account price:</span>
						<input type="text" name="set-account-price" class="simple-rounded" placeholder="0.00 viz">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Seller account:</span>
						<input type="text" name="set-account-seller" class="simple-rounded">
					</label>
				</p>
				<p><label class="radio color-red">Put it on the market<input type="radio" name="set-account-on-sale" value="true"><span class="mark"></span></label></p>
				<p><label class="radio color-red">Take it off the market<input type="radio" name="set-account-on-sale" value="false"><span class="mark"></span></label></p>
				<label class="check color-red fee-checkbox">When you apply to sell your account, your wallet will be charged with <span class="median-props" rel="account_on_sale_fee">&hellip; viz</span>.<input type="checkbox" name="account-on-sale-fee"><span class="mark"></span></label>
				<p class="red sell-account-error"></p>
				<p class="green sell-account-success"></p>
				<p>
					<input class="sell-account-action red-button captions" type="button" value="Confirm">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
				</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>The account will be put up for sale 7 days after the submission. This is a necessary action against the selling of stolen accounts.</p>
				</div>
				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-sell-subaccount" data-title="Sell subaccount">
			<div class="card">
				<h3>Sell subaccount</h3>
				<p>Attention! When selling subaccounts, the buyer will be able to choose the name of the account.<br>You need to specify the seller's account, which will receive the payment for the purchased account.</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Account offering subaccounts for sale:</span>
						<input type="text" name="set-subaccount-login" class="simple-rounded">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Master key:</span>
						<input type="text" name="set-subaccount-master-key" class="simple-rounded" placeholder="5K...">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Price per subaccount:</span>
						<input type="text" name="set-subaccount-price" class="simple-rounded" placeholder="0.00 viz">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Seller account:</span>
						<input type="text" name="set-subaccount-seller" class="simple-rounded">
					</label>
				</p>
				<p><label class="radio color-red">Offer subaccounts on the market<input type="radio" name="set-subaccount-on-sale" value="true"><span class="mark"></span></label></p>
				<p><label class="radio color-red">Unlist subaccounts from the market<input type="radio" name="set-subaccount-on-sale" value="false"><span class="mark"></span></label></p>
				<label class="check color-red fee-checkbox">When you apply to sell subaccounts, your wallet will be charged with <span class="median-props" rel="subaccount_on_sale_fee">&hellip; viz</span>.<input type="checkbox" name="subaccount-on-sale-fee"><span class="mark"></span></label>
				<p class="red sell-subaccount-error"></p>
				<p class="green sell-subaccount-success"></p>
				<p>
					<input class="sell-subaccount-action red-button captions" type="button" value="Confirm">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-blue icon-check"></span>
				</p>

				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-deposit" data-title="Recharge">
			<div class="card">
				<h3>Recharge</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
				</div>
				<p>
					There are several ways to deposit VIZ's wallet:<br>
				</p>
				<ul class="simple">
					<li>To transfer from another account it is enough to specify your account <span class="bold current_user"></span></li>
					<li>To get viz from the exchange <a href="https://wallet.bitshares.org/" target="_blank">Bitshares</a> to your wallet, go to it and transfer tokens XCHNG.VIZ to <strong>xchng-viz</strong> with memo <strong>log:<span class="bold current_user"></span></strong></li>
					<li>You can also buy viz for regular money or bitcoins:<br>
						&mdash; <a href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2742298&amp;lang=ru-RU" target="_blank">Purchase VIZ for $2</a><br>
						&mdash; <a href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2742300&amp;lang=ru-RU" target="_blank">Purchase VIZ for $5</a><br>
						&mdash; <a href="https://www.digiseller.market/asp2/pay_payu.asp?id_d=2742303&amp;lang=ru-RU" target="_blank">Purchase VIZ for $10</a>
					</li>
				</ul>
				<p>Enter the code you received after purchase here:</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Account:</span>
						<input type="text" name="deposit-account" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Code:</span>
						<input type="text" name="deposit-claim-code" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p class="red deposit-error"></p>
				<p class="green deposit-success"></p>
				<p>
					<input class="deposit-action red-button captions" type="button" value="Obtain">
					<span class="submit-button-ring"></span>
					<span class="icon icon-margin hidden icon-color-red icon-check"></span>
				</p>
				<div class="addon captions">
					<h3>Warning</h3>
					<p>The price of viz purchased this way is likely to be markedly worse than the exchange price because of the difficulty of selling tokens for regular money, intermediaries' commissions (and we don't like banks for that either) and other reasons.</p>
				</div>

				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
			</div>
		</div>
		<div class="page page-paid-subscriptions" data-title="Overview of available subscriptions">
			<div class="card">
				<div class="section view-paid-subscription">
					<h3>Agreement with a subscription provider <span class="provider-account bold"></span></h3>
					<div class="account-balance captions">
						<div>Balance: <span rel="token">&hellip;</span> viz</div>
					</div>
					<div class="edit-paid-subscription"></div>
					<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
				</div>
				<div class="section view-paid-subscriptions">
					<h3>Overview of available subscriptions</h3>
					<div class="table-view captions">
						<p>
							<label>
								<input name="provider-filter" class="simple-rounded simple-rounded-size">
								&mdash; Search by provider
							</label>
						</p>
						<p>
							<label>
								<input name="descr-filter" class="simple-rounded simple-rounded-size">
								&mdash; Search by description
							</label>
						</p>
						<p>
							<label>
								<select name="order" class="simple-rounded">
									<option value="+provider" selected>Provider account by ascending</option>
									<option value="-provider">Provider account by descending</option>
									<option value="+amount">Price ascending</option>
									<option value="-amount">Price descending</option>
									<option value="+sub_count">Number of subscribers by ascending</option>
									<option value="-sub_count">Number of subscribers by descending</option>
									<option value="+sub_amount">Amount of payments by ascending</option>
									<option value="-sub_amount">Amount of payments by descending</option>
								</select>
								&mdash; Sort by
							</label>
						</p>
						<div class="table-header">
							<div class="columns-view adaptive-hide-flex">
								<div class="column-view column-flex"></div>
								<!--
								<div class="column-view column-4">Provider</div>
									<div class="column-view column-6">Period</div>
									<div class="column-view column-6">Levels</div>
									<div class="column-view column-6">Amount</div>
								<div class="column-view column-flex">Information</div>
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
		<div class="page page-active-paid-subscriptions" data-title="Manage subscriptions">
			<div class="card">
				<h3>Manage subscriptions</h3>
				<div class="account-balance captions">
					<div>Balance: <span rel="token">&hellip;</span> viz</div>
				</div>
				<p>Active subscriptions of the account <span class="current_user bold"></span>.</p>
				<div class="active-paid-subscriptions">
					<div class="table-view captions">
						<div class="table-header">
							<div class="columns-view adaptive-hide-flex">
								<div class="column-view column-5">Provider</div>
								<div class="column-view column-5">Period</div>
								<div class="column-view column-5">Level</div>
								<div class="column-view column-5">Amount</div>
								<div class="column-view column-flex">Renewal date</div>
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
					<h3>Hint</h3>
					<p>If at the time of prolongation (auto-renewal of subscription) there is not enough tokens on your wallet balance, the subscription is stopped and moved to the list of inactive.</p>
				</div>
				<a class="show-inactive-paid-subscriptions-action">Show inactive subscriptions (completed or expired)</a>
				<div class="inactive-paid-subscriptions hidden">
					<h3>Inactive subscriptions</h3>
					<div class="table-view captions">
						<div class="table-header">
							<div class="columns-view adaptive-hide-flex">
								<div class="column-view column-5">Provider</div>
								<div class="column-view column-5">Period</div>
								<div class="column-view column-5">Level</div>
								<div class="column-view column-5">Amount</div>
								<div class="column-view column-flex">End date</div>
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
		<div class="page page-create-paid-subscribe" data-title="Create or modify a subscription">
			<div class="card">
				<h3><span class="create-edit-paid-subscribe-caption">Create or modify</span> a subscription</h3>
				<p>
					Creator of the agreement (provider): <span class="current_user bold"></span>.
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Description (up to 1000 characters):</span>
						<input type="text" name="create-paid-subscribe-descr" class="simple-rounded wide" maxlength="1000" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Link to agreement terms and conditions:</span>
						<input type="text" name="create-paid-subscribe-url" class="simple-rounded wide" maxlength="1000" placeholder="https://">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Number of available subscription levels:</span>
						<input type="text" name="create-paid-subscribe-levels" class="simple-rounded" placeholder="">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Price per level:</span>
						<input type="text" name="create-paid-subscribe-amount" class="simple-rounded" placeholder="0.00 viz">
					</label>
				</p>
				<p>
					<label class="input-descr">
						<span class="input-caption">Subscription period after payment (number of days):</span>
						<input type="text" name="create-paid-subscribe-period" class="simple-rounded" placeholder="0">
					</label>
				</p>
				<p><label class="check color-red">I undertake to comply with the terms of the agreement<input type="checkbox" name="create-paid-subscribe-agreement"><span class="mark"></span></label></p>
				<!--<p><label class="radio color-red">Stop making agreements<input type="radio" name="create-paid-subscribe-agreement" value="false"><span class="mark"></span></label></p>-->
				<label class="check color-red fee-checkbox">When you create a subscription, your wallet will be charged with <span class="median-props" rel="create_paid_subscription_fee">&hellip; viz</span>.<input type="checkbox" name="create-paid-subscribe-fee"><span class="mark"></span></label>
				<p class="red create-paid-subscribe-error"></p>
				<p class="green create-paid-subscribe-success"></p>
				<p>
					<input class="create-paid-subscribe-action red-button captions" type="button" value="Confirm">
					<span class="submit-button-ring" rel="create"></span>
					<span class="icon icon-margin hidden icon-color-red icon-check" rel="create"></span>
				</p>
				<p>
					<input class="cancel-paid-subscribe-action red-button captions" type="button" value="Stop subscription">
					<span class="submit-button-ring" rel="cancel"></span>
					<span class="icon icon-margin hidden icon-color-red icon-check" rel="cancel"></span>
				</p>
				<div class="addon captions">
					<h3>Hint</h3>
					<p>One account can create only one subscription. You may change the terms of your subscription agreement and terminate it. Breaching the terms of the agreement will affect your reputation. All agreements and changes to them are recorded on the blockchain and can be verified.<br>
					Once the subscription is stopped, the agreements made will remain in effect until they expire, and no new agreements will be made.</p>
				</div>

				<p><hr><a data-href="/market/">%%default_return_link%%</a></p>
			</div>
		</div>`,

	/* Node addon */
	node_request:'Sending a request to a node&hellip;',
	node_not_respond:'Noda does not respond',
	node_wrong_response:'The response from the node does not match the format',
	node_protocol_error:'The node address must contain the protocol (http/https/ws/wss)',
	node_empty_error:'The node address cannot be empty',

	/* Index */
	index_account_caption:'Account',
	index_social_capital_caption:'Capital (viz)',
	index_balance_caption:'Balance (viz)',
	index_energy_caption:'Energy',
	index_info_caption:'Information',
	index_add_account_button:'Add account',
	index_info_acc_on_sale:'account on sale',
	index_info_subacc_on_sale:'subaccounts on sale',
	index_info_withdraw:'capital unstaking',
	index_info_adaptive_caption:'Information:',
	index_selected_account:'Selected account',
	index_login_account_caption:'Switch to account {account}',
	index_logout_account_caption:'Logout by account {account}',
	index_social_capital_adaptive_caption:'Capital (viz):',
	index_balance_adaptive_caption:'Balance (viz):',
	index_energy_adaptive_caption:'Energy (viz):',
	index_selected_node:'Selected node',
	index_remove_node:'remove',
	index_add_node_caption:'Add a node:',
	index_add_node_button:'Confirm',

	/* Manage Profile */
	save_profile_success:'Profile successfully saved',

	/* Access */
	access_remove_caption:'remove',
	access_weight_caption:'weight {weight}',
	access_need_regular_weight:'The total weight for the regular type of access is less than necessary',
	access_need_active_weight:'The total weight for the active type of access is less than necessary',
	access_need_master_weight:'The total weight for the master type of access is less than necessary',
	access_saved_successfully:'Access scheme successfully saved',
	access_save_keys:', be sure to copy the new keys',
	access_error:'Error in the request, check the master key and try again later',
	access_invalid_master_weight_threshold:'The required weight for the master access type is invalid',
	access_invalid_active_weight_threshold:'The required weight for the active access type is invalid',
	access_invalid_regular_weight_threshold:'The required weight for the regular access type is invalid',
	access_reset_success:'The keys have been successfully reset, be sure to save them',
	access_loaded:'The account access scheme has been successfully updated',

	/* Witnesses */
	witness_vote_caption:'Vote for a witness {witness}',
	witness_unvote_caption:'Withdraw a vote from a witness {witness}',
	witness_props_caption:'parameters',
	witness_url_caption:'link',
	witness_votes_weight_caption:'Weight of votes',
	witness_user_vote_weight_caption:'The weight of your vote',
	witness_node_version_caption:'Node version: ',
	witness_hardfork_vote_caption:'Votes for new hardfork: ',
	witness_hardfork_vote_starting_caption:' as of {date}',
	witness_penalty_caption:'Penalty for skipping blocks: ',
	witness_show_inactive_link:'Show deactivated witnesses',
	witness_set_props_button:'Set the parameters',
	witness_set_props_success:'Parameters are successfully set',
	witness_set_props_error:'Error: check modified fields',
	witness_save_signing_key:', save the signature private key: ',
	witness_was_disabled:', witness was deactivated',

	/* Delegations */
	social_capital_own_adaptive_caption:'Own:',
	social_capital_delegated_adaptive_caption:'Delegated:',
	social_capital_received_adaptive_caption:'Received:',
	social_capital_effective_adaptive_caption:'Effective:',
	delegations_account_adaptive_caption:'Account:',
	delegations_social_capital_adaptive_caption:'Capital:',
	delegations_revocation_button:'Revoke',
	delegations_revocation_info:'Revoke is possible after {date}',
	delegations_awaiting_return:'Waiting to return',
	delegation_success:'Delegation successfully completed',

	/* Fund */
	fund_request_vote_list_from:' from ',
	fund_request_vote_list_shares_amount:' effective capital: ',
	fund_request_votes_count:'Total votes: ',
	fund_request_votes_shares_amount:'Share of votes from the whole network: ',
	fund_request_votes_shares_required:'required',
	fund_request_calculated_amount:'Calculated amount of the request at the moment: ',
	fund_request_title_caption:'Request #<span class="request-id">{id}</span>',
	fund_request_start_time_caption:'Created: ',
	fund_request_cancel_caption:'Cancel request',
	fund_request_descr_caption:'Name: ',
	fund_request_url_caption:'Link: ',
	fund_request_creator_caption:'Creator: ',
	fund_request_worker_caption:'Worker: ',
	fund_request_min_amount_caption:'Minimum amount for request execution: ',
	fund_request_max_amount_caption:'Requested amount: ',
	fund_request_conclusion_time_caption:'Review duration: ',
	fund_request_end_time_caption:'Time of finishing: ',
	fund_request_conclusion_payout_amount_caption:'Approved amount: ',
	fund_request_status_caption:'Status: ',
	fund_request_payout_amount_caption:'Paid out: ',
	fund_request_remain_payout_amount_caption:'Remains to be paid: ',
	fund_request_last_payout_time_caption:'Time of last payment: ',
	fund_request_vote_weight_caption:'Percentage of request satisfaction of the requested amount:',
	fund_request_vote_button:'Vote',
	fund_request_votes_caption:'Votes by request',

	fund_show_other_requests:'Show other requests &rarr;',
	fund_none_requests:'No requests according to these criteria were found in the last 7 days.',
	fund_cancel_request_confirmation:'Are you sure you want to cancel the request?',
	fund_request_canceled_successfully:'You canceled the request.',

	fund_request_vote:'You have successfully voted on the request',
	fund_request_url_needed:'The link to the request cannot be empty',
	fund_request_url_limit:'The link and description of the request should not exceed 256 characters',
	fund_request_worker_check:'Check the worker’s account',
	fund_request_min_amount_check:'Check the minimum amount',
	fund_request_max_amount_check:'Check the maximum amount',
	fund_request_min_lt_max_needed:'The minimum amount cannot exceed the maximum',
	fund_request_duration_check:'Check the request period',
	fund_request_success:'The request has been submitted',

	/* Accounts, Subaccounts on sale */
	ba_response_error:'This account was not found, try again later',
	ba_account_not_found:'This account was not found',
	ba_account_not_on_sale:'This account was not offered for sale',
	bsa_response_error:'Seller account was not found, try again later',
	bsa_account_not_found:'This seller’s account was not found',
	bsa_accounts_not_on_sale:'This subaccount is not available for purchase',

	/* Witness params */
	account_not_witness:'The account is not declared as witness',
	witness_keys_dont_match:'Private key and public key do not match',
	witness_url_is_needed:'Fill in the witness statement link field',
	witness_props_captions:{
		account_creation_fee:'Chargeable fee when creating an account',
		create_account_delegation_ratio:'Delegation coefficient when creating an account',
		create_account_delegation_time:'Delegation period at account creation (in seconds)',
		bandwidth_reserve_percent:'Share of the network allocated for reserve bandwidth',
		bandwidth_reserve_below:'Reserve bandwidth applies to accounts with a share of the network up to the threshold',
		committee_request_approve_min_percent:'Minimum share of the total social capital for a decision on an request in the DAO Fund',
		min_delegation:'Minimum number of tokens when delegating',
		vote_accounting_min_rshares:'Minimum weight of the vote to be taken into account when awarding (reward shares)',
		maximum_block_size:'Maximum block size in the network (in bytes)',
		inflation_witness_percent:'Share of the emission going to the witnesses',
		inflation_ratio_committee_vs_reward_fund:'Share of the remaining emission going to the DAO Fund (the rest to the Award Fund)',
		inflation_recalc_period:'Number of blocks between recalculations of the inflation model',
		data_operations_cost_additional_bandwidth:'Additional bandwidth surcharge for each data operation in a transaction',
		witness_miss_penalty_percent:'Penalty to a witness for missing a block as a percentage of the total weight of votes',
		witness_miss_penalty_duration:'Duration of the penalty to the witness for skipping the block in seconds',
		create_invite_min_balance:'Minimum check amount',
		committee_create_request_fee:'Fee for creating an request to the DAO Fund',
		create_paid_subscription_fee:'Fee for creating a paid subscription',
		account_on_sale_fee:'Fee for offering an account for sale',
		subaccount_on_sale_fee:'Fee for offering subaccounts for sale',
		witness_declaration_fee:'Fee for declaring an account as a witness',
		withdraw_intervals:'Number of periods (days) of capital unstake',
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
		'0':'Under review',
		'1':'Cancelled by the creator',
		'2':'Not enough votes',
		'3':'The minimum amount of the request has not been reached',
		'4':'Is still paid',
		'5':'Fully paid out',
	},

	/* Invites */
	invites_code_not_found:'code not found',
	invites_check_code_not_found:'verification code not found',
	invites_invalid_code:'incorrect code',
	invites_code_already_claimed:'the check for {amount} already been redeemed by {receiver}',
	invites_claim_success:'Check successfully redeemed by account {account}',
	invites_claim_code_not_private:'Enter the redemption code, not the verification code',
	invites_claim_code_incorrect:'Redemption code is invalid',

	/* Login checks */
	login_empty_account:'Enter your account',
	check_login_already_exist:'The login is already taken, try another one',
	check_login_starting_error:'Login must begin with a Latin symbol',
	check_login_ending_error:'Login must end with a Latin symbol or a number',
	check_login_subaccount_error:'Subaccount must be related to account {account}',

	/* History table */
	history_adaptive_data:'Date:',
	history_adaptive_item:'Entry:',
	history_award:'Awarding <a class="view-account" href="https://info.viz.plus/accounts/{receiver}/" target="_blank">{receiver}</a> with <span class="view-percent">{energy}%</span> energy',
	history_award_memo:' with memo ',
	history_receive_award:'Award received <span class="view-tokens">{shares}</span> from <a class="view-account" href="https://info.viz.plus/accounts/{initiator}/" target="_blank">{initiator}</a>',
	history_create_invite:'A check for <span class="view-tokens">{tokens}</span> with the verification code <span class="view-key">{key}</span>',
	history_claim_invite_balance:'A check with a code <span class="view-key">{key}</span> is redeemed',
	history_use_invite_balance:'A check with a code <span class="view-key">{key}</span> is redeemed',
	history_transfer_from:'<span class="view-tokens">{tokens}</span> transfered to <a class="view-account" href="https://info.viz.plus/accounts/{to}/" target="_blank">{to}</a>',
	history_transfer_to:'<span class="view-tokens">{tokens}</span> received from <a class="view-account" href="https://info.viz.plus/accounts/{from}/" target="_blank">{from}</a>',
	history_transfer_memo:' with memo ',
	history_transfer_to_vesting_from:'<span class="view-tokens">{tokens}</span> staked to social capital <a class="view-account" href="https://info.viz.plus/accounts/{to}/" target="_blank">{to}</a>',
	history_transfer_to_vesting_to:'<span class="view-tokens">{tokens}</span> received to social capital from <a class="view-account" href="https://info.viz.plus/accounts/{from}/" target="_blank">{from}</a>',
	history_withdraw_vesting_stop:'Stopping the social capital unstake',
	history_withdraw_vesting:'Activation of unstake social capital with an amount of <span class="view-tokens">{shares}</span>',
	history_fill_vesting_withdraw:'Received <span class="view-tokens">{tokens}</span> by social capital unstake',
	history_fill_vesting_withdraw_from:'<a class="view-account" href="https://info.viz.plus/accounts/{to}/" target="_blank">{to}</a> account is sent <span class="view-tokens">{tokens}</span> from social capital unstaking',
	history_fill_vesting_withdraw_to:'Received <span class="view-tokens">{tokens}</span> from social capital unstaking by account <a class="view-account" href="https://info.viz.plus/accounts/{from}/" target="_blank">{from}<a>',

	login_active_wif_invalid:'The private active key is invalid',
	login_memo_wif_invalid:'The private memo key is invalid',
	login_account_not_found:'Account with this login was not found',
	login_key_weight_not_enough:'The weight of the active key is not enough for this account to process transactions',
	login_memo_wif_incorrect:'Memo private key does not match the account',

	plural_days_1:' day',
	plural_days_2:' days',
	plural_days_5:' days',

	/* Paid Subscriptions*/
	ps_sub_count_caption:'Subscribers: ',
	ps_sub_amount_caption:'Sum of payments: ',
	ps_agreement_link:'Agreement',
	ps_view_link:'Go to',
	ps_icon_signed_caption:'Subscribed',
	ps_adaptive_provider:'Provider:',
	ps_adaptive_period:'Period:',
	ps_adaptive_levels:'Levels:',
	ps_adaptive_amount:'Price:',
	ps_adaptive_descr:'Description',
	ps_provider_adaptive_caption:'Provider:',
	ps_level_adaptive_caption:'Level:',
	ps_amount_adaptive_caption:'Amount:',
	ps_period_adaptive_caption:'Period:',
	ps_end_date_adaptive_caption:'Expiration date:',
	ps_next_date_adaptive_caption:'Renewal date:',
	ps_agreement_status_caption:'Status of the agreement',
	ps_agreement_status_ended:'finished',
	ps_agreement_status_active:'active',
	ps_agreement_closed_changed_conditions:'The agreement is terminated due to a change in the terms of the agreement by the provider.',
	ps_agreement_active_changed_conditions:'The terms of the agreement will be changed at renewal',
	ps_agreement_active_changed_conditions_good:' without increasing the payment amount.',
	ps_agreement_active_changed_conditions_bad:' with an increase in the payment amount, which will lead to <span class="red">automatic termination of the agreement at expiration</span>. Renewal of the current agreement is required.',
	ps_end_date_caption:'Date of agreement expiration',
	ps_auto_renewal_active:'Auto-renewal enabled',
	ps_next_date_caption:'Renewal date',
	ps_next_end_date_caption:'Date the agreement expires',
	ps_agreement_closed:'Provider stopped signing new agreements.',
	ps_agreement_descr_caption:'Description',
	ps_agreement_url_caption:'Agreement',
	ps_agreement_amount_caption:'Price per level',
	ps_agreement_levels_caption:'Number of levels',
	ps_agreement_period_caption:'Period of agreement',
	ps_agreement_form_level_caption:'Level of agreement',
	ps_agreement_form_sum_amount_caption:'Total cost',
	ps_agreement_form_auto_renewal_caption:'Automatic renewal<span class="adaptive-hide">&nbsp;of the agreement</span>',
	ps_agreement_sign_caption:'Sign the terms of the agreement',
	ps_agreement_sign_off_caption:'End the agreement',
	ps_agreement_button_caption:'Confirm',
	ps_need_sign_agreement:'You did not select an action to confirm',
	ps_sign_off_error:'You cannot manually complete the agreement. Cancel the auto-renewal and wait for the current agreement to expire.',
	ps_empty_agreement:'You did not provide a link to the terms of the agreement',
	ps_levels_must_be_positive_number:'The number of levels must be a positive number',
	ps_sum_amount_error:'Check the price',
	ps_period_must_be_positive_number:'The period of the agreement must be a positive number',
	ps_agreement_sign_success:'The operation has been completed successfully. The subscription will appear in the list of available in a few minutes.',
	ps_agreement_sign_off_success:'The operation has been completed successfully. The subscription has been stopped.',

	memo_title:'Memo key',
	memo_save_key:'Save key',
	memo_update_key:'Set and save the key',
	memo_key_saved:'Key saved successfully',
	memo_key_updated:'The key is successfully set, be sure to save it',

	login_title:'Add account',
	create_subaccount_error:'Error creating a subaccount',
	deposit_too_much_attempts:'You made more than 5 attempts in 5 minutes, wait a while and try again',
	deposit_claimed_code:'The code was already activated',
	deposit_incorrect_code:'Code not found',
	deposit_broadcast_error:'Server issues, try again later',
	deposit_success:'You have successfully activated the code, the funds should be received within 1 minute',
	buy_account_error:'Error when buying an account',
	buy_account_on_recovery:'The account is in recovery, it cannot be bought',
	buy_account_subaccount_is_busy:'Such a subaccount is already taken',
	sell_subaccount_success:'Subaccount sales conditions have been successfully changed',
	set_account_price_success:'Conditions for the sale of the account have been successfully changed',
	create_account_error:'Error when creating an account',
	transfer_error:'Transfer error',
	transfer_success:'Transfer successfully completed',
	transfer_amount_success:'Transfer of {amount} was successful',
	invite_amount_success:'Check for {amount} was successfully created',
	invite_info_success:'Check for {amount}, redemption code: {private_key}',
	transfer_memo_not_match_template:'The memo does not match the format of the template',
	withdraw_success:'Unstake capital is confirmed',
	stop_withdraw_error:'Error in the stop operation',

	/* Market menu */
	create_paid_subscribe_caption:'Create',
	edit_paid_subscribe_caption:'Edit',

	/* Default captions */
	default_index:'Index',
	default_out_of:' out of ',
	default_until:' until ',
	award_info_success:'Reward {account} successfully completed, {energy}% energy spent',
	default_check_amount:'Check the amount',
	default_operation_error:'Operation confirmation error',
	default_recipient_error:'Check the recipient account',
	default_no_items:'No entries found.',
	default_no_items_try_other_page:' Try going to another page',
	default_no_items_try_other_search:' or specify other search options',
	default_no_items_try_other_end:'.',
	default_incorrect_response:'Error in the request, try again later',
	default_account_not_found_or_incorrect_response:'Account not found or error in request',
	default_loading:'Loading&hellip;',
	default_loading_more:'Load more &#10140;',
	default_node_not_respond:'Error! The public node is not responding, try later by refreshing the page.',
	default_node_error:'Failed to receive data from public node, try again later.',
	default_prev_page:'&larr; Previous page',
	default_next_page:'Next page &rarr;',
	default_list_items_counter:'Shown',
	default_select_action:'Select action',
	default_invalid_master_key:'The master key is invalid',
	default_date_utc:' UTC',
	default_return_link:'&larr; Return',
	default_error:'Error: {text}',
	default_insufficient_funds:'Not enough funds',
	default_not_enough_energy:'Not enough energy',
	default_fee_confirmation:'Confirm acceptance of the fee charged',
	default_successful_operation:'The operation has been successfully completed.',
	default_incorrect_private_key_try_again:'Wrong private key, try again',
	default_type_memo_key:'Enter the private memo key to encrypt',
	default_memo_encode_error:'Failed to encrypt memo, try again later...',
	default_api_error:'API service not response',

	enter_memo_link:'<a data-href="/memo/?back={link}">Enter the private memo key</a> for decryption',
	error_update_memo_link:'Invalid memo private key, try again or <a data-href="/memo/?back={link}">update key</a>',
};