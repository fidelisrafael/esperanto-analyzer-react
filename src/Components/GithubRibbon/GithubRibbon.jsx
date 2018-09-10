import React from 'react';

const DEFAULT_STYLE = {
  'position': 'absolute', 'top': 0, 'right': 0, 'border': 0
}
export const DEFAULT_RIBBON_IMG = "https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"

const GithubRibbon = (props) => {
  const {
    href = '',
    src = DEFAULT_RIBBON_IMG,
    alt = 'Fork me on Github',
    style = DEFAULT_STYLE,
    target = '_blank',
    isTest = null
  } = props

  return (
    <a isTesting={isTest} href={href} target={target}>
      <img
        style={style}
        src={src}
        alt={alt}
      />
    </a>
  );
}

export default GithubRibbon;
