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
  
  lesson:{
    type: String,
    optional: true,
    autoValue: function() {
      const content = ''
      if (this.isSet) {
        return this.value;
      }
      return content;
    },   
  },

  start:{
    type: String,
    optional: true,
    autoValue: function() {
      const content = ''
      if (this.isSet) {
        return this.value;
      }
      return content;
    },   
  },

  finish:{
    type: String,
    optional: true,
    autoValue: function() {
      const content = ''
      if (this.isSet) {
        return this.value;
      }
      return content;
    },   
  },
/*
  image: {
    type: String,
    optional: true
  },
*/  


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
    copyScheduleTeacher(day, owner, week, lesson, start, finish){
      Tasks.insert({
        authorId: Meteor.userId(),
        ownerId: owner,
        dayofweek: day,
        weekId: week,
        lesson: lesson,
        start: start,
        finish: finish
      });
    },

    UpdateTaskList(taskId, studentId, studentweek){
      Tasks.update(taskId, { $set: { ownerId: studentId, weekId: studentweek } });
    },

    DeleteTask(taskId){
      Tasks.remove(taskId);
    },

    addTaskForInformation(taskId, lesson, start, finish){
      Tasks.update(taskId, { $set: { lesson: lesson, start: start, finish: finish}});
    },

  })
}