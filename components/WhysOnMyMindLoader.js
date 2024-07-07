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
        <div className={loaderStyles.footnote}>
                WhyOnM Server has been hosted on Free tier of Onrender!!
                Inactivity spins it Down!!

            </div>
        
        </div>
    )
}

export default WhysOnMyMindLoader