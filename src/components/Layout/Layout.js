import React from 'react';

const Layout = ( props ) => (
    <React.Fragment>
        <div>Toolbar</div>
        <main>{props.children}</main>
    </React.Fragment>
);

export default Layout;