import { oneOf } from 'prop-types';
import React, { Component } from 'react';

class AdContainer extends Component {
  static propTypes = {
    type: oneOf(['vertical', 'horizontal', 'square', 'feed']).isRequired,
  };

  render() {
    const { type } = this.props;

    const adProps = {
      className: 'adsbygoogle',
      style: { display: 'block', width: '100%' },
      'data-ad-format': 'auto',
      'data-ad-client': 'ca-pub-3564148572601954',
      'data-full-width-responsive': true,
    };

    switch (type) {
      case 'vertical':
        adProps['data-ad-slot'] = '2929018380';
        break;
      case 'horizontal':
        adProps['data-ad-slot'] = '3169170468';
        break;
      case 'square':
        adProps['data-ad-slot'] = '7247537348';
        break;
      case 'feed':
        adProps['data-ad-slot'] = '9682128993';
        adProps['data-ad-layout-key'] = '-fb+5w+4e-db+86';
        adProps['data-ad-format'] = 'fluid';
        adProps['data-full-width-responsive'] = null;
        break;
      default:
        return (<></>);
    }

    return (
      <ins {...adProps} />
    );
  }
}

export default AdContainer;
