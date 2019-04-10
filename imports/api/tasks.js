import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');



Tasks.schema= new SimpleSchema({
  
  _id:{
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },

  authorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

  dayofweek: {
    type: String,
  },

  weekId: {
    type: String,
  },


});

Tasks.attachSchema(Tasks.schema);

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });

  Meteor.methods({
    addTaskToList(day, owner, week){
      Tasks.insert({
        authorId: Meteor.userId(),
        ownerId: owner,
        dayofweek: day,
        weekId: week

      });
    },
  })
}