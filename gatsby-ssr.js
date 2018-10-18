/* eslint-disable react/prop-types, react/no-danger */

import React from 'react';
import {renderToString} from 'react-dom/server';
import {JssProvider} from 'react-jss';
import { Provider } from 'react-redux'

import getPageContext from './src/getPageContext';
import reduxCreateStore from './src/state/createStore';

export const replaceRenderer = ({bodyComponent, replaceBodyHTMLString, setHeadComponents}) => {
    // Get the context of the page to collected side effects.
    const store = reduxCreateStore();
    const pageContext = getPageContext();

    const ConnectedBody = () => (
            <Provider store={store}>
            <JssProvider
                registry={pageContext.sheetsRegistry}
                generateClassName={pageContext.generateClassName}>
                {React.cloneElement(bodyComponent, { pageContext })}
            </JssProvider>
            </Provider>
    );

    const bodyHTML = renderToString(<ConnectedBody/>);

    replaceBodyHTMLString(bodyHTML);
    
    setHeadComponents([<style type="text/css" id="server-side-jss" key="server-side-jss" dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />,
    ]);
};