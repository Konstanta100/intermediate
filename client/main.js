import React from 'react';

import { mount } from 'react-mounter';

import {MainLayout} from "./layouts/MainLayout.js";
import App from '../imports/ui/App.js';

FlowRouter.route('/', {
  action(){
    mount(MainLayout, {
      content: (<App />)
    })
  }
});