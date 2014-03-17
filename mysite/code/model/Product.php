<?php
class Product extends DataObject {
	static $db = array(
		'Title' => 'Varchar',
		'Description' => 'HTMLText'
	);

	public static $has_one = array(
		'Image' => 'Image'
	);

	static $summary_fields = array(
		'Title'
	);
}