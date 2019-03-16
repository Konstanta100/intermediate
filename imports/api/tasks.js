import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Tasks = new Mongo.Collection('tasks');



const TaskSchema= new SimpleSchema({
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

Tasks.attachSchema(TaskSchema);

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}