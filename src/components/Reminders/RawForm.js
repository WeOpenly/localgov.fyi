import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const windowGlobal = typeof window !== 'undefined' ? window: null

const styles = theme => ({

});

class RawForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {field_schema, id} = this.props;

        if (!field_schema) {
            return null;
        }

        let trimmedFS = null;

        if (field_schema) {
            trimmedFS = field_schema.trim();
            try{
                trimmedFS = JSON.parse(trimmedFS);
            }
            catch(err){
                return null;
            }
        }
        
        let fieldHints = []
        if (!trimmedFS){
            return null;
        }

        if(trimmedFS){
            Object.keys(trimmedFS.properties).forEach((key) => {
                fieldHints.push({
                    "name": key,
                    "title": key,
                    "type": "text"
                })
            })
        }
        
        return (<form name={id} method="post" netlify-honeypot="bot-field" hidden data-netlify={true} >
            {fieldHints.map((field) => (
                <p hidden>
                    <label>
                        {field.title}
                        <input {...field} />
                    </label>
                </p>
            ))}
            <p hidden>
                <label>
                    <input name="service_id" />
                </label>
            </p>
            <p hidden>
                <label>
                    <input name="org_id" />
                </label>
            </p>
            <p hidden>
                <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>
        </form>)
    }
}


export default RawForm;