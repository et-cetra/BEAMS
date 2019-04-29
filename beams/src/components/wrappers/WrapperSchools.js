import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import Schools from '../demographics/Schools';

class WrapperSchools extends React.Component {
    render() {
      const suburbs = this.props.suburbs;
      const isCompare = this.props.isCompare;
      const suburb = suburbs[0].suburb;

      return (
        <div style={{width: "100%"}}>
          <Schools isCompare={isCompare} suburbs={suburbs} key={'Schools'+suburb}/>
        </div>
      );
    }
}

export default WrapperSchools;
