import loaderStyles from "./styles/loader.module.css"
import React from "react"
const WhysOnMyMindLoader = ()=>{
    return(
        <div className={loaderStyles.container}>
        <pre className={loaderStyles.asciiart}>
 {` 


**       ** **                         *******            ****     ****          ****     **** **               **
/**      /**/**       **   **          **/////**          /**/**   **/**  **   **/**/**   **/**//               /**
/**   *  /**/**      //** **   ****** **     //** ******* /**//** ** /** //** ** /**//** ** /** ** *******      /**
/**  *** /**/******   //***   **//// /**      /**//**///**/** //***  /**  //***  /** //***  /**/**//**///**  ******
/** **/**/**/**///**   /**   //***** /**      /** /**  /**/**  //*   /**   /**   /**  //*   /**/** /**  /** **///**
/**** //****/**  /**   **     /////**//**     **  /**  /**/**   /    /**   **    /**   /    /**/** /**  /**/**  /**
/**/   ///**/**  /**  **      ******  //*******   ***  /**/**        /**  **     /**        /**/** ***  /**//******
//       // //   //  //      //////    ///////   ///   // //         //  //      //         // // ///   //  //////  
                                                                  
`}
        </pre>
        </div>
    )
}

export default WhysOnMyMindLoader