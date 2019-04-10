import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Students = new Mongo.Collection('students');

Students.schema = new SimpleSchema({

  _id:{
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  teacherId:{
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  nameteacher:{type: String},
  firstname: {type: String},
  number: {type: String},
  createdAt:{
    type: Date,
    autoValue: function() {
      return new Date()
    },
  }
});

Students.attachSchema(Students.schema);

if (Meteor.isServer) {
  Meteor.publish('students', function studentsPublication() {
    return Students.find({ });
  });

Meteor.methods({
    insertNewStudent(firstname, number){
      check(firstname, String);
      check(number, String);
      Students.insert({
        firstname: firstname,
        number: number,
        teacherId: Meteor.userId(),
        nameteacher: Meteor.user().username
      });
    },
  })
}

