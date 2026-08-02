import React from 'react'
import {AdvancedImage, lazyload, accessibility, responsive, placeholder} from '@cloudinary/react';
import {Cloudinary} from '@cloudinary/url-gen';
import {fill, thumbnail} from '@cloudinary/url-gen/actions/resize';
//import {tranformation} from '@cloudinary/url-gen';
// import { Cloudinary } from 'https://cdn.jsdelivr.net/npm/@cloudinary/url-gen/+esm';
// import { AdvancedImage, AdvancedVideo } from 'https://cdn.jsdelivr.net/npm/@cloudinary/react/+esm';

// import {thumbnail, scale} from '@cloudinary/url-gen/actions/resize';
import {byRadius} from '@cloudinary/url-gen/actions/roundCorners';
import {sepia} from '@cloudinary/url-gen/actions/effect';
// import {source} from '@cloudinary/url-gen/actions/overlay';
// import {opacity,brightness} from '@cloudinary/url-gen/actions/adjust';
// import {byAngle} from '@cloudinary/url-gen/actions/rotate';
// import {image} from '@cloudinary/url-gen/qualifiers/source';
//import {position} from '@cloudinary/url-gen/qualifiers/position';
// import {compass} from '@cloudinary/url-gen/qualifiers/gravity';
// import {focusOn} from '@cloudinary/url-gen/qualifiers/gravity';
// import {focuson} from '@cloudinary/url-gen/qualifiers/focusOn';
import {scale} from '@cloudinary/url-gen/actions/resize';


const Img = ({uploadedImg}) => {
    // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dmpv3to7n',
    }
  });
  const myImage = cld.image(uploadedImg);
  myImage.resize(scale().width(100).height(100)).roundCorners(byRadius(20)).effect(sepia());


  return (
    <>
      <AdvancedImage cldImg={myImage} plugins={[lazyload(), responsive(), accessibility(), placeholder({mode: 'predominant-color'})]}/>
    </>
  )
}

export default Img
