import React from 'react'
import {AdvancedImage} from `from @cloudinary/react`;
import {Cloudinary} from `from @cloudinary/url-gen`;
import {Transformation} from `from @cloudinary/url-gen`;

import {thumbnail} from "@cloudinary/url-gen/actions/resize"


import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {focusOn} from "@cloudinary/url-gen/qualifiers/focusOn";




const Img = ({uploadedImg}) => {
    const lcd = new Cloudinary ({
cloud : {
    cloudName: 'ddhqrixge'
}
});

const myImage = cld.image(uploadedImg)
myImage
.resize(thumbnail().width(100).height(100).gravity(focusOn.face))

  return (
<>
<AdvancedImage cldImg={myImage} />
</>
  )
}

export default Img
