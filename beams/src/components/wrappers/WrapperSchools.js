import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import Schools from '../demographics/Schools';

class WrapperSchools extends React.Component {
    render() {
      const suburbs = this.props.suburbs;
      const isCompare = this.props.isCompare;

      return (
        <div>
          <Schools isCompare={isCompare} suburbs={suburbs}/>
        </div>
      );
    }
}

export default WrapperSchools;
