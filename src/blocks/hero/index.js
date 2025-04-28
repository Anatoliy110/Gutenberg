import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, PlainText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './hero.scss';

registerBlockType('custom/hero', {
  attributes: {
    logoUrl: { type: 'string', default: '' },
    menuItems: {
      type: 'array',
      default: [
        { text: 'Home', url: '#' },
        { text: 'About Us', url: '#' },
        { text: 'Features', url: '#' },
        { text: 'Cart', url: '#' },
        { text: 'Contact Us', url: '#' }
      ]
    },
    searchPlaceholder: { type: 'string', default: 'Search...' }
  },

  edit({ attributes, setAttributes }) {
    const { logoUrl, menuItems, searchPlaceholder } = attributes;
    const blockProps = useBlockProps({ className: 'hero' });

    const updateMenuItem = (index, field, value) => {
      const updatedItems = [...menuItems];
      updatedItems[index][field] = value;
      setAttributes({ menuItems: updatedItems });
    };

    return (
      <header {...blockProps}>
        <nav className="navbar container">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="logo">
              <MediaUpload
                onSelect={(media) => setAttributes({ logoUrl: media.url })}
                allowedTypes={['image']}
                render={({ open }) => (
                  logoUrl ? (
                    <img src={logoUrl} onClick={open} alt="Logo" />
                  ) : (
                    <Button onClick={open} variant="primary">Upload Logo</Button>
                  )
                )}
              />
            </div>

            <div className="d-flex align-items-center navigation-group">
              <div className="d-none d-md-flex">
                <ul className="navbar-nav mb-2 mb-lg-0 flex-row">
                  {menuItems.map((item, index) => (
                    <li key={index} className="nav-item px-2">
                      <PlainText
                        value={item.text}
                        onChange={(value) => updateMenuItem(index, 'text', value)}
                        placeholder="Menu Item"
                        className="nav-link"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="search-button ms-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch"
                aria-controls="offcanvasSearch"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                  <circle cx="14" cy="9" r="7" stroke="#000" strokeWidth="2" fill="none" />
                  <line x1="10" y1="14" x2="2" y2="22" stroke="#000" strokeWidth="2" />
                </svg>
              </button>

              <button className="navbar-toggler ms-3 d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    );
  },

  save({ attributes }) {
    const { logoUrl, menuItems, searchPlaceholder } = attributes;
    const blockProps = useBlockProps.save({ className: 'hero' });

    return (
      <header {...blockProps}>
        <nav className="navbar container">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="logo">
              {logoUrl && <img src={logoUrl} alt="Logo" />}
            </div>

            <div className="d-flex align-items-center navigation-group">
              <div className="d-none d-md-flex">
                <ul className="navbar-nav mb-2 mb-lg-0 flex-row">
                  {menuItems.map((item, index) => (
                    <li key={index} className="nav-item px-2">
                      <a className="nav-link" href="#">{item.text}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="search-button ms-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch"
                aria-controls="offcanvasSearch"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                  <circle cx="14" cy="9" r="7" stroke="#000" strokeWidth="2" fill="none" />
                  <line x1="10" y1="14" x2="2" y2="22" stroke="#000" strokeWidth="2" />
                </svg>
              </button>

              <button className="navbar-toggler ms-3 d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item mb-3">
                  <a className="nav-link" href="#">{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasSearch" aria-labelledby="offcanvasSearchLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasSearchLabel">Search</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body d-flex justify-content-center">
            <input type="text" className="form-control" style={{ maxWidth: '400px' }} placeholder={searchPlaceholder} />
          </div>
        </div>
      </header>
    );
  }
});
