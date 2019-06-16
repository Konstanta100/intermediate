import React from 'react';

import {mount} from 'react-mounter';

import { FlowRouter } from 'meteor/kadira:flow-router';
import  App  from '../imports/ui/App.js';
import '../imports/startup/accounts-config.js';
import {MainLayout} from './layouts/MainLayout.js';


FlowRouter.route('/', {
   action(){
       mount(MainLayout, {
           content: (<App />)
       })
   }
});