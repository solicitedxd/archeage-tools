import cn from 'classnames';
import { equals } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  oneOf,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { prepAd } from 'utils/display';

class AdContainer extends Component {
  static propTypes = {
    type: oneOf(['vertical', 'horizontal', 'square', 'feed']).isRequired,
    section: bool,
    hideAds: bool,
  };

  static defaultProps = {
    section: true,
    hideAds: false,
  };

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !equals(nextProps, this.props);
  }

  render() {
    const { type, section, hideAds } = this.props;

    if (hideAds) {
      return <></>;
    }

    const adProps = {
      className: 'adsbygoogle',
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
        delete adProps['data-full-width-responsive'];
        break;
      default:
        return (<></>);
    }

    prepAd();

    return (
      <div className={cn({ section })} style={{ width: '100%' }}>
        <ins {...adProps} style={{ display: 'block' }} />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { hideAds } }) => ({
  hideAds,
});

export default connect(mapStateToProps)(AdContainer);
