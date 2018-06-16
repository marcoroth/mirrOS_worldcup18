<?php
	$worldcup18_apikey = getConfigValue('$worldcup18_apikey');
	if (empty($email)) { $worldcup18_apikey = ""; }
?>

<p>
	<?php echo _("worldcup18_getapikey"); ?><br /><br />
	<a href="https://www.football-data.org/client/register" target="_blank"><?php echo _("worldcup18_getapikey"); ?></a>
</p>

<h5><?php echo _('worldcup18_apikey');?></h5>
<input type="text" id="worldcup18_apikey" placeholder="<?php echo _('worldcup18_apikey');?>" value="<?php echo $worldcup18_apikey; ?>"/>

<a href="/modules/worldcup18/assets/reset.php"><?php echo _("worldcup18_reset_config"); ?></a><br /><br />

<div class="block__add" id="worldcup18_save">
	<button class="worldcup18_save--button" href="#">
		<span><?php echo _('save'); ?></span>
	</button>
</div>
