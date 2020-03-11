import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import styles from "../spectre.min.module.css";

class StateSuggest extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev){
        const { clearStateName, onSelectSuggestion }= this.props;
        console.log(ev.target.value);
        if (ev.target && ev.target.value){
            onSelectSuggestion({label: ev.target.value})
        }
        else{
            clearStateName()
        }
    }

    render() {
        const {classes} = this.props;
        const { selected, allStates  } = this.props;

        const opts = allStates.map((state, idx) => {
            return (<option value={state.label}>{state.label}</option>)
        })

        return (
    
            <div className={styles.formGroup}>
              <label for="states">Filter by State</label>
              <select
                value={selected ? selected.label : ""}
                onChange={this.handleChange}
                id="states"
                className={styles.formSelect}
              >
                {opts}
                <option value="">All States</option>
              </select>
            </div>

           
        );
    }
}

StateSuggest.propTypes = {
    classes: PropTypes.object.isRequired
};

export default StateSuggest;