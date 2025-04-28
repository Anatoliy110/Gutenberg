<?php
function custom_render_latest_posts($attributes) {
    $posts_to_show = isset($attributes['postsToShow']) ? (int) $attributes['postsToShow'] : 4;
    $view_more_url = isset($attributes['viewMoreUrl']) ? esc_url($attributes['viewMoreUrl']) : '/blog';

    $paged = get_query_var('paged') ? get_query_var('paged') : 1;

    $args = [
        'post_type' => 'post',
        'posts_per_page' => $posts_to_show,
        'paged' => $paged,
        'post_status' => 'publish',
    ];
    $query = new WP_Query($args);

    if (!$query->have_posts()) {
        return '<p>No posts found.</p>';
    }

    ob_start();
    ?>
    <div class="latest-posts-block container">
        <h2 class="latest-posts-title text-center mb-5">Latest Articles</h2>

        <div class="row row-cols-1 row-cols-md-2 g-5">
            <?php while ($query->have_posts()): $query->the_post(); ?>
                <div class="col">
                    <div class="post-item d-flex flex-column flex-md-row h-100">
                        <?php if (has_post_thumbnail()): ?>
                            <div class="post-thumbnail w-50">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('large', ['class' => 'img-fluid rounded']); ?>
                                </a>
                            </div>
                        <?php endif; ?>

                        <div class="post-content w-50 ps-md-4 d-flex flex-column">
                            <h3 class="post-title h6 mb-2">
                                <a href="<?php the_permalink(); ?>" class="text-dark text-decoration-none">
                                    <?php the_title(); ?>
                                </a>
                            </h3>

                            <div class="post-meta text-muted small mb-1">
                                <?php echo get_the_date('d.m.Y'); ?>
                            </div>

                            <div class="post-excerpt small flex-grow-1">
                                <?php echo wp_trim_words(get_the_excerpt(), 22); ?>
                            </div>

                            <div class="post-author text-muted small d-flex align-items-center mt-2">
                                <?php echo get_avatar(get_the_author_meta('ID'), 24); ?>
                                <span class="ms-2"><?php the_author(); ?></span>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>

        <?php
        $pagination = paginate_links([
            'type' => 'list',
            'prev_text' => '&laquo;',
            'next_text' => '&raquo;',
            'current' => max(1, get_query_var('paged')),
            'total' => $query->max_num_pages,
        ]);

        if ($pagination): ?>
            <div class="pagination-wrapper mt-5">
                <?php echo $pagination; ?>
            </div>
        <?php endif; ?>
    </div>
    <?php
    wp_reset_postdata();
    return ob_get_clean();
}
?>
