import React, { Component } from 'react';
//import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
  } from "rn-placeholder";

const PageLoader = () => {
      return (
        <Placeholder
        Animation={Fade}
        Left={PlaceholderMedia}
      >
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
        <PlaceholderLine width={60} />
        <PlaceholderLine width={100} />
        <PlaceholderLine width={60} />
      </Placeholder>
      )
}

export default PageLoader;