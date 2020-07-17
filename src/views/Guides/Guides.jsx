import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Link from 'components/Link';
import { GUIDE_CATEGORY } from 'constants/guides';
import React from 'react';
import {
  delimitName,
  setTitle,
} from 'utils/string';
import * as AllGuides from '../../data/guides';

// populate guide categories with guides
const guideCategories = Object.entries(GUIDE_CATEGORY).reduce((obj, [key, cat]) => {
  obj[key] = {
    name: cat,
    children: Object.entries(AllGuides).filter(([, guide]) => guide.category === cat).reduce((objGuides, [guideKey, guide]) => {
      objGuides[guideKey] = guide;
      return objGuides;
    }, {}),
  };
  return obj;
}, {});

const Guides = () => {
  setTitle('Guides');
  return (
    <>
      <Paper className="section">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">Guides</Typography>
          </Toolbar>
        </AppBar>
        <div className="body-container guide-list">
          {Object.values(guideCategories).map(section => {
            return (
              <div className="guide-category" key={`gc-${section.name}`}>
                <Typography variant="h6">{section.name}</Typography>
                <ul>
                  {Object.entries(section.children).filter(g => !g.disabled).map(([id, guide]) => (
                    <li key={`gc-${id}`}>
                      <Typography>
                        <Link to={`/guides/${delimitName(id)}`} color="primary">
                          {guide.name}
                        </Link>
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Paper>
    </>
  );

};

export default Guides;
