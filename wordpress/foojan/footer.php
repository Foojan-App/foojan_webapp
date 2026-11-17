<?php
	$bridge_qode_options = bridge_qode_return_global_options();
	$bridge_qode_page_id = bridge_qode_get_page_id();
?>
<?php 
$bridge_qode_content_bottom_area = "yes";
if(get_post_meta($bridge_qode_page_id, "qode_enable_content_bottom_area", true) != ""){
	$bridge_qode_content_bottom_area = get_post_meta($bridge_qode_page_id, "qode_enable_content_bottom_area", true);
} else{
	if (isset($bridge_qode_options['enable_content_bottom_area'])) {
		$bridge_qode_content_bottom_area = $bridge_qode_options['enable_content_bottom_area'];
	}
}
$bridge_qode_content_bottom_area_sidebar = "";
if(get_post_meta($bridge_qode_page_id, 'qode_choose_content_bottom_sidebar', true) != ""){
	$bridge_qode_content_bottom_area_sidebar = get_post_meta($bridge_qode_page_id, 'qode_choose_content_bottom_sidebar', true);
} else {
	if(isset($bridge_qode_options['content_bottom_sidebar_custom_display'])) {
		$bridge_qode_content_bottom_area_sidebar = $bridge_qode_options['content_bottom_sidebar_custom_display'];
	}
}
$bridge_qode_content_bottom_area_in_grid = true;
if(get_post_meta($bridge_qode_page_id, 'qode_content_bottom_sidebar_in_grid', true) != ""){
	if(get_post_meta($bridge_qode_page_id, 'qode_content_bottom_sidebar_in_grid', true) == "yes") {
		$bridge_qode_content_bottom_area_in_grid = true;
	} else {
		$bridge_qode_content_bottom_area_in_grid = false;
	} 
}
else {
	if(isset($bridge_qode_options['content_bottom_in_grid'])){if ($bridge_qode_options['content_bottom_in_grid'] == "no") $bridge_qode_content_bottom_area_in_grid = false;}
}
$bridge_qode_content_bottom_background_color = '';
if(get_post_meta($bridge_qode_page_id, "qode_content_bottom_background_color", true) != ""){
	$bridge_qode_content_bottom_background_color = get_post_meta($bridge_qode_page_id, "qode_content_bottom_background_color", true);
}
?>
	<?php if($bridge_qode_content_bottom_area == "yes") { ?>
	<?php if($bridge_qode_content_bottom_area_in_grid){ ?>
		<div class="container">
			<div class="container_inner clearfix">
	<?php } ?>
		<div class="content_bottom" <?php if($bridge_qode_content_bottom_background_color != ''){ echo 'style="background-color:'.$bridge_qode_content_bottom_background_color.';"'; } ?>>
			<?php dynamic_sidebar($bridge_qode_content_bottom_area_sidebar); ?>
		</div>
		<?php if($bridge_qode_content_bottom_area_in_grid){ ?>
					</div>
				</div>
			<?php } ?>
	<?php } ?>
	
	</div>
</div>

<?php
if(isset($bridge_qode_options['paspartu']) && $bridge_qode_options['paspartu'] == 'yes'){?>
        <?php if(isset($bridge_qode_options['vertical_area']) && $bridge_qode_options['vertical_area'] == "yes" && isset($bridge_qode_options['vertical_menu_inside_paspartu']) && $bridge_qode_options['vertical_menu_inside_paspartu'] == 'no') { ?>
        </div> 
        <?php } ?>
    </div> 
    <?php if((isset($bridge_qode_options['paspartu_on_bottom']) && $bridge_qode_options['paspartu_on_bottom'] == 'yes') ||
        (isset($bridge_qode_options['vertical_area']) && $bridge_qode_options['vertical_area'] == "yes" && isset($bridge_qode_options['vertical_menu_inside_paspartu']) && $bridge_qode_options['vertical_menu_inside_paspartu'] == 'yes')){ ?>
        <div class="paspartu_bottom"></div>
    <?php }?>
    </div> 
<?php
}
?>

	<?php fz_part('footer'); ?>
	
</div>
</div>
<?php wp_footer(); ?>
</body>
</html>