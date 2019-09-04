import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from './getPageContext';
import mobile  from 'is-mobile';

function withRoot(Component) {
    class WithRoot extends React.Component {
        constructor(props) {
            super(props);
            this.muiPageContext = getPageContext();
            this.state = {
                isMobile: false,
                loadingDevice: true,
            }
        }

        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles
                    .parentNode
                    .removeChild(jssStyles);

            }
            this.setState({
                loadingDevice: false,
                isMobile: mobile()
            })
        }

        render() {
     
            return (
                <JssProvider generateClassName={this.muiPageContext.generateClassName}>
                    {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
                    <MuiThemeProvider
                        theme={this.muiPageContext.theme}
                        sheetsManager={this.muiPageContext.sheetsManager}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline/>
                        <Component {...this.props} isMobile={this.state.isMobile} />
                    </MuiThemeProvider>
                </JssProvider>
            );
        }
    }

    return WithRoot;
}

export default withRoot;
