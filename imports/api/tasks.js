import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Tasks = new Mongo.Collection('tasks');

const Schemas ={};

Schemas.Task= new SimpleSchema({
  firstname:{
    type: String,
    label: "Name"
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      return new Date()
    },

  }
});

Tasks.attachSchema(Schemas.Task);

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}