import {
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { closeDialog } from 'actions/display';
import { fetchVocations } from 'actions/gameData';
import { updateProficiency } from 'actions/proficiencies';
import cn from 'classnames';
import NumberField from 'components/NumberField';
import { DIALOG_PROFICIENCY } from 'constants/display';
import { PROFICIENCY_RANK } from 'constants/proficiencies';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pascalCase } from 'utils/string';
import * as VocationIcon from '../../images/vocation/';

class Proficiencies extends Component {
  componentDidMount() {
    this.props.fetchVocations();
  }

  render() {
    const { updateProficiency, proficiencies, vocations, mobile, open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={mobile}
        maxWidth="lg"
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className="title-text">My Proficiencies</Typography>
            <Tooltip title="Close">
              <IconButton onClick={onClose} color="inherit">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <DialogContent className="proficiency-wrapper">
          {Array.from(new Set(vocations.map(v => v.group))).filter(g => Boolean(g)).map(group => (
            <div className="proficiency-group" key={`group-${group}`}>
              <Typography variant="h6">{group}</Typography>
              {vocations.filter(v => v.group === group).map(vocation => {
                const proficiency = proficiencies[vocation.name] || 0;
                const rank = PROFICIENCY_RANK.find(r => r.maxValue >= proficiency);
                const rankIndex = PROFICIENCY_RANK.indexOf(rank);
                const minProficiency = rankIndex === 0 ? 0 : PROFICIENCY_RANK[rankIndex - 1].maxValue;
                const barPercent = (proficiency - minProficiency) / (rank.maxValue - minProficiency);
                return (
                  <div className="proficiency" key={`prof-${vocation.name}`}>
                    <img src={VocationIcon[pascalCase(vocation.name)]} alt={vocation.name} />
                    <div className="proficiency-stats" data-grade={rank.grade}>
                      <NumberField
                        className="proficiency-value"
                        label={(
                          <>
                            {rank.grade > 1 && <span className={cn('proficiency-icon', rank.name)} />}
                            <span className="quality-color">{vocation.name}</span>
                          </>
                        )}
                        InputLabelProps={{ className: 'proficiency-name' }}
                        size="small"
                        value={proficiency}
                        onChange={(value) => updateProficiency(vocation.name, Number(value))}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        inputStyle={{ textAlign: 'left' }}
                        min={0}
                        max={230000}
                        step={10000}
                      />
                      <div className="proficiency-bar">
                        <div className="quality-bar" style={{ width: `${Math.round(barPercent * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="spacer" />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ gameData: { vocations }, proficiencies, display: { mobile, dialog } }) => ({
  vocations,
  proficiencies,
  mobile,
  open: dialog === DIALOG_PROFICIENCY,
});

const mapDispatchToProps = {
  fetchVocations,
  updateProficiency,
  onClose: closeDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Proficiencies);
