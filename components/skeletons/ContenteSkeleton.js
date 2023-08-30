import React from 'react';
import { Classes } from '@blueprintjs/core';
import skelStyles from '../styles/skeletonstyles.module.css'; // Import custom CSS for additional styling

const ContentSkeletonCard = () => {
  return (
    <>
    
      <h5 className={`bp5-heading ${Classes.SKELETON} ${skelStyles.skeletonheading}`}>Card heading</h5>
     
    <div className={`bp5-card ${Classes.SKELETON} ${skelStyles.skeletoncard}`}>
      <h5 className={`bp5-heading ${Classes.SKELETON} ${skelStyles.skeletonheading}`}>Card heading</h5>
      <p className={`${Classes.SKELETON} ${skelStyles.skeletoncontent}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis.
        Fusce dapibus metus in dapibus mollis. Quisque eget ex diam.
      </p>
      <button type="button" className={`bp5-button bp5-icon-add ${Classes.SKELETON} ${skelStyles.skeletonbutton}`}>
        Submit
      </button>
    </div>
    <div className={`bp5-card ${Classes.SKELETON} ${skelStyles.skeletoncard}`}>
      <h5 className={`bp5-heading ${Classes.SKELETON} ${skelStyles.skeletonheading}`}>Card heading</h5>
      <p className={`${Classes.SKELETON} ${skelStyles.skeletoncontent}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis.
        Fusce dapibus metus in dapibus mollis. Quisque eget ex diam.
      </p>
      <button type="button" className={`bp5-button bp5-icon-add ${Classes.SKELETON} ${skelStyles.skeletonbutton}`}>
        Submit
      </button>
    </div>
    <div className={`bp5-card ${Classes.SKELETON} ${skelStyles.skeletoncard}`}>
      <h5 className={`bp5-heading ${Classes.SKELETON} ${skelStyles.skeletonheading}`}>Card heading</h5>
      <p className={`${Classes.SKELETON} ${skelStyles.skeletoncontent}`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis.
        Fusce dapibus metus in dapibus mollis. Quisque eget ex diam.
      </p>
      <button type="button" className={`bp5-button bp5-icon-add ${Classes.SKELETON} ${skelStyles.skeletonbutton}`}>
        Submit
      </button>
    </div>
    </>
  );
};

export default ContentSkeletonCard;
