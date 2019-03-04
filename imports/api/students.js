import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  });
}