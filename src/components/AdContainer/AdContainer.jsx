import cn from 'classnames';
import { equals } from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  object,
  oneOf,
} from 'react-proptypes';
import { connect } from 'react-redux';
import { prepAd } from 'utils/display';

const RELOAD_TIME = 60 * 20;

class AdContainer extends Component {
  static propTypes = {
    type: oneOf(['vertical', 'horizontal', 'square', 'feed']).isRequired,
    section: bool,
    content: bool,
    hideAds: bool,
    style: object,
  };

  static defaultProps = {
    section: true,
    content: false,
    hideAds: false,
    style: {},
  };

  state = {
    elapsedTime: 0,
  };

  timer;

  componentDidMount() {
    this.timer = setInterval(this.doTick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !equals(nextProps, this.props) || !equals(nextProps, this.state);
  }

  componentDidUpdate(prevProps) {
    if (!equals(prevProps, this.props)) {
      this.setState({ elapsedTime: 0 });
    }
  }

  doTick = () => {
    const { elapsedTime } = this.state;
    this.setState({ elapsedTime: elapsedTime + 1 });
  };

  render() {
    const { type, section, content, hideAds } = this.props;
    const { elapsedTime } = this.state;

    if (hideAds || elapsedTime % RELOAD_TIME === 0) {
      return <></>;
    }

    const style = { width: '100%', display: 'block' };

    const adProps = {
      className: 'adsbygoogle',
      'data-ad-format': 'auto',
      'data-ad-client': 'ca-pub-3564148572601954',
      'data-full-width-responsive': true,
      style: { display: 'block' },
    };

    switch (type) {
      case 'vertical':
        adProps['data-ad-slot'] = '2929018380';
        break;
      case 'horizontal':
        adProps['data-ad-slot'] = '3199298892';
        adProps.style = { display: 'block', height: 90 };
        delete adProps['data-ad-format'];
        style.marginLeft = 'auto';
        style.marginRight = 'auto';
        delete style.width;
        break;
      case 'square':
        adProps['data-ad-slot'] = '7247537348';
        adProps.style = { display: 'inline-block', height: 250, width: 300 };
        delete adProps['data-ad-format'];
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

    if (elapsedTime === 1 || (elapsedTime > 1 && elapsedTime % RELOAD_TIME === 1)) {
      prepAd();
    }

    return (
      <div className={cn({ section, content })} style={{ ...style, ...this.props.style }}>
        <ins {...adProps} />
      </div>
    );
  }
}

const mapStateToProps = ({ display: { hideAds } }) => ({
  hideAds,
});

export default connect(mapStateToProps)(AdContainer);
