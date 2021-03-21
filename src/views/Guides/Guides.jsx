import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import cn from 'classnames';
import Link from 'components/Link';
import { GUIDE_CATEGORY } from 'constants/guides';
import React from 'react';
import { sortBy } from 'utils/array';
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
            <Typography variant="h5" className="title-text">Guides</Typography>
          </Toolbar>
        </AppBar>
        <div className="body-container guide-list">
          {Object.entries(guideCategories).map(([key, section]) => {
            return (
              <div className="guide-category" key={`gc-${section.name}`}>
                <div className={cn('banner', key)}>
                  <Typography variant="body1" className="cat-name">{section.name}</Typography>
                </div>
                <ul className="cat-list">
                  {Object.entries(section.children)
                  .sort((a, b) => sortBy('name')(a[1], b[1]))
                  .map(([id, guide]) => (
                    <li key={`gc-${id}`} className="guide-item">
                      <Typography>
                        <Link to={`/guides/${delimitName(id)}`} color="primary">
                          {guide.name}
                        </Link>
                      </Typography>
                      <Typography variant="caption" className="timestamp">
                        {guide.meta.lastUpdated}
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
