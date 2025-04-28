<?php
/**
 * Plugin Name: Custom Gutenberg Blocks
 * Description: Custom blocks for Gutenberg editor.
 * Version: 1.0
 */

defined('ABSPATH') || exit;

function cgb_register_blocks() {
    $blocks = glob(__DIR__ . '/build/blocks/*');
    foreach ($blocks as $block_path) {
        if (is_dir($block_path)) {
            $block_name = basename($block_path);

            $args = [];
            if ($block_name === 'latest-posts') {
                $args['render_callback'] = 'custom_render_latest_posts';
            }

            register_block_type($block_path, $args);
        }
    }
}
add_action('init', 'cgb_register_blocks');

add_filter('block_categories_all', function($categories) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'custom-blocks',
                'title' => __('Custom Blocks', 'text-domain'),
                'icon'  => null,
            ],
        ]
    );
}, 10, 2);

function cgb_enqueue_global_styles() {
    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
        [],
        '5.3.2'
    );

    if (file_exists(__DIR__ . '/build/blocks/hero/index.css')) {
        wp_enqueue_style(
            'hero-block-style',
            plugin_dir_url(__FILE__) . 'build/blocks/hero/index.css',
            [],
            filemtime(__DIR__ . '/build/blocks/hero/index.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'cgb_enqueue_global_styles');

function cgb_enqueue_global_scripts() {
    wp_enqueue_script(
        'bootstrap-js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
        [],
        '5.3.2',
        true
    );

    wp_enqueue_script('jquery');

    wp_enqueue_script(
        'custom-subscription-form',
        plugin_dir_url(__FILE__) . 'js/subscription-form.js',
        ['jquery'],
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'cgb_enqueue_global_scripts');

function cgb_enqueue_editor_assets() {
    wp_enqueue_style(
        'bootstrap-editor-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
        [],
        '5.3.2'
    );

    if (file_exists(__DIR__ . '/build/blocks/hero/index.css')) {
        wp_enqueue_style(
            'hero-editor-style',
            plugin_dir_url(__FILE__) . 'build/blocks/hero/index.css',
            [],
            filemtime(__DIR__ . '/build/blocks/hero/index.css')
        );
    }
}
add_action('enqueue_block_editor_assets', 'cgb_enqueue_editor_assets');

if (file_exists(__DIR__ . '/render.php')) {
    require_once __DIR__ . '/render.php';
}

add_action('enqueue_block_editor_assets', function() {
    wp_enqueue_style(
        'custom-editor-style',
        plugin_dir_url(__FILE__) . 'editor-style.css',
        [],
        null
    );
});
?>

