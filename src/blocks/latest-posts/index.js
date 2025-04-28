import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

registerBlockType('custom/latest-posts', {
  attributes: {
    postsToShow: { type: 'number', default: 4 },
    viewMoreUrl: { type: 'string', default: '/blog' },
  },

  edit({ attributes, setAttributes }) {
    const { postsToShow, viewMoreUrl } = attributes;
    const blockProps = useBlockProps({ className: 'latest-posts-block container' });

    return (
      <>
        <InspectorControls>
          <PanelBody title="Settings">
            <TextControl
              label="Number of posts to show"
              value={postsToShow}
              onChange={(value) => setAttributes({ postsToShow: parseInt(value) || 4 })}
            />
            <TextControl
              label="View More URL"
              value={viewMoreUrl}
              onChange={(value) => setAttributes({ viewMoreUrl: value })}
            />
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <h2 className="latest-posts-title">Latest Articles</h2>
          <p>Posts will be loaded automatically on the front-end.</p>
        </div>
      </>
    );
  },

  save() {
    return null;
  }
});
