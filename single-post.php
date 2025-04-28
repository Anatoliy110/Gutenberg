<?php
/**
 * Template for displaying single posts
 */

get_header();

if (have_posts()) :
    while (have_posts()) : the_post();

        $content = get_the_content();

        $blocks = parse_blocks($content);

        $hero_block = '';
        $other_blocks = [];

        foreach ($blocks as $block) {
            if ($block['blockName'] === 'custom/hero') {
                $hero_block = render_block($block);
            } else {
                $other_blocks[] = $block;
            }
        }
?>

<main class="single-post-page container py-5">

    <?php if (!empty($hero_block)) : ?>
        <section class="hero-wrapper mb-5">
            <?php echo $hero_block; ?>
        </section>
    <?php endif; ?>

    <article class="post-article">

        <nav class="breadcrumbs mb-4" aria-label="breadcrumb">
            <a href="<?php echo esc_url(home_url('/')); ?>">Home</a> › 
            <a href="<?php echo esc_url(home_url('/blog')); ?>">Blog</a> › 
            <span><?php the_title(); ?></span>
        </nav>

        <header class="post-header text-center mb-5">
            <h1 class="post-title mb-3"><?php the_title(); ?></h1>
        </header>

        <?php if (has_post_thumbnail()) : ?>
            <figure class="post-thumbnail text-center mb-5">
                <?php the_post_thumbnail('large', ['class' => 'img-fluid rounded']); ?>
            </figure>
        <?php endif; ?>

        <div class="post-content">
            <?php
            foreach ($other_blocks as $block) {
                echo render_block($block);
            }
            ?>
        </div>

    </article>

</main>

<?php
    endwhile;
endif;

get_footer();
?>
