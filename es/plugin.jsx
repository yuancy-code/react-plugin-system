/*
 * @Author: yuanchengyong 
 * @Date: 2020-01-15 17:11:34 
 * @Last Modified by: zyycy_love@126.com
 * @Last Modified time: 2020-01-16 16:15:16
 */
import React, { Component } from 'react';
export default class extends Component {
    constructor() {
        super();
        this.state = {
            component: null
        }
    }
    componentDidMount() {
        let { importComponent } = this.props;
        importComponent()
            .then(cmp => {
                this.setState({ component: cmp.default });
            });
    }
    render() {
        let props = {};
        for (let item in this.props) {
            if (item !== 'importComponent') {
                props[item] = this.props[item];
            }
        }
        const C = this.state.component;
        return C ? <C {...props} /> : null;
    }
}


