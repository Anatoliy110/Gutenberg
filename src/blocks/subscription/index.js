import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './subscription.scss';

registerBlockType('custom/subscription', {
  attributes: {
    title: { type: 'string', default: 'Newsletter' },
    description1: { type: 'string', default: 'Subscribe my Newsletter for new blog posts, tips & new photos.' },
    description2: { type: 'string', default: "Let's stay updated!" },
    placeholder: { type: 'string', default: 'Your e-mail *' },
    buttonText: { type: 'string', default: 'Subscribe' }
  },

  edit({ attributes, setAttributes }) {
    const { title, description1, description2, placeholder, buttonText } = attributes;
    const blockProps = useBlockProps({ className: 'subscription-form container text-center' });

    return (
      <div {...blockProps}>
        <RichText
          tagName="h2"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          placeholder="Enter title"
          className="subscription-title"
        />
        <RichText
          tagName="p"
          value={description1}
          onChange={(value) => setAttributes({ description1: value })}
          placeholder="Enter first line of description"
          className="subscription-description"
        />
        <RichText
          tagName="p"
          value={description2}
          onChange={(value) => setAttributes({ description2: value })}
          placeholder="Enter second line of description"
          className="subscription-description"
        />
        <form className="subscription-form-ajax" noValidate>
          <div className="row">
            <div className="col-auto">
              <input className="form-control" type="email" placeholder={placeholder} />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">{buttonText}</button>
            </div>
          </div>
        </form>
      </div>
    );
  },

  save({ attributes }) {
    const { title, description1, description2, placeholder, buttonText } = attributes;
    const blockProps = useBlockProps.save({ className: 'subscription-form container text-center' });

    return (
      <div {...blockProps}>
        <h2 className="subscription-title">{title}</h2>
        <p className="subscription-description">{description1}</p>
        <p className="subscription-description">{description2}</p>
        <form className="subscription-form-ajax" noValidate>
          <div className="row">
            <div className="col-auto">
              <input className="form-control" type="email" placeholder={placeholder} />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">{buttonText}</button>
            </div>
          </div>
          <div className="error-message"></div>
        </form>
      </div>
    );
  }
});
