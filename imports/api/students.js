import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Students = new Mongo.Collection('students');


const StudentSchema = new SimpleSchema({

  name: {
    type: Object
  },
  'name.firstname': {
    type: String
  },
  'name.number': {
    type: String
  },

  parent:{
    type: String,
    autoValue: function() {
      return this.userId
    },
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      return new Date()
    },

  }
});

Students.attachSchema(StudentSchema);

if (Meteor.isServer) {
  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  });

  Meteor.methods({
    insertNewStudent(firstname, number){
      check(firstname, String);
      check(number, String);
      Students.insert({
        name: {
          firstname: firstname,
          number: number,
        },
      });
    },
  })
}

