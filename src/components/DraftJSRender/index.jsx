import {
  Link,
  Typography,
} from '@material-ui/core';
import MuiLink from 'components/Link';
import linkifyIt from 'linkify-it';
import React from 'react';

const linkify = linkifyIt();

const getBlockComponent = blockType => ({
  unstyled: 'p',
  paragraph: 'p',
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  'header-four': 'h4',
  'header-five': 'h5',
  'header-six': 'h6',
  'unordered-list-item': ['li', 'ul'],
  'ordered-list-item': ['li', 'ol'],
  blockquote: 'blockquote',
  'code-block': 'pre',
  atomic: 'div',
  'HEADING': Typography,
}[blockType] || 'p');

const blockProps = blockType => ({
  'HEADING': { variant: 'h6' },
}[blockType] || {});

const getStyleComponent = style => ({
  BOLD: 'strong',
  ITALIC: 'i',
  UNDERLINE: 'u',
  STRIKETHROUGH: 'strike',
  CODE: 'code',
}[style] || 'span');

const getEntityComponent = entityType => {
  switch (entityType) {
    case 'IMAGE':
      return ({ data }) => <img {...data} />;

    case 'LINK':
      return ({ data, children }) => {
        const match = linkify.match(data.url);
        if (match) {
          return <Link href={data.url} target="_blank">{children}</Link>;
        } else {
          return <MuiLink to={data.url}>{children}</MuiLink>;
        }
      };

    case 'HR':
      return () => <hr />;

    default:
      console.error('Unknown entity: ', entityType);
      return ({ children }) => <div>{children}</div>;
  }
};

const parseBlockComponent = component => {
  if (typeof component === 'object' && component instanceof Array) {
    return component;
  }
  return [component, null];
};

const DraftJSRender = (
  {
    contentState: { blocks, entityMap },
    textComponent = ({ children }) => children,
    raw = false,
  }) => {
  let blockList = [];
  let blocksDepthStack = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    if (block.depth > 0) {
      blocksDepthStack[block.depth - 1].children =
        blocksDepthStack[block.depth - 1].children || [];
      blocksDepthStack[block.depth - 1].children.push(block);
    } else {
      blockList.push(block);
    }
    blocksDepthStack[block.depth] = block;
    blocksDepthStack.splice(block.depth + 1);
  }

  const renderArray = array => {
    let newArray = [];
    let innerArray = [];
    for (let i = 0; i < array.length; i++) {
      let block = array[i];
      if (innerArray.length > 0 && innerArray[0].type === block.type) {
        innerArray.push(block);
      } else {
        innerArray = [block];
        newArray.push(innerArray);
      }
    }

    return newArray.map(group =>
      React.createElement(
        parseBlockComponent(getBlockComponent(group[0].type))[1] ||
        React.Fragment,
        { key: group[0].key },
        group.map(block =>
          React.createElement(
            parseBlockComponent(getBlockComponent(block.type))[0],
            { key: block.key, ...block.data, ...blockProps(block.type) },
            block.children
              ? [renderRichText(block), ...renderArray(block.children)]
              : renderRichText(block),
          ),
        ),
      ),
    );
  };

  const renderRichText = block => {
    let indexes = [0];

    block.entityRanges.forEach(entity => {
      indexes.push(entity.offset);
      indexes.push(entity.offset + entity.length);
    });
    block.inlineStyleRanges.forEach(style => {
      indexes.push(style.offset);
      indexes.push(style.offset + style.length);
    });
    indexes.sort((a, b) => a - b);

    indexes = indexes.filter(
      (v, i) => indexes.indexOf(v) === i && v !== block.text.length,
    );

    let ranges = indexes
    .map((index, i) => ({
      start: index,
      end: indexes[i + 1] || block.text.length,
    }))
    .map(({ start, end }) => ({
      start,
      end,
      text: block.text.substring(start, end),
      styles: block.inlineStyleRanges
      .filter(
        style => style.offset <= start && style.offset + style.length >= end,
      )
      .map(style => style.style),
      entities: block.entityRanges
      .filter(
        entity =>
          entity.offset <= start && entity.offset + entity.length >= end,
      )
      .map(entity => entityMap[entity.key]),
    }));

    const renderStyledText = (text, styles) => {
      let rendered = text;
      for (let i = 0; i < styles.length; i++) {
        rendered = React.createElement(
          getStyleComponent(styles[i]),
          {},
          rendered,
        );
      }
      return rendered;
    };

    const renderEntities = (text, entities) => {
      let rendered = text;
      for (let i = 0; i < entities.length; i++) {
        rendered = React.createElement(
          getEntityComponent(entities[i].type),
          { data: entities[i].data },
          rendered,
        );
      }
      return rendered;
    };

    return ranges.map((range, index) =>
      React.cloneElement(
        renderEntities(
          renderStyledText(
            React.createElement(textComponent, {}, range.text),
            range.styles,
          ),
          range.entities,
        ),
        { key: index },
      ),
    );
  };

  return raw
    ? renderArray(blockList)
    : <Typography component="div" className="body-container">{renderArray(blockList)}</Typography>;
};

export default DraftJSRender;
